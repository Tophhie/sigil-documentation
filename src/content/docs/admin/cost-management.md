---
title: Cost management
description: Decide which mailboxes have Sigil, so the rest stop being served a signature and stop counting towards your bill.
sidebar:
  order: 5
---

Not every licensed mailbox needs a signature. Frontline and shop floor staff,
kiosk accounts, Teams-only users and licensed service accounts all carry a
licence, all count as seats, and many of them never send an email from Outlook at
all.

Cost management is where you decide which mailboxes have Sigil. A mailbox kept
out of Sigil receives no signature and is not counted towards your seats.

You keep one list, and there are two ways to put a mailbox on it. You can pick
mailboxes individually, or you can name an Entra group and add whoever is in it.
The second one keeps up with the group as people join and leave it.

A [mode](#which-way-round-the-list-reads) decides what that list means. In
exclusion mode, which is the default, the list is the mailboxes that do not have
Sigil. In inclusion mode it is the only ones that do. Most of this page is
written in the exclusion-mode direction, because that is what most organisations
use, and the section on modes says which parts read the other way round.

## One switch, both effects

Keeping a mailbox out of Sigil does two things at once, and there is no way to do
one without the other.

It stops being served a signature on every path: automatic application on
compose, and the download in the "My signature" pane.

It comes off the seat quantity reported to Stripe.

The pairing is deliberate. A mailbox still served but no longer billed would be a
way of taking the product for free, and a mailbox no longer served but still
billed is the complaint the feature exists to answer.

### Aliases are covered

The list holds mailboxes by their primary address, which is the one the directory
picker offers and the one a group's membership resolves to. A message can be sent
from any of that mailbox's other addresses, though, and Sigil checks the mailbox
behind the sending address as well as the address itself.

So sending from an alias of an excluded mailbox gets no signature either. Without
that, an alias would be served a full signature while the seat count, which works
from the directory, had already stopped billing for it, which is exactly the
served-but-not-billed state the pairing above exists to make unreachable.

This costs nothing for an organisation that excludes nothing, and the lookup only
happens once the cheaper checks have already said there is something to look for.
If your directory cannot be reached at that moment, Sigil serves the signature
rather than withholding it, since a directory outage should not start removing
signatures from people nobody excluded.

### You can type an alias

The address box takes any address you type or paste, and that may well be a
secondary alias rather than a primary. You do not have to look the primary up.
Sigil resolves the address to the mailbox that owns it and lists the mailbox. The
confirmation names the primary address it stored and the alias you reached it by,
so what went on the list is never left to be inferred from what you typed.

That resolution happens when the entry is written rather than every time it is
read, because the two halves of the switch would otherwise disagree. The
signature gate resolves a sending address to its mailbox, so a raw alias on the
list would be matched. The seat count works from the directory, where every
account is keyed by its primary, so the same raw alias would match nothing at
all. One address on the list would then stop the signature and leave the bill
alone, or the reverse, which is the split the pairing above exists to prevent.

The other ways onto the list already yield primary addresses, so this applies
only to the address box. The picker offers directory accounts, a group's
membership resolves to the accounts in it, and the suggestions come from the
directory listing.

If your directory cannot be read at that moment, or no mailbox in it claims the
address, it goes on the list exactly as you typed it. Refusing the entry instead
would mean a directory outage, or a mailbox being set up an hour from now,
standing between an administrator and switching a signature off.

## Which way round the list reads

Two organisations want opposite things from the same list.

A large estate trimming a few dormant accounts wants "everyone is in unless I say
otherwise". An organisation where one team of twelve uses Sigil and four hundred
other licences do not wants the reverse, because keeping that as an exclusion
list would mean naming four hundred people and chasing every new starter.

So the list has a mode, set on the Cost management page.

| Mode | Your list is | Everyone else is |
| --- | --- | --- |
| Exclusion, the default | The mailboxes that do not have Sigil | Served a signature, and billed |
| Inclusion | The only mailboxes that have Sigil | Not served, and not billed |

### One mode at a time

A list cannot exclude some people and include others. Two lists with opposite
meanings over the same mailboxes would have no single answer to "is this one
billed", and that is the question the nightly seat count sends to Stripe.

For the same reason the mode can only be changed while the list is empty. Remove
every mailbox and every group first, and the button becomes available. Until
then it is disabled, with the reason beside it rather than left to be guessed at,
and the API refuses the change and says how much is still listed.

That rule exists so a list written to keep people out is never silently re-read
as the list of people to keep. Nothing carries over between the modes.

### An empty inclusion list means nobody

Switching to inclusion mode necessarily starts from an empty list, and an empty
inclusion list means nobody at your organisation is served a signature and your
seat quantity is zero.

That is a real state rather than an error. The confirmation says so before you
click it, and the page carries a warning above the figures for as long as it
lasts. Zero seats reaches your next invoice like any other seat change, so an
organisation that switches over and then forgets to add anybody has an active
subscription serving nothing.

The intended sequence is to switch, then add the mailboxes and groups that should
have Sigil. Switching back to exclusion mode restores everybody at once.

### What reads the other way round

Most of this page holds in both modes, with "excluded" reading as "not on the
list". Four things genuinely differ.

Shared mailboxes swap sides. In exclusion mode, listing one saves nothing because
it was never billed, and the picker hides them so nobody believes in a saving
that is not there. In inclusion mode a shared mailbox nobody lists gets no
signature at all, so the picker offers them and the row says it is included for
free.

Aliases work in the same direction as the mailbox they belong to. In inclusion
mode, sending from an alias of a listed mailbox is served, because Sigil resolves
the mailbox behind the address before deciding.

There are no [suggestions](#suggested-exclusions) in inclusion mode. "These
billed mailboxes never use Sigil" has no counterpart when everyone unlisted is
already unbilled, so the button is not offered rather than returning an empty
list.

A group that cannot be read still fails closed, and closed means the list stands.
In exclusion mode that keeps its members switched off. In inclusion mode it keeps
them switched on and billed, because treating an unreadable group as empty would
stop the signature and the billing of every mailbox you are paying for, on the
strength of a failed network call.

### What the figures say

The headline figures on the page are written for the mode you are in.

| Mode | Figures |
| --- | --- |
| Exclusion | How many mailboxes are excluded, and how many of those were actually coming off the bill |
| Inclusion | How many are included, how many seats that bills, and how many mailboxes are kept out |

In inclusion mode the included count and the billed-seat count differ whenever
the list holds a shared or disabled mailbox, since those are included for free.

The count of mailboxes kept out needs your directory, so if it cannot be read at
that moment the figure is shown as unavailable rather than as zero.

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

This is an exclusion-mode feature. See
[what reads the other way round](#what-reads-the-other-way-round).

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

An address typed rather than picked is resolved to the mailbox behind it first,
so pasting somebody's alias out of a ticket works. See
[you can type an alias](#you-can-type-an-alias).

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

If the very first read fails, there is no previous membership to keep. The group
is still added, carrying its error, so you have a row you can see and retry
rather than nothing at all. Nobody is excluded by it until a read succeeds.

The portal is careful to say which of two things happened, because they look
identical from the dialog and mean opposite things. "It currently covers no
mailboxes" means the group is empty. "Its membership could not be read" means
your directory refused the question, almost always for want of the permission
below.

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

## What a mailbox kept out of Sigil sees

This is the same whether the mailbox was excluded by name or simply never
included.

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

If a mailbox is renamed, the entry no longer matches it. In exclusion mode that
mailbox starts receiving signatures again, and returns to the bill at the next
daily seat sync. In inclusion mode the opposite happens and it quietly loses its
signature, which is the more urgent of the two. Sending from the old address as
an alias is still covered, because
[aliases are checked](#aliases-are-covered), but a rename that leaves no alias
behind is not.

The portal flags this rather than leaving it to be found on an invoice. Any row
whose address no longer resolves in your directory is marked as not in the
directory, and the number of them appears as its own headline figure. Re-exclude
the mailbox under its new address to put it back.

That figure covers two situations, and only one of them costs anything.

| Why the row no longer resolves | What it costs, in exclusion mode |
| --- | --- |
| The mailbox was renamed | It is billed again, under its new address |
| The mailbox was deleted | Nothing. A deleted mailbox is not in the directory the seat count comes from, so it is not billed either way. The row is merely stale |

In inclusion mode a renamed mailbox costs nothing and loses its signature
instead, and a deleted one is still merely stale.

Nothing repairs these automatically.

## What is recorded

Every change to who has Sigil is written to the
[change log](/monitoring/change-log/), naming who did it and when. The entries
record people rather than list rows, so adding somebody to an inclusion list is
logged as a mailbox being included, and a member leaving a listed group in
inclusion mode is logged as one being excluded. Reading the log does not require
knowing which mode the list was in.

Changing the mode is its own entry, because it is the one change that moves the
bill without naming anybody.

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

For one mailbox, there is no way to switch its signature off while continuing to
pay for it, and no way to stop paying while keeping its signature. The two halves
of an exclusion move together.

Organisation-wide, the first of those is a separate control:
[pausing delivery](/signatures/pausing-delivery/) stops everybody receiving a
signature and changes nothing about the bill. It is a rollout tool rather than a
cost one, so a pause left on for a month still costs a month.

Excluding a mailbox has nothing to do with portal access. Who can sign in to the
portal, and at what role, is [users and roles](/admin/users-and-roles/).
