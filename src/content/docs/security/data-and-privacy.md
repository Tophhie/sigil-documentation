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

Telemetry metadata about signature requests and apply outcomes.

Tracked link definitions and their click counts.

Billing state, mirrored from Stripe, and your billing profile.

## What Sigil does not store

No tokens. No rendered signature HTML in the telemetry. No message content.

No passwords, because there are none. Authentication is entirely through Entra.

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

[Tracked links](/monitoring/link-clicks/) record counts only. No IP address and no
recipient identity is logged, and there is no cookie or tracking pixel.

Links containing a placeholder are never rewritten. That covers Teams deep links
built from somebody's address and any personal link held in a directory
attribute, so a per-person link never becomes a per-person record.

The result is that Sigil can tell you a link was clicked 84 times and cannot tell
you by whom. That is a property of what is stored rather than a policy about who
may look.

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

A whole-organisation export is a single JSON file holding everything Sigil stores
for you: your organisation record and subscription, your portal users, every
template with its body and design document, templates still in Recently deleted,
the role pointers, assignment rules, banners, footers, the change log and your
images. Ask support for it. It is the artifact for a due diligence request or for
leaving, and it is worth taking before a deprovision rather than after.

The change log is capped at its most recent 5,000 entries, so an organisation
with years of history gets a recent window rather than the lot. Everything else
is complete.

## Subject access requests

Sigil can also export everything held about a single mailbox, which is what a
subject access request needs. Request it through support.

Erasure of a single mailbox is deliberately not offered. Removing one person's
records from an append-only audit trail would compromise the trail itself, so the
available path is a full tenant purge. See [compliance](/security/compliance/).

## Deleting your data

Deprovisioning a tenant cancels billing and purges every record, asset and cached
entry belonging to it. It is destructive and irreversible.

Withdrawing admin consent stops Sigil reading your directory, which stops
signatures rendering, but leaves your stored configuration in place. If you want
the data gone rather than dormant, ask for a deprovision.

## Data processing agreement

A data processing agreement is published at `portal.usesigil.app/dpa`, and
acceptance can be recorded against your organisation. See
[compliance](/security/compliance/).
