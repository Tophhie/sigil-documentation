---
title: Activity and adoption
description: See which mailboxes are getting their signature, which have never had one applied, and what each attempt actually did.
sidebar:
  order: 1
---

Client-side signature tools are usually blind to their own success. Something is
deployed, and whether it reaches anyone is a matter of faith and helpdesk
tickets.

Sigil measures it. The Activity view records both the signature requests it
serves and the outcome of every attempt to apply one, per mailbox.

## Two kinds of event

A request is logged when the API serves a signature: who asked, which mailbox it
was for, which template version, which compose type, whether it came from cache,
and the response status.

An outcome is reported by the add-in after each attempt: whether Outlook actually
accepted the signature, whether it was applied automatically or by hand, which
signature it was, the client platform, and the reason if it failed.

The distinction matters. A successful request proves the signature was *served*.
Only the outcome proves it was *applied*. The two records share a request id, so
they line up.

## What the view shows

A per-mailbox rollup, so you can see the state of any individual person.

A recent feed of events across the organisation.

Adoption statistics across the whole tenant.

The never-applied list, described below.

Which add-in manifest version each mailbox installed, and a notice when any of
them is behind. Described below.

What this view does not carry is the [change log](/monitoring/change-log/), which
has a view of its own beside this one. It used to sit here as two cards at the
foot of the page. Whether the add-in is reaching people and who changed what are
different questions, and the second had outgrown the bottom of the first.

The two still belong together in an investigation, and usually in that order:
read here that applies started failing on Tuesday, then read the change log for
what an administrator did on Monday.

### Finding whether a mailbox has had a signature applied

You need the Admin, Editor, Viewer or Compliance role.

1. Open Activity in the portal sidebar, under Monitoring.
2. In the By mailbox table, find the person's address. Rows are most recent
   first.
3. Read the Outcome column. A badge shows the result of the last apply the
   add-in reported. Fetched only means the signature was served but no apply
   was ever reported for that mailbox.
4. Read the Applied / failed column for the running counts, and the How column
   for whether the last apply was automatic or manual.

For the full history of one mailbox, scroll to the Signature log card, enter
the address under Mailbox and choose Search. Events are newest first, capped at
500, with Prev and Next to page through them.

### Filtering the signature log

The raw log is only read when you search it, so opening the view does not
scan the whole history.

1. Open Activity in the portal sidebar, under Monitoring.
2. Scroll to the Signature log card.
3. Set any of the filters, or none. Mailbox takes an address. Outcome offers
   Any, Applied / fetched OK, Failed to apply, Not found, Unauthorized,
   Billing inactive, Signatures paused, Mailbox excluded and Error. Source
   offers Any, Add-in (apply) and Server (fetch). From and To take a date each,
   and a date covers the whole of that UTC day.
4. Choose Search.

Each row shows when, the mailbox, and the event: an outcome badge for an add-in
report, or Fetched for a served request, with how it was triggered beside it.
If nothing matches, the table says so.

## The never-applied list

This is the most useful thing in the view. It cross-references your directory
against the telemetry and lists mailboxes that have never successfully applied a
signature.

That is a different question from "who has failed", and a more useful one. A
mailbox that has never appeared at all does not show up in any failure report,
because nothing was ever reported for it. Comparing against the directory is what
surfaces it.

After a rollout, this list is where the remaining work is. Look for patterns: one
department, one office, one client platform. Those point at a deployment gap
rather than at individual problems.

It uses the same definition of your organisation as
[attribute coverage](/monitoring/attribute-coverage/): mailboxes belonging to
your own people, with accounts invited in from outside left out. Those accounts
compose through their own organisation's tooling, so listing them would fill the
list with people no deployment of yours will ever reach.

Mailboxes you have [excluded from Sigil](/admin/cost-management/) are left out
for the same reason. They are deliberately not being sent a signature, so listing
them as work outstanding would mean the list never emptied. That matters most for
the [health digest](/monitoring/health-digest/), which reports the same list by
email and would otherwise chase your administrators about them weekly, for ever.

The directory cross-reference is best-effort. If Graph is briefly unavailable the
rest of the telemetry still renders without it.

### Reading the list

1. Open Activity in the portal sidebar, under Monitoring.
2. Read the Signature adoption card at the top. It shows what percentage of
   your mailboxes have applied a signature at least once, with Applied and
   Never applied counts beneath, and the five most recent mailboxes under
   Latest activity.
3. Choose Export mailboxes (CSV).

The download is a file called signature-adoption.csv with one row per mailbox
and Yes or No under Signature applied. The No rows are the never-applied list.
If the directory could not be read, the card is replaced by a notice saying the
cross-reference is unavailable and the rest of the view is still complete.

## Which add-in version people are on

The add-in's files sit at fixed URLs, so everybody runs the current code. The
manifest is the part that does not update itself, and an organisation can sit on
one from months ago without anything looking wrong. What an old manifest lacks
is the part only a manifest can declare, such as
[shared mailbox support](/signatures/sending-on-behalf/#where-the-add-in-runs-in-a-shared-mailbox),
and the running code cannot see that it is missing.

So every apply reports the manifest version behind it, and the per-mailbox table
carries it in an Add-in column. When any mailbox that has composed in the last
30 days is on an older manifest than the one Sigil serves, the view opens with a
notice naming the manifest version Sigil now serves and how many of the
mailboxes active in the last 30 days are still on an older one.

The notice opens the steps rather than only naming the problem. It walks through
the four things the update needs, with a button through to Integrated apps and
the manifest link ready to copy, and it says plainly which two steps bite when
they are done wrong: leaving a gap between the upload and the consent prompt
blocks users from the add-in in between, and the deployment must stay assigned to
people rather than to a shared mailbox. See
[updating the add-in](/deploy/deploy-the-add-in/#updating-the-add-in).

A version of `pre-1.5` means a manifest older than the version stamp itself, or
a classic Outlook for Windows build too old to report it. Both are out of date,
which is why it does not read as unknown. A dash means the mailbox has never
applied a signature, and the never-applied list is the better place to read that.

Re-uploading is an administrator's job in the Microsoft 365 admin centre, and
nothing in Sigil can do it for you. Until it happens those mailboxes keep working
as they did. See
[which manifest version you are on](/deploy/deploy-the-add-in/#which-manifest-version-you-are-on).

To act on the notice you need to be an administrator of your Microsoft 365
tenant as well as of Sigil.

1. Open Activity in the portal sidebar, under Monitoring. The notice at the top
   names the manifest Sigil now serves and how many mailboxes are on an older
   one.
2. Choose Update. A dialog called Update the add-in opens with the steps.
3. Choose Open Integrated apps. In the Microsoft 365 admin centre, open Sigil by
   Tophhie Cloud and choose Update add-in.
4. Select Provide link to manifest file. Back in the dialog, choose Copy beside
   the manifest link, paste it in, then click Validate and Next.
5. Accept the permissions prompt as soon as it appears. Do this in the same
   sitting as the previous step, because people are blocked from the add-in
   between the upload and the consent.
6. Leave the deployment assigned to your users and groups, or Entire
   organisation if that is what you chose. Never assign it to a shared mailbox.
7. Choose Done.

The dialog asks you to allow Microsoft's usual 6 to 72 hours for the update to
propagate before treating a mailbox that has not moved as a fault. The Add-in
column shows each mailbox's version as it comes through.

## What the numbers will not tell you

A report has to carry a verified identity, so anything that fails before a token
is in hand cannot be reported at all. Four reasons land there.

`no-item`, meaning there was no message being composed to put a signature on.

`unsupported`, meaning an Outlook client too old to support nested app
authentication, or one that does not offer the API that sets a signature.

`sign-in-required`, meaning silent authentication failed inside the event runtime,
which is the normal first-run case.

`sign-in-failed`, meaning the sign-in prompt itself was cancelled or did not
complete.

None of the four can be beaconed. They appear as a mailbox's absence from the
telemetry rather than as a recorded failure, which is another reason the
never-applied list matters more than a failure count.

The last of them is the one to hold on to when reading adoption numbers. Somebody
who dismisses the sign-in prompt leaves no trace whatsoever, so a low failure
count is not evidence that everybody is being reached.

`sign-in-required` self-heals once the person opens the "My signature" pane and
signs in. See [troubleshooting](/deploy/troubleshooting/).

There is a fifth case, and it is deliberate rather than a limitation of the
report. Once Sigil has refused a mailbox, the add-in notes that refusal on the
device and stops an automatic message for the next ten minutes without asking
again, so those messages report nothing and reach no request log either. The
refusal that set the note was recorded in full. See
[a refusal is remembered for ten minutes](/start/how-it-works/#a-refusal-is-remembered-for-ten-minutes).

The consequence for reading this view is that a refusal count is not a message
count. A mailbox that is excluded or paused contributes at most one record per
ten minutes for each of new messages and replies, however many messages the
person writes. Read a run of them as evidence that the add-in is still deployed
and still reaching Sigil, which is what they were always for, rather than as a
measure of how much mail is going out unsigned.

Otherwise, from the token onwards, every outcome is reported, whether it
succeeded or not.

## Automatic and manual

Outcomes record how the signature was applied:

| Trigger | Meaning |
| --- | --- |
| `auto-new` | Applied automatically when the message was started |
| `auto-from-changed` | Applied automatically when the sending account changed |
| `manual` | Applied by hand from the "My signature" pane |

A mailbox with only manual applications is a mailbox where automatic activation
is not working. That is worth investigating even though the person does have a
signature, because they are doing work the product is supposed to do for them.

## When the service could not be reached

Two reported reasons look alike and mean different things, and telling them apart
is what stops a network problem being filed as a Sigil outage.

| Reason | Meaning |
| --- | --- |
| `server-error` | Sigil answered, and the answer was not one the add-in expected |
| `unreachable` | The request produced no answer at all: a dropped connection, a timeout, or something on the network blocking it |

A `server-error` also carries the HTTP status behind it, recorded on the event
rather than printed on the badge. It is the half that tells support what
happened, and it comes back with the event through the API and in a mailbox's
[data export](/security/data-and-privacy/).

The distinction is worth holding on to. A recorded 500 is Sigil answering badly
and worth raising with support. `unreachable` is Sigil not being reached at all,
which points at the network between Outlook and `portal.usesigil.app` rather than
at the service. See
[troubleshooting](/deploy/troubleshooting/#is-something-on-your-network-eating-the-request).

A refusal Sigil makes deliberately is never either of these. It is recorded as a
refusal in its own right, described below.

Neither reason appears when the mailbox still has a usable copy of its last
signature on the device. Sigil could not be reached, but the person did get a
signature and the message went out with it, so the attempt is recorded as
applied. That is why `unreachable` is a thinner signal than it used to be: it now
means an unreachable service and no kept copy to fall back on, which is a first
compose, a new device, or a mailbox that has not written anything for 45 days.

How long the add-in waits depends on the same thing. With a kept copy already in
the message it gives Sigil five seconds, because the copy is already there and
the wait only checks it. With nothing kept it waits up to fifteen seconds, since
that request is the whole signature and a slow answer is still better than a
message sent without one. A request that runs past fifteen seconds is recorded
as `unreachable`.
See [why it sometimes changes as you watch](/users/how-your-signature-works/#why-it-sometimes-changes-as-you-watch).

## Refused requests

Some requests are declined on purpose. They are recorded rather than dropped,
and the served request says which decision was taken:

| Outcome | Meaning |
| --- | --- |
| `excluded` | The mailbox is [kept out of Sigil](/admin/cost-management/), either by being excluded or by never being included |
| `paused` | [Delivery is paused](/signatures/pausing-delivery/) for the whole organisation |
| `billing-inactive` | The trial has ended or the subscription is no longer active. See [what happens if billing lapses](/admin/billing/#what-happens-if-billing-lapses) |
| `not-found` | The address resolved to no mailbox in your directory |

The event search has a filter for each, so any of them can be pulled out on its
own.

They are recorded rather than swallowed because each answers a question somebody
is actually asking. An excluded mailbox should not be requesting a signature at
all, so a steady stream of them means the add-in is still deployed to somebody
who no longer needs it. A run of `paused` entries means the opposite of a fault:
the add-in is deployed, reaching the service and being answered, and the only
thing between those people and a signature is a switch in the portal.
`billing-inactive` is the one to read as urgent, because nobody at the
organisation is being served while it is appearing.

### What the add-in calls the same refusal

Those outcomes are what the service records against the request it declined. The
add-in files its own report for the same attempt, and it does not use the same
words, so a single refusal reaches the feed twice under two different names.

| Reason | Meaning |
| --- | --- |
| `not-activated` | The service declined for a reason that is not a billing one |
| `subscription-inactive` | The trial has lapsed or the subscription was cancelled |

`not-activated` covers several situations at once: an organisation that has not
finished onboarding, one that is suspended, delivery paused for everybody, and a
mailbox the cost management list does not cover, whether by being excluded or by
never being included. The add-in draws no distinction between them because none
of them is anything the person composing can do about, and a message naming the
specific one would only invite them to try. The served request beside it carries
the decision that was actually taken, which is where to look when the badge is
not enough.

The line the add-in does draw is between the service declining and the service
failing. Without it, a lapsed subscription would read to somebody as a network
problem they could fix by retrying.

## What the outcomes are used for besides reporting

Apply outcomes are also the input to
[staged rollouts](/signatures/staged-rollouts/). Each outcome names the version
it applied, so a rollout can count the new version's results and the current
version's separately and compare them.

A rollout with no telemetry behind it would have nothing to go on but the clock,
which is a schedule rather than a safety measure.

## What is stored

Metadata only. No tokens and no rendered HTML are recorded, so the telemetry
never contains anyone's signature or anyone's message content.

Every write is best-effort and off the critical path. Logging is deliberately not
allowed to slow or fail the signature somebody is waiting on, so a storage problem
loses telemetry rather than breaking signatures.

Individual requests and outcomes are kept for 90 days and then deleted by a
nightly sweep, so the recent feed and a single mailbox's event history reach back
no further than that. The per-mailbox rollup and the adoption totals built from
those events are kept for as long as your organisation uses Sigil. The
never-applied list reads the rollup, so a mailbox whose last successful apply was
more than 90 days ago is not mistaken for one that never had one.

See [data and privacy](/security/data-and-privacy/) for the full picture.

## Who can see it

Admins, Editors, Viewers and the Compliance role, which all hold monitoring. The
Marketing and Billing roles do not reach it.

Viewer exists largely for this view: a service desk needs to answer "is this
person's signature working" without being able to change a template.

Each person can also see the latest result for their own mailbox, on the page
where they [fill in their own details](/users/your-details/#whether-your-signature-is-working).

## Related views

[Attribute coverage](/monitoring/attribute-coverage/) answers a different
question: not whether people are getting a signature, but whether the directory
has the data to fill one in.

The [change log](/monitoring/change-log/) records what administrators did rather
than what users received.
