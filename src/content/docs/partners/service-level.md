---
title: Support and service level
description: "What the partner agreement commits to: a 99.9% monthly uptime figure with service credits behind it, and where a client's support question goes."
sidebar:
  order: 5
---

An MSP is asked for commitments by its own clients that it cannot make unless
Sigil makes them first. The partner agreement carries two of them: an uptime
figure with credits behind it, and a response time on escalations.

Both are obligations in the agreement rather than sales copy, and both apply for
as long as you are an active partner. Neither is offered to a direct customer:
the [terms of use](/security/compliance/#published-legal-documents) make no
availability commitment, and the published support page states an aim rather than
a target you can hold anyone to.

## Who answers a client's question

Support is split, and the split follows what each side sells.

| Kind of request | Who handles it | Target |
| --- | --- | --- |
| General usage, configuration and day-to-day queries from your clients | You, as first line | Yours to set |
| An issue affecting the availability of the service itself: a bug, a regression, an outage | Escalate to Tophhie Cloud | Response within four business hours |
| General product queries you would rather not answer yourself | Tophhie Cloud, at lower priority | None |

First-line support is the part of the service you sell, so your clients should
come to you for it. That is also why the agreement does not stop you passing a
general product question on: it is handled, just behind anything that affects
whether the service is up.

Business hours are Monday to Friday, 9am to 5pm UK time, excluding public
holidays in England and Wales. A response means an acknowledgement and an initial
assessment. It is not a commitment to have fixed the problem in four hours, and
the agreement says so rather than leaving it to be inferred.

## The uptime commitment

Sigil commits to a monthly uptime of 99.9%. Availability of the service is
Tophhie Cloud's responsibility, and where a month falls short of that figure you
are entitled to a service credit.

Uptime is measured over each calendar month, as the proportion of the month in
which the service was available. The credit is a percentage of your fees for the
month the shortfall happened in:

| Monthly uptime | Service credit |
| --- | --- |
| Below 99.9%, at or above 99.5% | 10% |
| Below 99.5%, at or above 99.0% | 25% |
| Below 99.0%, at or above 95.0% | 50% |
| Below 95.0% | 100% |

For partners, this section of the agreement replaces the availability clause of
the general terms of use, which aims at a reliable service without guaranteeing
one. That replacement is what makes the figure an obligation rather than an
aspiration.

## What does not count as downtime

Two things are excluded from the calculation.

Scheduled maintenance is excluded where reasonable advance notice has been given.

So is unavailability of third-party services outside Tophhie Cloud's reasonable
control, which in practice means Microsoft 365 and the Microsoft Graph API, and
Cloudflare. Sigil reads your clients' directories through Graph and runs on
Cloudflare's edge network, so an outage at either is visible to your clients
without being something Sigil can fix or credit. See
[infrastructure](/security/infrastructure/) for what sits where.

An interruption to Sigil affects signature management rather than mail flow.
Sigil never gates the sending of email, so users keep sending during an outage;
what they lose is the signature being applied and the portal being reachable.

## Claiming a credit

Write to `support@usesigil.app` within 30 days of the end of the affected month.
The credit is applied to your next invoice. Credits are not paid out in cash.

The 30-day window is the part worth diarising. A credit is claimed rather than
applied automatically, so a month that qualified and went unclaimed stays
unclaimed once the window closes.

## No minimums

There is no minimum volume and no minimum spend. You are billed monthly in
arrears for the mailboxes you actually manage, so a month in which you manage
none costs nothing. See [partner billing](/partners/billing/) for how the count
is made.

## Accepting the agreement

Acceptance is recorded against the partner, with the accepted version, so what
was agreed and when is a record rather than an assertion.

Only a partner Owner can accept. It is a commercial and data protection
commitment made on behalf of the MSP, which is not something a technician should
be able to sign on a service desk shift.

Acceptance gates client work, not sign-in. A partner who has not accepted can
sign in and read the console, but inviting a client, requesting a transfer of an
existing tenant and releasing a client are all refused until they have. The
sub-processor chain has to be agreed before another organisation's data is handed
over.

When the substance of the agreement changes, the version in force moves and every
partner is asked to accept the new version. Until they do, the same three actions
are refused again. Signing in, reading the console and the clients you already
manage are unaffected, so a version bump does not interrupt a client's
signatures.
