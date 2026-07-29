---
title: Infrastructure
description: What Sigil runs on, and which third parties are involved.
sidebar:
  order: 4
---

Sigil runs on Cloudflare Workers. The signature path executes at the edge, close
to whoever is composing the message.

## Components

| Component | Used for |
| --- | --- |
| Cloudflare Workers | The API, the admin portal and the redirect service |
| Cloudflare D1 | Templates, configuration, telemetry and billing state |
| Cloudflare R2 | Uploaded images |
| Cloudflare KV | Rendered signature cache and per-mailbox rule resolution |
| Cloudflare Email Routing | Invitations, test emails and operator notices |
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
purge. A time-to-live exists on top, so directory changes are picked up without a
republish.

Per-mailbox assignment rule resolution is cached separately for ten minutes,
keyed by a rules version that changes whenever the rules are edited.

## Reliability characteristics

Telemetry writes are best-effort and off the critical path. A storage problem
loses a telemetry record rather than delaying or failing the signature somebody is
waiting on.

The directory cross-reference in the Activity view is also best-effort. If Graph
is briefly unavailable, the rest of the telemetry still renders.

The add-in's outcome beacon is time-boxed and never holds a compose window open.

## Health

`portal.usesigil.app/health` reports configuration and storage state. It is a
service-level check rather than a per-tenant one.
