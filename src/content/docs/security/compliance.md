---
title: Compliance and governance
description: Audit trails, subject access requests, the data processing agreement, and how vendor operator access is controlled.
sidebar:
  order: 3
---

## Audit trails

Sigil keeps two separate append-only records.

The [change log](/monitoring/change-log/) covers what administrators in your
organisation did: publishes, rollbacks, creates, renames, duplicates, deletes,
restores, permanent deletions, role assignments and image uploads, each with who
and when. You can read it in the portal.

The operator audit log covers what Tophhie Cloud staff did. It is retained
indefinitely and can be exported.

Neither is pruned and neither can be edited.

## Subject access requests

Sigil can export everything held about a single mailbox, which is what a subject
access request under GDPR or similar regimes needs. Request it through support.

Erasure of an individual mailbox is deliberately not offered. Removing one
person's entries from an append-only audit trail would undermine the trail, so the
available erasure path is a full tenant purge.

## Data processing agreement

The DPA is published at `portal.usesigil.app/dpa`. Acceptance can be recorded
against your organisation, with the accepted version tracked, so there is a record
of what was agreed and when rather than an assertion that something was.

## Published legal documents

| Document | Where |
| --- | --- |
| Privacy policy | `portal.usesigil.app/privacy` |
| Terms of use | `portal.usesigil.app/terms` |
| Data processing agreement | `portal.usesigil.app/dpa` |
| Support | `portal.usesigil.app/support` |
| Partner agreement | `portal.usesigil.app/partner-agreement` |

## Vendor operator access

Tophhie Cloud staff can reach customer tenants for support, and that access is
constrained rather than assumed.

Access is an explicit list rather than something implied by working at Tophhie
Cloud, with two tiers. Support staff get a read-only console plus support tooling:
tenant overview, exceptions, health, preview, audit, notes, read-only
impersonation, messaging a tenant's administrators, resending consent, and export.
Operators additionally get mutations such as suspending, reprovisioning and
deprovisioning.

Read-only impersonation is a session that expires on the server after 30 minutes,
so a replayed request stops working once the window elapses rather than relying on
the interface to stop offering it.

Destructive actions require a fresh interactive re-authentication in the moment.

The operator list cannot lock itself out: the last operator cannot be removed or
demoted.

Every operator action is written to the audit log.

## Proactive monitoring

A daily scan reconciles every tenant against Graph and billing and reports
anything needing attention: directory access that has lapsed, past-due billing,
trials ending within seven days, unfinished provisioning, and seat drift.

Lapsed directory access is the one worth knowing about as a customer, because it
breaks signatures quietly. The template is still there; there is simply no data to
personalise it with. The scan catches it, and Tophhie Cloud can email your
administrators a re-consent link.

## Retention

| Data | Retention |
| --- | --- |
| Template version history | Last 10 published bodies per template |
| Deleted templates | 30 days in Recently deleted, then purged by a daily sweep |
| Change log | Indefinite |
| Operator audit log | Indefinite |
| Signature telemetry | Indefinite |
| Link click counts | Indefinite |

Deprovisioning a tenant purges all of it.

## What Sigil is not

Sigil does not sit in your mail flow. It writes into the compose window, so it
never sees, stores or processes the content of the messages people send.

That is a meaningful distinction for a compliance review, and it is a different
architecture from server-side signature products that rewrite mail in transit.
