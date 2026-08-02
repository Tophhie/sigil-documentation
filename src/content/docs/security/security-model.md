---
title: Security model
description: How Sigil authenticates every request, why there are no shared secrets, and how tenants are isolated.
sidebar:
  order: 1
---

Sigil's security boundary is the Entra token, verified on every request. There is
no network gate in front of it and no shared secret behind it.

## Why there is no shared secret

The add-in's JavaScript is served from a public URL. Anything embedded in it
would be public too.

If the signature endpoint accepted a secret baked into that bundle, anyone who
viewed source could call it, and the `email` parameter would let them enumerate
every user's name, job title and mobile number.

So the endpoint requires a verified user token instead. That is the whole design:
the security comes from the token rather than from anything hidden.

## What is verified

Every call to the API carries an Entra access token, and the Worker checks it
before doing anything:

The home tenant claim, which both resolves the request to a tenant and selects
what the rest of the checks are made against.

The cryptographic signature, against the signing keys that tenant publishes.

The issuer, pinned to that tenant's own Entra v2 issuer. A token whose issuer and
tenant claim disagree is rejected, so naming a different tenant does not let a
token be verified against keys it was not signed with.

The audience, pinned to Sigil's application id. This one is fixed rather than
per-tenant: every token for this API, from any organisation, carries it.

The delegated scope. The add-in's token carries `access_as_user`, the portal's
carries `portal_admin`, and the presence of `portal_admin` is what distinguishes
an administrator token from an add-in token. An add-in token cannot reach an
admin endpoint.

## Authentication paths

Add-in users authenticate through MSAL nested app authentication, brokered by
Outlook, using the `/organizations` authority so each person's token is issued by
their own tenant.

Portal administrators authenticate through an MSAL single-page-app sign-in.

Neither involves a Sigil password. There is no credential for Sigil to store, and
nothing to breach.

## Authorisation

Authentication and authorisation are separate.

The token establishes who somebody is and which organisation they belong to.
Their role, stored per tenant inside Sigil, decides what they can do. Every
server route declares the capability it requires and checks it independently.

The portal hides navigation a role cannot reach, but that is presentation. The
server is the gate. See [users and roles](/admin/users-and-roles/).

## Directory access is read-only

Sigil requests three Microsoft Graph application permissions, all read-only:
`User.Read.All`, `Organization.Read.All` and `GroupMember.Read.All`.

No write permission is requested anywhere, so Sigil cannot modify your directory.
See [permissions](/deploy/permissions/) for what each one is used for.

## Why the signature endpoint accepts any mailbox in the tenant

The `email` parameter can name any mailbox in the calling tenant, not only the
caller's own. This is deliberate: it is what allows a signature to be rendered for
a shared mailbox or an alias when somebody switches sending account.

The attributes returned are already visible to every colleague in the address
book. What the token requirement adds is that they are not visible to anybody
outside the organisation.

A sending address is verified against the mailbox's own proxy addresses before it
is printed into a signature. An unrecognised address falls back to the primary
and cannot be injected.

## Tenant isolation

All tenant data shares one database with a tenant id on every row, and every
storage function takes the tenant id, so a query cannot forget to scope itself.

Object storage keys are prefixed by tenant. Cache keys are tenant-salted. Tracked
link slugs are derived from the tenant id and the destination, so two
organisations pointing at the same URL get distinct slugs and distinct counts.

The signature endpoint resolves the tenant from the token and refuses an unknown
or suspended one.

## Rendering safety

Directory values are HTML-escaped when they are substituted into a template, so a
value containing markup cannot break the signature or inject anything.

Any placeholder left unresolved is stripped, so a literal `{{jobTitle}}` can never
reach a recipient.

## The link domain

Tracked links are served from `e-clk.usesigil.app`, which answers `/r/` redirects
and returns 404 for every other path.

Recipients click those links, so the domain is the most widely exposed surface
Sigil has. Keeping the portal and API off it means the exposed surface is a
redirect and nothing else.

## Operator access

Tophhie Cloud's own support staff can view a tenant read-only through an
impersonation session that expires on the server after 30 minutes. Destructive
operator actions require a fresh interactive re-authentication in the moment, and
every operator action is written to an audit log retained indefinitely.

See [compliance](/security/compliance/).
