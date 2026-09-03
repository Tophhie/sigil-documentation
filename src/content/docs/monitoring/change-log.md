---
title: Change log
description: An append-only record of what changed about your organisation, who changed it, and when, including anything Tophhie Cloud support did.
sidebar:
  order: 4
---

The change log is an append-only trail of administrative changes. It answers the
question that version history cannot: not what a template used to contain, but
who changed it and in what order.

## What is recorded

The log is not limited to templates. Everything an administrator can change from
the portal is recorded, and so is everything Tophhie Cloud support does to your
organisation.

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
| [Pausing or resuming delivery](/signatures/pausing-delivery/) | Yes |
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
| Excluding an Entra group, and every later change to who it covers | Yes |
| Creating or revoking an API key | Yes |
| Adding, changing, hiding or deleting a profile field | Yes |
| An administrator editing a colleague's profile values | Yes |
| A person editing their own profile values | No |
| Changing an organisation-wide setting | Yes |
| Anything Tophhie Cloud support did on your organisation | Yes |

Each entry carries who performed the action and when.

## Profile field entries

Defining which [profile fields](/admin/profile-fields/) exist is an
administrative act and is recorded, with the field's key and what changed about
it. Switching profile editing on or off is recorded as a settings change,
alongside the other organisation-wide switches.

An administrator editing somebody else's values is recorded as well. That entry
carries the mailbox and which fields changed, and never the values themselves,
because a change log is not a place to duplicate a colleague's personal details.
As with rollout reasons and approval details, the portal lists the action and the
actor, so the mailbox and the field list are read from the API.

A person editing their own values is deliberately not recorded here. This log is
an administrator's record of what changed about the organisation's signatures,
and a hundred colleagues updating their own mobile numbers would drown it. The
profile carries who last saved it and when, which is what the Profile fields page
shows.

## Entries made by an API key

An [API key](/admin/api-keys/) can do anything its access allows, so the log has
to say when one did.

Those entries are labelled `API key` followed by the key's name. The name is
chosen by whoever created the key, so it is treated as a label and never as an
identity: the key's own identifier is stored on the entry separately, which is
what stops a key named after a colleague reading as that colleague.

Creating and revoking a key are recorded too, against the administrator who did
it.

## Actions taken by Tophhie Cloud support

Anything a Tophhie Cloud operator does to your organisation is written to your
own change log. The actor reads "Sigil operator" and carries a "Sigil support"
badge, rather than naming the individual who did it.

The individual is still recorded. Their address is held on the entry and comes
out in a [tenant export](/security/data-and-privacy/), so an audit can attribute
the action to a person even though the portal does not put a supplier's staff
names in front of your administrators.

This answers a question your own records could not answer before. The data
processing agreement promises an append-only change log of administrative actions
visible to you in the portal, and promises that operator access is separated from
customer access with operator actions logged. The first half was always true. The
second was true only from Tophhie Cloud's side: operator actions were recorded
against Tophhie Cloud's own tenant, so a customer could not see that their portal
had been viewed, their data exported, or their seat count corrected.

The badge is what tells you it was support rather than one of your own people.
The action alone cannot, because accepting the
[data processing agreement](/security/compliance/#data-processing-agreement) in
the portal is recorded the same way with your own administrator as the actor. Two
things that look alike in a log need something other than the log's own wording
to separate them.

Entries read in plain language rather than as internal lever names:

| What you see | What happened |
| --- | --- |
| Viewed your portal (read-only support session) | An operator opened a read-only view of your tenant |
| Exported your organisation's data | A tenant export was taken |
| Exported one mailbox's data for a subject access request | A per-mailbox export was taken. See [subject access requests](/security/compliance/#subject-access-requests) |
| Set up your organisation | Your tenant was provisioned |
| Changed your organisation's settings | An organisation-wide setting was changed |
| Changed a user's role, or Removed a user | Portal access was changed |
| Refreshed your organisation name from Microsoft | The name shown in the portal was re-read from your directory |
| Re-linked your billing, or Updated your invoice details | A billing record was repaired or corrected |
| Corrected your billed seat count | A seat count was adjusted. See [billing](/admin/billing/) |
| Changed your discount, or Extended your trial | A commercial arrangement was changed |
| Cancelled your subscription, or Reactivated your subscription | Your subscription state was changed |
| Re-sent the Microsoft consent prompt | A re-consent link was sent to your administrators |
| Sent your admins a message | Support emailed your administrators |
| Recorded your data processing agreement | Acceptance was recorded on your behalf |
| Repaired a setup step | An unfinished onboarding step was completed |
| Scheduled your organisation for deletion, or Cancelled the scheduled deletion | A deprovision was booked or called off |

An action with no wording of its own falls back to its internal name. That is
worse to read than a label and much better than a hidden row, which is the trade
being made: an unfamiliar word still tells you Tophhie Cloud touched your
organisation and when.

These entries are also kept separately in Tophhie Cloud's own operator audit log,
and the two copies are not redundant. Your copy is yours and is deleted with your
data when your organisation is. The operator copy has to outlive that, because a
record of a deletion that is destroyed by the deletion it describes would
evidence nothing.

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

Exclusions that come from an Entra group are logged the same way, and read a
little differently. Membership tracks, so the set can change with nobody having
touched Sigil, and the nightly refresh that notices writes the entry itself. The
actor on those is the system rather than a person, and the group is named on the
entry. A refresh that changes nothing writes nothing, so the log stays quiet
until a membership actually moves.

## How the portal splits it

The log is read in the portal from two cards on the
[Activity view](/monitoring/activity/), and the split is by subject rather than
by importance.

Template changes carries the actions that alter what goes out on somebody's mail:
the whole template lifecycle, publishes and rollbacks, drafts, image uploads and
deletions, banners, footers, assignment rules, link tracking, approvals,
scheduled publishes and staged rollouts. Assignment rules and banners are in
because they decide which template a mailbox gets and what is injected into it.

Admin and support activity carries everything else. Role and user changes,
pausing and resuming delivery, mailbox and group exclusions, API keys, profile
field definitions, settings, test emails, and anything Tophhie Cloud support did
on your organisation. Sending a
test email is the clearest case of the line being drawn correctly: it is worth
recording, it belongs on this side, and it changes nothing about anyone's
signature.

The reason for two cards rather than one is that a heading promising template
changes should not answer with a role change. Both halves are on screen, which
was not always true: the second half was recorded from the beginning and shown
nowhere, so reading it once meant going to the API or a
[tenant export](/security/data-and-privacy/).

Every kind of entry is filed on one side or the other, so a new one cannot end up
unclassified and quietly stop appearing without anybody noticing.

## How much you can see at once

Each card shows the most recent 100 entries, paged. That is a display limit
rather than a retention one: nothing is pruned, and a
[tenant export](/security/data-and-privacy/) carries the most recent 5,000.

The two cards are filtered before that limit rather than after it, so a busy week
of role changes cannot push template changes off the other card. For a busy
tenant it means the portal answers what changed lately, and the export is where
you go for anything older.

Some detail is still recorded without being shown. Rollout reasons, approval
notes, the addresses on an exclusion and the fields an administrator changed on
somebody's profile are all stored and exported, and the cards list the action and
the actor. Those are read from the API or a tenant export.

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

Operator actions taken by Tophhie Cloud staff appear in this log, as described
above, and are additionally kept in an operator audit log that spans every
organisation. That one is retained indefinitely and exportable, and it is what
Tophhie Cloud reads rather than what you read. See
[compliance](/security/compliance/).

## Who can see it

Admins, Editors, Viewers and the Compliance role, which all hold monitoring. The
Marketing and Billing roles do not reach it.
