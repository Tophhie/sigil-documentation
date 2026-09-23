---
title: Settings
description: The organisation-wide switches, what each one changes, and who can change them.
sidebar:
  order: 8
---

Settings holds the choices you make about how your own organisation behaves, as
opposed to the things Sigil sets for you.

There are four.

| Setting | Default | What it changes |
| --- | --- | --- |
| Require approval to publish | Off | Publishing, restoring a version, staging a rollout and scheduling any of it need an admin |
| Profile editing | Off | Whether colleagues can fill in their own custom signature details |
| Product update emails | On | Whether your admins receive occasional round-ups of what has changed in Sigil |
| Health digest | Weekly | How often Sigil emails your admins a summary of signature health |

## Require approval to publish

With this on, anybody holding the templates capability still edits, previews and
submits drafts, but only an admin puts a body in front of users.

It is off by default because it is a governance control that changes who may
publish, and imposing that on an existing organisation would strand whatever
drafts are already in flight behind a review nobody asked for.

See [publish approval](/signatures/approvals/) for the review cycle, what is
gated and what deliberately is not.

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
So an admin who wants them can stay on while a colleague who does not opts out,
and switching this setting back on never overrides somebody who asked to stop.

## Health digest

An email to every administrator summarising coverage, apply failures, directory
gaps and anything waiting on a decision.

Weekly, monthly and off are the three choices. See
[the health digest](/monitoring/health-digest/) for what it contains and why it
defaults to on.

Two buttons sit beside the setting.

Preview renders the digest your organisation would receive right now, inside the
page, and sends nothing. If your organisation is too new for one to be sent, the
preview still renders and says why it would be skipped.

Send me one mails it to you and to nobody else. A test that mailed the whole
leadership team is a button nobody would press.

Neither of them stamps the schedule. Trying the digest cannot push the real one
out by a week, which is the only reason it is safe to press either without
thinking about it.

## The Link domain card

Settings also carries the card for a
[branded link domain](/monitoring/branded-link-domain/), which is where the
hostname is claimed, watched while its certificate issues, and removed.

It is not one of the four switches above and has no default, because it is a paid
add-on rather than a choice about behaviour. The card is on the page whether or
not your organisation holds the add-on: without it, the card explains what the
feature does and points at Billing, rather than offering a button that would be
refused.

## Defaults and organisations that never open this page

An organisation that has never touched Settings gets the defaults above, and
Sigil does not distinguish that from one which chose them deliberately.

There is nothing to configure before the product works. Settings is where you go
to change a default, not a setup step.

## Who can change them

The settings capability, which only an Admin holds. Editors, Marketing, Viewers,
the Compliance role and the Billing role do not reach this page.

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

Somebody opting their own address out of product updates is not in your change
log. It is a choice about their own inbox rather than a change to your
organisation, and it applies wherever that address receives them.
