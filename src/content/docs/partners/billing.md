---
title: Partner billing and rebilling
description: One consolidated subscription across every managed client, with per-client usage you can export for your own invoicing.
sidebar:
  order: 4
---

A partner receives one bill covering every managed client. Individual clients
have no subscription of their own.

## How it works

Each managed client's billable seats are counted the same way as for a direct
tenant: licensed member mailboxes, with shared and resource mailboxes free and
guests and disabled accounts excluded.

Those counts are summed across your whole client base and pushed to a single
per-seat Stripe subscription belonging to the partner. A daily job keeps the
quantity in step, and quantity changes do not trigger a mid-cycle invoice.

Your own tenant, the one holding your own signatures, is handled separately from
your clients' as part of the partner arrangement.

## Partner margin

A partner discount is applied to the aggregate subscription as a whole-percent
reduction off list.

## What clients see

A managed client's Billing view reflects that their organisation is billed
through their partner. There is no card for them to add and no subscription for
them to cancel, because neither exists at their level.

Everything else in their portal works normally.

## Rebilling

The Usage and rebilling view carries per-client seat counts for the current and
prior periods, exportable as CSV.

That export is the input to your own billing system. It gives you the seat count
per client per period, which is what you need to rebill at whatever rate your own
arrangement uses.

Sigil does not produce client-facing invoices on your behalf. The commercial
relationship with the client is yours.

## Reconciling

Two habits make month end easier.

Export usage for the closed period rather than the current one, so the numbers
are settled rather than moving.

Check the client list for seat drift before exporting. The Clients view surfaces
clients whose counted seats differ from what is being billed, which is usually
somebody joining or leaving mid-period.

## When a client's billing lapses

Partner-billed clients depend on the partner subscription rather than their own.
If the partner subscription becomes past due or is cancelled, signatures stop
across every managed client at once.

That is worth knowing before it happens, because the failure mode is broad rather
than isolated.

## Releasing a client

Releasing a client removes the partner link and their seats stop counting toward
your subscription. The tenant reverts to a direct tenant and becomes responsible
for its own billing.

Coordinate that with the client, since they will need to add a card to keep
signatures running.

## Who can see it

The Owner and Billing partner roles. Admin and Technician do not reach partner
billing. See [partner roles](/partners/roles/).
