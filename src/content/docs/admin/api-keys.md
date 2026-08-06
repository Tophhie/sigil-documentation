---
title: API keys
description: Credentials for scripts rather than people, so a runbook or a reporting job can reach Sigil without anybody signing in.
sidebar:
  order: 6
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
| Expires | Optional, and must be a date in the future. A key with no expiry date works until it is revoked |
| Access | The areas the key may reach, from the same list of capabilities a role is built from. At least one is required |
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

An administrator's browser token goes on that same header, and Sigil tells the
two apart by the `sigil_` prefix, so there is no second header for a client to be
taught about. See the [API reference](/reference/api/).

`GET /api/admin/me` is the call to make first. It reports which organisation the
key belongs to and what it holds, which makes it the smoke test that proves a key
works before anything depends on it.

A key acts on the organisation it was created in, and only that one. The headers
a partner uses to work inside a managed client are ignored under key
authentication, so a key cannot be pointed at a different tenant after the fact.

## What a key may reach is a named list

Sigil holds one list of the operations a key may call. Anything that is not on it
is refused before the route runs, whatever the key holds.

The alternative would be to let a key reach everything except a few blocked
areas, and the reason against it is what happens to the endpoint somebody adds
next year. Blocking areas would make that endpoint reachable by every key already
issued, because nobody thought to block it. A named list makes it reachable by
none until somebody decides otherwise, and Sigil's build fails on any endpoint
that has not been decided either way.

A call to something not on the list answers 404 rather than 403. The endpoint
genuinely does not exist for keys, and a 403 would confirm to a leaked key which
routes are real.

The list narrows and never widens. A request that gets through it still faces the
same access check a person's request faces, so nothing here can grant a key
something the endpoint itself would refuse.

## What is left out, and why

The exclusions have a shape rather than being a list of one-offs. A key is
refused anything that acts on the world outside Sigil, anything that overrides a
control your organisation put in place, and anything that reads a named
individual's directory record on demand.

| Refused | Why |
| --- | --- |
| Sending mail: [test email](/admin/test-email/), and sending or previewing the [health digest](/monitoring/health-digest/) | Test email delivers to whatever address the request names. A credential holding it is an outbound mailer that runs unattended |
| Moving money: checkout, the billing portal, cancelling, reactivating, the billing profile | Reading seat counts into a dashboard is a real request. Cancelling a subscription from a cron job is not |
| Granting access: inviting a colleague, changing a role, removing someone | Issuing a credential is an access-management act, which is why only an Admin can do it. Granting portal roles is the same act |
| Overriding a control: changing organisation settings, the approval queue, submitting or rejecting a draft | Settings can switch [publish approval](/signatures/approvals/) off. Approval is a second pair of eyes, and a script signing off on a colleague's work is the thing it exists to prevent |
| Reading one named person: preview against a real address, the per-mailbox download, [rule simulation](/targeting/assignment-rules/), the directory picker, and what colleagues entered in their [profile fields](/admin/profile-fields/) | Each answers "tell me about this mailbox" for an address the caller supplies. A tenant-wide credential that can do that a mailbox at a time is a way to read your directory |
| Managing keys | A leaked key must not be able to mint a replacement, or revoke the key you are about to use to stop it |
| Your relationship with an IT provider: accepting or declining a transfer, ending the arrangement | Deciding who processes your data is an administrator's act |
| The data processing agreement, and the getting started checklist | Both need the Admin role, which a key never holds |
| Partner endpoints, and the Tophhie Cloud operator console | Neither acts on a single tenant |

The last line about reading one named person is narrower than "reads the
directory", deliberately. [Activity](/monitoring/activity/) and
[attribute coverage](/monitoring/attribute-coverage/) do carry mailbox
addresses, and pulling those on a schedule is much of what the feature is for.
What a key cannot do is ask about an address it chose.

Profile fields split along the same line, and the split is worth knowing if you
automate anything. Defining which fields exist is reachable, because standing a
new client up with the same six fields every time is exactly the configuration
work a key is for. Reading or writing what a named colleague typed into one is
not, and if anything that is more personal than a directory attribute rather than
less, since the person entered it themselves.

Every one of these is something a person in the portal can still do. Nothing
here reduces what your administrators can reach.

Two consequences are worth planning around. A key can save a draft but cannot
submit it for review, so a draft a script writes waits for somebody to pick it
up. And where publish approval is switched on, publishing needs the Admin role,
so a key cannot publish a signature at all while it is on, however its access is
set.

A suspended organisation, or one inside its deletion grace window, refuses its
keys exactly as it refuses its people.

## Reading the list yourself

The portal shows the whole list on an API reference tab beside your keys, which
is the authoritative version: it is generated from the same list that enforces
it, so the documentation and the credential cannot drift apart.

Each operation is listed with its method, its address, what it does and the area
it needs. Pick one of your live keys and the page re-renders as that key sees
it, marking each operation reachable or not. That answers the question people
actually arrive with, which is never "what does the API offer" but "why is my
script getting a refusal".

The same page offers an OpenAPI 3.1 document to download, which imports into
Postman and generates a client. A key can fetch that document itself, so a build
job can regenerate its client without anybody signing in.

One thing the document cannot express is the read-only switch. OpenAPI describes
what an endpoint needs rather than what a particular credential was issued with,
so the document says in its description that a read-only key refuses every write
below rather than pretending to model it.

## Choosing what to grant

The areas are shaped like parts of the product rather than like verbs, so a
couple of them are broader than their name suggests.

Grant the narrowest set the job needs. A reporting pull wants monitoring,
analytics and cost management. A joiner and leaver runbook wants cost management
alone, and nothing else at all.

The template area is the largest one Sigil has, and it covers publishing. A key
holding it can put a new signature in front of everyone in your organisation
unless publish approval is on, so it belongs on a key that authors signatures
and not on one that reads numbers.

Leave read-only switched on where the job only reads. It is checked separately
from the areas, so a key can hold the template area and still be unable to change
a single template.

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
