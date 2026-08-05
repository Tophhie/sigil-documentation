---
title: Health digest
description: A regular email to your administrators summarising signature coverage, failures and anything waiting on a decision.
sidebar:
  order: 5
---

Sigil is invisible when it works, which is the point of the product and also a
problem. An administrator who never opens the portal has no way of knowing
whether 100% or 60% of their mailboxes are actually getting a signature.

The health digest is the answer. It takes what the portal already holds and mails
it to your administrators, so the numbers arrive without anyone going to look for
them.

## What it contains

| Section | What it says |
| --- | --- |
| Coverage | What share of your mailboxes have ever applied a signature successfully, and up to five that never have |
| Apply failures | How many attempts Outlook did not accept, across the organisation |
| Directory gaps | Attributes your live templates reference that a meaningful share of mailboxes do not have |
| Banners closing | Any [campaign banner](/targeting/banners/) whose window ends within a week |
| Waiting on approval | Drafts submitted for review and not yet decided |
| Booked publishes | Any [scheduled publish](/signatures/scheduled-publishing/) not yet fired |
| Running rollouts | Any [staged rollout](/signatures/staged-rollouts/) in flight, and what percentage it is at |

Empty sections are left out rather than printed as zeroes.

## Directory gaps are scoped to what you actually use

The gaps section does not report on every attribute a template could reference.
It reports on the ones your live templates actually depend on, including the
fields that only appear as conditions on a section.

That is the difference between a useful line and noise. Nobody needs telling that
`extensionAttribute12` is unpopulated if no template mentions it.

An attribute has to be missing on at least 10% of mailboxes before it is
mentioned. Below that it is ordinary sparseness, and a handful of people without a
mobile number is not something worth mailing anybody about.

A placeholder that is not a real field is reported too, since a mistyped
placeholder resolves to nothing for everybody, which is exactly the kind of thing
worth surfacing.

[Attribute coverage](/monitoring/attribute-coverage/) in the portal is the fuller
version of the same audit, and the place to go once the digest has told you there
is something to look at.

## A healthy week still gets a digest

The digest reports rather than alerts. An organisation with nothing wrong gets a
short one, with a subject line saying so.

This is deliberate. A message that only arrives when something is broken is an
alert, and alerts do not tell you the product is working. "You are at 98%,
nothing to do" is the message that makes the coverage number visible.

The subject line leads with the number that matters, so the digest is useful from
the inbox list without being opened.

A running rollout and a booked publish appear in the digest but do not make it an
attention-needed one. They are things you set up on purpose.

## How often it arrives

| Setting | Behaviour |
| --- | --- |
| Weekly | The default |
| Monthly | For organisations where weekly is more than they want |
| Off | No digest at all |

Change it in [settings](/admin/settings/). Every digest carries a link to that
page, so turning it down or off never means hunting for the switch.

It defaults to on because a digest nobody discovers is a digest nobody reads. It
is a service email about your own organisation, with an off switch linked from
every send.

## Who receives it

Every administrator of the organisation.

An organisation with no administrators yet, which happens partway through
onboarding, is not sent one and is not marked as having received one. It gets its
first digest once somebody is there to read it.

Suspended organisations and those inside a deletion grace window are not sent
digests either. Neither wants a weekly report about signatures it is not
receiving.

## When it does not arrive

A brand new organisation with no directory read and no activity at all is skipped
until there is something to say. A mail full of zeroes reads like a fault.

If the directory could not be read on the day a digest was built, the digest is
still sent but omits the coverage section rather than reporting 0%, which would
be alarming and wrong.

Digests are sent in batches, so on a busy day an organisation may receive one a
little later than usual. Nothing is skipped: the ones waiting longest are first
in line on the next run.

## Where the numbers come from

Coverage counts a mailbox as covered once the add-in has reported applying a
signature successfully at least once. That is evidence Outlook actually took the
signature, rather than evidence Sigil served one, and the two are not the same
thing.

The same telemetry drives the [activity view](/monitoring/activity/), which is
where to go for per-mailbox detail. The digest is a summary of it, not a separate
measurement.

## What it is not

It is not an alerting system. There is no threshold you can set, nothing pages
anybody, and a digest is not sent early because something broke.

If a signature stopped working an hour ago, the digest is the wrong tool. Open
[activity](/monitoring/activity/).
