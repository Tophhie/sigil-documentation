---
title: Settings
description: The organisation-wide switches, what each one changes, and who can change them.
sidebar:
  order: 8
---

Settings holds the choices you make about how your own organisation behaves, as
opposed to the things Sigil sets for you.

There are five.

| Setting | Default | What it changes |
| --- | --- | --- |
| Require approval to publish | Off | Publishing, restoring a version, staging a rollout and scheduling any of it need an admin |
| Profile editing | Off | Whether colleagues can fill in their own custom signature details |
| Product update emails | On | Whether your admins receive occasional round-ups of what has changed in Sigil |
| Health digest | Weekly | How often Sigil emails your admins a summary of signature health |
| Sigil support access | Off | Whether Sigil support can change your signature content while helping you, and for how long |

## Require approval to publish

With this on, anybody holding the templates capability still edits, previews and
submits drafts, but only an admin puts a body in front of users.

It is off by default because it is a governance control that changes who may
publish, and imposing that on an existing organisation would strand whatever
drafts are already in flight behind a review nobody asked for.

See [publish approval](/signatures/approvals/) for the review cycle, what is
gated and what deliberately is not.

You need the Admin role to change it.

1. Open Settings in the portal sidebar.
2. In the Publish approval card, turn on Require an admin to approve every
   signature change.

It saves as soon as the switch moves, and the portal confirms with "Settings
saved." Turn the same switch off to remove the requirement.

## Profile editing

With this on, anybody in your organisation can open `portal.usesigil.app/me` and
fill in the custom fields you have defined, such as pronouns or a personal
booking link. Nothing on that page is read from or written back to Microsoft 365.

It is off by default, unlike the digest, because it changes what non-administrative
staff can do in a product nobody has told them about yet.

Turning it off later stops people editing. What they have already entered keeps
appearing in their signatures, because a decision about who may edit should not
quietly blank a line out of everybody's mail. Deleting the field is how you
remove the values.

Which fields exist is a separate page. See
[profile fields](/admin/profile-fields/).

1. Open Settings in the portal sidebar.
2. In the Profile editing card, turn on Let colleagues fill in their own
   signature details.

It saves as soon as the switch moves. The same switch is on Profile fields,
labelled Let staff fill these in themselves, so you can turn it on from the page
where you defined the fields.

## Product update emails

Occasional emails to your admins about what has changed in Sigil: new features,
improvements and fixes. Nobody has to act on one.

Turning this off stops them for every admin in your organisation at once. It
changes nothing else Sigil sends. Billing notices, the health digest, a prompt to
reconnect and any notice your admins need to act on arrive either way, because
those are part of running the service rather than news about it. See
[emails Sigil sends](/admin/emails-sigil-sends/#product-updates) for the
difference.

It is on by default, like the digest. The people it reaches already run Sigil
for your organisation, the mail is about the service they use, and every copy
carries its own way out.

That way out is personal. Each product update has a link at the bottom that
stops them for that one address, with no sign-in, and nobody else can undo it.
The same page offers Start them again, so the person can change their mind.
So an admin who wants them can stay on while a colleague who does not opts out,
and switching this setting back on never overrides somebody who asked to stop.

To stop them for your organisation:

1. Open Settings in the portal sidebar.
2. In the Product update emails card, turn off Send product update emails to
   our admins.

It saves as soon as the switch moves.

## Health digest

An email to every administrator summarising coverage, apply failures, directory
gaps and anything waiting on a decision.

Weekly, monthly and off are the three choices, and you choose the day it
arrives: a weekday for weekly (Monday by default), or a date from the 1st to the
28th for monthly (the 1st by default). See
[the health digest](/monitoring/health-digest/) for what it contains, how a
change of day is handled, and why it defaults to on.

1. Open Settings in the portal sidebar.
2. In the Health digest card, choose Weekly, Monthly or Off.
3. Pick the day of the week, or the date of the month, from the list under your
   choice.

Each choice saves as soon as you make it. The card's header shows when the last
digest was sent and when the next one is due, and the next date updates as soon
as you change the day.

Two buttons sit beside the setting.

Preview renders the digest your organisation would receive right now, inside the
page, and sends nothing. If there is nothing to report yet, because there are no
mailboxes and no signature activity, the preview still renders and says that
nothing would be sent.

Send me one mails it to you and to nobody else. A test that mailed the whole
leadership team is a button nobody would press.

Neither of them stamps the schedule. Trying the digest cannot push the real one
out by a week, which is the only reason it is safe to press either without
thinking about it.

To try it:

1. Open Settings in the portal sidebar.
2. In the Health digest card, choose Preview.
3. Read the digest that renders under the frequency options, with its subject
   line above it.
4. Choose Send me one to mail the same digest to your own address.

Preview turns into Hide preview while the digest is open. After a send, the
portal confirms the address it went to and that this does not change when the
next one goes out.

## Sigil support access

Sigil support can always look at your portal read-only to answer a question.
This switch lets them make changes too, for a time you choose, so they can fix
something for you instead of talking you through it.

It is off by default. Turning it on hands someone outside your organisation the
power to change what your colleagues' mail looks like, so nobody should get
that without asking for it.

While it is on, support can change your templates, banners, footers, rules and
profile fields. They cannot change users, roles, API keys, billing, these
settings or the switch itself, and they cannot send test emails. They also hold
no role in your organisation, so if
[publish approval](/signatures/approvals/) is on, what they change waits as a
draft for one of your admins to approve, like anyone else's.

The longest you can allow is 24 hours. The switch then turns itself off.

You need the Admin role to change it. In a
[partner-managed](/partners/overview/) organisation, a partner Owner or Admin
can change it too. Support can never change it, and nor can an
[API key](/admin/api-keys/).

To turn it on:

1. Open Settings in the portal sidebar.
2. In the Sigil support access card, choose how long from the list: 1, 4, 8 or
   24 hours. It starts at 4.
3. Turn on Allow Sigil support to make changes.
4. Sign in again when the portal asks you to.

The portal confirms with "Sigil support can make changes for the next" and the
time you chose. The card then says when access ends and which admin switched it
on.

To give support longer, pick a new time from the list and choose Reset the time.
The clock restarts from now rather than adding to what was left.

To turn it off, turn off Allow Sigil support to make changes. You are not asked
to sign in again for this. Any edit session support has open ends straight
away, and their next change is refused.

### Seeing who is in your portal

Under Open now, the card lists every support session open on your organisation,
read-only ones included. Each line gives the operator's reference, such as
`OP-7K3F`, whether they are viewing read-only or making changes, when the
session ends, and the reason they gave for opening it.

Support has to give a reason for every session, read-only or not, and you can
read it here and in your [change log](/monitoring/change-log/#support-sessions).
A session lasts 30 minutes at most, and an edit session never outlasts your
switch.

## The Link domain card

Settings also carries the card for a
[branded link domain](/monitoring/branded-link-domain/), which is where the
hostname is claimed, watched while its certificate issues, and removed.

It is not one of the five settings above and has no default, because it is a paid
add-on rather than a choice about behaviour. The card is on the page whether or
not your organisation holds the add-on: without it, the card explains what the
feature does and points at Billing, rather than offering a button that would be
refused.

With the add-on, and the Admin role or a custom role given Settings, claiming a hostname goes like this.

1. Open Settings in the portal sidebar.
2. In the Link domain card, choose Add a link domain.
3. Enter the Hostname, such as `links.yourdomain.com`.
4. Create the CNAME record the dialog shows at your DNS provider.
5. Choose Add domain.

The card then shows the hostname with a badge saying where it has got to,
Waiting for DNS to begin with, repeats the record to create, and offers Check
again. Once the record is found the badge reads Setting up… while the
certificate is issued, and then Live.

If no certificate can be issued the badge reads Not working, and links keep
coming from the shared address in the meantime. The card shows the reason
given, and says the usual causes are a CNAME that does not exist yet or points
somewhere else, or a CAA record on your domain that does not allow the
certificate authority. Fix the record and choose Check again.

To remove it:

1. Open Settings in the portal sidebar.
2. In the Link domain card, choose Remove. While the domain is still waiting for
   DNS or being set up, the same button reads Cancel.
3. Choose Remove in the confirmation dialog.

The dialog warns that links already sitting in mail you have sent stop working
once the hostname stops resolving.

## Defaults and organisations that never open this page

An organisation that has never touched Settings gets the defaults above, and
Sigil does not distinguish that from one which chose them deliberately.

There is nothing to configure before the product works. Settings is where you go
to change a default, not a setup step.

## Who can change them

The settings capability. Of the built-in roles only Admin holds it. Editors,
Marketing, Viewers, the Compliance role and the Billing role do not reach this
page. An Admin can give the capability to a [custom role](/admin/users-and-roles/#custom-roles), and anyone holding
that role can then change these settings, publish approval included.

Sigil support access is the exception. Only an Admin can change it, or a
partner Owner or Admin for a client. Someone holding Settings through a custom
role sees the card and its open sessions, with the note "Only an admin can
change this."

An [API key](/admin/api-keys/) can read these settings but never change them,
since a key that could switch publish approval off would get round the review
it exists for.

In a [partner-managed](/partners/overview/) organisation, a partner Owner or
Admin can change these for a client. A partner Technician cannot. Turning a
client's publish approval off is exactly the kind of change approval exists to
prevent, so it sits with the partner roles that also manage client access rather
than with the one that does the signature work.

See [roles and capabilities](/reference/roles-and-capabilities/).

## What is recorded

Changing any of them writes a [change log](/monitoring/change-log/) entry under
the Changed settings action, with who changed it and when. Sending yourself a
digest is recorded there too. Previewing one is not, because nothing left the
building.

A link domain added or removed is recorded under its own action rather than under
settings, naming the hostname.

Sigil support access is recorded under its own action too, Changed whether Sigil
support can make changes, with the admin who did it. The entry says whether
access was switched on, extended or switched off, for how many hours and until
when, and how many edit sessions switching it off ended.

Somebody opting their own address out of product updates is not in your change
log. It is a choice about their own inbox rather than a change to your
organisation, and it applies wherever that address receives them.
