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

Consent is tenant-wide, so Microsoft only accepts it from an administrator who
holds that right. A Privileged Role Administrator or Global Administrator can;
most other roles cannot, and Microsoft turns them away at its own screen with an
AADSTS error rather than letting the attempt through to Sigil. See
[requirements](/deploy/requirements/).

## What provisioning does

The consent callback sets your tenant up before you have signed in:

It creates the tenant record, keyed by your Entra tenant id.

It starts a trial subscription with real seats from day one. Nothing is charged
until the trial ends.

It pre-fills your billing profile from your organisation's registered address in
Entra, so the invoice details are mostly right before you look at them.

It seeds a starter signature: a polished, editable design rather than a blank
page or a bare default.

The subscription is the one step that does not finish before you are sent to the
portal. It is several calls to Stripe, and the only part of provisioning that
depends on a service outside Sigil, so it runs as a job of its own and completes
moments after you arrive. Nothing you can see is waiting on it, and a Stripe
failure that clears in a minute is retried without anybody having to notice.

Only the tenant record is essential. The other steps can fail on their own
without stopping the rest, which is why an organisation occasionally lands in the
portal with a working template library and no billing set up. Sigil records which
step failed and emails Tophhie Cloud support at the moment it happens, once the
retries are exhausted rather than at the first sign of trouble, so this is
normally fixed before you notice it. If something looks half-configured on your
first day, that is worth mentioning rather than working around.

One step commonly comes back empty: reading your organisation's name and address
from Entra. Microsoft has not always finished propagating the consent by the time
it is asked, so a brand new tenant is sometimes named after its GUID for a few
minutes. The real name is filled in the first time an administrator signs in.
Sigil retries directory reads once with a fresh token for the same reason, which
covers the window where consent is granted but not yet live.

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
| Your organisation never granted consent | You get a second step offering to approve Sigil, which starts consent |
| Your organisation was removed and is awaiting deletion | You are told to contact support, because only an operator can restore it |
| Your organisation is suspended | You are told access is suspended |

Reaching the portal before anyone has granted consent is the ordinary order of
events for an administrator who was forwarded a link, so that case offers the
consent step rather than an error. The other three cannot be resolved by the
person reading them, and say so instead of offering a button that would not work.

That step is presented as step two of two, with your sign-in ticked off above it
and the account you signed in with named, because the alternative reads as the
sign-in screen appearing a second time and the natural conclusion is that
signing in failed. It also names your domain, so you can see which organisation
is about to be connected.

If you are not the administrator who can approve it, the same screen offers to
copy the consent link so you can send it to somebody who is. That is the
commonest dead end here, and it is worth using rather than pressing the approve
button and reading back an AADSTS code. The copied link deliberately carries no
account details, since the point is for a different person to open it.

## If consent does not complete

If Microsoft turns the attempt away, you are sent back to the portal with a short
message and a reference. Quote that reference to support. It identifies the exact
attempt in Sigil's onboarding log, which holds what Microsoft returned, how far
provisioning got and how long each step took, so the first reply can be an answer
rather than a request for more detail. The commonest cause is an administrator
who cannot grant consent tenant-wide. Closing the consent screen without deciding
records nothing against your organisation, and the link can simply be opened
again.

A failure on Sigil's side after consent succeeded looks different, because it is
not something you can act on. You are returned to the portal as though everything
worked, and depending on how far provisioning got, you either sign in normally or
find your organisation is not connected yet. This is the case the support alert
above exists for. If your first sign-in looks wrong in any way, contact support
rather than granting consent again.

## Consent has lapsed

Consent can be revoked, either deliberately or as a side effect of tidying up
enterprise applications in Entra. When that happens Sigil can no longer read
your directory, and signatures break quietly: the template is still there, but
there is no data to personalise it with.

Sigil's operators run a daily scan that flags tenants whose directory access has
lapsed, and can email your administrators a re-consent link. If you suspect this
has happened, re-visiting `/admin/consent` and granting consent again restores
it.

## What re-consenting cannot fix

Re-consenting restores directory access, which is the problem above. It changes
nothing else about your organisation in Sigil, and two cases in particular look
as though it should help when it will not.

It does not lift a suspension, and it does not bring back an organisation that
has been removed and is inside its deletion grace window. In both cases Microsoft
accepts the consent and Sigil records the attempt, so the flow appears to
succeed while your access stays exactly as it was. Restoring a removed
organisation is an operator action. Contact support instead.

## Removing Sigil

Consent can be withdrawn at any time from Entra, under Enterprise applications.
Withdrawing it stops Sigil reading your directory, which stops signatures being
rendered.

To remove the product properly, also remove the add-in from Integrated apps and
cancel the subscription from the Billing view. If you want your data deleted
rather than dormant, contact support and ask for the tenant to be deprovisioned;
that cancels billing and purges every record, asset and cached entry belonging to
your organisation. Two records are deliberately kept, and
[data and privacy](/security/data-and-privacy/) says which and why.

Coming back afterwards is a new signup rather than a restoration. Granting
consent again provisions a fresh organisation, with a fresh trial and no
templates, rules or history from before. There is no waiting period, so this
works on the same day as the deprovision.
