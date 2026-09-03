---
title: Billing and subscription
description: How Sigil is priced, what counts as a seat, how the trial converts, and what happens if it lapses.
sidebar:
  order: 2
---

Sigil costs £0.70 per licensed mailbox per month, billed monthly, with every
feature included. There is a 14 day free trial.

Billing runs on Stripe. Your organisation is a Stripe customer with one per-seat
subscription.

## What counts as a seat

A seat is a licensed member mailbox.

| Mailbox type | Billed |
| --- | --- |
| Licensed member mailbox | Yes, unless you have excluded it |
| Shared or resource mailbox | No, unlicensed and therefore free |
| Account invited in from outside | No |
| Disabled account | No |
| A mailbox you have excluded | No |

Shared mailboxes still get signatures. They just do not cost anything.

An excluded mailbox is the one case where a mailbox is deliberately taken off
both the bill and the service at once. Mailboxes can be excluded one at a time,
or by naming an Entra group whose members should all come off. See
[cost management](/admin/cost-management/).

Where a group is excluded, its membership is re-read each night just before the
seat count is calculated, so a joiner or a leaver reaches the invoice within a
day of the change in your directory.

An account that was invited into your organisation stays outside the seat count
even if it was later converted to a member account and given a licensed mailbox
on one of your own domains. Microsoft Graph records how an account was created
and never rewrites it, so a long-term contractor who first arrived as a guest is
still recognisable as an invited account years later. The account type on its own
is not a reliable test, because an administrator can change it, and a B2B invitee
can be made a member from the start.

The exclusion is about counting, not about serving. If such a mailbox composes a
message it is still given its signature. It simply does not appear on the
invoice, in [attribute coverage](/monitoring/attribute-coverage/), or in the
directory picker used by test emails and downloads.

Note that [attribute coverage](/monitoring/attribute-coverage/) counts shared
mailboxes, because they still need a signature. Its total will not match your
seat count, and that is expected.

A daily job syncs your seat count to the subscription. Quantity changes do not
trigger a mid-cycle invoice, so drift never produces a surprise charge partway
through a month.

Your organisation is counted on its own rather than as one pass through a list of
every customer, so nobody else's directory problem reaches your invoice. A count
that could not be completed is not sent to Stripe at all: if Microsoft Graph
fails partway through reading your directory, Sigil retries and leaves the
previous quantity standing until a full read succeeds. A short read and a
complete one look identical once they are reduced to a number, which is why an
incomplete one is reported rather than billed.

## Paying for fewer mailboxes

Licensed mailboxes that never send mail from Outlook can be taken off the bill.
Excluding one stops its signature and removes its seat, and Sigil will point out
which mailboxes are candidates by naming the ones that have never applied a
signature. See [cost management](/admin/cost-management/).

## The trial

The trial gives you real seats from day one. Nothing is charged until it ends.

At the end of the trial, Stripe converts the subscription itself:

With a card on file, it charges the card and the subscription becomes active.

With no card on file, it cancels the subscription. An organisation that never
adds a card simply stops rather than being billed by surprise.

## What happens if billing lapses

Once a trial ends without an active subscription, signatures stop. The add-in
receives a 402 and applies nothing. A cancelled subscription stops them the same
way.

A failed payment does not stop them immediately. Stripe retries a declined card
over about three weeks, and signatures carry on throughout, so a card that
expired over a weekend is invisible to everybody except whoever reads the
notices. Sigil allows 21 days from the first failure, measured from the failure
itself rather than from each retry, and signatures stop at the end of that window
if the invoice is still unpaid.

Paying inside the window ends it. Nothing has to be reprovisioned and nothing was
lost, because nothing had stopped yet.

This is the first thing to check when an entire organisation loses its signatures
at once, along with whether
[delivery has been paused](/signatures/pausing-delivery/). See
[troubleshooting](/deploy/troubleshooting/).

Nothing is deleted when billing lapses. Templates, images, rules, banners and
footers all remain. Restoring an active subscription restores signatures.

## Adding and managing a card

Both are self-serve from the Billing view.

Add a card through Stripe Checkout. The card you add is promoted to the default
payment method for invoices automatically.

Manage cards and download invoices through the Stripe customer portal, also
linked from the Billing view.

## What the Billing view shows

Subscription status, seats in use, the card on file, and your most recent
invoice.

The per-seat price is shown for reference. The authoritative rate is the one held
in Stripe.

Where a discount has been agreed, the estimate line shows it too.

### The arrangement it names

The view leads with the commercial arrangement your organisation is actually on,
rather than leaving you to infer it from whether a card is present.

| Shown as | What it means |
| --- | --- |
| Trial | Free until the trial ends, then billed per seat |
| Per-seat | Billed monthly for the seats in use |
| Billed via partner | Your provider is invoiced for your seats and you are not billed directly |
| Comped | Free by arrangement. No card or subscription is required |
| NFR | Not for resale: free internal use while you are an active partner |
| Internal | Tophhie Cloud's own organisation |

The last three mean nobody is invoiced, and the view says so with a "Not billed"
badge and drops the subscription panel and the billing details form entirely.
There is nothing to fix, so offering a card to add would only invite somebody to
try. Those organisations also see both billing steps on the
[Getting started checklist](/admin/getting-started-checklist/) marked optional.

Billed via partner is not the same as being free. Somebody is invoiced for those
seats, it is your provider rather than you, and the view names them and the seat
count they are carrying on your behalf.

The arrangement is worked out from your account rather than stored as a label of
its own, so it cannot fall out of step with what actually gets charged.

## Discounts

A discount is agreed with Sigil rather than entered in the portal. There is no
coupon field. Once it is in place, the Billing view shows it on the estimate line
as a percentage off the per-seat price, and the estimated monthly figure above it
already has the reduction applied.

A discount either runs open-ended or for an agreed number of months, up to five
years. Where there is an end date, the Billing view prints it next to the
percentage, so the date the price changes is visible well before it arrives.

The same reduction is attached to the Stripe subscription, so the invoice and the
estimate agree rather than being two separate numbers that have to be reconciled.

When an agreed term runs out, the discount stops applying and invoices return to
full price. Nothing is charged retrospectively, and nothing needs cancelling. The
portal stops showing the discount on the day it lapses rather than whenever Sigil
next tidies its own records, so the estimate never advertises a reduction that is
no longer reaching the invoice.

A term is counted in whole months from the day the discount is attached. That is
how Stripe counts a repeating discount, so a discount cannot be set to run until
a particular calendar date. Two consequences are worth knowing:

A discount attached during the trial starts counting from then, so a 14 day trial
uses part of the first month before anything is charged.

Cancelling and later reactivating does not restart the term. Only the months
still outstanding carry onto the new subscription, rounded up to the next whole
month.

## Billing profile

The company details that appear on the invoice are held separately and pushed to
Stripe whenever you save them, and an edit made in the Stripe customer portal is
mirrored back here. See [billing profile](/admin/billing-profile/).

## Cancelling

Cancel through the Stripe customer portal, linked from the Billing view.

Signatures stop when the subscription is no longer active. To remove Sigil
properly, also withdraw admin consent in Entra and remove the add-in from
Integrated apps.

If you want your data deleted rather than left dormant, ask support to
deprovision the tenant. That cancels billing and purges every record, asset and
cached entry belonging to your organisation, bar the two exceptions set out in
[data and privacy](/security/data-and-privacy/).

## Managed by a partner

If a managed service provider runs Sigil for you, your organisation has no
subscription of its own. Your seats are counted into your partner's consolidated
subscription and your partner bills you through their own arrangement.

The Billing view reflects that rather than offering you a card to add. See
[partner billing](/partners/billing/).

## Who can see billing

Admins and the Billing role. Editors, Marketing, Viewers and Compliance do not
reach it.

The Billing role exists so the person who pays for Sigil does not also have to be
given the signature templates. It reaches the subscription, the billing profile,
[cost management](/admin/cost-management/) and the user list, and nothing else.
See [users and roles](/admin/users-and-roles/).

Cost management is a separate permission from billing rather than part of it, so
that a managed service provider can reach it for a client without also reaching
that client's card and invoices.
