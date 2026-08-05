---
title: API keys
description: Credentials for scripts rather than people, so a runbook or a reporting job can reach Sigil without anybody signing in.
sidebar:
  order: 5
---

Everything else in Sigil is done by a person holding an Entra token in a browser.
That is the right shape for authoring a signature and the wrong shape for work
that should happen while nobody is watching.

An API key is a credential belonging to your organisation rather than to a
person. It exists for three cases in particular.

A joiner and leaver runbook, so somebody who has left is
[excluded](/admin/cost-management/) by the same script that disables their
mailbox, rather than by an administrator remembering to open the portal.

A managed service provider automating work across many clients.

A reporting job that pulls adoption and click numbers into a dashboard on a
schedule.

## Creating one

API keys are in the portal, under the same group as billing and settings. Only
the Admin role reaches them.

That is deliberately the role rather than a capability. Minting a credential is
an access-management act rather than an area of the product, and the users
capability is also held by the Billing role, so gating it that way would let a
billing manager issue themselves a key that edits signatures.

| Field | Meaning |
| --- | --- |
| Name | Up to 80 characters, so you can recognise the key later. It is a label and never an identity |
| Expires | Optional. A key with no expiry date works until it is revoked |
| Access | The areas the key may reach, from the same list of capabilities a role is built from |
| Read-only | On by default. The key can read the areas you ticked and change nothing |

Read-only is a separate switch rather than one of the areas because capabilities
describe an area of the product rather than a verb. The commonest integration by
far wants every reporting area and no writes at all, and without a separate
switch it would have to be handed write access to data it will never write.

You can only grant a key access you hold yourself. The portal offers what you
hold, and the server refuses anything beyond it, so the two cannot disagree.

## The secret is shown once

Creating a key returns the secret once, in a panel on the page. Sigil stores a
hash of it and not the value, so nobody can produce it again, including Tophhie
Cloud.

If you lose it, revoke the key and create another. There is no regenerate
action, because an in-place rotation has a window in which two secrets are valid
and neither is clearly the current one.

A key looks like `sigil_` followed by a long random string. The prefix is not
decoration: it is what lets GitHub, GitLab and similar secret scanners recognise
one on sight if it is ever committed by accident.

The portal lists the first few characters of each key beside it, which is enough
to tell which key a script is using and never enough to use it.

## Using one

Present the key on the same header the portal uses:

```
Authorization: Bearer sigil_…
```

Every administrative endpoint accepts either a signed-in administrator's Entra
token or a key, and Sigil tells the two apart by the prefix. See the
[API reference](/reference/api/).

A key acts on the organisation it was created in, and only that one. The headers
a partner uses to work inside a managed client are ignored under key
authentication, so a key cannot be pointed at a different tenant after the fact.

## What a key cannot do

| Refused | Why |
| --- | --- |
| Anything that needs the Admin role | A key holds capabilities directly and no role at all |
| Managing API keys | A leaked key must not be able to mint a replacement, or revoke the key you are about to use to stop it |
| Fetching a mailbox's rendered signature | That path takes a per-mailbox add-in token. An organisation-wide credential that could fetch anybody's signature would be a way to walk your directory |
| Partner endpoints | They act on the provider rather than on a tenant |
| The Tophhie Cloud operator console | It is cross-tenant by definition, and no tenant credential should have a route to it |

The role restriction has one consequence worth planning around. Where
[publish approval](/signatures/approvals/) is switched on, publishing needs the
Admin role, so a key cannot publish a signature while it is on however its
access is set. It can still save a draft and submit it for review.

A suspended organisation, or one inside its deletion grace window, refuses its
keys exactly as it refuses its people.

## Rate limiting

A key is limited to 600 requests a minute. Beyond that Sigil answers 429 until
the rate falls back under the limit.

The limit is per key rather than per address, so a script running on a fleet of
build agents is still one client. It sits far above any plausible runbook or
reporting pull, and exists because the database is shared across every
organisation, which makes a retry loop somebody else's problem as well as yours.

## Revoking

Revoke stops the key immediately and cannot be undone. Anything using it starts
failing at once, which is the point.

The key stays on the list afterwards, marked as revoked. Deleting the row would
leave change log entries pointing at a credential nobody can name, which would
defeat the trail the key is meant to feed.

Last used is recorded to the nearest hour rather than to the second, so a key
used moments ago can still read as older than it is. Writing a timestamp on
every call would turn every read into a write for information nobody needs that
precisely.

## What is recorded

Creating and revoking a key are both written to the
[change log](/monitoring/change-log/).

So is everything a key then does. Entries made by a key are labelled `API key`
followed by its name, and the key's own identifier is stored alongside, so a
key named after a colleague cannot make its actions read as theirs.

## Keys and the people who created them

A key is not a delegation of the administrator who created it. It survives them
leaving, and their key keeps working after their account is removed from Sigil.
A runbook that breaks because somebody changed jobs is a worse outcome than a
credential that outlives them, but it does mean an offboarding checklist is
worth reviewing against this list.

The list shows who created each key and when, which is what makes that review
possible.

## Keys created by your IT provider

A managed service provider's Owners and Admins can create a key inside a client
they manage, because that automation is much of the reason the feature exists.

Any key they create is flagged on your list as created by your IT provider, and
you can revoke it yourself. See [the partner programme](/partners/overview/).

## What it will not do

There is no key that spans several organisations. A provider managing forty
clients manages forty keys. A provider-scoped credential is the obvious next
step and is not built.

There are no webhooks. Sigil does not call out to you when something changes, so
an integration that needs to know polls.

There is no OAuth client credentials flow, no IP allow-list per key, and no
supported PowerShell module. The API is plain JSON over HTTPS and is meant to be
scriptable with whatever your team already uses.
