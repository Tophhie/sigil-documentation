---
title: Billing profile
description: The company details that appear on your invoices, and how they reach Stripe.
sidebar:
  order: 3
---

The billing profile holds the company details that address your invoice: legal
name, billing email, billing address, a VAT or tax identifier, and an optional
purchase order reference.

## It is pre-filled

At onboarding, Sigil pre-fills the profile from your organisation's registered
address in Entra. In most cases it is already close to correct when you first
look at it.

Check it before the trial converts, since that is when it starts appearing on
real invoices.

## What each field does

The legal name is the entity the invoice is addressed to. This is often not the
same as the trading name your organisation uses day to day.

The billing email is where Stripe sends invoices and receipts. Point this at
whichever inbox your finance team actually reads rather than at an individual, so
invoices survive somebody changing job.

The billing address appears on the invoice and is used for tax determination.

The VAT or tax identifier is registered with Stripe as a managed tax id. The type
is derived from the country you set, so a United Kingdom address produces a UK
VAT registration and an EU address an EU one. Getting the country right matters
for this reason.

A country outside the UK and the EU has no matching type, so an identifier
entered against one is kept in Sigil and shown on your profile, but is not
registered with Stripe and will not appear on the invoice. Sigil holds it rather
than rejecting it, because the alternative is refusing a number that is perfectly
valid in its own jurisdiction. If you need a tax identifier printed on invoices
from a country in this position, raise it with support rather than assuming the
saved value has reached Stripe.

Registering the identifier is deliberately the last thing done when you save, so
a tax number Stripe will not accept cannot stop the rest of the profile being
written.

The purchase order reference is printed on every invoice, in a field of its own
labelled PO number. It is optional, and free text up to 140 characters, so it
takes whatever form your own purchase orders use.

Set it if your finance system will not process an invoice that does not carry
one. Holding it on the profile rather than typing it onto each invoice is what
stops a monthly invoice being bounced for the want of a reference nobody
remembered to add. Clearing the field takes the line off future invoices.

## When it counts as complete

The profile is complete once it carries a legal name and a full postal address:
address line, town or city, postcode and country. The billing email and the tax
identifier are not part of that test, because an invoice can be issued without
either and cannot be addressed without a name and a place to send it.

Until it is complete, the [getting started
checklist](/admin/getting-started-checklist/) shows the billing details step as
outstanding. An organisation nobody invoices is not asked for any of it.

## Where it is stored

The profile is held in Sigil and pushed to your Stripe customer record whenever
you save it, and again at provisioning.

Holding it locally means it stays editable and fast to read even if Stripe is
briefly unavailable. Pushing it means your invoices carry the current details
without anybody re-entering them.

If a save reaches Sigil but the push to Stripe fails, you are told so rather than
being shown a success message while invoices carry the old details. Save again to
retry.

## Edits made in Stripe come back

The Stripe customer portal, linked from the Billing view, lets you change the
same details there: name, email, address and tax identifier. Those edits are
mirrored back into Sigil.

This matters for more than tidiness. Without it, the profile here would keep
showing the old details, and the next save from here would push them back over
the correction made in Stripe.

The one exception is a tax identifier for a country Sigil never registers one
for. Stripe holding none there says nothing about the value kept here, so the
local one is left alone rather than being cleared.

## Who can edit it

Admins and the Billing [role](/admin/users-and-roles/), from the Billing view. It
sits behind the billing capability like the rest of that view, so the person who
owns the finance relationship can correct the details on an invoice without also
being handed the signature library.

Editors, Marketing, Viewers and the Compliance role do not reach it.

If your organisation is managed by a partner, the partner maintains the billing
relationship instead. No partner role reaches a client's billing, because a
managed client has no subscription of its own. See
[partner billing](/partners/billing/).

If your organisation is itself a Sigil partner, this one profile addresses both
your partner invoices and, after the partnership ends, your own. See
[your invoice details](/partners/billing/#your-invoice-details).

## Changing it later

Save the change and it is pushed to Stripe immediately. Invoices already issued
are unaffected; future ones carry the new details.

If a tax identifier changes, update the country first if that is also changing,
so the identifier is registered with the right type.
