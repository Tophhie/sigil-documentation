---
title: Cost management
description: Exclude mailboxes that do not need a signature, so they stop being served one and stop counting towards your bill.
sidebar:
  order: 4
---

Not every licensed mailbox needs a signature. Frontline and shop floor staff,
kiosk accounts, Teams-only users and licensed service accounts all carry a
licence, all count as seats, and many of them never send an email from Outlook at
all.

Cost management lets you exclude those mailboxes. An excluded mailbox receives no
signature and is not counted towards your seats.

There are two ways to exclude one. You can pick mailboxes individually, or you
can name an Entra group and exclude whoever is in it. The second one keeps up
with the group as people join and leave it.

## One switch, both effects

Excluding a mailbox does two things at once, and there is no way to do one
without the other.

It stops being served a signature on every path: automatic application on
compose, and the download in the "My signature" pane.

It comes off the seat quantity reported to Stripe.

The pairing is deliberate. A mailbox still served but no longer billed would be a
way of taking the product for free, and a mailbox no longer served but still
billed is the complaint the feature exists to answer.

## What excluding actually saves

Only licensed, enabled member mailboxes are billed in the first place, so
excluding anything else saves nothing. It still stops the signature.

| Mailbox | Effect of excluding it |
| --- | --- |
| Licensed, enabled member mailbox | No signature, and one seat off the bill |
| Shared or resource mailbox | No signature. It was unlicensed and therefore already free |
| Disabled account | No signature. Already free |
| Account invited in from outside | No signature. Already free |

The portal says so rather than leaving you to work it out from an invoice. Each
row on the list records whether that mailbox was billable, and the headline
figures separate how many mailboxes are excluded from how many are actually
coming off the bill.

The directory picker only suggests enabled mailboxes belonging to your own
organisation, for the same reason. You can still type any address by hand.

## Suggested exclusions

Sigil records, per mailbox, whether a signature was ever successfully applied. So
it can answer the question directly rather than leaving you to audit 400 licences
by hand: which of these mailboxes have never once used the thing you are paying
for.

Press "Suggest mailboxes" and Sigil lists the billable mailboxes that have not
successfully applied a signature in the last 90 days, with an estimate of what
excluding all of them would save each month.

Nothing is excluded until you tick it. The list is the starting point for a
decision rather than an action.

The suggestion errs on the side of leaving people alone.

A mailbox that has applied a signature even once is never suggested, whatever its
volume since.

Ninety days rather than thirty, so somebody on extended leave, a seasonal role,
or somebody who simply sends very little mail is not swept up.

An organisation connected less than 90 days ago gets no suggestions at all,
because nobody in it has had a full window in which to apply anything. The panel
says so rather than showing an empty list.

Two states are kept apart on the list, because they mean different things.

| Row says | What it means |
| --- | --- |
| Never seen by Sigil | No add-in has ever asked for a signature for this mailbox. Usually the person does not send mail from Outlook |
| Fetched but never applied | A signature was served and never landed. That can mean the add-in is broken for them |

The second is worth investigating before excluding. Excluding it would bury a
real fault rather than save money.

The estimate uses the list price and ignores any agreed discount, so treat it as
an upper bound.

The list is fetched only when you ask for it. It walks your whole directory and
cross-references the telemetry, which is not work to do every time somebody opens
the page.

## Excluding a mailbox by hand

Pick the mailbox and add an optional note of up to 200 characters. The note is
free text and is never interpreted. It exists so the list is still legible in six
months, so "warehouse floor" or "Teams-only licence" is the kind of thing worth
writing.

## Excluding an Entra group

Ticking 120 boxes is a poor way to manage 120 warehouse staff who are already a
group in your own directory, and it goes stale the first time somebody is hired.

So you can name a group instead, and its membership is what gets excluded. Search
for it by name, or paste its object ID if you have arrived from the Entra portal
with one on the clipboard. Either way Sigil confirms the group exists in your
directory before saving it, so a mistyped ID is refused there and then rather
than becoming a group that quietly excludes nobody for ever.

Membership is resolved as soon as you add the group, so you can see who it covers
without waiting for anything.

Nested groups count. Sigil walks the group's membership transitively, so a group
of groups excludes the people inside all of them. Members that are not people,
such as devices and service principals, are ignored because they have no mailbox
to exclude.

### It tracks

Membership is not a one-off import. Somebody added to the group next month is
excluded then, with no further action in Sigil, and somebody removed from it gets
their signature and their seat back. That is the difference between managing a
group and bulk-ticking its members once.

Sigil refreshes every excluded group once a day, immediately before the daily
seat sync, so a seat count is never derived from a membership a day older than
itself. Between those refreshes the group is not watched, which means a new
joiner keeps their signature and their seat until the following night. That is
the direction worth being wrong in: nobody unexpectedly loses a signature the
moment HR edits a group.

If you have just changed the group in Entra and want it applied now, press
Refresh on the group's row.

### The two lists do not overwrite each other

Mailboxes you picked individually and mailboxes covered by a group are kept
apart, and one can never undo the other.

Somebody excluded both by hand and by group stays excluded when they leave the
group, because their individual entry is still there. Removing a group releases
only the people it was the sole reason for excluding, and the portal says so
before you confirm it.

The individual list in the portal shows only the mailboxes you picked yourself.
Group members are not enumerated in it, since one group can cover several hundred
people and that is not a table anybody reads. Each group's row carries its own
member count, and the headline figures at the top of the page count both origins
together, without counting anybody twice.

### When a group cannot be read

A refresh that fails leaves the previous membership exactly as it was, and shows
the error against the group.

Treating an unreadable group as an empty one would restore signatures to, and
resume billing for, everybody it covers, on the strength of a failed network
call. So Sigil holds what it last read instead. The row shows when it was last
refreshed successfully, which is what tells you whether the count beside it is
current or stale.

A group that has genuinely been deleted from your directory is treated
differently, and does release its members. There is no membership left to honour,
and leaving people excluded by a group that no longer exists would be
unexplainable to whoever is reading the list.

The most likely cause of a failure is the permission. Reading group membership
needs `GroupMember.Read.All`, which Sigil requests at admin consent for group
assignment rules, so almost every organisation already has it. An organisation
that consented before it was requested will see the group search report that
plainly rather than return an empty list. See
[permissions](/deploy/permissions/).

### A renamed group member sorts itself out

Membership is re-read from your directory on every refresh, so if somebody in an
excluded group changes address, the group picks them up again under the new one
at the next refresh.

Individual exclusions do not behave this way. See
[a renamed mailbox stops being excluded](#a-renamed-mailbox-stops-being-excluded)
below.

## When each half takes effect

| Effect | When |
| --- | --- |
| The signature stops | Immediately. The next compose is refused |
| The seat count changes | At the next daily seat sync |
| The price changes | On your next invoice |

Seat changes never produce a mid-cycle invoice or a credit, so excluding twenty
mailboxes today does not refund part of this month. That is the same treatment a
leaver already gets. See [billing](/admin/billing/).

Putting a mailbox back works the same way in reverse. Signatures resume at once,
and the seat returns on the next invoice.

## What an excluded person sees

Nothing, on compose. The add-in is refused and applies no signature rather than
interrupting a message with an error.

If they open the "My signature" pane, it currently tells them Sigil is not set up
for the organisation yet. That message is wrong for this case. The add-in cannot
tell an excluded mailbox apart from an unconnected organisation, because the
service refuses both the same way. Worth knowing before somebody raises a ticket
about it.

## Where excluded mailboxes stop appearing

Excluding a mailbox also removes it from the reports that would otherwise keep
asking about it.

| Report | Effect |
| --- | --- |
| The [never-applied list](/monitoring/activity/) | Excluded mailboxes are dropped |
| [Attribute coverage](/monitoring/attribute-coverage/) | Dropped from the total, and counted separately |
| The [health digest](/monitoring/health-digest/) | Dropped, since it reports on both of the above |

The digest is the important one. Left in, it would email your administrators
every week, indefinitely, about mailboxes they switched off on purpose.

Refused requests are still recorded in the
[activity feed](/monitoring/activity/), with an outcome of `excluded`. An
excluded mailbox should not be asking for a signature at all, so a steady stream
of them points at an add-in still deployed to somebody who no longer needs it.

## A renamed mailbox stops being excluded

This applies to mailboxes you excluded individually. Group members are re-read on
every refresh and are not affected.

An individual exclusion is held against the email address, because the address is
what the rest of Sigil keys on: the compose path, the assignment cache, the
activity rollup and the coverage audit all use it.

If a mailbox is renamed, the exclusion no longer matches it. That mailbox starts
receiving signatures again, and returns to the bill at the next daily seat sync.

The portal flags this rather than leaving it to be found on an invoice. Any row
whose address no longer resolves in your directory is marked as not in the
directory, and the number of them appears as its own headline figure. Re-exclude
the mailbox under its new address to put it back.

Nothing repairs these automatically.

## What is recorded

Every exclusion and every reinstatement is written to the
[change log](/monitoring/change-log/), naming who did it and when.

This is the one thing outside signature editing that changes what a colleague's
outgoing mail looks like, so "who switched off my signature" has to be
answerable.

The addresses involved, the note, and whether a managed service provider made the
change are stored on the entry but not printed in the portal's log view. They are
read from the API or from a
[tenant export](/security/data-and-privacy/#getting-your-data-out), the same as
rollout reasons and approval details.

Group refreshes are logged the same way, and this matters more than it might
sound. Because membership tracks, a mailbox can lose its signature without
anybody having touched Sigil at all: an edit to a group in Entra is enough. Each
refresh that changes who is excluded therefore writes an entry naming the group,
so the question resolves to "the Warehouse Staff group, on the 12th" rather than
to nobody. A nightly refresh that changes nothing writes nothing, and the entries
it does write are recorded against the system, since no person at your
organisation did anything that day.

## Who can use it

The Admin and Billing roles, from Cost management in the portal. Editors,
Marketing, Viewers and the Compliance role do not reach it.

Inside a managed client, partner Owners and Admins reach it. A partner Technician
does not, because switching off a mailbox's signature is an account decision
rather than signature work.

Cost management is a separate permission from billing. That is what lets a
managed service provider trim a client's dormant mailboxes, which it carries on
its own consolidated bill, without also being given sight of that client's card,
invoices or subscription. See
[roles and capabilities](/reference/roles-and-capabilities/).

## What it will not do

You cannot exclude on a directory attribute. There is no way to say "everybody
whose department is Warehouse", the way an
[assignment rule](/targeting/assignment-rules/) can. Groups covered the case that
actually came up, and an attribute rule wants a preview of its own before it is
allowed to pull people out of both billing and signatures.

There is no way to switch a signature off while continuing to pay for the
mailbox, and no way to stop paying while keeping the signature.

Excluding a mailbox has nothing to do with portal access. Who can sign in to the
portal, and at what role, is [users and roles](/admin/users-and-roles/).
