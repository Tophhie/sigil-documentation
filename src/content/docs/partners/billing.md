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
tenant: licensed member mailboxes, with shared and resource mailboxes free, and
disabled accounts and accounts invited in from outside the client's organisation
excluded. See [what counts as a seat](/admin/billing/#what-counts-as-a-seat).

Mailboxes excluded through [cost management](/admin/cost-management/) come off
that count too, and they do so from the day the exclusion is made rather than at
a period boundary, because the usage is metered daily. Partner Owners and Admins
can exclude a client's mailboxes themselves, which is the point of it being a
separate permission from billing: the seats sit on your bill, so trimming them is
your business, while the client's own card and invoices are not.

Those counts are summed across your whole client base and reported once a day as
usage against a single metered subscription belonging to the partner. You are
invoiced monthly in arrears for what the period actually recorded.

There is no minimum volume and no minimum spend on the partner arrangement, so a
month in which you manage no billable mailboxes costs nothing. That is a
commitment in the [partner agreement](/partners/service-level/#no-minimums)
rather than a current concession.

That is a different model from a direct tenant, which carries a licensed seat
quantity that prorates when it changes. A partner has no quantity, so there is no
proration and no mid-cycle invoice. Clients joining and leaving during a month
show up in the month's usage rather than as adjustments.

A client whose Microsoft 365 consent has lapsed cannot be counted. It is reported
separately rather than aborting the aggregate, so one broken client does not stop
the other nineteen being billed. Those exceptions are worth chasing, since an
uncountable client is also one whose signatures may have stopped.

Your own tenant, the one holding your own signatures, is handled separately from
your clients' as part of the partner arrangement.

## Partner margin

A partner discount is applied to the aggregate subscription as a whole-percent
reduction off list.

Sigil pushes the current percentage to the subscription whenever it is set,
rather than only when the number changes. A discount that failed to attach the
first time is therefore corrected by setting it again.

A partner margin runs open-ended. The fixed-term discounts a direct tenant can be
given do not apply to the aggregate subscription, so a margin stays in force
until it is changed.

## Your invoice details

A partner has its own billing profile, separate from the one on its home tenant:
company name, billing email, billing address, and a VAT or tax identifier.

That separation exists because a partner is billed as its own customer. In
practice most MSPs want invoices reaching a generic accounts mailbox rather than
whichever engineer set the account up, and want their registered company name and
VAT number on the invoice regardless of what their own tenant record says.

The details are held in Sigil and pushed to your Stripe customer record when you
save them. If the push fails, you are told so explicitly rather than being shown
a success message while invoices continue to carry the old details. Save again to
retry.

The tax identifier type is derived from the country you set, so get the country
right first if both are changing. The same rules apply as for a direct tenant's
[billing profile](/admin/billing-profile/).

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

## What your invoice shows

The metered line on a partner invoice is a single figure: the seat count the
period billed on. That is enough to charge against and not enough to explain,
so Sigil writes the per-client split into the invoice's own footer.

The footer lists each client and its seats, largest first, then the total and
the number of clients it covers, then a link back to the usage report with that
invoice's period already selected. If there are more clients than the footer has
room for, the ones that do not fit collapse into a single counted line reading
how many were left and how many seats they hold, so the figures on the invoice
always add up to the total you were charged.

The breakdown is taken from the last day the period recorded, and the footer
names that date. Usage is metered on the final figure reported in a period
rather than on an average or a sum, so that day is the one the invoice is
actually made of. Any other day would print a breakdown that reads as
authoritative and does not reconcile.

Two cases produce no footer at all. A period holding no recorded usage, which
happens to a partner provisioned partway through a cycle, leaves the invoice
alone rather than printing a breakdown that cannot be true. So does a failure
while writing it: the annotation is cosmetic and is never allowed to interfere
with the invoice or with billing, so the invoice issues as normal with the
metered line and no footer.

Per-client detail on the invoice stops at the footer. Sigil does not split the
aggregate into a line per client or a subscription per client, because usage is
metered against the partner as one customer with no per-client dimension, and
giving each client a subscription of its own would replace your single monthly
invoice with one per client. The CSV export is the rebilling input, and it is
finer grained than any invoice line would be.

## Reconciling

The usage report offers your billed periods as buttons, one per recent invoice,
newest first. Each shows the month it covers and what it came to. Picking one
sets the report to exactly the window that invoice billed.

Those windows are read from the invoices themselves rather than counted back a
month at a time, because month lengths and the anchoring of your own billing
cycle both move the boundaries. A reconciliation window that is a day out is
worse than no shortcut at all, since it disagrees with the invoice it is meant
to explain without saying so.

The buttons are a convenience rather than the report. If they cannot be read
they simply do not appear, and the date fields still work as they always have.

Two further habits make month end easier.

Export usage for the closed period rather than the current one, so the numbers
are settled rather than moving.

Check the client list before exporting. It shows the seat count last recorded
for each client, so a figure that looks wrong for the size of the client is
worth chasing before the numbers reach your own billing run. Nothing on that
view compares the count to what you were invoiced, which is what the period
buttons are for.

## When a client's billing lapses

Partner-billed clients depend on the partner subscription rather than their own.
If the partner subscription goes past due, signatures eventually stop across every
managed client at once rather than at one of them.

There is a dunning window before that happens, and partway through it the
clients' own administrators are warned directly. Both the window and the point at
which clients are told are set by Tophhie Cloud rather than being fixed.

That last part is worth knowing before it happens. Your clients find out about a
billing problem on your account, which is a conversation better had in advance
than in response.

## Releasing a client

Releasing a client removes the partner link and their seats stop counting toward
your subscription. The tenant reverts to a direct tenant and becomes responsible
for its own billing.

Coordinate that with the client, since they will need to add a card to keep
signatures running.

## Who can see it

The Owner and Billing partner roles. Admin and Technician do not reach partner
billing. See [partner roles](/partners/roles/).
