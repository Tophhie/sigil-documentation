---
title: Change log
description: An append-only record of what administrators changed, who changed it, and when.
sidebar:
  order: 4
---

The change log is an append-only trail of administrative changes. It answers the
question that version history cannot: not what a template used to contain, but
who changed it and in what order.

## What is recorded

| Action | Recorded |
| --- | --- |
| Publishing a template | Yes |
| Restoring a version | Yes |
| Creating a template | Yes |
| Renaming a template | Yes |
| Duplicating a template | Yes |
| Deleting a template | Yes |
| Restoring from Recently deleted | Yes |
| Permanently deleting a template | Yes |
| Assigning a template to a role | Yes |
| Uploading an image | Yes |
| Every stage of a staged rollout | Yes |

Each entry carries who performed the action and when.

## Staged rollout entries

A [staged rollout](/signatures/staged-rollouts/) writes an entry for each
transition: who started it, what each 15 minute evaluation decided, and how it
ended.

Decisions taken automatically carry their reason, so a rollback records the
failure rates that caused it rather than only the fact that it happened. Reading
those entries in order tells you the whole story of a rollout after it is over.

## Append-only

Entries are never edited or removed. Nothing prunes the log, so it is kept
indefinitely.

That makes it usable as an audit trail rather than as a convenience feature. If
somebody needs to know when a disclaimer changed, or which administrator restored
a version, the log is authoritative.

## Reading it alongside version history

The two work together and answer different halves of a question.

[Version history](/signatures/versions/) tells you what a template's body used to
be, and lets you put it back.

The change log tells you the sequence of actions and who took them.

When something has gone wrong, the usual path is to read the log to find when the
change happened and who made it, then use version history to restore the body
from before that point.

## Related records

The [Activity view](/monitoring/activity/) records what users received rather
than what administrators did.

Operator actions taken by Tophhie Cloud staff, such as suspending a tenant or
correcting a seat count, are recorded in a separate operator audit log that is
retained indefinitely and exportable. See [compliance](/security/compliance/).

## Who can see it

Admins and Editors. The Marketing role does not reach it.
