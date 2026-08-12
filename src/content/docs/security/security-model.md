---
title: Security model
description: How Sigil authenticates every request, what the one credential it issues is, and how tenants are isolated.
sidebar:
  order: 1
---

Sigil's security boundary is the Entra token, verified on every request. There is
no network gate in front of it, and nothing anybody signs in with is a Sigil
credential.

The one credential Sigil issues is an [API key](/admin/api-keys/), which an
administrator creates deliberately for a script. It is described below, and no
part of the product depends on one existing.

## Why the add-in holds no secret

The add-in's JavaScript is served from a public URL. Anything embedded in it
would be public too.

If the signature endpoint accepted a secret baked into that bundle, anyone who
viewed source could call it, and the `email` parameter would let them enumerate
every user's name, job title and mobile number.

So the endpoint requires a verified user token instead. That is the whole design:
the security comes from the token rather than from anything hidden.

## What is verified

Every call to the API carries an Entra access token, and the server checks it
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

Neither involves a Sigil password. There is no password for Sigil to store, and
no sign-in of any kind that does not go through Entra.

## API keys

An [API key](/admin/api-keys/) is the exception to everything above, and is
scoped tightly enough to stay one.

It is created by an Admin, belongs to one organisation, and carries a set of
capabilities but no role.

What it may reach is an allow-list rather than a set of blocked areas. One list
names every operation a key can call, and a request outside it is refused before
the route runs. The reason for that direction is what happens to an endpoint
added later: under a list of blocked areas it would be reachable by every key
issued so far, because nobody thought to block it. A build check fails on any
endpoint that is on neither list, so adding one forces the decision.

The exclusions have a shape. A key is refused anything that acts outside Sigil,
meaning sending mail, moving money in Stripe or granting portal access; anything
that overrides a control the organisation set, such as switching publish approval
off or moving work through the approval queue; and anything that reads a named
individual's directory record on demand. That last one covers the portal's own
per-mailbox download and preview, rule simulation and the directory picker, each
of which answers "tell me about this mailbox" for an address the caller supplies.
Aggregate reporting that happens to carry mailbox addresses is not refused, since
that is most of what the credential exists for.

The add-in's signature endpoints are refused too, because those take a
per-mailbox token rather than an organisation-wide one, as are the key management
routes, the partner routes and the operator console.

The portal renders the list as a reference beside the keys, generated from the
list that enforces it, so what a key is documented to reach and what it can reach
are the same statement. Grant a key the narrowest set of areas its job needs, and
see [API keys](/admin/api-keys/).

The secret is returned once at creation and stored only as a SHA-256 hash, so a
copy of the database yields no working key. A fast hash is the right choice
here rather than the slow one a password would need: the value is 256 bits of
random data rather than something a person chose, so there is nothing to guess.

Revocation is immediate and the row survives it, which keeps the change log's
attribution resolvable. Expiry is optional and checked on every request. Each
key is rate limited to 600 requests a minute, because the database is shared
across organisations and a runaway script should not become everybody's problem.

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

[Profile fields](/admin/profile-fields/) are checked a second time, on the way
in. They are the only values a signature carries that a colleague typed rather
than an administrator configured or the directory supplied, and escaping alone
does not cover every case: a link target that is entirely one placeholder cannot
be checked at render time, because at that point the value is not yet known. So a
field declared as a web address accepts only ordinary `http` and `https` links,
and refuses anything else when it is saved. The same check applies when an
administrator edits somebody else's values, since it protects the recipient
rather than policing the author.

## Browser response headers

Sigil's responses carry a baseline set of browser security headers, and the set
covers the portal's own pages as well as the API. That distinction is the one
worth checking in any product of this shape: the pages an administrator actually
browses are served differently from the API they call, so a header applied to
only one of them protects the half nobody was attacking.

| Header | What it does |
| --- | --- |
| `Strict-Transport-Security` | Six months, including subdomains. A browser that has loaded `usesigil.app` once will not try plain HTTP for it again |
| `X-Content-Type-Options` | Stops a browser guessing a response is a different type from the one it was sent as |
| `X-Frame-Options` and a `frame-ancestors` policy | The portal cannot be framed by another site. Both are sent, because browsers do not all honour the same one |
| `Referrer-Policy` | A tracked link's destination sees that the click came from Sigil, never the full path of the redirector |

HSTS preloading is deliberately left off. Preloading needs a year-long maximum
age, and browsers honour a preload entry long after the header itself is
withdrawn, which makes it far harder to undo than to switch on.

Two headers are switched off on purpose rather than by omission, because their
usual settings break something people rely on. Isolating the browsing context
would sever the popup window that Entra re-authentication uses, which is the
check that gates destructive operator actions. Restricting cross-origin resource
loads would put the add-in's own call to the signature endpoint at risk, and that
call is cross-origin by design. Both choices are held in place by tests, so a
library upgrade that quietly reinstates a default fails a build rather than
somebody's Outlook.

The framing policy is what the content security policy currently governs. A
policy over script and style sources is a larger piece of work that needs the
portal, the sign-in flow and the drag-and-drop designer audited first, since a
wrong one fails silently in whichever browser nobody happens to be watching.

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
