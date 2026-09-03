---
title: Requirements
description: What an organisation needs before deploying Sigil, and which Outlook clients are supported.
sidebar:
  order: 1
---

## What you need

Sigil requires Microsoft 365 with Exchange Online. The add-in is an Office.js
add-in and the personalisation reads Microsoft Graph, so both halves are
Microsoft-native and neither works elsewhere.

You need an account that can do two things:

| Task | Permission needed |
| --- | --- |
| Grant admin consent to Sigil's Entra application | Privileged Role Administrator or Global Administrator |
| Upload an add-in under Integrated apps | Global Administrator |

In practice one Global Administrator covers both. The consent step installs
Sigil's service principal in your tenant and grants the read-only Graph
permissions listed in [permissions](/deploy/permissions/).

No servers, connectors or mail flow rules are involved. Sigil never sits in your
mail flow.

## Client support

| Client | Automatic on compose | "My signature" pane |
| --- | --- | --- |
| Outlook on Windows (classic) | Yes | Yes |
| Outlook on Windows (new) | Yes | Yes |
| Outlook on the web | Yes | Yes |
| Outlook on Mac | Yes | Yes |
| Outlook for iOS | Yes | No |
| Outlook for Android | Yes | No |

Outlook mobile activates add-ins in read mode only. Event-based activation is one
of a small number of documented exceptions, but a compose task pane is not, so
the manifest declares events and nothing else for the mobile form factor.

Mobile therefore has no manual fallback. Somebody whose signature fails on a
phone recovers by opening the pane once on a desktop client, because consent is
per user rather than per device.

Two mobile behaviours worth knowing: on a reply the signature is not visible
until the compose window is expanded to full screen, and `OnNewMessageCompose`
does not fire for a message started from the iOS Share sheet.

## Domains Sigil uses

| Host | Purpose |
| --- | --- |
| `portal.usesigil.app` | Admin portal and the signature API |
| `static.usesigil.app` | The add-in bundle and its manifest |
| `e-clk.usesigil.app` | Tracked link redirects only |

If your organisation filters outbound traffic, allow all three. The add-in
fetches from `portal.usesigil.app` and is itself served from
`static.usesigil.app`. The link domain answers `/r/` redirects and returns 404
for every other path, so it carries no API or portal surface.

Two hosts Sigil does not own are also involved, and neither is specific to Sigil:

| Host | Purpose | If it is blocked |
| --- | --- | --- |
| `appsforoffice.microsoft.com` | Office.js, which Microsoft requires every Office add-in to load from here | The add-in does not run at all |
| `unpkg.com` | The icons in the "My signature" pane | The pane works, without its glyphs |

Office.js is loaded by both the automatic path and the pane, so blocking it stops
signatures rather than degrading them. If you already permit Office add-ins, it is
allowed, because no add-in works without it.

The other is cosmetic. It is not reached by the automatic path, which is why an
organisation that blocks general-purpose content delivery networks loses some
polish and no function anywhere, and nobody's signature is affected.

The typefaces the pane and the admin portal are set in are served from Sigil's
own hosts, `static.usesigil.app` for the pane and `portal.usesigil.app` for the
portal. No font host needs allowing, and neither `fonts.googleapis.com` nor
`fonts.gstatic.com` is contacted. If an older allow-list still names them, the
entries can be removed.

## Template constraints

Outlook itself sets limits on what a signature can contain. Design within them
from the start rather than discovering them at publish time.

A rendered signature must stay under 30,000 characters. The portal blocks a
publish that would exceed it.

SVG is not supported. Use PNG or JPG.

Images are referenced as `cid:` and attached inline by the add-in. A hosted
`<img src="https://...">` would be suppressed by Outlook's default image blocking
and render as a broken image.

[Outlook constraints](/signatures/outlook-constraints/) explains each of these in
more detail.

## Only one event-based add-in runs at a time

If your organisation has other event-based add-ins deployed, they run
sequentially rather than in parallel. This rarely causes a problem, but it is
worth knowing if signatures appear more slowly than expected in a tenant with
several such add-ins.
