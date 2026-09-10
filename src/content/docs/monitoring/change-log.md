---
title: Change log
description: An append-only record of what changed about your organisation, who changed it, and when, including anything Tophhie Cloud support did. Read in the portal's Audit log view.
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
| Re-pointing somebody's access after their address changed | Yes |
| Every stage of a staged rollout | Yes |
| Submitting a draft for review, and approving or rejecting it | Yes |
| Booking, cancelling or firing a scheduled publish | Yes |
| Excluding a mailbox from Sigil, or putting one back | Yes |
| Including a mailbox in Sigil, or taking it out | Yes |
| Listing an Entra group in cost management, and every later change to who it covers | Yes |
| Changing the cost management mode | Yes |
| Creating or revoking an API key | Yes |
| Adding, changing, hiding or deleting a profile field | Yes |
| An administrator editing a colleague's profile values | Yes |
| A person editing their own profile values | No |
| Changing an organisation-wide setting | Yes |
| Anything Tophhie Cloud support did on your organisation | Yes |

Each entry carries who performed the action and when.

## Who each entry names

Where Sigil knows a display name for the address that acted, the entry shows the
name with the address beneath it. Where it knows none, it shows the address
alone.

The names come from your own directory, from the name on each person's sign-in
token and from the directory lookup Sigil already makes when it renders a
signature. No new permission is involved, and nothing is asked of Microsoft that
was not asked before.

They are attached when the log is read rather than written onto the entry, so
the entry keeps the address it was written with. That has a consequence worth
knowing: somebody who has since been renamed shows their current name against an
old entry, with the address as it stood at the time still beside it. The record
is the address, and the name is a lookup presented honestly as one.

A name does not depend on the person still having access. Names outlive roles
deliberately, because a log that stopped naming somebody the moment they left
would become least readable exactly when it matters most.

## Profile field entries

Defining which [profile fields](/admin/profile-fields/) exist is an
administrative act and is recorded, with the field's key and what changed about
it. Switching profile editing on or off is recorded as a settings change,
alongside the other organisation-wide switches.

An administrator editing somebody else's values is recorded as well. That entry
carries the mailbox and which fields changed, and never the values themselves,
because a change log is not a place to duplicate a colleague's personal details.
The mailbox and the field list are on the entry's detail line.

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

The individual is still recorded, in Tophhie Cloud's own copy of the entry. Your
copy does not carry them. The substitution happens on the server, so the
operator's address is absent from the API response and from a
[tenant export](/security/data-and-privacy/) as well as from the screen. It used
to be done only in the portal, which meant the address was still readable by
anyone who fetched the log directly.

That is a deliberate narrowing rather than a hole in the record. Attributing the
act to a named person is what an audit needs, and Tophhie Cloud holds that
attribution permanently. What your administrators need is what was done to your
organisation, and an unfamiliar supplier address in your own change log reads as
an intruder rather than as support. Ask support if an investigation needs the
individual named.

This answers a question your own records could not answer before. The data
processing agreement promises an append-only change log of administrative actions
visible to you in the portal, and promises that operator access is separated from
customer access with operator actions logged. The first half was always true. The
second was true only from Tophhie Cloud's side: operator actions were recorded
against Tophhie Cloud's own tenant, so a customer could not see that their portal
had been viewed, their data exported, or their seat count corrected.

Each thing an operator can do is its own kind of entry, so the action tells you
what was done and not merely that something was. That was not always true. Every
operator action used to be filed under a single action with the verb buried in
the entry's stored fields, which is why the badge had to exist: your own
administrator accepting the
[data processing agreement](/security/compliance/#data-processing-agreement) in
the portal was recorded under that same action, so your consent and a supplier
deleting your tenant were indistinguishable by action alone. Acceptance is now
its own kind of entry, and the badge stays as the plain visual answer to whether
this was one of your people or one of ours.

Support entries also say what kind of act it was. One that changed nothing is
marked Read, and one that destroyed something is marked Destructive. That is the
distinction most worth seeing at a glance: a read-only support session and a
cancelled subscription are both support touching your organisation, and only one
of them needs a reply.

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
| Changed how your invoices are collected | Your subscription moved between card payment and invoicing, or back. See [invoices and credits](/admin/invoices-and-credits/) |
| Issued a credit to your account | A credit was applied against your invoices |
| Cancelled your subscription, or Reactivated your subscription | Your subscription state was changed |
| Re-sent the Microsoft consent prompt | A re-consent link was sent to your administrators |
| Sent your admins a message | Support emailed your administrators about your organisation |
| Sent your admins a platform announcement | Your administrators were included in a notice sent to every customer, such as a manifest update or a change of policy |
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

They also differ in what they carry. Your copy names every action taken on your
organisation, when it happened, and what it changed. Tophhie Cloud's copy holds
the same entries and sometimes an internal note beside a commercial one, the
kind of note written for our own records rather than about you. Nothing is held
back from your copy that would change what you can see was done.

## Cost management entries

Keeping a mailbox out of Sigil stops its signature and takes it off the bill, so
both directions are recorded. See [cost management](/admin/cost-management/).

That is the point of logging them at all. This is the only thing outside template
editing that changes what a colleague's outgoing mail looks like, so "who
switched off my signature" has to be answerable.

The entry stores the addresses involved, the note that was written, and whether a
managed service provider made the change, and the detail line shows them. Where
more than three mailboxes moved at once, the line names the first three and counts
the rest, and opening the entry lists them all.

The entries name what happened to the person rather than what happened to the
list, so an organisation in inclusion mode reads entries about mailboxes being
included, and one in exclusion mode reads entries about mailboxes being excluded.
Changing the mode itself is a separate entry, since it is the one change that
moves the bill without naming anybody.

Changes that come from an Entra group are logged the same way, and read a
little differently. Membership tracks, so the set can change with nobody having
touched Sigil, and the nightly refresh that notices writes the entry itself. The
actor on those is the system rather than a person, and the group is named on the
entry. A refresh that changes nothing writes nothing, so the log stays quiet
until a membership actually moves.

## Where to read it in the portal

The change log has a view of its own, under Monitoring, called Audit log.

It used to be two cards at the foot of the
[Activity view](/monitoring/activity/). That view asks whether the add-in is
reaching people, which is a different question from who changed what, and the
change log had outgrown the space at the bottom of somebody else's page.

Three filters narrow it, and they combine.

By half. Template changes carries the actions that alter what goes out on
somebody's mail: the whole template lifecycle, publishes and rollbacks, drafts,
image uploads and deletions, banners, footers, assignment rules, link tracking,
approvals, scheduled publishes and staged rollouts. Assignment rules and banners
are in because they decide which template a mailbox gets and what is injected
into it. Organisation, access and support carries everything else: role and user
changes, pausing and resuming delivery, mailbox and group exclusions, API keys,
profile field definitions, settings, test emails, and anything Tophhie Cloud
support did. Sending a test email is the clearest case of the line being drawn
correctly. It is worth recording, it belongs on this side, and it changes nothing
about anyone's signature.

By who, matching on either the name or the address.

By action, listing only the kinds of entry actually present in what is loaded,
grouped into the same two halves.

Download CSV takes whatever the filters have left rather than everything, so a
question you have already narrowed on screen is the thing that leaves as a
spreadsheet. The columns are when, who, what, the detail line, the action's
internal name, the version and the image name.

Every kind of entry is filed on one side or the other, so a new one cannot end up
unclassified and quietly stop appearing without anybody noticing.

## What each entry says changed

Every row carries a Detail line saying what actually moved, and opens into the
full record.

The line is written for each kind of entry rather than by listing whatever the
entry happens to store. Those stored fields are shaped differently for every
action, and reading them generically produced lines like "count: 3" for a rules
change that had replaced half the list.

| Entry | What the Detail line reads |
| --- | --- |
| Publishing | The template, the version, whether it came from a draft, and who submitted it |
| Changing assignment rules | How many rules there are, then which were added, removed and changed by name, and whether the order moved |
| Assigning a template to a role | Which role, and the template that replaced the one before it |
| Editing a banner or footer | The name, and each field that moved, as before and after |
| Changing a setting | Each setting that moved, as before and after |
| Changing who has access | The mailbox, the previous role and the new one, and whether it was an invitation |
| Renaming a template | The old name and the new one |
| Excluding or including a mailbox | The addresses, the group where one was involved, and the note |
| A staged rollout | The template, the versions, which transition, the percentage and the reason |
| Creating or revoking an API key | The key's name, what became of it, and its access |
| Anything Tophhie Cloud support did | The lever's own summary, such as the seat count that was set or the address whose role changed |

Opening a row shows the whole record as a table of fields and values, with the
raw stored form underneath for the case where the exact bytes matter. It is the
same dialog the Tophhie Cloud operator console uses, worded for you rather than
for us.

This is where the detail that used to be recorded but not shown now appears.
Rollout reasons, approval notes, the addresses on an exclusion and the fields an
administrator changed on a colleague's profile were all stored and exported and
never on screen, so reading one meant going to the API or an export. They are on
screen now.

Two things are still deliberately absent. A footer's body is described by how far
its length moved rather than quoted, because a change log is not a diff viewer
and [version history](/signatures/versions/) is the right tool for a body. And
the values an administrator saved on a colleague's profile are still never
recorded, only which fields they touched.

Entries written before their wording existed are described from whatever they
carry. An old row reads thinner rather than blank.

## How much you can see at once

The view fetches each half separately, the most recent 500 entries of each, and
merges them into one list. That is a display limit rather than a retention one:
nothing is pruned, and a [tenant export](/security/data-and-privacy/) carries the
most recent 5,000.

Fetching the halves separately is what stops a busy week of role changes pushing
template changes out of view. Each half is narrowed in the database before the
limit is applied rather than after it, so the 500 template changes are 500
template changes whatever else was happening around them. The API works the same
way, and this is the one filter that behaves differently there from the ones on
screen. See the [API reference](/reference/api/).

The filters on screen work on what has already been fetched, so narrowing by who
or by action is instant and does not reach further back than those entries.

For a busy organisation it means the portal answers what changed lately, and the
export is where you go for anything older.

## Staged rollout entries

A [staged rollout](/signatures/staged-rollouts/) writes an entry for each
transition: starting it, each step up, and how it ended.

The actor tells you who decided. A rollout that an administrator promoted or
abandoned carries their address; one the 15 minute evaluation decided for itself
is recorded against the system. That distinction is usually the first thing you
want to know about a rollout that ended overnight.

Automatic decisions also record the reason that triggered them, and the entry's
detail line names it beside the transition and the percentage. While a rollout is
still running, the panel in the template editor is the better place to look: it
shows both versions' failure rates and when the next check falls.

## Approval entries

Where [publish approval](/signatures/approvals/) is in use, submitting a draft
and sending one back are each recorded, with the rejection note.

A publish that came from a submitted draft additionally records who submitted it,
who approved it, and whether those were the same person. Sigil permits an admin
to approve their own work, so that last flag is what makes the control auditable
rather than nominal.

The submitter, the approver and the rejection note are on the entry, and the
detail line carries the note.

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
