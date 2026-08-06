---
title: Settings
description: The organisation-wide switches, what each one changes, and who can change them.
sidebar:
  order: 7
---

Settings holds the choices you make about how your own organisation behaves, as
opposed to the things Sigil sets for you.

There are three.

| Setting | Default | What it changes |
| --- | --- | --- |
| Require approval to publish | Off | Publishing, restoring a version, staging a rollout and scheduling any of it need an admin |
| Profile editing | Off | Whether colleagues can fill in their own custom signature details |
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

Changing any of the three writes a [change log](/monitoring/change-log/) entry
under the Changed settings action, with who changed it and when. Sending yourself
a digest is recorded there too. Previewing one is not, because nothing left the
building.
