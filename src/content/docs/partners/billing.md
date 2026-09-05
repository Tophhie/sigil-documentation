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

A suspended client counts as zero seats from the day it is suspended. Its
signatures have stopped, so billing you for its mailboxes would be charging for
nothing. It stays on the client list and in the invoice footer at zero rather
than disappearing, so the line you are used to seeing is still there and visibly
at nought, which is easier to reconcile than a client that silently vanished from
one period to the next.

Your own tenant, the one holding your own signatures, is handled separately from
your clients' as part of the partner arrangement.

## Partner margin

A partner discount is applied to the aggregate subscription as a whole-percent
reduction off list.

Sigil pushes the current percentage to the subscription whenever it is set,
rather than only when the number changes. A discount that failed to attach the
first time is therefore corrected by setting it again.

A margin can run open-ended or for an agreed number of months, up to five years.
Where there is an end date, the Partner billing page prints it beside the
percentage, so the date your rate changes is visible well before it arrives.

A term is counted in whole months from the day the margin is attached, which is
how a repeating discount is counted on the subscription itself. A margin cannot
therefore be set to run until a particular calendar date, and cancelling and
reprovisioning does not restart the term: only the months still outstanding
carry over, rounded up to the next whole month.

When the term runs out the margin stops applying and invoices return to list.
Nothing is charged retrospectively and nothing needs cancelling.

## Your invoice details

Your partner invoices are addressed from your own organisation's
[billing profile](/admin/billing-profile/): company name, billing email, billing
address, and a VAT or tax identifier. It is the same record your own tenant's
Billing view holds, not a second one kept alongside it.

One record, because a legal name, a registered address and a VAT number are facts
about an organisation rather than about which agreement an invoice is issued
under. Your own tenant is not invoiced while the partnership is running, so you
are never billed under both at once, and two independently editable copies only
ever drifted apart.

It can be edited from your Partner billing page or from your own tenant's Billing
view, and either way it is pushed to both Stripe customers, so the two can never
disagree about who you are. Operators can also correct it on your behalf, which is
what unsticks an invoice that has nowhere to go.

The details are held in Sigil and pushed to Stripe when you save them. If the push
fails, you are told so explicitly rather than being shown a success message while
invoices continue to carry the old details. Save again to retry.

Until the profile carries a legal name and a full postal address, the Clients page
prompts for it. That prompt appears once your partner agreement is accepted, since
that is when billing starts to exist, and only to the Owner and Billing
[roles](/partners/roles/). Nobody else can act on it, so for them it would be
noise.

The tax identifier type is derived from the country you set, so get the country
right first if both are changing. The same rules apply as for a direct tenant's
[billing profile](/admin/billing-profile/).

The profile outlives the partnership. If you
[leave the programme](/partners/leaving-the-programme/), the same details go on to
address your organisation's own direct invoices.

## How you pay

By card, or on invoice terms where those have been agreed. Both work exactly as
they do for a direct organisation, and
[invoices and credits](/admin/invoices-and-credits/) covers them in full. What
follows is what differs for a partner.

Your invoices are listed on the Partner billing page, newest first, each linking
to its own hosted page to view, download or pay it. That list is your partner
account's, not your own tenant's: your own organisation is not invoiced while
the partnership is running, so its Billing view has nothing of its own to show.

On invoice terms nothing on the page asks for a card, because none is involved.
The card panel is replaced by the terms you are on, and the warning about
metered seats with no card does not appear.

Paying by bank transfer, quote the invoice number as the payment reference. A
transfer that arrives without one sits on your account and the page says so,
naming the amount waiting to be matched. Somebody applies it by hand within a
working day.

Credits and corrections applied to your partner account are listed on the same
page with the reason each was agreed, including any
[service credit](/partners/service-level/#claiming-a-credit) for a month that
fell short of the uptime commitment. A credit comes off a following invoice
rather than being paid out.

A credit waiting on the account is shown above the invoices as well, so it is
visible before the invoice that consumes it arrives.

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

You hear first. The moment a payment fails, Sigil emails your own billing
contacts: the billing email on your [invoice details](#your-invoice-details) if
you have set one, and every Owner and Billing member of your partner staff. The
message names the date signatures stop across your client base if the invoice is
still unpaid by then. That is separate from Stripe's own dunning mail, which also
goes out from the first failure and which the Sigil notice exists to back up, for
the account whose Stripe contact address was never filled in.

A repeated failure on the same unpaid invoice does not send another one, and does
not move the date. The clock runs from the first failure, so retrying a card that
declines again neither buys time nor costs any.

On invoice terms the same message is worded for an overdue invoice rather than a
declined card, and points at the invoice list rather than at a payment method.
Telling an accounts team their card failed sends them looking for a card that
does not exist.

That your clients are told directly is worth knowing before it happens. They find
out about a billing problem on your account, which is a conversation better had
in advance than in response.

### The console warns you too

A warning sits at the top of every page of the partner console while either of
the two things that stop your clients is heading that way, so an outstanding
invoice is not something only the email finds you about.

A failed payment is warned about for as long as the grace period has left, naming
the day your clients' signatures stop and how many days that is.

Billable seats on the meter with no card on file are warned about as soon as the
meter has something on it. There is no trial to run out here, because a partner
is invoiced in arrears: the moment a client's seats are being counted an invoice
is accruing, and with no card that invoice fails. That warning does not appear on
invoice terms, where no card is expected.

The warning goes to partner staff who can act on billing, and can be put off for
the rest of the browser session. It takes precedence over anything the console
would otherwise say about your own organisation, because your payment stopping
every client at once is the larger thing to know. It steps aside while you are
working inside a managed client, where that client's own state is what matters.

## When the grace period runs out

Signatures stop for every client you manage. They do not stay stopped
indefinitely, because clause 7.2 of the agreement reserves the right to return
any of those clients to billing in their own name so their service can resume
without waiting for you.

A client returned that way keeps its tenant, templates, brand assets and people,
and gets the same window to add a payment method that any direct customer gets.
What ends is your access to it.

This is a decision taken client by client rather than a job that sweeps through
your book of business, so a partner who is a day late does not lose everyone.
Tophhie Cloud is not obliged to return any particular client or to do it at any
particular time, and will tell you which clients have been returned.

Bringing the account up to date before a client has been returned restores
everything, with nothing lost. That is the part that rewards acting early: the
window between the grace period ending and a client being handed back is the last
point at which paying fixes it outright.

Once a client has been returned, the route back is a transfer request that the
client itself approves. Tophhie Cloud can also relink an organisation by hand,
and will do that only at the organisation's own request, which an operator has to
confirm they hold before the link is made. A company is not moved between billing
arrangements twice on a provider's say-so.

## If you become insolvent

Clause 7.3 covers administration, liquidation, an arrangement with creditors,
ceasing to trade, or anything materially equivalent in any jurisdiction. In those
circumstances your partner account may be suspended and every client you manage
returned to billing in their own name straight away, without the grace period in
7.1.

You, or whoever is then acting for you, are told, and so are each client's
administrators. The clause is not a judgement about your business. Those
organisations' signatures depend on a billing relationship that has stopped
working, and they are not party to it.

## Releasing a client

Releasing a client removes the partner link and their seats stop counting toward
your subscription. The tenant reverts to a direct tenant and becomes responsible
for its own billing.

Coordinate that with the client, since they will need to add a card to keep
signatures running.

## Who can see it

The Owner and Billing partner roles. Admin and Technician do not reach partner
billing. See [partner roles](/partners/roles/).
