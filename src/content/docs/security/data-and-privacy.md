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

Those attributes are read when a signature is rendered and are never written down
as a record of their own. What holds them afterwards is the rendered signature
itself, cached for at most an hour, so an hour after somebody last composed a
message there is nothing of their directory record left inside Sigil. That is
also what lets a corrected job title reach Outlook with nobody republishing
anything.

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

Against that record Sigil also keeps a short-lived description of what the
sign-up request itself looked like: the browser's user agent string, the network
and the country it arrived from, an automated-traffic score, and which of those
signals decided the request came from a crawler rather than from a person. Where
you were already signed in to the portal when you started, it keeps the address
the portal passed to Microsoft so you would not be asked to choose an account
again. That address is what gives support somebody to contact when a sign-up
fails before it has named an organisation, and nothing is authorised on the
strength of it.

No IP address is recorded at any point. These details exist to tell a real
administrator apart from the mail security scanners and crawlers that follow a
public sign-up link, and to diagnose a sign-up that did not finish, so they are
deleted after 90 days while the attempt, its outcome and its timeline are kept
for good. They cover Sigil's own sign-up flow and nothing else. Nothing of the
kind is recorded about the people in your organisation.

Where an invitation link was used, Sigil also counts how many times its landing
page was rendered and when it was first and last opened. That is timestamps and a
count. No address, no IP and no user agent is stored against it, and there is no
cookie or pixel, so it records that a link was opened rather than who opened it.

A record of anyone who signed in to the portal from an organisation that has not
connected to Sigil. Signing in and granting admin consent are separate acts, and
somebody who signs in, meets the "connect your organisation" gate and closes the
tab has done only the first. Sigil keeps their address, the domain half of it,
when they were first and last seen, and how many times, so that a person who
tried to get started and stopped can be offered help rather than forgotten. The
address comes from their verified token rather than from anything in the URL. No
IP address and no user agent is stored, and a sighting is recorded at most once
an hour per person, so a portal left open all day counts once. These records are
read by Tophhie Cloud operators and are not shown in your portal. They are
deleted 90 days after the last sighting, and they are deleted with the
organisation if it later connects and is then deprovisioned.

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
subject access request usually starts from. Request it through support, which
runs it against one address in your organisation.

The file carries seven kinds of record:

That mailbox's signature events and its activity rollup: every request made for
it, when, from which Outlook client, and whether a signature came back.

Whatever the person entered in their
[profile fields](/admin/profile-fields/), which is the only part of the file they
wrote themselves.

Their portal role, if they have one, with when it was granted and by whom.

Whether their mailbox is [excluded from Sigil](/admin/cost-management/), together
with the note an administrator wrote against it, since that note is prose written
about them.

Each excluded Entra group that covers them, one entry per group. This is the only
part of the file that can legitimately hold several rows for one address.

Where the person is a partner's own staff scoped to your organisation rather than
one of your mailboxes, the record of that scoping.

Any record of them signing in before your organisation connected, described
above. That one is worth expecting, because it predates your tenant and is the
record its subject is least likely to know exists.

The file deliberately leaves out the authorship stamps that sit on templates,
banners, links, rules, settings and the change log. Those say that an
administrator did something, rather than holding anything about the person as a
subject, and sweeping them in would turn a subject access request into a second
copy of your whole audit trail. Your billing contact address is left out for the
opposite reason: there is one per organisation and it describes the company, so
returning it would disclose your organisation's details rather than that person's.

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

The purge runs in phases and keeps track of how far it reached. Billing stops
first, then stored images and cached entries go, then the records themselves, and
a phase that fails takes up again from where it stopped rather than starting the
whole thing over. That ordering is deliberate: a purge that halted after
cancelling a subscription leaves nobody being charged, whereas one that deleted
the records first would leave a live subscription that nothing could be traced
back to.

Where a deprovision is scheduled rather than immediate, the purge checks that the
deletion is still scheduled before it destroys anything. An organisation restored
during its grace window is safe even if a purge had already been queued for it.

Withdrawing admin consent stops Sigil reading your directory, which stops
signatures rendering, but leaves your stored configuration in place. If you want
the data gone rather than dormant, ask for a deprovision.

## Data processing agreement

A data processing agreement is published at `portal.usesigil.app/dpa`, and
acceptance can be recorded against your organisation. See
[compliance](/security/compliance/).
