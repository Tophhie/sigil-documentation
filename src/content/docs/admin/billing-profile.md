---
title: Billing profile
description: The company details that appear on your invoices, and how they reach Stripe.
sidebar:
  order: 3
---

The billing profile holds the company details that address your invoice: legal
name, billing email, billing address, and a VAT or tax identifier.

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

## Where it is stored

The profile is held in Sigil and pushed to your Stripe customer record whenever
you save it, and again at provisioning.

Holding it locally means it stays editable and fast to read even if Stripe is
briefly unavailable. Pushing it means your invoices carry the current details
without anybody re-entering them.

## Who can edit it

Admins, from the Billing view.

If your organisation is managed by a partner, the partner maintains the billing
relationship instead. See [partner billing](/partners/billing/).

## Changing it later

Save the change and it is pushed to Stripe immediately. Invoices already issued
are unaffected; future ones carry the new details.

If a tax identifier changes, update the country first if that is also changing,
so the identifier is registered with the right type.
