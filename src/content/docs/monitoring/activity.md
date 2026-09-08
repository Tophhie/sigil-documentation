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

An Admin and support activity card, which carries the other half of the same log:
role and user changes, settings, exclusions, API keys and profile field
definitions, plus anything Tophhie Cloud support did on your organisation. Those
support entries read "Sigil operator" and carry a "Sigil support" badge, so a
change your own people did not make does not read as though one of them did.
See [actions taken by Tophhie Cloud
support](/monitoring/change-log/#actions-taken-by-tophhie-cloud-support).

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

## When the service could not be reached

Two reported reasons look alike and mean different things, and telling them apart
is what stops a network problem being filed as a Sigil outage.

| Reason | Meaning |
| --- | --- |
| `server-error` | Sigil answered, and the answer was not one the add-in expected |
| `unreachable` | The request produced no answer at all: a dropped connection, a timeout, or something on the network blocking it |

A `server-error` also carries the HTTP status behind it, recorded on the event
rather than printed on the badge. It is the half that tells support what
happened, and it comes back with the event through the API and in a mailbox's
[data export](/security/data-and-privacy/).

The distinction is worth holding on to. A recorded 500 is Sigil answering badly
and worth raising with support. `unreachable` is Sigil not being reached at all,
which points at the network between Outlook and `portal.usesigil.app` rather than
at the service. See
[troubleshooting](/deploy/troubleshooting/#is-something-on-your-network-eating-the-request).

A refusal Sigil makes deliberately is never either of these. It is recorded as a
refusal in its own right, described below.

Neither reason appears when the mailbox still has a usable copy of its last
signature on the device. Sigil could not be reached, but the person did get a
signature and the message went out with it, so the attempt is recorded as
applied. That is why `unreachable` is a thinner signal than it used to be: it now
means an unreachable service and no kept copy to fall back on, which is a first
compose, a new device, or a mailbox that has not written anything for 45 days.
See [why it sometimes changes as you watch](/users/how-your-signature-works/#why-it-sometimes-changes-as-you-watch).

## Refused requests

Some requests are declined on purpose. They are recorded rather than dropped,
and the served request says which decision was taken:

| Outcome | Meaning |
| --- | --- |
| `excluded` | The mailbox is [kept out of Sigil](/admin/cost-management/), either by being excluded or by never being included |
| `paused` | [Delivery is paused](/signatures/pausing-delivery/) for the whole organisation |
| `billing-inactive` | The trial has ended or the subscription is no longer active. See [what happens if billing lapses](/admin/billing/#what-happens-if-billing-lapses) |
| `not-found` | The address resolved to no mailbox in your directory |

The event search has a filter for each, so any of them can be pulled out on its
own.

They are recorded rather than swallowed because each answers a question somebody
is actually asking. An excluded mailbox should not be requesting a signature at
all, so a steady stream of them means the add-in is still deployed to somebody
who no longer needs it. A run of `paused` entries means the opposite of a fault:
the add-in is deployed, reaching the service and being answered, and the only
thing between those people and a signature is a switch in the portal.
`billing-inactive` is the one to read as urgent, because nobody at the
organisation is being served while it is appearing.

### What the add-in calls the same refusal

Those outcomes are what the service records against the request it declined. The
add-in files its own report for the same attempt, and it does not use the same
words, so a single refusal reaches the feed twice under two different names.

| Reason | Meaning |
| --- | --- |
| `not-activated` | The service declined for a reason that is not a billing one |
| `subscription-inactive` | The trial has lapsed or the subscription was cancelled |

`not-activated` covers several situations at once: an organisation that has not
finished onboarding, one that is suspended, delivery paused for everybody, and a
mailbox the cost management list does not cover, whether by being excluded or by
never being included. The add-in draws no distinction between them because none
of them is anything the person composing can do about, and a message naming the
specific one would only invite them to try. The served request beside it carries
the decision that was actually taken, which is where to look when the badge is
not enough.

The line the add-in does draw is between the service declining and the service
failing. Without it, a lapsed subscription would read to somebody as a network
problem they could fix by retrying.

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
