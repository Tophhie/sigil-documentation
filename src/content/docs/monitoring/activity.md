---
title: Activity and adoption
description: See which mailboxes are getting their signature, which have never had one applied, and what each attempt actually did.
sidebar:
  order: 1
---

Client-side signature tools are usually blind to their own success. Something is
deployed, and whether it reaches anyone is a matter of faith and helpdesk
tickets.

Sigil measures it. The Activity view records both the signature requests it
serves and the outcome of every attempt to apply one, per mailbox.

## Two kinds of event

A request is logged when the API serves a signature: who asked, which mailbox it
was for, which template version, which compose type, whether it came from cache,
and the response status.

An outcome is reported by the add-in after each attempt: whether Outlook actually
accepted the signature, whether it was applied automatically or by hand, which
signature it was, the client platform, and the reason if it failed.

The distinction matters. A successful request proves the signature was *served*.
Only the outcome proves it was *applied*. The two records share a request id, so
they line up.

## What the view shows

A per-mailbox rollup, so you can see the state of any individual person.

A recent feed of events across the organisation.

Adoption statistics across the whole tenant.

The never-applied list, described below.

A Template changes card, which is where the
[change log](/monitoring/change-log/) is read in the portal. It lists the changes
that alter what goes out on somebody's mail and leaves out the administrative
churn around them, so that a card sitting under an adoption report answers the
question the report raises: what changed, and when, that might explain this.

## The never-applied list

This is the most useful thing in the view. It cross-references your directory
against the telemetry and lists mailboxes that have never successfully applied a
signature.

That is a different question from "who has failed", and a more useful one. A
mailbox that has never appeared at all does not show up in any failure report,
because nothing was ever reported for it. Comparing against the directory is what
surfaces it.

After a rollout, this list is where the remaining work is. Look for patterns: one
department, one office, one client platform. Those point at a deployment gap
rather than at individual problems.

It uses the same definition of your organisation as
[attribute coverage](/monitoring/attribute-coverage/): mailboxes belonging to
your own people, with accounts invited in from outside left out. Those accounts
compose through their own organisation's tooling, so listing them would fill the
list with people no deployment of yours will ever reach.

Mailboxes you have [excluded from Sigil](/admin/cost-management/) are left out
for the same reason. They are deliberately not being sent a signature, so listing
them as work outstanding would mean the list never emptied. That matters most for
the [health digest](/monitoring/health-digest/), which reports the same list by
email and would otherwise chase your administrators about them weekly, for ever.

The directory cross-reference is best-effort. If Graph is briefly unavailable the
rest of the telemetry still renders without it.

## What the numbers will not tell you

A report has to carry a verified identity, so anything that fails before a token
is in hand cannot be reported at all. Four reasons land there.

`no-item`, meaning there was no message being composed to put a signature on.

`unsupported`, meaning an Outlook client too old to support nested app
authentication, or one that does not offer the API that sets a signature.

`sign-in-required`, meaning silent authentication failed inside the event runtime,
which is the normal first-run case.

`sign-in-failed`, meaning the sign-in prompt itself was cancelled or did not
complete.

None of the four can be beaconed. They appear as a mailbox's absence from the
telemetry rather than as a recorded failure, which is another reason the
never-applied list matters more than a failure count.

The last of them is the one to hold on to when reading adoption numbers. Somebody
who dismisses the sign-in prompt leaves no trace whatsoever, so a low failure
count is not evidence that everybody is being reached.

`sign-in-required` self-heals once the person opens the "My signature" pane and
signs in. See [troubleshooting](/deploy/troubleshooting/).

From the token onwards, every outcome is reported, whether it succeeded or not.

## Automatic and manual

Outcomes record how the signature was applied:

| Trigger | Meaning |
| --- | --- |
| `auto-new` | Applied automatically when the message was started |
| `auto-from-changed` | Applied automatically when the sending account changed |
| `manual` | Applied by hand from the "My signature" pane |

A mailbox with only manual applications is a mailbox where automatic activation
is not working. That is worth investigating even though the person does have a
signature, because they are doing work the product is supposed to do for them.

## Refused requests

A request for a mailbox that has been
[excluded from Sigil](/admin/cost-management/) is recorded with an outcome of
`excluded` rather than being dropped. The event search filters on outcome, so
these can be pulled out on their own.

They are recorded rather than swallowed because an excluded mailbox should not be
asking for a signature at all. A steady stream of them means the add-in is still
deployed to somebody who no longer needs it, which is worth knowing.

## What the outcomes are used for besides reporting

Apply outcomes are also the input to
[staged rollouts](/signatures/staged-rollouts/). Each outcome names the version
it applied, so a rollout can count the new version's results and the current
version's separately and compare them.

A rollout with no telemetry behind it would have nothing to go on but the clock,
which is a schedule rather than a safety measure.

## What is stored

Metadata only. No tokens and no rendered HTML are recorded, so the telemetry
never contains anyone's signature or anyone's message content.

Every write is best-effort and off the critical path. Logging is deliberately not
allowed to slow or fail the signature somebody is waiting on, so a storage problem
loses telemetry rather than breaking signatures.

Nothing is pruned. The history is kept indefinitely.

See [data and privacy](/security/data-and-privacy/) for the full picture.

## Who can see it

Admins, Editors, Viewers and the Compliance role, which all hold monitoring. The
Marketing and Billing roles do not reach it.

Viewer exists largely for this view: a service desk needs to answer "is this
person's signature working" without being able to change a template.

## Related views

[Attribute coverage](/monitoring/attribute-coverage/) answers a different
question: not whether people are getting a signature, but whether the directory
has the data to fill one in.

The [change log](/monitoring/change-log/) records what administrators did rather
than what users received.
