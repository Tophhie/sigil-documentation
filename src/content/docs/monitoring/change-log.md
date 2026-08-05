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

The log is not limited to templates. Everything an administrator can change from
the portal is recorded.

| Action | Recorded |
| --- | --- |
| Publishing a template | Yes |
| Restoring a version | Yes |
| Saving or discarding a draft | Yes |
| Creating a template | Yes |
| Renaming a template | Yes |
| Duplicating a template | Yes |
| Deleting a template | Yes |
| Restoring from Recently deleted | Yes |
| Permanently deleting a template | Yes |
| Assigning a template to a role | Yes |
| Changing assignment rules | Yes |
| Creating, editing or removing a banner | Yes |
| Creating, editing or removing a footer | Yes |
| Turning link tracking on or off | Yes |
| Uploading an image | Yes |
| Deleting an image | Yes |
| Sending a test email | Yes |
| Changing who has access, and at what role | Yes |
| Every stage of a staged rollout | Yes |
| Submitting a draft for review, and approving or rejecting it | Yes |
| Booking, cancelling or firing a scheduled publish | Yes |
| Excluding a mailbox from Sigil, or putting one back | Yes |
| Changing an organisation-wide setting | Yes |

Each entry carries who performed the action and when.

## Exclusion entries

Excluding a mailbox stops its signature and takes it off the bill, so both
directions are recorded. See [cost management](/admin/cost-management/).

That is the point of logging them at all. This is the only thing outside template
editing that changes what a colleague's outgoing mail looks like, so "who
switched off my signature" has to be answerable.

The entry stores the addresses involved, the note that was written, and whether a
managed service provider made the change. As with rollout reasons and approval
details, the portal lists the action and the actor, so those are read from the API
or a [tenant export](/security/data-and-privacy/).

## How much you can see at once

The portal shows the most recent 100 entries, paged. That is a display limit
rather than a retention one: nothing is pruned, and a
[tenant export](/security/data-and-privacy/) carries the most recent 5,000.

For a busy tenant that means the portal answers what changed lately, and the
export is where you go for anything older.

## Staged rollout entries

A [staged rollout](/signatures/staged-rollouts/) writes an entry for each
transition: starting it, each step up, and how it ended.

The actor tells you who decided. A rollout that an administrator promoted or
abandoned carries their address; one the 15 minute evaluation decided for itself
is recorded against the system. That distinction is usually the first thing you
want to know about a rollout that ended overnight.

Automatic decisions also store the reason that triggered them. The portal lists
the action and the actor rather than the reason, so the full detail is read from
the API or a [tenant export](/security/data-and-privacy/). While a rollout is
still running, the panel in the template editor is the better place to look: it
shows both versions' failure rates and when the next check falls.

## Approval entries

Where [publish approval](/signatures/approvals/) is in use, submitting a draft
and sending one back are each recorded, with the rejection note.

A publish that came from a submitted draft additionally records who submitted it,
who approved it, and whether those were the same person. Sigil permits an admin
to approve their own work, so that last flag is what makes the control auditable
rather than nominal.

As with rollout reasons, the portal lists the action and the actor. The submitter,
approver and the note are read from the API or a tenant export.

## Scheduled publish entries

A [scheduled publish](/signatures/scheduled-publishing/) writes an entry when it
is booked, when it is cancelled, and when it fires.

The entry for a schedule firing names the person who booked it rather than the
system. Somebody decided the publish would happen, and recording it against the
system would make it look as though it came from nowhere.

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

Admins, Editors, Viewers and the Compliance role, which all hold monitoring. The
Marketing and Billing roles do not reach it.
