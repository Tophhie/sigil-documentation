---
title: Scheduled publishing
description: Book a template to go live at a chosen instant, so a rebrand lands at midnight without anybody staying up for it.
sidebar:
  order: 10
---

Banners have always been time-boxed, but publishing a template has always meant
now. A rebrand that has to land at 00:01 on the first of the month therefore
meant somebody being awake for it.

A scheduled publish books the change instead. You choose the instant, Sigil
publishes it.

## Booking one

Schedule sits alongside Publish in both editors. You give it a date and a time in
a time zone you choose, and Sigil converts that to a fixed instant.

The [designer](/signatures/designer/) reads the time in your own time zone rather
than offering a picker, which is the difference worth knowing if you are booking
a publish for an office in another country. Book it from the
[HTML editor](/signatures/html-editor/) if you need to name the zone, or convert
it yourself.

The same checks a publish runs apply when you book it: the rendered signature has
to fit inside Outlook's 30,000 character limit, a
[designer](/signatures/designer/) template has to validate, and publishing plain
HTML over a designer template is refused unless you confirm it. A schedule that
would be rejected at midnight is rejected now instead.

There is one pending schedule per template. Booking a second replaces the first
rather than queueing behind it.

A publish can be booked up to 365 days ahead. That is not a technical ceiling. A
schedule set three years out fires against a template library nobody remembers
configuring, carrying a body captured against a design system that has since
moved on.

## What actually gets published

The body is captured when you book the schedule, not read from the draft when it
fires.

This matters more than it sounds. If a schedule read the draft at midnight, every
edit made in between would silently change what went live, and nobody would find
out until the morning. A schedule is a decision that has been taken, so it holds
its own copy.

The consequence is that editing the draft afterwards does not change what is
booked. If you want the newer body to go live, book the schedule again.

The editor carries a banner for as long as a schedule is pending, so a hotfix
published today cannot be quietly undone overnight by a schedule nobody
remembered. The Templates view shows a Scheduled badge for the same reason,
which is the version of the warning you see without opening anything.

## When it fires

Schedules are checked every fifteen minutes. A publish lands within fifteen
minutes after its instant, and never before it.

Sigil says "within fifteen minutes" rather than implying second precision,
because that is what it can honestly promise. If you need something to be live by
09:00, book it for 08:30.

A schedule missed while Sigil was unavailable fires late rather than never. Late
is recoverable and visible. Never is neither.

## Scheduling a staged rollout

A schedule can start a [staged rollout](/signatures/staged-rollouts/) instead of
publishing outright.

That is the difference between "switch everyone at midnight" and "begin the
rebrand rollout at midnight". The rollout then behaves exactly as one you started
by hand: it steps up as the add-in reports the new version applying, and pulls
itself back if it starts failing.

## Publishing over a schedule

A schedule that fires while a rollout is running cancels that rollout.

This is the same rule a manual publish follows. The baseline the canary was
measuring against is no longer live, so its numbers describe a choice nobody can
make any more. The change log records the cancellation and its reason.

## Cancelling

Cancelling a booked publish leaves the live body exactly as it was, because
nothing had changed yet. There is nothing to undo.

## If it fails

A schedule that cannot publish is marked failed with the reason, and the row is
kept rather than removed, so "what happened to the midnight publish?" has an
answer the next morning.

The commonest reason is that the template was deleted between booking the
schedule and it firing.

A failed schedule is not retried. A publish that threw once will almost certainly
throw again fifteen minutes later, and a schedule silently retrying forever is
worse than one you can see has failed and why.

## What is recorded

Booking, cancelling and firing each write a [change log](/monitoring/change-log/)
entry under the Scheduled publish action.

A schedule that fires is recorded against the person who booked it rather than
against the system. A person decided this would happen, and the log should name
them rather than make the publish look like it came from nowhere.

## Who can do it

Anyone holding the templates capability, which is Admins and Editors.

Where [publish approval](/signatures/approvals/) is switched on, scheduling
needs an admin as well. Booking a publish is publishing, just later, so gating
only the immediate route would leave "schedule it for one minute's time" as the
way around the control.
