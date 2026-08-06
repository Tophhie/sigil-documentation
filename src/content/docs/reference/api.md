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
| Tenant API key | A credential an Admin created for a script, presented as `Authorization: Bearer sigil_…` |
| None | Public, unauthenticated |

Every token is verified on the server: cryptographic signature against the
calling tenant's published keys, then issuer, audience, home tenant and scope.
See [the security model](/security/security-model/).

### API keys

An [API key](/admin/api-keys/) is presented on the same `Authorization` header a
portal token uses, and is told apart by its `sigil_` prefix. An Entra token
begins `eyJ` and carries three dot-separated segments, so there is no ambiguity
and no second header for a client to be taught about.

A key carries a set of capabilities and no role, which decides most of what it
can reach. Four things sit outside that.

| Refused to a key | Response |
| --- | --- |
| Anything guarded by the Admin role rather than a capability | 403 |
| The `/api/admin/api-keys` routes themselves | 403 |
| Everything under `/api/admin/platform` and `/api/admin/partner` | 403 |
| A write of any kind, where the key is read-only | 403 |

The signature endpoints under `/api/signature` are not reachable with a key
either. They take a per-mailbox add-in token.

Their administrative equivalents are a different matter, and are reachable. Both
`GET /api/admin/download` and `POST /api/admin/preview` name a mailbox and need
only the templates capability, so a key holding it can pull any mailbox's
rendered signature and, through preview, that mailbox's directory attributes. A
read-only key is refused the preview, which is a POST, and still allowed the
download. See [API keys](/admin/api-keys/).

`X-Client-Tenant` and `X-Impersonate-Tenant` are ignored under key
authentication. A key is bound to one tenant when it is issued, and letting a
header retarget it would make that binding a suggestion.

Requests are limited to 600 a minute per key, and a key over its limit is
answered 429. The tenant refusals below apply to keys exactly as they apply to
people.

A valid token is not enough on its own. Before any admin route runs, the
organisation behind the token has to be one Sigil will serve, and a refusal says
which of three things is wrong:

| Code | Meaning |
| --- | --- |
| `not_onboarded` | This Entra tenant has never been connected, or was connected and then purged |
| `pending_deletion` | The organisation was removed and is inside its deletion grace window |
| `suspended` | Access is suspended for an account or billing reason |

All three return 403. They are separated because only the first can be resolved
by the person holding the token, by granting admin consent. See
[connect your organisation](/deploy/connect-your-organisation/).

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
| `GET /api/admin/rollouts` | Admin token | In-flight rollouts, for the library's badges |
| `POST /api/admin/templates` | Admin token | Create a template |
| `GET /api/admin/templates/:id` | Admin token | One template's body |
| `PUT /api/admin/templates/:id` | Admin token | Publish a new version |
| `PATCH /api/admin/templates/:id` | Admin token | Rename |
| `POST /api/admin/templates/:id/duplicate` | Admin token | Copy a template |
| `DELETE /api/admin/templates/:id` | Admin token | Delete, blocked while assigned. `?purge=true` skips Recently deleted |
| `GET /api/admin/templates/deleted` | Admin token | Recently deleted templates and the retention window |
| `POST /api/admin/templates/:id/restore` | Admin token | Bring one back from Recently deleted |
| `GET /api/admin/templates/:id/versions` | Admin token | Rollback history |
| `POST /api/admin/templates/:id/rollback` | Admin token | Restore a version |
| `PUT /api/admin/templates/:id/draft` | Admin token | Save a working copy |
| `DELETE /api/admin/templates/:id/draft` | Admin token | Discard a working copy |
| `POST /api/admin/templates/:id/publish-draft` | Admin token | Promote the working copy, which is also the approve action |
| `POST /api/admin/templates/:id/draft/submit` | Admin token | Put a working copy up for review |
| `POST /api/admin/templates/:id/draft/reject` | Admin token, Admin role | Send a submitted draft back, with a required note |
| `GET /api/admin/approvals` | Admin token | The review queue, whether the caller can approve, and whether approval is required |
| `GET /api/admin/templates/:id/export` | Admin token | Portable JSON, images included |
| `POST /api/admin/templates/import` | Admin token | Import a bundle as a new entry |
| `PUT /api/admin/roles` | Admin token, rules capability | Assign templates to the `new` and `reply` roles |
| `POST /api/admin/preview` | Admin token | Render with sample data, or against a named mailbox, in which case the response carries that mailbox's directory attributes alongside the HTML |
| `GET /api/admin/download?email=&type=` | Admin token | A mailbox's live signature as a standalone file |

Shortcuts acting on the active new-message template exist at
`GET/PUT /api/admin/template`, `GET /api/admin/versions` and
`POST /api/admin/rollback`.

Every route above except `PUT /api/admin/roles` needs the templates capability,
which the Editor role holds alongside an Admin. Pointing a role at a different
template is guarded by the rules capability instead, which no role but Admin
holds. See [roles and capabilities](/reference/roles-and-capabilities/).

Rejecting a submitted draft is the one route here that needs the Admin role on
top of the capability. Submitting is not, because anyone who can edit a draft can
ask for it to be looked at.

The approvals queue reports `requireApproval` alongside the pending list so the
portal can offer the queue without reading settings, which most of the roles that
submit cannot see.

The library listing carries `hasDraft` per entry, computed as a boolean rather
than by reading the drafts themselves, so listing the library never loads a
template body. It is what the Draft badge is drawn from.

### When publish approval is on

With [publish approval](/signatures/approvals/) switched on for the organisation,
every route that puts a body in front of users additionally requires the caller
to hold the Admin role. A caller who does not is refused with 403 and
`code: "approval_required"`.

That covers `PUT /api/admin/template`, `PUT /api/admin/templates/:id`,
`POST /api/admin/rollback`, `POST /api/admin/templates/:id/rollback`,
`POST /api/admin/templates/:id/publish-draft`,
`POST /api/admin/templates/:id/rollout/promote` and
`PUT /api/admin/templates/:id/schedule`.

Abandoning a rollout is deliberately not in that list. Neither is saving,
discarding or submitting a draft, none of which reach a user.

## Staged rollout endpoints

| Route | Auth | Purpose |
| --- | --- | --- |
| `PUT /api/admin/templates/:id` with a `rollout` block | Admin token | Publish as a staged rollout rather than to everyone |
| `GET /api/admin/templates/:id/rollout` | Admin token | State, both versions' apply results, and the next decision |
| `POST /api/admin/templates/:id/rollout/promote` | Admin token | Publish to everyone now |
| `POST /api/admin/templates/:id/rollout/rollback` | Admin token | Abandon the rollout |
| `GET /api/admin/rollouts` | Admin token | Every rollout currently in flight, as light summaries |

The listing route returns the template id, the percentage, who started it and
when, and deliberately not the bodies. A rollout carries a whole canary signature
and its design document, and the library only needs to know which templates are
mid-rollout and how far along.

A staged publish writes the body to the rollout rather than to the template, so
the live signature is unchanged until it promotes. Every gate has a default,
which makes `"rollout": true` a complete request. These routes sit behind the
templates capability, the same as an ordinary publish. See
[staged rollouts](/signatures/staged-rollouts/).

## Scheduled publish endpoints

| Route | Auth | Purpose |
| --- | --- | --- |
| `PUT /api/admin/templates/:id/schedule` | Admin token | Book a publish for a future instant, replacing any pending one |
| `GET /api/admin/templates/:id/schedule` | Admin token | The schedule on one template, whatever its state |
| `GET /api/admin/schedules` | Admin token | Every pending schedule, soonest first |
| `DELETE /api/admin/templates/:id/schedule` | Admin token | Call off a booked publish |

The booking route takes the same body a publish takes, plus `publishAt` as an
ISO-8601 instant and an optional `rollout` block. It applies the same length,
validation and eject checks a publish does, so a schedule that would be rejected
when it fires is rejected when it is booked.

`publishAt` must be in the future and within 365 days. The body is stored on the
schedule rather than read from the draft when it fires. All four routes need the
templates capability. See
[scheduled publishing](/signatures/scheduled-publishing/).

## Configuration endpoints

| Route | Auth | Purpose |
| --- | --- | --- |
| `GET /api/admin/fields` | Admin token | The placeholder list the editors offer |
| `GET/PUT /api/admin/rules` | Admin token, rules capability | Assignment rules, replaced as one ordered list |
| `POST /api/admin/rules/simulate` | Admin token, rules capability | Dry-run the saved rules against one mailbox |
| `GET/POST /api/admin/banners`, `PUT/DELETE /api/admin/banners/:id` | Admin token, banners capability | Campaign banners |
| `GET/POST /api/admin/footers`, `PUT/DELETE /api/admin/footers/:id` | Admin token, footers capability | Compliance footers |
| `GET /api/admin/assets` | Admin token, templates capability | The image list |
| `GET /api/admin/asset/:name` | Admin token, templates capability | One image, base64 encoded, for the portal's preview |
| `PUT /api/admin/asset/:name`, `DELETE /api/admin/asset/:name` | Admin token, templates capability | Upload or remove an image |
| `PUT /api/admin/templates/:id/tracking` | Admin token, templates capability | Toggle link tracking for a template |
| `POST /api/admin/test-email` | Admin token, templates capability | Send a rendered signature to a named inbox |

The placeholder list is the one route here with no capability of its own. It
describes what a template could reference rather than exposing any of your data,
and both editors need it before anything else loads.

The simulation takes its `email` in the body rather than the query string,
because it names a person and query strings end up in logs. It replies with the
mailbox it resolved, the template each role lands on and what decided it, and a
per-rule trace saying whether each rule matched, what the mailbox's value for the
tested attribute was, and which roles that rule actually settled. It reads the
directory live rather than from the ten minute resolution cache, writes nothing
back, and records no change log entry. An address that is not a mailbox in the
tenant answers 404. See [assignment rules](/targeting/assignment-rules/#testing-a-rule-against-one-mailbox).

## Monitoring endpoints

| Route | Auth | Purpose |
| --- | --- | --- |
| `GET /api/admin/activity` | Admin token, monitoring capability | Per-mailbox rollup, recent feed, adoption |
| `GET /api/admin/activity/events` | Admin token, monitoring capability | The event search, filtered by mailbox, source or outcome |
| `GET /api/admin/audit` | Admin token, monitoring capability | Directory attribute coverage, with the counts of accounts left out as external and as [excluded](/admin/cost-management/) reported separately |
| `GET /api/admin/log` | Admin token, monitoring capability | The change log |
| `GET /api/admin/links` | Admin token, analytics capability | Click totals per tracked link, with a 30-day trend series on each |
| `GET /api/admin/links/overview` | Admin token, analytics capability | One window of tenant-wide analytics: daily series, campaign rollup, device, client and referrer splits, hour-of-day grid, and the clicks-per-1,000 rate |
| `GET /api/admin/links/detail/:slug` | Admin token, analytics capability | The same shape for one link |

Both analytics routes take a `days` query parameter. It is clamped to between 7
and 365 rather than rejected, and defaults to 30, so a stale bookmark returns a
chart instead of an error.

A slug belonging to another organisation returns 404 from the detail route.
Slugs are globally unique, and the redirect being public does not make the
numbers behind it public.

Click totals sit behind analytics rather than monitoring, which is what lets the
Marketing role read its own campaign numbers without reaching the activity
telemetry.

## Organisation endpoints

| Route | Auth | Purpose |
| --- | --- | --- |
| `GET /api/admin/me` | Admin token | Who the caller is, their role, and their organisation's state |
| `GET/PUT /api/admin/users`, `DELETE /api/admin/users/:email` | Admin token, users capability | Manage users and roles |
| `GET /api/admin/users/search` | Admin token, templates or users capability | Directory lookup, for pickers such as download and test email |
| `GET/PUT /api/admin/settings` | Admin token, settings capability | The organisation-wide switches: publish approval and digest frequency |
| `GET /api/admin/settings/digest/preview` | Admin token, settings capability | The [health digest](/monitoring/health-digest/) as it would be sent now. Sends nothing |
| `POST /api/admin/settings/digest/send` | Admin token, settings capability | Mail the digest to the calling admin alone |
| `GET /api/admin/onboarding` | Admin token, Admin role | Getting started checklist state |
| `POST /api/admin/onboarding/dismiss` | Admin token, Admin role | Dismiss the checklist |
| `POST /api/admin/dpa/accept` | Admin token, Admin role | Record acceptance of the data processing agreement |
| `GET /api/admin/billing` | Admin token, billing capability | Subscription status, seats, card, invoice |
| `POST /api/admin/billing/checkout` | Admin token, billing capability | A hosted Stripe card-capture URL |
| `POST /api/admin/billing/portal` | Admin token, billing capability | A hosted Stripe management URL |
| `POST /api/admin/billing/cancel`, `…/reactivate` | Admin token, billing capability | Cancel the subscription, or resume a cancelled one |
| `PUT /api/admin/billing/profile` | Admin token, billing capability | Save the billing profile |
| `GET /api/admin/exclusions` | Admin token, cost management capability | The individually excluded mailboxes, each annotated with whether it still resolves in the directory and whether it was billable, the excluded groups, and the totals across both |
| `POST /api/admin/exclusions` | Admin token, cost management capability | Exclude one mailbox or many, with an optional note |
| `DELETE /api/admin/exclusions/:email` | Admin token, cost management capability | Put one back |
| `GET /api/admin/exclusions/suggested` | Admin token, cost management capability | Billable mailboxes that have never applied a signature, and what excluding them would save |
| `POST /api/admin/exclusions/groups` | Admin token, cost management capability | Exclude an Entra group's members. The group is confirmed against the directory, and its membership resolved, before the call returns |
| `DELETE /api/admin/exclusions/groups/:id` | Admin token, cost management capability | Stop excluding a group, and report which addresses that released |
| `POST /api/admin/exclusions/groups/:id/sync` | Admin token, cost management capability | Refresh one group's membership now, rather than waiting for the nightly refresh |
| `GET /api/admin/groups/search` | Admin token, cost management capability | Group name search for the picker, from two characters |
| `GET /api/admin/api-keys` | Admin token, Admin role | Every API key for the organisation, revoked ones included |
| `POST /api/admin/api-keys` | Admin token, Admin role | Mint one. The secret is in this response and in nothing else, ever |
| `DELETE /api/admin/api-keys/:id` | Admin token, Admin role | Revoke one. The row survives so the change log stays resolvable |

The three key routes are the ones an API key can never call, whatever it holds,
so a leaked key cannot mint a replacement or revoke the key an administrator is
about to use to stop it. A key may not be granted capabilities its creator does
not hold, and an expiry in the past is refused rather than quietly accepted. See
[API keys](/admin/api-keys/).

Neither digest route stamps the digest schedule, so previewing or test-sending
cannot delay the real one. The send route answers 503 where mail sending is
unavailable, and 502 with the underlying reason if the send itself fails. That
failure is surfaced rather than swallowed, since finding out whether the send
works is the entire point of the route.

Most of these guards name a capability rather than a role, so the Billing role
reaches the subscription and the user list alongside an Admin. The three that
name the Admin role are genuinely Admin-only, and the settings capability is
held by the Admin role alone, so in practice that route is too. See
[roles and capabilities](/reference/roles-and-capabilities/).

A partner's own administrator cannot accept a managed client's DPA on their
behalf. That request is refused, because the client is the data controller. See
[compliance](/security/compliance/).

## Partner endpoints

Present only for partner staff, and scoped to the partner rather than to a
tenant. They live under `/api/admin/partner`.

| Route | Purpose |
| --- | --- |
| `GET /clients` | The managed client list |
| `POST /clients/:tenantId/release` | Release a client back to direct billing |
| `GET /invites` | Outstanding client invitations |
| `POST /invites` | Issue one, returning the consent link and optionally mailing it |
| `DELETE /invites/:token` | Revoke a pending invitation |
| `GET /transfers` | Outstanding requests to take over an existing tenant |
| `POST /transfers` | Ask to take one over, by domain or Entra tenant id |
| `GET /billing`, `POST /billing/checkout`, `POST /billing/portal`, `POST /billing/sync` | The consolidated subscription |
| `PUT /billing/profile` | Save the partner's own invoice details |
| `GET /usage`, `GET /usage/export` | Per-client seat counts, and the CSV for rebilling |
| `GET/PUT /staff`, `DELETE /staff/:email` | Partner staff and their roles |
| `GET /events` | The partner-level audit trail |
| `POST /agreement/accept` | Record acceptance of the partner agreement |

Inviting a client, requesting a transfer and releasing a client are all refused
until the partner agreement has been accepted, so a partner cannot take a client
on before agreeing the terms they are taking them on under.

Working inside a client uses the ordinary tenant endpoints above, with the
client's context established by the partner relationship. See
[the partner programme](/partners/overview/).

The client's own half of that relationship lives under `/api/admin/managed` and
is reachable by an Admin of the managed tenant, not by their partner.

| Route | Purpose |
| --- | --- |
| `GET /status` | Who manages this organisation, and any pending request to |
| `POST /transfer/:id/approve`, `…/decline` | Answer a request to take the organisation over |
| `POST /partner/revoke` | End the partner relationship |

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
| `GET /vcf/:token.vcf` | The sender's [contact card](/signatures/contact-card/), as a downloadable vCard |

The contact card route carries no mailbox in its URL. The token is signed, and
one is only ever minted while rendering that mailbox's own signature, so the
route cannot be walked to enumerate a directory. A malformed token and a forged
one both return 404, so probing it reveals nothing about which of the two it hit.
It stops answering for a suspended or removed organisation.

`POST /api/billing/stripe-webhook` is authenticated by a Stripe signature rather
than by a token, and mirrors subscription state locally.

## Status codes worth knowing

| Code | Meaning on the signature path |
| --- | --- |
| 200 | A signature was rendered and returned |
| 401 | The token failed verification |
| 402 | Billing is not active. The add-in applies nothing |
| 403 | The organisation is not connected, or this mailbox has been [excluded](/admin/cost-management/). The add-in applies nothing |
| 404 | The mailbox did not resolve in the directory |

A 402 across an entire organisation is almost always a lapsed trial or a past-due
subscription. See [troubleshooting](/deploy/troubleshooting/).

The two causes of a 403 are distinguishable from the server's own records but not
by the add-in, which treats both as a reason to apply nothing. An excluded
mailbox therefore reports the same way in the pane as an unconnected
organisation.
