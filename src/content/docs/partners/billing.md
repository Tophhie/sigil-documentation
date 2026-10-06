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

Mailboxes kept out of Sigil through [cost management](/admin/cost-management/)
come off that count too, from the next daily measurement rather than at a period
boundary. Because your charge is an [average of the days](#how-the-average-is-worked-out),
an exclusion made late in the month takes only the remaining days off. A mailbox
trimmed on the 29th has still been served for 28 days, and is billed for them.
Partner Owners and
Admins can make those changes on a client themselves, which is the point of it
being a separate permission from billing: the seats sit on your bill, so trimming
them is your business, while the client's own card and invoices are not.

That includes switching a client to inclusion mode, where only the mailboxes you
list are served and billed. It is worth being deliberate about, because the
switch necessarily starts from an empty list, and an empty inclusion list means
none of that client's people receive a signature until you add them.

Those counts are measured every night across your whole client base and reported
as usage against a single metered subscription belonging to the partner. You are
invoiced monthly in arrears, and the charge is the average of the nightly
measurements across the billing period. The Partner billing page and every
averaged invoice put it in one sentence: "Your monthly charge is the average of
the daily billable mailbox measurements across the billing period."

That is what clause 6 of the [partner agreement](/partners/agreement/) already
says, that usage is measured daily and you pay for the mailboxes you actually
manage. Moving to the average did not change the agreement, its version or the
price, so nobody was asked to accept it again.

The list prices on your Partner billing page exclude VAT, as the page itself
says. Where VAT applies, Stripe adds it to the invoice, working it out from the
address on your billing profile. See [VAT](/admin/billing/#vat).

There is no minimum volume and no minimum spend on the partner arrangement, so a
month in which you manage no billable mailboxes costs nothing. That is a
commitment in the [partner agreement](/partners/service-level/#no-minimums)
rather than a current concession.

That is a different model from a direct tenant, which carries a licensed seat
quantity that prorates when it changes. A partner has no quantity, so there is no
proration and no mid-cycle invoice. Clients joining and leaving during a month
show up in the month's average for the days they were with you, rather than as
adjustments.

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

## How the average is worked out

Each night Sigil records every client's billable mailboxes and marks the day as
measured for your account. Your charge for the period is the total of those
daily counts, the mailbox-days, divided by the number of days measured.

| | |
| --- | --- |
| Days in a period | From the day the billing period starts to the day before it ends, in UTC. A period running from 15 October to 15 November covers the 31 days from 15 October to 14 November |
| Precision | Three decimal places, rounded once at the end |
| On the invoice | The seat line's quantity is the average itself, for example 35.467, multiplied by the per-mailbox price |
| A night that was missed | Left out of the average rather than counted as zero. The next night's report recalculates from the daily records and catches up |
| A day with no clients | Counted as a measured day at zero, so the average falls rather than the empty days disappearing |

Every day belongs to exactly one period, and the last day of a period is measured
and reported before Stripe drafts the invoice, so nothing falls between two
invoices.

Steady usage costs the same as it always did. 56 mailboxes every day averages
56.000, in a 28, 30 or 31-day month alike. The average only differs from a
single count when the number moves during the month, and then it bills the
days as they were:

- A client you roll out on the 20th of a 30-day month adds roughly a third of
  its mailboxes to the average, not all of them.
- A client you offboard on the 10th is billed for the days it was with you,
  not for nothing.
- A client suspended partway through counts as zero from the day it is
  suspended, as above, and at its full count before that.

Each day's measurement is the one taken overnight, and it is fixed once taken.
Refresh seats, on the Partner billing page, only fills in a day that nothing has
measured yet. A mailbox excluded in the afternoon and added back in the evening
therefore cannot rewrite the day it was served.

A client that moves from one partner to another is counted once a day, for
whichever partner measured it first that day. The same rule decides which
partner's usage export lists it for that day, so the report you rebill from
matches your invoice. See
[taking over an existing tenant](/partners/clients/#taking-over-an-existing-tenant).

If your partner account itself is suspended partway through a period, you are
billed for the days it was served and nothing for the days it was off.

### When the average starts

Partner billing moves to the average from 1 October 2026, one partner at a time,
and always at a period boundary rather than partway through a month. Each
partner moves at the start of its first billing period that begins on or after
that date. A period that began earlier is billed on its final day's count, as
partner billing always had been, and its invoice reads that way. A partner that
joins on or after 1 October is on the average from its first period.

Until your account moves, the sentence on the Partner billing page carries the
date it applies from: "This applies from your first billing period that starts
on or after 1 Oct 2026." Once it has moved, the sentence stands on its own.

### Checking the period so far

The figures at the top of the Partner billing page show where the current period
stands.

| Figure | What it shows |
| --- | --- |
| Seats in use | Today's billable mailboxes across every client |
| Average this period | The average so far, to two decimal places, with how many days have been measured. It shows a dash until the first night of the period has been measured. Where a [prepaid block](#prepaid-mailboxes-for-a-client) applies, this is the average after the block, and the average as measured is shown beside it, as in "34.20 measured, before prepaid" |
| Prepaid mailboxes | Only shown while one of your clients has a prepaid block. The prepaid mailboxes across all your clients today, "netted off your clients' usage" |
| This month, estimated | The average so far at your rate, less your partner discount. Before your account moves to the average, it is today's count instead |

The estimate moves as the month goes on, and comes close to the invoice's seat
charge once the period's last day is measured. It leaves out VAT, credits and
add-ons. Early in a period it rests on a
few days, so a rollout that is still under way pulls it about.

If the numbers look stale, Owner and Billing staff can ask for a fresh count:

1. Open Partner billing in the portal sidebar.
2. Choose Refresh seats.

Refresh seats only has something to do on a day that nothing has measured or
reported yet, such as after a missed night. It then measures today, reports the
period's average and confirms with "Reported an average of 35.47 seats for this
period.", with your own figure. On a normal day the overnight run has already
done both, so the answer is "Nothing to report (already-reported-today)." and the
figures stay as they are. Either way it never changes a day that is already
counted. It can be used once every ten minutes; sooner than that, it answers
"Seats were synced in the last ten minutes. Try again shortly."

## Prepaid mailboxes for a client

You can pay up front for a block of mailboxes for one client, such as 50
mailboxes for 12 months, and have only that client's usage above the block
billed monthly. The partner agreement bills monthly in arrears with no minimum
spend, so a prepayment sits outside it and is agreed deal by deal in a signed
side letter. Under that letter the block is non-refundable, runs for a fixed
term, covers the named client only, and ends if the client leaves your
management. Usage above the block is billed as normal.

To set one up:

1. Ask Tophhie Cloud for a prepaid block, naming the client, the number of
   mailboxes and the term.
2. Sign the side letter.
3. Pay the prepayment invoice. It is raised against your own Stripe customer, so
   it arrives alongside your monthly invoices rather than going to the client.
4. Once it is paid, Tophhie Cloud records the block against the client, with the
   side letter's invoice or order reference. A block cannot be recorded for a
   client without one.

The nightly measurements do not change. What changes is the figure reported
for the period: before the average is worked out, each client's mailbox-days are
reduced by its prepaid mailboxes over the same measured days, client by client
and across the whole period. So:

- A quiet week offsets a busy one. A client at 45 mailboxes for half the month
  and 55 for the other half, against a block of 50, is billed for nothing.
- A block that starts or ends partway through a period needs nothing special.
  Only the days it covers are reduced.
- A night that was missed removes both that day's count and that day's cover,
  so it neither helps nor costs you.
- One client's unused block never reduces another client's bill.

A period still billed on its final day's count, from before
[the move to the average](#when-the-average-starts), takes each client's block
off that day's count in the same way.

A client with a block shows a badge such as "50 prepaid" beside its name in the
client list on the Partner billing page.

If the client moves to another partner, or to being billed directly, your block
stops applying from that day, because it was tied to you as the payer. Whether
anything is moved or refunded is a matter for Tophhie Cloud and the side letter,
not something that happens automatically.

Thirty days before a block ends, your billing email and every Owner and Billing
member of partner staff are emailed once, naming the client and the date. From
the day after it ends, the client's mailboxes are billed monthly at your usual
rate again. Tophhie Cloud is alerted at the same time, so a renewal can be
discussed before then.

The client sees the block too, as described in
[what clients see](#what-clients-see).

## Add-ons on a client

Some features are charged on top of the per-mailbox rate. There is one today, the
[branded link domain](/monitoring/branded-link-domain/), and it is enabled for a
client by you rather than by the client.

The client cannot add it themselves, and is not billed for it. It reaches your
monthly invoice instead, and a client putting a recurring charge on somebody
else's bill is not something Sigil allows. Their Billing view says as much and
tells them to ask you.

It is metered the same way seats are: a second nightly count, this time of
clients that have a branded domain actually live, averaged across the billing
period and invoiced monthly in arrears at the list price shown on your Partner
billing page. A client whose domain was live for 15 days of a 30-day period adds
0.5 to the average. Your partner discount reaches it,
because the discount sits on the aggregate subscription rather than on one line of
it.

Two things follow from the count being of live domains rather than of enabled
add-ons. A client you have enabled it for costs you nothing until their
administrators have set a hostname up and its certificate has issued, and a client
whose domain you disable stops being counted from the next nightly measurement.

Your own organisation is counted on that meter too, at your partner rate, if you
enable the add-on for it. That is deliberate: an MSP buying the add-on for its own
signatures should see it on the invoice it already has rather than get a second
one at list price.

| | |
| --- | --- |
| Enabled by | Partner Owners, Admins and Technicians, from the client's row on the Clients view |
| Charged | Per client with a live domain, averaged over the days it was live, monthly in arrears |
| Discount | Your partner discount applies |
| Set up by | The client's own administrators, in their Settings |
| Disabling | Removes the client's domain and ends the charge |

Enabling or disabling an add-on is recorded in your own partner log, and again in
the client's [change log](/monitoring/change-log/) attributed to you. Their
administrators would otherwise find a feature they never asked for with nothing to
explain where it came from.

An add-on can only be enabled once you have accepted the current
[partner agreement](/partners/agreement/), in the same way as inviting a client or
transferring one. It puts a charge on your invoice, so the terms covering it have
to be ones you have agreed.

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

Owner and Billing roles can edit it.

1. Open Partner billing in the portal sidebar.
2. Under Billing details, fill in Company name (legal), Billing email, Address
   line 1, City, Postcode and Country. VAT number, Purchase order number,
   Address line 2 and Region / county are optional.
3. Choose Save billing details.

The confirmation reads "Billing details saved." If the push to Stripe failed,
it says so instead and asks you to save again later. The Add your invoice
details card on the Clients view leads to the same form through Add billing
details.

Until the profile carries a legal name, a billing email and a full postal address
including the country, the Clients page
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
to its own hosted page to view or download it. An open invoice can also be paid
by card on the page itself. That list is your partner account's, not your own
tenant's: your own organisation is not invoiced while the partnership is
running, so its Billing view carries no card, details or invoices of its own and
offers a Go to Partner billing button instead.

To add or change the card:

1. Open Partner billing in the portal sidebar.
2. Choose Add payment method, or Update payment method when a card is already
   on file.
3. Enter the card in the form that opens and choose Save card. If your bank asks
   you to confirm it, follow its prompt.

The form closes with "Payment method saved." and the page shows the card it now
holds, for example "Visa ending 4242, expires 04/28". The card number goes
straight to Stripe and never passes through Sigil.

If Stripe saves the card but it cannot be made the default, the form stays open
and says "The card was saved with Stripe but couldn't be set as your payment
method." A card that is not the default is never charged, so Sigil does not
report it as saved. The button changes to Try again, which repeats only that
last step, so you do not enter the card a second time.

Manage billing in Stripe on
the same page opens Stripe's customer portal, for anything the page does not do
itself, such as removing an old card.

To pay or open an invoice:

1. Open Partner billing in the portal sidebar.
2. Under Invoices, choose Pay on an open invoice to pay it by card in the form
   that opens, or View to open its hosted page on Stripe. The button beside them
   downloads the PDF.

Paying an invoice this way charges that invoice only. It does not change the
card the partner account is charged to.

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

Where you have paid for a [prepaid block](#prepaid-mailboxes-for-a-client) for
the client, their Billing view says so, as in "Your provider has prepaid 50 of
them until" followed by the date. It does not show what you paid.

Everything else in their portal works normally.

## Rebilling

The Usage and rebilling view carries per-client seat counts for the current and
prior periods, exportable as CSV.

That export is the input to your own billing system. It gives you the seat count
per client per period, which is what you need to rebill at whatever rate your own
arrangement uses.

Owner and Billing roles can export it.

1. Open Usage & rebilling in the portal sidebar.
2. Set From and To, then choose Show. Or pick a month under Billed periods,
   which sets both dates to that invoice's window.
3. Choose Export CSV.

The file is named sigil-usage.csv and covers the window on screen.

Its columns are the date, the client name, the tenant id, the seat count, the
prepaid seats and the billable seats, one row per client per measured day. The
prepaid seats are the client's [prepaid block](#prepaid-mailboxes-for-a-client)
that day, 0 for most clients, and the billable seats are the seat count less
that block. Those daily rows are what your invoice is made of: a client's
billable seats added up over an invoice's window, and taken as 0 if the total is
below zero, are the mailbox-days its footer prints for that client.

A single day's billable figure can be negative, when a client sits below its
block, because the block is netted across the whole period rather than day by
day. On screen, the Prepaid and Billable columns only appear when a client in
the window has a block. A client that moved to or from
another partner on a given day appears only in the export of the partner it was
billed to for that day.

[Add-ons](#add-ons-on-a-client) are not in it, so a partner rebilling an add-on
reads which clients have one from the Clients view rather than from the CSV.

Sigil does not produce client-facing invoices on your behalf. The commercial
relationship with the client is yours.

## What your invoice shows

The metered seat line on a partner invoice is a single figure: the period's
average, printed by Stripe as the line's quantity, such as 35.467 times the
per-mailbox price. That is enough to charge against and not enough to explain,
so Sigil writes the working into the invoice's own footer. It has to be the
footer, because Stripe does not let the description on a subscription's invoice
line be changed.

An [add-on](#add-ons-on-a-client) appears as a second metered line, counted in
clients rather than mailboxes, and its quantity is that period's average too.

The footer, on an invoice billed on the average, reads in this order:

1. The sentence "Your monthly charge is the average of the daily billable mailbox
   measurements across the billing period."
2. "Average billable mailboxes by client", the period's dates and how many days
   were measured, for example "1 to 31 Oct 2026 (31 days measured)". If a night
   was missed, it says so, as in "30 days measured of 31".
3. Each client, largest first, with its average and its mailbox-days, such as
   "Contoso: 22.387 (694 mailbox-days)". A client's average is its mailbox-days
   divided by the days measured for your whole account, so a client that joined
   halfway through shows half its size. A client with a
   [prepaid block](#prepaid-mailboxes-for-a-client) gets a longer line giving
   its measured average, its prepaid mailboxes and when they run to, then the
   billed average and mailbox-days, such as "Contoso: average 56.000, of which 50
   prepaid until 29 Oct 2027; billed 6.000 (186 mailbox-days)".
4. The total average across all your clients, and the mailbox-days it is made
   of. Where a block applies, these are the billed figures, after prepaid
   mailboxes.
5. The average for branded link domains, when any client had one live during the
   period. It is a single figure, not split by client.
6. A link back to the usage report with that invoice's period already selected,
   which is the day-by-day record behind every figure.

Every average is to the same three places as the seat line, so the footer's
total matches the quantity Stripe printed. If there are more clients than the
footer has room for, the ones that do not fit collapse into a single counted
line reading how many were left, with their average and mailbox-days, so the
figures always add up to the total you were charged. The Clients view's row menu
is still what tells you which clients have the add-on enabled, because neither
the invoice nor the usage export names them.

An invoice for a period that began before
[the move to the average](#when-the-average-starts) was billed on that period's
final day. Its footer lists each client's seats on that day rather than an
average, and names the date, since that day is the one the invoice was made of.

Two cases produce no footer at all. A period with no measured days, which can
happen to a partner provisioned partway through a cycle, leaves the invoice
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

1. Open Usage & rebilling in the portal sidebar.
2. Under Billed periods, choose the invoice's month. The From and To dates
   move to that invoice's window and the table reloads.

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
buttons are for. Expect the two to differ for any client whose size changed
during the month, since the invoice charges the month's average and the list
shows only the latest day.

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
