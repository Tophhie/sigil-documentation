---
title: Infrastructure
description: What Sigil runs on, and which third parties are involved.
sidebar:
  order: 4
---

Sigil runs on Cloudflare's edge network. The signature path executes close to
whoever is composing the message.

## Components

| Component | Used for |
| --- | --- |
| Cloudflare edge compute | The API, the admin portal and the redirect service |
| Cloudflare D1 | Templates, configuration, telemetry and billing state |
| Cloudflare R2 | Uploaded images |
| Cloudflare KV | Rendered signature cache and per-mailbox rule resolution |
| Cloudflare Email | Invitations, test emails, operator notices and internal alerts |
| Stripe | Subscriptions, payment methods and invoices |
| Microsoft Entra ID | Authentication for both the add-in and the portal |
| Microsoft Graph | Read-only directory attributes for personalisation |

## Hostnames

| Host | Serves |
| --- | --- |
| `portal.usesigil.app` | Admin portal, designer, and the signature API |
| `static.usesigil.app` | The add-in bundle and its manifest |
| `e-clk.usesigil.app` | Tracked link redirects only |

The add-in is served from a different hostname to the API on purpose. That
hostname is baked into the Entra broker redirect URI and into every URL in the
add-in manifest, which is part of why a hostname change requires a manifest
redeploy and fresh admin consent.

The link domain answers `/r/` redirects and returns 404 for everything else, so
the surface that recipients touch carries no portal or API.

## Code loaded from other hosts

The components above are the services Sigil runs on. Two further hosts are
reached by the browser or the Outlook client rather than by Sigil's servers, and
they are worth stating plainly because one of them puts third-party code inside
your users' Outlook.

| Host | What it serves | Reached by |
| --- | --- | --- |
| `appsforoffice.microsoft.com` | Office.js | The add-in, on every path |
| `unpkg.com` | The icon set the "My signature" pane draws its glyphs from, at a pinned version | The pane only |

Office.js is not optional and not a choice Sigil made. Microsoft requires every
Office add-in to load it from that host, and an add-in that bundled its own copy
would not run.

The other is cosmetic, and the add-in is built so that losing it costs
appearance rather than function. The icon script is called through an optional
reference, so a blocked or unreachable `unpkg.com` leaves the buttons without
glyphs and every one of them still works.

The typefaces the pane and the admin portal are set in are deliberately not on
this list. They are served from Sigil's own hosts rather than from Google Fonts,
so opening the pane or the portal discloses nothing — not even an IP address —
to a font provider.

Neither host is sent anything of yours. They answer requests for a script, and
what they learn is what any web request discloses: the address it came from and
the page that made it. Signature content, directory attributes and tokens never
travel to them, and the automatic signature path reaches neither except Office.js.

The network view of the same list, written for an administrator configuring an
outbound filter, is on
[requirements](/deploy/requirements/).

## Caching

Rendered signatures are cached in KV, keyed by template id, template version and
email address. The banner and footer in force are part of that key, and so is a
counter that moves whenever an image is uploaded or replaced, which is what keeps
a swapped logo instant now that the cached entry holds the image bytes alongside
the HTML.

Publishing a template increments its version, which strands every cached entry
for it at once. That is why edits reach users in seconds without an explicit
purge.

A one hour lifetime sits on top of that, which is how a change to somebody's job
title in Entra reaches Outlook without anyone republishing. It also bounds how
long any directory data exists inside Sigil at all: the attributes are read when
a signature is rendered and are never stored as a record of their own, so an hour
after the last render there is nothing left of them.

The answer to a single directory lookup is held for fifteen minutes, so that a
person composing several messages is not looked up in Graph each time. It sits
inside the hour above and changes nothing about how long directory data survives.
A deprovisioned organisation has it cleared with everything else.

The routing decision behind assignment rules is cached separately, keyed by a
rules version that changes whenever the rules are edited, so an edit strands
every cached decision at once. A ten minute freshness window sits on those
entries as well, after which the decision is re-checked against the directory in
the background rather than while somebody is composing. That is what bounds how
long a directory attribute can go on routing somebody to a template they should
no longer be getting: ten minutes, and then one further message.

## Reliability characteristics

Telemetry writes are best-effort and off the critical path. A storage problem
loses a telemetry record rather than delaying or failing the signature somebody is
waiting on.

The directory cross-reference in the Activity view is also best-effort. If Graph
is briefly unavailable, the rest of the telemetry still renders.

The add-in's outcome beacon is time-boxed and never holds a compose window open.

An interruption to Sigil affects signature management rather than mail flow.
Sigil never gates the sending of email, so an outage costs you the portal and the
application of signatures, not your users' ability to send.

## Availability commitment

There are two answers, depending on how you buy Sigil.

Bought directly, there is no contractual uptime figure. The terms of use aim at a
reliable service without guaranteeing uninterrupted availability, and the support
page states an aim of a response within one business day.

Bought through a managed service provider, the partner agreement commits to
99.9% monthly uptime with a service credit table behind it, and a four
business hour response target on escalations. That commitment runs between
Tophhie Cloud and the provider, so what reaches you is whatever your provider has
agreed with you on the back of it. See
[support and service level](/partners/service-level/).

## Health

`portal.usesigil.app/health` reports configuration and storage state. It is a
service-level check rather than a per-tenant one.
