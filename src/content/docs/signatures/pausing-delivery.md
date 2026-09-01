---
title: Pausing delivery
description: An organisation-wide off switch for what mailboxes receive, so a signature can be finished and proved before anybody gets it.
sidebar:
  order: 13
---

Pausing stops every mailbox in your organisation receiving a signature, and
changes nothing else. The library, both editors, the preview, the test email and
the per-mailbox download all keep working while it is on.

That asymmetry is the whole point. An organisation partway through a rollout has
the add-in reaching mailboxes in waves and a template that is not finished.
Without a pause, the only way to stop delivery is to leave the add-in undeployed,
which makes the deployment itself impossible to test. Pausing separates "is it
working" from "is it live".

## Where the switch is

On the Templates page, in the header of the In use card. It shows a Live or
Paused badge and a Pause or Resume button next to it.

Pausing asks you to confirm. Resuming does not, because resuming restores what
people already expect.

While delivery is paused the whole Templates page carries a notice saying so,
above everything else on it. Everything below that notice describes a signature
nobody is currently receiving, which is worth being told before you read it.

Changing it needs the assignment rules capability, which in practice means an
Admin. It is the same capability as choosing the active template, because these
are the same decision from two ends: one decides which signature a mailbox gets,
the other decides whether it gets one at all.

## What stops and what does not

| Surface | While paused |
| --- | --- |
| The add-in applying a signature in Outlook | Applies nothing |
| Download from the "My signature" pane | Refused |
| The template library, both editors, drafts and publishing | Unaffected |
| Preview, including preview against a named mailbox | Unaffected |
| [Test email](/admin/test-email/) | Unaffected |
| The admin-side per-mailbox download | Unaffected |
| [Assignment rules](/targeting/assignment-rules/), banners and footers | Unaffected, and still take effect when you resume |
| Seats and billing | Unaffected |

The last row is the one people expect to work differently. Pausing is a delivery
control, not a commercial one. Your seat count and your subscription carry on
exactly as they were, so pausing for a month does not reduce a bill. If the
reason to stop is cost rather than readiness, [excluding
mailboxes](/admin/cost-management/) is the tool that changes what you pay.

## Resuming

The next message anybody composes gets a signature. There is nothing to purge and
no cache to wait out, because the pause is checked before any cached signature is
consulted. A paused organisation is never served a stale copy of what it had
before.

## What it looks like elsewhere in the portal

Pausing and resuming are recorded in the [change log](/monitoring/change-log/) as
"Paused or resumed signatures", with who did it and when. Pressing the button for
the state already in force records nothing, so the log holds the two events that
matter rather than a run of repeats.

Requests refused because of a pause are recorded in
[activity](/monitoring/activity/) with an outcome of `paused`, and the event
search has a filter for them. They are recorded rather than dropped for the same
reason an excluded mailbox's request is: a stream of them tells you the add-in is
live and working, and the only thing stopping a signature is the switch.

The [health digest](/monitoring/health-digest/) leads with the pause and says the
coverage figures below it describe a deliberate choice. It also stops listing
mailboxes that have never had a signature applied, since under a pause that is
the whole organisation and none of it is a fault.

## Doing it from a script

`PUT /api/admin/signature-delivery` takes `{ "paused": true }` or `false`, and
`GET /api/admin/templates` reports the current state as `signaturesPaused`. An
[API key](/admin/api-keys/) can reach both, given the assignment rules capability
and, for the write, not being marked read-only.

Being reachable by a key is deliberate. Cutting delivery over during a mail
migration, or holding it while a rollout script runs, is the kind of step that
belongs in automation rather than in somebody remembering to press a button. See
the [API reference](/reference/api/).

## When to use it instead of something else

| Situation | Better tool |
| --- | --- |
| Setting up, and nobody should receive anything yet | Pause |
| Cutting over from another signature product | Pause, then resume once the old product is off |
| A specific mailbox should never get a signature | [Exclude the mailbox](/admin/cost-management/) |
| A change is risky and you want it to reach people gradually | [Staged rollout](/signatures/staged-rollouts/) |
| The current signature is wrong and an older one was right | [Restore a version](/signatures/versions/) |
| You want to stop paying | [Exclusions](/admin/cost-management/), or cancel in [Billing](/admin/billing/) |

A pause left on is silent to everyone except the administrators who can see the
portal. Nobody receives a warning that their signature has stopped, because from
a user's point of view nothing has broken. If signatures are missing across the
whole organisation and nobody knows why, this is the first thing to check. See
[troubleshooting](/deploy/troubleshooting/).
