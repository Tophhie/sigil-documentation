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
| Licensed member mailbox | Yes |
| Shared or resource mailbox | No, unlicensed and therefore free |
| Guest account | No |
| Disabled account | No |

Shared mailboxes still get signatures. They just do not cost anything.

Note that [attribute coverage](/monitoring/attribute-coverage/) counts shared
mailboxes, because they still need a signature. Its total will not match your
seat count, and that is expected.

A daily job syncs your seat count to the subscription. Quantity changes do not
trigger a mid-cycle invoice, so drift never produces a surprise charge partway
through a month.

## The trial

The trial gives you real seats from day one. Nothing is charged until it ends.

At the end of the trial, Stripe converts the subscription itself:

With a card on file, it charges the card and the subscription becomes active.

With no card on file, it cancels the subscription. An organisation that never
adds a card simply stops rather than being billed by surprise.

## What happens if billing lapses

Once a trial ends without an active subscription, signatures stop. The add-in
receives a 402 and applies nothing.

The same applies to a subscription that becomes past due or is cancelled.

This is the first thing to check when an entire organisation loses its signatures
at once. See [troubleshooting](/deploy/troubleshooting/).

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

## Billing profile

The company details that appear on the invoice are held separately and pushed to
Stripe whenever you save them. See [billing profile](/admin/billing-profile/).

## Cancelling

Cancel through the Stripe customer portal, linked from the Billing view.

Signatures stop when the subscription is no longer active. To remove Sigil
properly, also withdraw admin consent in Entra and remove the add-in from
Integrated apps.

If you want your data deleted rather than left dormant, ask support to
deprovision the tenant. That cancels billing and purges every record, asset and
cached entry belonging to your organisation.

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
given the signature templates. It reaches the subscription, the billing profile
and the user list, and nothing else. See
[users and roles](/admin/users-and-roles/).
