---
title: Billing and subscription
description: How Sigil is priced, what counts as a seat, how the trial converts, and what happens if it lapses.
sidebar:
  order: 2
---

Sigil costs £0.70 per licensed mailbox per month, billed monthly, with every
feature included. There is a 14 day free trial.

Prices exclude VAT. Where VAT applies, it is added to the invoice on top of the
figure the portal shows. See [VAT](#vat).

One optional add-on is charged on top of that, per organisation rather than per
mailbox. See [add-ons](#add-ons).

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
| Microsoft 365 Group or distribution list | No, it is not a user at all |
| Account invited in from outside | No |
| Disabled account | No |
| A mailbox you have excluded | No |

Shared mailboxes and group mailboxes still get signatures. They just do not cost
anything.

An excluded mailbox is the one case where a mailbox is deliberately taken off
both the bill and the service at once. Mailboxes can be excluded one at a time,
or by naming an Entra group whose members should all come off. An organisation
where only some teams need Sigil can instead turn the list around and name the
mailboxes that should have it, in which case everybody unnamed is the one off the
bill. See [cost management](/admin/cost-management/).

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

Either conversion needs your [billing details](/admin/billing-profile/#what-waits-on-it)
to be complete, because the invoice has to be addressed to somebody. A trial that
would convert without them is set to end on its trial date instead, and nothing
is charged.

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
footers all remain. Restoring an active subscription restores signatures at the
next message, except for anybody who has been composing while they were stopped:
the add-in notes a refusal on the device for ten minutes and does not ask again
inside it, so those people wait out the rest of the window or open the "My
signature" pane and press Apply. See
[a refusal is remembered for ten minutes](/start/how-it-works/#a-refusal-is-remembered-for-ten-minutes).

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

Missing billing details get a prompt of their own, described under
[billing profile](/admin/billing-profile/#when-it-counts-as-complete). It gives
way to the two warnings above while either is showing, unless the trial has
already been set to end for want of the details.

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

An organisation on invoice terms has no card, and the Billing view offers no
button to add one: it is not shown rather than shown and refused. The button
into the Stripe customer portal stays, since invoices are read there.

### Adding a payment method

You need the Admin or Billing role, and your
[billing details](/admin/billing-profile/) must be complete: until they are,
the button is disabled.

1. Open Billing in the portal sidebar.
2. On the Your subscription tab, choose Add payment method.
3. You are taken to Stripe Checkout. Save the card there.
4. Stripe returns you to the Billing view.

A "Payment method saved." message confirms it, and the Payment figure on the
subscription panel changes from "No card yet" to "Card on file". If you leave
Checkout without saving a card, you are returned to the Billing view and
nothing changes.

### Changing the payment method

1. Open Billing in the portal sidebar.
2. On the Your subscription tab, choose Update payment method.
3. Save the new card in Stripe Checkout. Stripe returns you to the Billing
   view.

The new card becomes the default for invoices. To manage the cards already
saved, choose Manage billing & invoices instead, which takes you to the Stripe
customer portal and back to the Billing view when you are done.

## What the Billing view shows

Subscription status, seats in use, how the account is collected, your invoice
history, and any credits applied to your account.

Where the card would be, an account on invoice terms reads "Invoice, net 30", or
whatever term was agreed. A credit waiting on the account is shown there too,
with a note that it comes off the next invoice.

The view is split into tabs: Your subscription, Billing details, Documents and
DPA. The invoice and credit lists are on Documents. See
[invoices and credits](/admin/invoices-and-credits/).

Billing details and Documents appear only for an organisation billed directly, so
a free arrangement or a partner-managed client sees neither, and Documents waits
until billing has been set up. DPA appears on every arrangement. A tab that needs
something from you, such as incomplete details or an agreement waiting to be
accepted, carries a ! marker, and a warning on the subscription tab that another
tab resolves links straight to it.

An Add-ons card sits below the subscription panel, listing what is available,
what each costs, whether your organisation has it, and where to set it up. It is
shown whether or not you hold one, because the page that explains the invoice is
also where "what else is there" belongs. See [add-ons](#add-ons).

The per-seat price and any add-on price are shown for reference. The
authoritative rates are the ones held in Stripe.

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
badge and drops the subscription panel. There is nothing to fix, so offering a
card to add would only invite somebody to try. Those organisations also see both
billing steps on the
[Getting started checklist](/admin/getting-started-checklist/) marked optional.

A comped or NFR organisation keeps the Billing details tab, because it can still
buy an [add-on](#add-ons) and an add-on needs somebody to invoice. Only Tophhie
Cloud's own organisation loses the form entirely.

Billed via partner is not the same as being free. Somebody is invoiced for those
seats, it is your provider rather than you, and the view names them and the seat
count they are carrying on your behalf.

The arrangement is worked out from your account rather than stored as a label of
its own, so it cannot fall out of step with what actually gets charged.

### Accepting the data processing agreement

Only an Admin of the organisation itself can accept it. Partner staff looking
in at a managed client cannot, because the client is the controller. See
[data processing agreement](/security/compliance/#data-processing-agreement).

1. Open Billing in the portal sidebar.
2. Open the DPA tab. It carries a ! marker while the agreement is waiting to
   be accepted.
3. Choose Read the agreement, which opens it in a new tab.
4. Choose Accept on behalf of, followed by your organisation's name.
5. Read the confirmation, which names the version and says your name and the
   time will be recorded against your organisation.
6. Choose Accept.

A "Data Processing Agreement accepted." message confirms it, and the card
shows an Accepted badge with the version, the date and who accepted it. The
prompt at the top of every portal page offers the same Read the agreement and
Accept buttons, so it can be accepted from there without opening Billing.

## Add-ons

Nearly everything Sigil does is included in the per-seat price. An add-on is a
feature charged on top of it, and there is one today: the
[branded link domain](/monitoring/branded-link-domain/), which serves the tracked
links in your signatures from a hostname of your own rather than Sigil's shared
one.

It is priced per organisation rather than per mailbox, so it costs the same
whether you have twelve seats or twelve hundred. The Billing view shows the
current price on the Add-ons card, next to a short description of what it does
and a button to add it.

| Arrangement | How the add-on is added |
| --- | --- |
| Per-seat or trial | Add it yourself on the Billing view |
| Managed by a partner | Ask your provider. They enable it from their own portal, and it reaches their invoice rather than yours |
| Comped or NFR | Add it yourself. The base subscription stays free; the add-on is not |
| Tophhie Cloud's own organisation | Granted internally |

Unlike seats, an add-on prorates. Seat counts drift daily, and an invoice line
per drift would be unreadable, so seat changes are not prorated. An add-on is
bought once on a day you chose, and charging a full month for the last three days
of one is the kind of thing that produces a support ticket on the first invoice.

Removing it is self-serve in the same place, and takes the branded domain with
it, since an organisation should not keep serving links from a hostname nobody is
paying for.

An organisation whose subscription is free is the one case that needs a step
first. It has never been asked for billing details or a payment method, because
it had nothing to pay, and an add-on subscription with no way to pay is
abandoned by Stripe within a day. A comped organisation is asked for both before
it can add one, and the view says which is missing. The add-on is then billed on
its own monthly invoice, and the subscription itself stays free.

A partner's own NFR organisation is asked for billing details only. Its add-on
goes onto the partner invoice at the partner rate, which already has a payment
method behind it.

A lapsed or cancelled subscription takes the add-on with it. The hostname stays
provisioned so links already in sent mail keep resolving, but no new link is
minted on it until the subscription is live again.

### Adding the branded link domain

You need the Admin or Billing role and complete billing details. A comped
organisation also needs a payment method on file unless it is on invoice
terms; the card says which is missing and offers Add payment method.

1. Open Billing in the portal sidebar.
2. On the Your subscription tab, find the Add-ons card below the subscription
   panel.
3. Choose the Add button, which names the monthly price.
4. Set the domain up in Settings. See
   [branded link domain](/monitoring/branded-link-domain/).

A "Branded link domain added." message confirms it, and the card shows an
Included badge. If the add-on was recorded but Stripe could not be reached, the
message says so instead.

### Removing it

1. Open Billing in the portal sidebar.
2. On the Add-ons card, choose Remove add-on.
3. Read the confirmation: tracked links go back to Sigil's shared hostname on
   the next signature render, and links already in mail you have sent stop
   working once your domain stops resolving.
4. Choose Remove.

An "Add-on removed." message confirms it.

## VAT

Every price Sigil shows is before VAT. The Billing view's estimate line ends
"excluding VAT", and so do the public pricing page and the terms of use. Where VAT
applies, Stripe adds it to the invoice as a separate line.

Whether it applies, and at what rate, is worked out by Stripe from the address on
your [billing profile](/admin/billing-profile/), not chosen by Sigil. A UK
organisation pays UK VAT on top of the per-mailbox price. An organisation
somewhere Tophhie Cloud is not registered to collect tax is invoiced with none.

That is why the address matters beyond appearing on the invoice. Sigil creates
your subscription when you connect, before anybody has filled in a billing
profile, so there is often no address to work from at first. Tax calculation is
switched on for the subscription when you save a complete profile, and a nightly
check switches it on for any subscription that still lacks it. It applies from
the next invoice. Stripe does not go back and add tax to an invoice already
raised.

A subscription that invoices straight away, such as restarting one that has
already ended or adding the branded link domain, needs the address before it can
start. If Stripe cannot place the address you have saved, the portal says:
"Our payment provider can't work out the tax treatment from the billing address
on file. Check the address on the Billing page and try again." To fix it:

1. Open Billing in the portal sidebar.
2. Open the Billing details tab.
3. Check Country first, then Address line 1, City and Postcode.
4. Choose Save billing details.
5. Go back and try the action again.

If you are VAT registered, add the number on the same tab. See
[billing profile](/admin/billing-profile/).

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

Because it sits on the subscription rather than on one line of it, a discount
covers every line that subscription raises, [add-ons](#add-ons) included. The
exception is an organisation whose base subscription is free and whose add-on is
therefore billed on a subscription of its own.

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
next. You need the Admin or Billing role.

1. Open Billing in the portal sidebar.
2. On the Your subscription tab, choose Cancel subscription.
3. Read the confirmation. It names the date signatures continue until, and on
   a card account it says the saved card is removed once the subscription
   ends.
4. Choose Cancel subscription to confirm, or Keep subscription to close the
   dialog without cancelling.

A message confirms the cancellation and the date signatures continue until.
The subscription panel then reads "cancellation scheduled" next to the end
date, and the Cancel subscription button is replaced by Keep subscription.

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

A trial set to end because its billing details are missing is the exception.
Keep subscription is not offered for it, because saving the details is what lifts
it. See [billing profile](/admin/billing-profile/#what-waits-on-it).

After it has ended, reactivating is a new subscription rather than a resumed one.
The first invoice is raised straight away and the seat meter restarts, which the
confirmation says before anything is charged. Reactivating needs complete billing
details, in the same way adding a card does.

### Reactivating

Before the end date, choose Keep subscription on the Your subscription tab. It
takes effect at once, without a confirmation, and a message says the
cancellation has been withdrawn.

Once the subscription has ended, and your billing details are complete:

1. Open Billing in the portal sidebar.
2. On a card account, add a payment method first if the panel says your saved
   card has been removed. See
   [adding a payment method](#adding-a-payment-method).
3. Choose Reactivate subscription.
4. Read the confirmation, which says the first invoice is raised straight away
   and the seat meter resumes.
5. Choose Reactivate and start billing, or Not now.

A message confirms that billing and signatures have resumed.

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
