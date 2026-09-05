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

Invoices are charged to a card by default. Where invoice terms have been agreed
instead, they are emailed and payable within an agreed number of days. Either
way your invoice history and any credits are listed in the portal. See
[invoices and credits](/admin/invoices-and-credits/).

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

On [invoice terms](/admin/invoices-and-credits/#paying-on-invoice-terms) it
converts too, into a first invoice. There is no card for the trial to be
missing, so nothing is asked for and nothing is cancelled.

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

On invoice terms the same 21 days apply, counted from the invoice's due date
rather than from a failed payment, since that is the first moment anything is
late. Net 30 therefore allows up to 51 days from the invoice being issued.

Paying inside the window ends it. Nothing has to be reprovisioned and nothing was
lost, because nothing had stopped yet.

This is the first thing to check when an entire organisation loses its signatures
at once, along with whether
[delivery has been paused](/signatures/pausing-delivery/). See
[troubleshooting](/deploy/troubleshooting/).

Nothing is deleted when billing lapses. Templates, images, rules, banners and
footers all remain. Restoring an active subscription restores signatures.

### The portal warns before it stops

Two things stop signatures for a money reason, and the portal says so while there
is still something to do about it. A warning appears at the top of every page to
anybody who can open Billing.

A trial with no card on file is warned about in its last week, naming the day it
ends. An organisation on invoice terms is not, because its trial converts into
an invoice rather than needing a card, so there is nothing to warn about.

A failed payment is warned about for as long as the dunning window has left to
run, naming the day signatures stop and how many days that is. It reads for both
arrangements, since settling it means updating the card or paying the open
invoice depending on which you are on.

The warning can be put off for the rest of the browser session, and comes back on
the next sign-in. Putting one off does not hide the next: the dismissal is keyed
to the date being warned about, so an extended trial or a fresh failure is warned
about again.

### And says so once they have stopped

Once signatures have actually stopped, a notice sits at the top of every page
that cannot be dismissed, naming which of the reasons applies: a cancelled
subscription, a trial that ended, dunning that ran out, a suspension, or a
provider whose own subscription lapsed. Where there is something you can do about
it, it links to Billing. A partner-managed organisation is told to contact its
provider instead, because the card is not yours to fix.

The portal also goes read-only at that point. Saving anything is refused rather
than accepted into an organisation nobody is serving, so a cancelled organisation
does not spend a fortnight editing templates that reach nobody. Billing itself
stays open, which is the one thing that has to keep working. So does everything a
managed service provider does for its clients, since an MSP's own organisation
lapsing must not stop it running theirs.

## Adding and managing a card

Both are self-serve from the Billing view.

Add a card through Stripe Checkout. The card you add is promoted to the default
payment method for invoices automatically.

Manage cards through the Stripe customer portal, also linked from the Billing
view.

An organisation on invoice terms has no card, and the Billing view offers none:
the buttons are not shown rather than shown and refused.

## What the Billing view shows

Subscription status, seats in use, how the account is collected, your invoice
history, and any credits applied to your account.

Where the card would be, an account on invoice terms reads "Invoice, net 30", or
whatever term was agreed. A credit waiting on the account is shown there too,
with a note that it comes off the next invoice.

Invoices and credits each have a list of their own further down the page. See
[invoices and credits](/admin/invoices-and-credits/).

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

Cancel from the Billing view, behind a confirmation that spells out what happens
next.

Cancelling does not stop service on the spot. Direct organisations are invoiced
per seat monthly in advance, so the month you have already paid for runs out
first: the subscription is scheduled to end at the close of the current period,
and signatures carry on until then. Cancelling during a trial ends it on the day
the trial was already due to end, and nothing is charged. No further invoices are
raised either way.

Until that date the Billing view says the subscription is ending and names the
day. Changing your mind before it arrives costs nothing: reactivating lifts the
scheduled end from the same subscription, and it continues as though it had never
been cancelled.

After it has ended, reactivating is a new subscription rather than a resumed one.
The first invoice is raised straight away and the seat meter restarts, which the
confirmation says before anything is charged.

### The card is released when it ends

Once the cancellation completes, the saved card is detached from your record.
Your customer record and invoice history stay, because finance needs them, but a
card that nothing is going to be charged to is data with no further use.

The exception is an invoice still open with an amount owed. That card stays as
the means of settling it, and is released as soon as the invoice clears.

The consequence is worth knowing before you cancel: reactivating later means
adding a card again. Reactivating with no card on file leaves the first invoice
unpayable, which the Billing view warns about rather than letting you find out
from a failed payment.

None of this applies on
[invoice terms](/admin/invoices-and-credits/#paying-on-invoice-terms). There is
no card to release, and reactivating simply raises the next invoice on the terms
you already had.

### Nothing is deleted

Cancelling never schedules deletion. Templates, images, rules, banners, footers
and settings are all kept, so rejoining later picks up where you left off.

To remove Sigil properly, also withdraw admin consent in Entra and remove the
add-in from Integrated apps.

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
