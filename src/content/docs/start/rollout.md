---
title: Planning a rollout
description: A phased plan for deploying Sigil across an organisation, from pilot group to tenant-wide.
sidebar:
  order: 5
---

The technical work in deploying Sigil is small. The scheduling around it is what
tends to catch people out, mostly because add-in propagation is measured in hours
and rarely finishes when you would like it to.

This is a plan that works for organisations of a few hundred to a few thousand
mailboxes.

## Before you start

Two facts shape the whole schedule.

Add-in propagation takes 6 to 72 hours after you deploy through Integrated apps.
Nothing you do makes it faster, and treating a missing add-in as a fault inside
that window wastes time.

Any later change to the manifest requires admin consent again, and users are
blocked from the add-in until it is granted. Template changes, image changes and
add-in code changes do not touch the manifest, so day-to-day work is unaffected.
Getting the manifest right before you go tenant-wide is worth the effort.

## Phase 1: connect and design

Grant [admin consent](/deploy/connect-your-organisation/) and sign in to the
portal. Nothing is deployed to users yet, and nothing is charged.

Build the signature you actually want. If you are migrating from another product,
recreate the existing design so the change is invisible to recipients. Use the
[designer](/signatures/designer/) if you want a visual surface, or the
[HTML editor](/signatures/html-editor/) if you need exact control.

Run [attribute coverage](/monitoring/attribute-coverage/) before you commit to a
design. It shows which directory attributes are actually populated across your
organisation. Designing a signature around `department` only to find a third of
the directory has none is an avoidable problem, and it is much cheaper to find
now than after rollout.

Fix the directory gaps you find, or design around them with
[conditional sections](/signatures/placeholders/#conditional-sections).

## Phase 2: pilot

Deploy the manifest through Integrated apps, targeting a small group. Ten to
twenty people from more than one department is usually enough, and picking people
across Windows, Mac, web and mobile gives better coverage than picking a whole
team on one platform.

Wait out the propagation window. Then check [Activity](/monitoring/activity/):
you are looking for signature requests arriving, apply outcomes succeeding, and
nobody stuck in the never-applied list.

Ask the pilot group to check replies and forwards as well as new messages, and to
send at least one message from a shared mailbox if they use one.

## Phase 3: refine

The pilot usually surfaces two kinds of change.

Design issues, such as a logo that is too large in Outlook on Windows or an
address block that collapses awkwardly when someone has no office location.
These are template edits and land within seconds.

Targeting issues, such as one department needing different contact details or a
subsidiary needing its own branding. That is what
[assignment rules](/targeting/assignment-rules/) are for. Rules changes reach
everyone within ten minutes.

Add a [compliance footer](/targeting/footers/) at this stage if legal needs one.
It applies below every signature at render time, so it does not need to be worked
into any template.

## Phase 4: tenant-wide

Widen the Integrated apps assignment to the whole organisation, or to the groups
you intend to cover. Allow the propagation window again.

Watch the never-applied list in Activity over the following week. It
cross-references the directory, so it surfaces mailboxes that have never had a
signature applied rather than just showing you the ones that have.

Expect a small tail. The most common cause is the first-run silent sign-in
failing, which resolves when the person opens the "My signature" pane once on a
desktop client. Consent is per user rather than per device, so one desktop
sign-in fixes their mobile too.

## Phase 5: hand over

Once the rollout is stable, decide who owns what:

| Area | Usual owner | Portal role |
| --- | --- | --- |
| Templates, images, versions | IT or internal comms | Editor |
| Campaign banners and link analytics | Marketing | Marketing |
| Footers, users, billing | IT | Admin |

Invite them under [users and roles](/admin/users-and-roles/). The Marketing role
reaches banners and link clicks only, which is usually exactly what a marketing
team needs and nothing more.

Add a card in [Billing](/admin/billing/) before the trial ends. With no card on
file the subscription cancels at trial end, and once the trial ends without an
active subscription signatures stop being served.

## A note on running two products at once

If you are migrating from a server-side product that stamps signatures in mail
flow, run one or the other. Sigil applies the signature in the compose window,
so a server-side stamp on top of it produces two signatures on every message.

Turn the old product off for the pilot group at the same time as you deploy Sigil
to them, rather than sequencing the two.
