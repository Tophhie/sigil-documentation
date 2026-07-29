---
title: API reference
description: The HTTP endpoints Sigil exposes, what authenticates each one, and what it returns.
sidebar:
  order: 4
---

Sigil's API is not a public integration surface. It exists for the add-in and the
admin portal, and it is documented here because a security review usually wants
to see it.

All endpoints live on `portal.usesigil.app`.

## Authentication

| Auth | Meaning |
| --- | --- |
| Add-in token | An Entra access token carrying the `access_as_user` scope |
| Admin token | An Entra access token carrying the `portal_admin` scope |
| None | Public, unauthenticated |

Every token is verified in the Worker: cryptographic signature against the
calling tenant's published keys, then issuer, audience, home tenant and scope.
See [the security model](/security/security-model/).

## Signature endpoints

| Route | Auth | Purpose |
| --- | --- | --- |
| `GET /api/signature?email=&type=` | Add-in token | The rendered signature plus its inline images. `email` defaults to the caller; `type` is `new` or `reply` |
| `GET /api/signature/download?email=&type=` | Add-in token | The signature as a standalone HTML file with images inlined as `data:` URIs |
| `POST /api/signature/report` | Add-in token | The add-in's apply outcome for one attempt |

The `email` parameter may name any mailbox in the calling tenant, which is what
allows a shared mailbox or an alias to render its own signature. The identity on
a report is taken from the verified token rather than from the payload.

## Template endpoints

| Route | Auth | Purpose |
| --- | --- | --- |
| `GET /api/admin/templates` | Admin token | The library plus current role assignments |
| `POST /api/admin/templates` | Admin token | Create a template |
| `GET /api/admin/templates/:id` | Admin token | One template's body |
| `PUT /api/admin/templates/:id` | Admin token | Publish a new version |
| `PATCH /api/admin/templates/:id` | Admin token | Rename |
| `POST /api/admin/templates/:id/duplicate` | Admin token | Copy a template |
| `DELETE /api/admin/templates/:id` | Admin token | Delete, blocked while assigned |
| `GET /api/admin/templates/:id/versions` | Admin token | Rollback history |
| `POST /api/admin/templates/:id/rollback` | Admin token | Restore a version |
| `PUT /api/admin/templates/:id/draft` | Admin token | Save a working copy |
| `DELETE /api/admin/templates/:id/draft` | Admin token | Discard a working copy |
| `POST /api/admin/templates/:id/publish-draft` | Admin token | Promote the working copy |
| `GET /api/admin/templates/:id/export` | Admin token | Portable JSON, images included |
| `POST /api/admin/templates/import` | Admin token | Import a bundle as a new entry |
| `PUT /api/admin/roles` | Admin token | Assign templates to the `new` and `reply` roles |
| `POST /api/admin/preview` | Admin token | Render with sample data |
| `GET /api/admin/download?email=&type=` | Admin token | A mailbox's live signature as a standalone file |

Shortcuts acting on the active new-message template exist at
`GET/PUT /api/admin/template`, `GET /api/admin/versions` and
`POST /api/admin/rollback`.

## Configuration endpoints

| Route | Auth | Purpose |
| --- | --- | --- |
| `GET /api/admin/fields` | Admin token | The placeholder list the editors offer |
| `GET/PUT /api/admin/rules` | Admin token | Assignment rules, replaced as one ordered list |
| `GET/POST /api/admin/banners`, `PUT/DELETE /api/admin/banners/:id` | Admin token | Campaign banners |
| `GET/POST /api/admin/footers`, `PUT/DELETE /api/admin/footers/:id` | Admin token | Compliance footers |
| `GET /api/admin/assets`, `PUT /api/admin/asset/:name` | Admin token | Inline images |
| `PUT /api/admin/templates/:id/tracking` | Admin token | Toggle link tracking for a template |
| `POST /api/admin/test-email` | Admin token | Send a rendered signature to a verified inbox |

## Monitoring endpoints

| Route | Auth | Purpose |
| --- | --- | --- |
| `GET /api/admin/activity` | Admin token | Per-mailbox rollup, recent feed, adoption |
| `GET /api/admin/audit` | Admin token | Directory attribute coverage |
| `GET /api/admin/log` | Admin token | The change log |
| `GET /api/admin/links` | Admin token | Click totals per tracked link |

## Organisation endpoints

| Route | Auth | Purpose |
| --- | --- | --- |
| `GET/PUT /api/admin/users`, `DELETE /api/admin/users/:email` | Admin token, Admin role | Manage users and roles |
| `GET /api/admin/onboarding` | Admin token, Admin role | Getting started checklist state |
| `POST /api/admin/onboarding/dismiss` | Admin token, Admin role | Dismiss the checklist |
| `GET /api/admin/billing` | Admin token, Admin role | Subscription status, seats, card, invoice |
| `POST /api/admin/billing/checkout` | Admin token, Admin role | A hosted Stripe card-capture URL |
| `POST /api/admin/billing/portal` | Admin token, Admin role | A hosted Stripe management URL |
| `PUT /api/admin/billing/profile` | Admin token, Admin role | Save the billing profile |

## Public endpoints

| Route | Purpose |
| --- | --- |
| `GET /admin` | The portal single-page app |
| `GET /admin/config.js` | The portal's public MSAL configuration |
| `GET /admin/consent` | Redirect to Microsoft admin consent |
| `GET /admin/consent/callback` | Provisioning callback |
| `GET /pricing` | Public pricing page |
| `GET /privacy`, `/terms`, `/support`, `/dpa`, `/partner-agreement` | Published legal and support pages |
| `GET /health` | Configuration and storage check |
| `GET /r/:slug` | Tracked link redirect, served on `e-clk.usesigil.app` |

`POST /api/billing/stripe-webhook` is authenticated by a Stripe signature rather
than by a token, and mirrors subscription state locally.

## Status codes worth knowing

| Code | Meaning on the signature path |
| --- | --- |
| 200 | A signature was rendered and returned |
| 401 | The token failed verification |
| 402 | Billing is not active. The add-in applies nothing |
| 404 | The mailbox did not resolve in the directory |

A 402 across an entire organisation is almost always a lapsed trial or a past-due
subscription. See [troubleshooting](/deploy/troubleshooting/).
