---
title: Data and privacy
description: What Sigil reads, what it stores, what it never stores, and how link analytics stay aggregate.
sidebar:
  order: 2
---

## What Sigil reads

Directory attributes from Microsoft Graph, read-only, for the organisation whose
token made the request. These are the attributes that can appear in a signature,
plus licence and account state for seat counting. The full list is in
[permissions](/deploy/permissions/).

Recipient content is never read. Sigil writes into the compose window and does
not sit in your mail flow, so it has no access to message bodies, subjects or
recipients of the mail people send.

## What Sigil stores

Templates, design documents and their version history.

Uploaded images.

Configuration: assignment rules, banners, footers, roles and users.

The addresses of any mailboxes excluded from Sigil, with the note an
administrator wrote against each and who excluded it. Where a whole Entra group
is excluded, that means the group's identity and the addresses of its members,
which Sigil holds rather than resolves on demand so that a bill never depends on
a directory call succeeding. See [cost management](/admin/cost-management/).

Telemetry metadata about signature requests and apply outcomes.

Tracked link definitions, their click counts, and 90 days of per-click records
holding no identifier of any kind.

Billing state, mirrored from Stripe, and your billing profile.

A record of each attempt to connect an organisation to Sigil. It holds the
attempt reference, the route the signup came through, your organisation name and
primary domain as Entra reported them, your Entra tenant id, any error code
Microsoft or Stripe returned, how long each provisioning step took, the
identifier of the underlying request, and, where the signup began from an
invitation, which invitation it was. It holds no credentials and no directory
contents. This log lives outside your tenant's own data and is read by Tophhie
Cloud operators rather than shown in your portal.

Where an invitation link was used, Sigil also counts how many times its landing
page was rendered and when it was first and last opened. That is timestamps and a
count. No address, no IP and no user agent is stored against it, and there is no
cookie or pixel, so it records that a link was opened rather than who opened it.

Any [API keys](/admin/api-keys/) your administrators have created, held as a
hash of the secret rather than as the secret, alongside each key's name, access,
who created it and when it was last used.

Where your organisation uses [profile fields](/admin/profile-fields/), the field
definitions and the values your colleagues entered against them, one record per
mailbox, with when it was last saved and by whom.

That last one is worth naming separately, because it is the only thing Sigil
stores that a member of staff typed about themselves rather than an
administrator configured or the directory supplied. It holds whatever your
organisation chose to ask for, so its contents are your organisation's decision
rather than Sigil's. Nothing in it is read from or written back to Entra, and it
is purged with everything else on deprovision.

## What Sigil does not store

No tokens. No rendered signature HTML in the telemetry. No message content.

No passwords, because there are none. People authenticate entirely through
Entra. The only credential Sigil issues is an API key for a script, and the
secret behind one is stored as a SHA-256 hash, so it cannot be recovered from
the database by anybody, Tophhie Cloud included.

## Telemetry

The [Activity view](/monitoring/activity/) is built from two kinds of record: a
request log written when a signature is served, and an outcome reported by the
add-in after each attempt to apply one.

Both hold metadata only: which mailbox, which template version, which compose
type, whether it came from cache, the response status, the client platform, and
the reason on failure.

Telemetry writes are best-effort and off the critical path, so a storage problem
loses a record rather than breaking somebody's signature. Nothing is pruned, and
the history is retained indefinitely.

## Link analytics are aggregate by construction

A [tracked link](/monitoring/link-clicks/) click stores the link, the time, and
three coarse descriptors derived from the request as it arrives: a device class
of desktop, mobile or tablet, a browser family such as Chrome or Safari with no
version number, and the host name of the referring page where one is sent.

The underlying user agent string and the full referring URL are discarded at
that moment and never stored. No IP address is recorded at any point, and there
is no cookie or tracking pixel.

Those three descriptors are reported only in aggregate, and each is deliberately
low cardinality. "Mobile, Safari, referred by outlook.office.com" describes a
population; a full user agent next to a precise timestamp would describe a
person, which is why the second is never written down.

Links containing a placeholder are never rewritten. That covers Teams deep links
built from somebody's address and any personal link held in a directory
attribute, so a per-person link never becomes a per-person record.

Per-click records are deleted after 90 days. Daily click totals per link are
kept indefinitely, so the counts survive while the detail behind them does not.

The result is that Sigil can tell you a link was clicked 84 times and cannot tell
you by whom. That is a property of what is stored rather than a policy about who
may look.

## The contact card endpoint

Where a template offers a [contact card link](/signatures/contact-card/), that
link is public, because a recipient clicking it holds no credentials.

The mailbox is not in the URL. It is carried in a signed token, and a token is
only minted while rendering that mailbox's own signature, so the endpoint cannot
be walked to enumerate a directory. A card discloses exactly the attributes the
signature itself prints, to somebody who already has the signature.

Nothing about a fetch is logged as an event. Sigil does not record who downloaded
a card, or that one was downloaded at all, and the endpoint stops answering
entirely for a suspended or removed organisation.

## Where data lives

Sigil runs on Cloudflare's edge network. Templates and configuration are in D1,
images in R2, and rendered signatures in a KV cache. Billing is handled by Stripe.
See [infrastructure](/security/infrastructure/).

## Tenant isolation

Every record carries a tenant id, storage keys are prefixed by tenant, and cache
keys are tenant-salted. A query cannot reach another organisation's data, and the
signature endpoint refuses a tenant it does not recognise.

## Getting your data out

Two exports exist, and they answer different questions.

A whole-organisation export is a single JSON file holding your organisation record
and subscription, your portal users, every template with its body and design
document, templates still in Recently deleted, the role pointers, assignment
rules, banners, footers, your [profile fields](/admin/profile-fields/) with the
values people entered in them, the change log and your images. Ask support for
it. It is the artifact for a due diligence request or for leaving, and it is
worth taking before a deprovision rather than after.

That list is what the file contains rather than a summary of it. A few smaller
records are not in it: your organisation-wide [settings](/admin/settings/), any
booked [scheduled publish](/signatures/scheduled-publishing/), the mailboxes and
groups you have [excluded](/admin/cost-management/), and your
[API keys](/admin/api-keys/). Each of those is readable
in the portal, and each is purged on deprovision along with everything else. Ask
support if you need them in an export for a compliance exercise.

The file carries a schema version, which is what tells two exports apart when the
contents differ. Version 3 is the current one, and it is where the profile fields
and their values arrived.

It also carries the support notes Tophhie Cloud staff have written against your
organisation. Those notes are written in the operator console rather than in your
portal, so you never see them day to day, but they are records about you and the
export does not hold them back.

The change log is capped at its most recent 5,000 entries, so an organisation
with years of history gets a recent window rather than the lot. Everything else
is complete.

## Subject access requests

Sigil can also export what is held against a single mailbox, which is what a
subject access request usually starts from. It carries that mailbox's signature
events and its activity rollup: every request made for it, when, from which
Outlook client, and whether a signature came back. Request it through support.

What that file does not carry is anything the person entered in their
[profile fields](/admin/profile-fields/), which lives in the whole-organisation
export instead. If a request needs both, say so when you ask, because two
different exports answer it.

Erasure of a single mailbox is deliberately not offered. Removing one person's
records from an append-only audit trail would compromise the trail itself, so the
available path is a full tenant purge. See [compliance](/security/compliance/).

## Deleting your data

Deprovisioning a tenant cancels billing and purges every record, asset and cached
entry belonging to it, including the support notes staff have written about it.
It is destructive and irreversible.

Two things deliberately outlive it. The record of your original attempt to
connect, described under what Sigil stores, is kept, because it describes an
onboarding rather than a live organisation, and many of its entries belong to
attempts that never became tenants at all. If you were a partner's client, the
partner's own event history keeps its record of your account being linked and
released, because that history belongs to them.

Those two are the whole list, and it is enforced rather than promised. Every
place Sigil stores something against an organisation is either purged or named as
a deliberate exception, and an automated check refuses any new storage that is
neither. A list of what to delete that nothing verifies is a list that quietly
falls behind, which is what makes the check worth more than the intention.

Withdrawing admin consent stops Sigil reading your directory, which stops
signatures rendering, but leaves your stored configuration in place. If you want
the data gone rather than dormant, ask for a deprovision.

## Data processing agreement

A data processing agreement is published at `portal.usesigil.app/dpa`, and
acceptance can be recorded against your organisation. See
[compliance](/security/compliance/).
