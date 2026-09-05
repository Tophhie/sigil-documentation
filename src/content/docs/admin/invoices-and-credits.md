---
title: Invoices and credits
description: How your invoices are collected, paying on invoice terms rather than by card, where to read your invoice history, and how service credits reach an invoice.
sidebar:
  order: 4
---

A direct organisation is invoiced monthly for its seats. This page covers how
those invoices are collected, where to read them, how to pay one by bank
transfer, and how a credit reaches one.

If a managed service provider runs Sigil for you, your provider is invoiced
rather than you and none of this appears in your portal. See
[partner billing](/partners/billing/).

Nor does it appear for an organisation on a free arrangement. Where the Billing
view carries a "Not billed" badge there is nothing to invoice and nothing to
credit, so neither list is shown. See
[the arrangement it names](/admin/billing/#the-arrangement-it-names).

## Two ways to be collected

| Collection | What happens |
| --- | --- |
| Card | The invoice is charged to the card on file the moment it is raised |
| Invoice terms | The invoice is emailed to your billing contact and is payable within an agreed number of days |

Card is the default, and it is what a self-served signup gets. Nothing is ever
outstanding on it, because the invoice is raised and settled in the same moment.

Invoice terms are agreed with Tophhie Cloud rather than switched on in the
portal. There is no setting for it, because extending credit is a commercial
decision rather than a preference. Ask support, and terms are put in place on
your account.

## Paying on invoice terms

Terms are counted in days from the date the invoice is issued. Thirty days is
the default, and ninety is the longest that can be agreed.

Stripe emails the invoice to your billing contact and you pay it from its hosted
page, by card or by bank transfer. Nothing on your account is charged
automatically, and no card is asked for anywhere.

That last part is worth stating plainly, because it changes several things at
once. Every prompt in Sigil that would otherwise mention a card reads how your
account is collected before it says anything: the trial reminders, the overdue
notices, the warnings at the top of the portal, the cancellation and
reactivation confirmations, and the Add a card button, which is not shown at
all. An accounts team on terms is never sent looking for a card that does not
exist.

The Billing view says which arrangement you are on where it would otherwise show
the card, as "Invoice, net 30" or whatever term was agreed.

### The trial converts into an invoice

An organisation on terms does not need a card before its trial ends. The
subscription starts by itself and the first invoice is emailed, payable on your
usual terms.

That is a real difference from a card account, where a trial that ends with no
card on file cancels the subscription rather than billing anybody by surprise.
On terms there is nothing to be missing, so the trial reminder says so rather
than asking for a card.

Reactivating a cancelled subscription works the same way. The first invoice is
emailed straight away on your usual terms instead of being charged to a card.

## Your invoices

The Billing view lists your invoices, newest first, up to the last two dozen.
Each row carries the invoice number and date, the period it covers, the total,
its status, and its due date.

| Status | What it means |
| --- | --- |
| Paid | Settled, and nothing is owed |
| Awaiting payment | Issued on terms and not yet due |
| Open | Issued against a card and not yet settled |
| Overdue | Issued and past its due date |
| Void | Cancelled before payment. It is not owed and no replacement is implied |
| Written off | Marked uncollectible. Raise it with support before assuming it is settled |

An invoice that has been partly settled, by a credit or a part payment, shows
what is still remaining underneath the total.

Every row links out to the invoice's own hosted page, which is where the PDF
lives and, on terms, where it is paid. There is a separate download beside it
for the PDF on its own.

The list is read live rather than from a copy held here, so it shows what your
invoices actually say. If it cannot be read, the view says so and offers to try
again rather than showing an empty history, which would read as "you have never
been invoiced".

Invoice history used to be reachable only through the Stripe customer portal,
which needs the sign-in that added the card. Somebody in accounts paying an
invoice on terms has no reason to hold that, which is why the list is in Sigil
itself.

Draft invoices are left out. Stripe prepares the next cycle's invoice shortly
before it issues, and a draft has no number, no PDF and no amount anybody owes
yet.

## Paying by bank transfer

An invoice on terms can be paid by transfer. The bank details are on the invoice
and on its hosted page rather than in the portal.

Quote the invoice number as the payment reference. A transfer is matched on its
reference first, then on the amount, then against the oldest open invoice, so
one carrying the number is reconciled without anybody looking at it.

A transfer that arrives without a usable reference is not lost, but it is not
applied either. It sits on your account as a balance, and the Billing view says
so, naming the amount received and that it has not reached an invoice yet.
Somebody applies it by hand within a working day. If it is still showing after
that, raise it with support.

That gap is worth taking seriously rather than assuming it sorts itself out. A
transfer sitting unapplied leaves the invoice open, and an open invoice past its
due date keeps counting down the window before signatures stop. Paying without a
reference is not the same as paying.

Where a payment ends up covering more than the invoice it was for, the excess is
credited to your account and appears in the credits list below, so a smaller
invoice next month has an explanation attached to it rather than being a
surprise in your favour.

## Purchase order reference

The [billing profile](/admin/billing-profile/) carries a purchase order
reference. Whatever you put there is printed on every invoice as a field of its
own.

Set it if your finance system will not process an invoice without one. It is a
free text field, so it takes whatever form your own purchase orders use.

## Credits and corrections

The Billing view carries a credits list: every credit and correction applied to
your account, with the reason it was agreed.

The reason is the point of it. A credit that appears on an invoice with no
explanation is a support ticket six months later, when nobody remembers what it
was for.

| Column | What it holds |
| --- | --- |
| Date | When it was issued |
| Amount | The amount credited to you |
| Type | The category, whether it is an account credit or a credit note, and the month a service credit is for |
| Reason | The explanation, written for you rather than for internal use |

There are two instruments, and which one is used depends on whether there is an
invoice to correct.

An account credit sits on your account and comes off whatever is invoiced next.

A credit note is raised against an invoice already issued. Where that invoice is
still open, the credit note reduces what is owed on it. Where it has already
been paid, the amount goes onto your account balance instead and a credit note
document is issued for your records.

Credits fall into four categories.

| Category | When it is used |
| --- | --- |
| Service credit | A shortfall against a service level commitment, carrying the month it is for |
| Goodwill | A concession agreed outside any commitment |
| Billing correction | An error on an invoice, put right |
| Other | Anything else, including an overpayment returned to your balance |

Credits are applied to invoices and are not paid out in cash. That is stated in
the terms of use, and for a partner it is also how the agreement's
[service credits](/partners/service-level/#claiming-a-credit) are settled.

A credit waiting on your account is shown above the invoice list as well, with
the amount and a note that it comes off the next invoice, so it is visible
before the invoice that consumes it arrives.

Credits are issued by Tophhie Cloud rather than requested in the portal. A
direct organisation has no uptime commitment behind it, so a credit to one is a
concession rather than an entitlement, and the category says which. See
[the availability commitment](/security/infrastructure/#availability-commitment).

## When an invoice goes unpaid

The 21 day window before signatures stop is the same on terms as on a card. What
differs is when it starts.

On a card it starts at the first failed payment. On terms it starts at the
invoice's due date, because that is the first moment anything is late. Net 30
therefore means an invoice can be unpaid for up to 51 days from issue before
signatures stop.

Paying inside that window ends it. Nothing was stopped and nothing needs
reprovisioning. See
[what happens if billing lapses](/admin/billing/#what-happens-if-billing-lapses).

The two overdue emails are the same two a card account gets, worded for terms:
one when the invoice first goes past its due date, and one about a week before
signatures stop. Neither mentions a card or a retry, because neither is
happening. See [emails Sigil sends](/admin/emails-sigil-sends/).

## Who can see this

Admins and the Billing [role](/admin/users-and-roles/). It sits behind the same
billing permission as the rest of the Billing view.

An [API key](/admin/api-keys/) cannot read either list. The invoice rows carry
links that view and pay an invoice, and the credits list carries the commercial
reasoning behind concessions, neither of which belongs behind a credential that
runs unattended.
