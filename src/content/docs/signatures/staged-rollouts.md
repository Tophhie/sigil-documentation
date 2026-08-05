---
title: Staged rollouts
description: Publish a template to a slice of your mailboxes first, let the add-in's own apply results decide whether it spreads, and have it roll itself back if they get worse.
sidebar:
  order: 11
---

An ordinary publish is instant and total. The moment it lands, every mailbox in
the organisation is on the new body. That is what you want for a corrected phone
number and less what you want for a rebrand across three thousand people.

A staged rollout publishes to a small percentage of mailboxes instead, watches
whether the add-in actually manages to apply the new version, and steps up only
while the results hold. If they get worse, it rolls itself back without anyone
being asked.

This is possible because Sigil already knows whether each signature was applied,
not merely served. See [activity and adoption](/monitoring/activity/) for where
that measurement comes from.

## Starting one

In the template editor, "Staged publish" sits next to Publish. It takes the same
body Publish would take. It is in the [designer](/signatures/designer/) as well
as the [HTML editor](/signatures/html-editor/).

It starts at 10% of mailboxes. Everyone else carries on receiving exactly what
they receive now.

There is at most one rollout per template. Starting a second supersedes the
first.

## What happens next

The rollout climbs through four steps, and every step has to earn the next one.

| Step | Share of mailboxes |
| --- | --- |
| 1 | 10% |
| 2 | 25% |
| 3 | 50% |
| 4 | 100%, then promotion |

An evaluator runs every 15 minutes and decides between four outcomes for each
running rollout: hold, step up, promote, or roll back.

| Gate | Default |
| --- | --- |
| Apply outcomes needed before any decision | 20 on the new version |
| Time each step must serve before it can advance | 60 minutes |
| Failure rate that can trigger a rollback | Above 10% |
| Margin over the current version needed to call it a regression | 5 percentage points |

The sample gate comes first, because three failures out of four is not evidence
of anything. The regression check comes before the soak timer, so a version that
is genuinely failing is pulled at the first opportunity rather than at the end of
its hour.

## Measured against the current version, not an ideal

A rollback needs the new version to be failing both above the threshold *and*
materially worse than the version it would replace.

That second condition matters more than it looks. An organisation with half its
fleet on an old Outlook build may already sit at an 8% apply-failure rate for
reasons that have nothing to do with any template. Comparing against an absolute
number would roll back every rollout it ever started. Comparing against the
version people are already receiving asks the only question worth asking: is this
one worse?

Both arms are counted from real apply outcomes over the same window. Neither is
assumed.

## The live template does not move

This is the property everything else rests on.

While a rollout runs, the template itself still holds the old body, and that is
what the majority keep receiving. The new body lives on the rollout, and is
swapped in only for mailboxes inside the slice.

Two things follow.

Rolling back is doing nothing. The organisation is already on the old version, so
there is no second publish that could itself go wrong and no window in which a
bad body is live for everyone. It takes effect at once.

Everything that does not know about rollouts keeps working correctly. Preview,
the download option and [test email](/admin/test-email/) all show the live body,
which is the one most people are getting.

## Which mailboxes are in the slice

Each mailbox gets a stable position derived from your tenant, the template and
the email address. A rollout serves the new version to everyone below its current
percentage.

Because the position is stable, raising the percentage only ever adds people.
Nobody is moved back onto the old version halfway through, which would otherwise
produce apply results attributed to the wrong version.

Because the template is part of the calculation, two rollouts on two different
templates do not land on the same unlucky tenth of the organisation every time.

You cannot choose the members of the slice. If you want a specific pilot group,
use an [assignment rule](/targeting/assignment-rules/) and a separate template
instead. The two answer different questions. A rule is a lasting difference in
what a group receives. A rollout is a temporary measure on the way to everybody
getting the same thing.

## Watching it

While a rollout is running, a panel sits above the editor. It shows the current
percentage, both versions' apply results side by side, and what the evaluator
will do at its next pass, in words rather than in numbers you have to interpret.

The panel is in whichever editor the template opens in, which is the one you
started the rollout from. It refreshes itself about once a minute, so the apply
counts move continuously even though a decision is only taken every fifteen
minutes.

A verdict of holding, with a count of apply outcomes against the 20 it needs,
means nobody in the slice has composed enough messages yet. That is the normal
state for the first stretch of a rollout, and it lasts longer in a small
organisation than a large one, because 10% of forty mailboxes is four people.

You do not have to open the template to find out that a rollout is running. The
Templates view badges anything in flight with its current percentage, which is
the only place that shows at a glance that part of the organisation is on a
different signature to the rest.

## Taking over from it

Two buttons in the panel override the schedule.

Promote publishes the new version to everyone immediately, skipping whatever soak
remains. Use it when you have seen enough.

Roll back abandons the rollout. The mailboxes in the slice return to the version
everyone else has been on all along. Nothing is republished.

Both are recorded in the [change log](/monitoring/change-log/).

## Promotion

Promoting writes the new body to the template, archives the outgoing body into
[version history](/signatures/versions/), and clears the draft, exactly as an
ordinary publish would.

The version string is the one the rollout has carried since it started. That is
deliberate: every apply outcome collected during the soak still refers to the
version that ends up live, so the numbers you used to make the decision continue
to describe something real afterwards.

## Publishing over a running rollout

An ordinary publish while a rollout is in flight cancels it. The measurements
compared the new version against a body that is no longer live, so they no longer
describe a choice anyone can make.

A [scheduled publish](/signatures/scheduled-publishing/) firing does the same
thing for the same reason, and records why.

Promotion is refused in the same situation. If the template was republished
behind the rollout's back, promoting it would quietly undo that publish.

## Starting one on a schedule

A rollout can be booked rather than started now, which is the difference between
switching everyone at midnight and beginning the rollout at midnight.

It then behaves exactly as one started by hand: it steps up as apply results come
in, and pulls itself back if the new body starts failing. See
[scheduled publishing](/signatures/scheduled-publishing/#scheduling-a-staged-rollout).

## Keeping the work if you abandon it

Rolling back does not return the abandoned body to the editor.

Save a draft before you start. A staged publish leaves the draft in place, unlike
an ordinary publish, which clears it. So the usual sequence is Save draft, then
Staged publish, and the work survives whichever way the rollout ends.

## When a rollout is not the right tool

It needs apply results to make a decision, and those come from people composing
messages. In an organisation of thirty, a 10% slice is three mailboxes, and the
rollout may sit at the sample gate for a long time. Promote it by hand once you
have looked at it, or publish normally.

It also assumes the add-in is deployed and reporting. During the initial
deployment, before propagation has finished, there is nothing to measure. Get to
a steady state first. See [planning a rollout](/start/rollout/), which covers
deploying the add-in across an organisation and is a separate exercise from this
one.

## What is recorded

Every transition is written to the [change log](/monitoring/change-log/): who
started the rollout, what each evaluation decided and why, and how it ended. A
rollback carries its reason, so the log shows the failure rates that caused it
rather than only the fact of it.

## Who can do it

Admins and Editors. It requires the same permission as publishing. See
[roles and capabilities](/reference/roles-and-capabilities/).

Where [publish approval](/signatures/approvals/) is switched on, starting and
promoting a rollout need an admin. Abandoning one does not, and deliberately so:
whoever spots a problem has to be able to stop it, and stopping a rollout returns
users to the body that was already approved.
