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

## Caching

Rendered signatures are cached in KV, keyed by template id, template version and
email address. The banner and footer in force are part of that key.

Publishing a template increments its version, which strands every cached entry
for it at once. That is why edits reach users in seconds without an explicit
purge.

A one hour lifetime sits on top of that, which is how a change to somebody's job
title in Entra reaches Outlook without anyone republishing. It also bounds how
long any directory data exists inside Sigil at all: the attributes are read when
a signature is rendered and are never stored as a record of their own, so an hour
after the last render there is nothing left of them.

The routing decision behind assignment rules is cached separately, keyed by a
rules version that changes whenever the rules are edited, so an edit strands
every cached decision at once. A ten minute lifetime sits on those entries as
well, which is what bounds how long a directory attribute can go on routing
somebody to a template they should no longer be getting.

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
