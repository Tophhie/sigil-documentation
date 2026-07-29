---
title: Connect your organisation
description: Grant admin consent, provision your tenant, and sign in to the Sigil portal for the first time.
sidebar:
  order: 2
---

Onboarding is self-serve. There is no provisioning call, no account to be created
for you, and no credentials to exchange. A Microsoft 365 administrator grants
consent and the tenant provisions itself.

## Grant admin consent

Go to:

```
https://portal.usesigil.app/admin/consent
```

You are redirected to Microsoft's admin consent screen for Sigil's multi-tenant
Entra application. It lists the permissions being requested. All of them are
read-only; Sigil never requests write access to your directory. See
[permissions](/deploy/permissions/) for what each one is for and why it is the
narrowest that works.

Granting consent installs Sigil's service principal in your tenant. That is what
lets the signature service read directory attributes for your users.

## What provisioning does

The consent callback sets your tenant up before you have signed in:

It creates the tenant record, keyed by your Entra tenant id.

It creates a trial subscription with real seats from day one. Nothing is charged
until the trial ends.

It pre-fills your billing profile from your organisation's registered address in
Entra, so the invoice details are mostly right before you look at them.

It seeds a starter signature: a polished, editable design rather than a blank
page or a bare default.

## Sign in for the first time

Go to:

```
https://portal.usesigil.app/admin
```

Sign in with your Microsoft account. There is no separate password, and no
directory sync. The portal is a single-page app that signs you in with MSAL and
sends the resulting token on every API call.

The first person to sign in after consent becomes the tenant administrator. From
there they can invite colleagues and assign roles under
[users and roles](/admin/users-and-roles/).

You land on the [Getting started checklist](/admin/getting-started-checklist/),
which walks through the remaining steps.

## Who can sign in, and what they see

Signing in and being authorised are separate things. Your Entra token
establishes who you are and which organisation you belong to. Your role, stored
per tenant in Sigil, decides what you can do.

| Situation | What happens |
| --- | --- |
| You have a role in a connected tenant | You get the portal, scoped to that role |
| You sign in with no role assigned | You are told to request access from an administrator |
| Your organisation never granted consent | You get a prompt to connect your organisation |

## Consent has lapsed

Consent can be revoked, either deliberately or as a side effect of tidying up
enterprise applications in Entra. When that happens Sigil can no longer read
your directory, and signatures break quietly: the template is still there, but
there is no data to personalise it with.

Sigil's operators run a daily scan that flags tenants whose directory access has
lapsed, and can email your administrators a re-consent link. If you suspect this
has happened, re-visiting `/admin/consent` and granting consent again restores
it.

## Removing Sigil

Consent can be withdrawn at any time from Entra, under Enterprise applications.
Withdrawing it stops Sigil reading your directory, which stops signatures being
rendered.

To remove the product properly, also remove the add-in from Integrated apps and
cancel the subscription from the Billing view. If you want your data deleted
rather than dormant, contact support and ask for the tenant to be deprovisioned;
that cancels billing and purges every record, asset and cached entry belonging to
your organisation.
