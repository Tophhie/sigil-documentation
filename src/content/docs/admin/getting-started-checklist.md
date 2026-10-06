---
title: The Getting started checklist
description: The onboarding checklist a new administrator lands on, and why each step completes itself.
sidebar:
  order: 9
---

A new administrator lands on a checklist rather than an empty portal. Granting
admin consent from Sigil's own sign-up path brings you straight here.

Every step's completion is worked out from real state rather than being ticked
off by hand. That makes the list honest: it cannot say a signature is working
when Outlook has never applied one.

## The steps

The checklist is split into three groups, in the order you would normally work
through them. Getting a signature into Outlook comes first, and paying for Sigil
comes after it, because the trial needs no card.

### Get your first signature working

| Step | Completes when | Required |
| --- | --- | --- |
| Connect Microsoft 365 | Sigil's application can read your directory | Yes |
| Customise your signature | The active template is no longer the seeded starter | Yes |
| Deploy the Outlook add-in | Sigil has seen a signature request, or a successful apply, from your organisation | Yes |
| Check your signature in Outlook | The add-in has reported that it applied a signature | Yes |

### Keep signatures running after your trial

| Step | Completes when | Required |
| --- | --- | --- |
| Add your billing details | Your legal company name, billing email and a full address including the country are saved | Yes |
| Add a payment method | A card is on file in Stripe, or your account pays by invoice | Yes |

While you are on a trial, the group's description gives the date the trial
ends. Once the trial is over, the same group is headed "Your subscription".

### Your team and agreement

| Step | Completes when | Required |
| --- | --- | --- |
| Accept the Data Processing Agreement | Acceptance is recorded against your organisation | No |
| Invite your team | At least one other person has been given a role | No |
| Send a test email | A test email has been sent | No |

## Working through it

The checklist is for the Admin role.

1. Open Getting started in the portal sidebar.
2. Find the first step without a tick. Optional ones carry an Optional badge.
3. Choose the step's button, which takes you to where the step is done.
4. Come back to Getting started once you have, and choose Check progress to
   re-read every step. The button reads "Checking..." while it works.

Publishing a template and saving a card also update the page on their own, so
Check progress is mostly for the steps that happen outside the portal, such as
the add-in.

| Step | Button | Where it takes you |
| --- | --- | --- |
| Connect Microsoft 365 | Grant admin consent | Microsoft's consent prompt |
| Customise your signature | Edit signature | Templates |
| Deploy the Outlook add-in | Open in Microsoft Marketplace | Sigil's Microsoft Marketplace listing, in a new tab, where an administrator deploys it |
| Check your signature in Outlook | Check Activity | Activity |
| Add your billing details | Add billing details | The Billing details dialog, which you finish with Save billing details |
| Add a payment method | Add card | A card form that opens over the checklist, so you stay on Getting started |
| Accept the Data Processing Agreement | Review and accept | The DPA tab of Billing |
| Invite your team | Manage users | Users & roles |
| Send a test email | Send a test | Templates |

The Add card button stays greyed out until your billing details are saved, and
the step says "Save your billing details above before adding a card." That is
the order the portal accepts them in: adding a card is refused until the details
are complete. See
[what waits on the billing details](/admin/billing-profile/#what-waits-on-it).

The progress line at the top reads, for example, "2 of 4 setup steps done". It
counts only the four steps in the first group. When all four are done, the page
says "A signature has been applied in Outlook. Check Activity to confirm
coverage across your pilot."

## Required and optional steps

The required steps are the ones without which signatures do not reach anybody,
or stop reaching them when the trial ends. The panel stays open until all of
them are done, billing included, even though the progress line has stopped
counting at the first group.

The optional steps are prompts rather than gates. They matter, but an
organisation whose signatures are working correctly should not be nagged by a
permanently open checklist because of them.

The data processing agreement is deliberately in the optional group for that
reason. It is how you evidence Article 28, so it belongs on the list, but an
unsigned document holding the checklist open for a tenant whose signatures work
would be the wrong trade. See [compliance](/security/compliance/). The step's
button opens the DPA tab of the Billing view, where acceptance is recorded.

Some organisations do not see the billing group at all:

- An organisation nobody invoices, such as a comped or NFR one. See
  [what the Billing view shows](/admin/billing/#what-the-billing-view-shows).
- A client whose partner is billed for it. The provider pays Sigil, so the
  client is not asked for billing details or a card. See
  [partner billing](/partners/billing/).

For both, the two billing steps are excused rather than done, so they neither
appear nor hold the panel open.

An organisation on [invoice terms](/admin/invoices-and-credits/) is a different
case again. The payment step asks whether Sigil can collect what you owe rather
than whether a card exists, so it completes for an account paying by invoice
without one ever being added. It reads "Payment method" and says that invoices
are emailed to your billing contact. It stays required, because it genuinely is
done rather than being set aside.

Cancelling is the exception. The payment step reopens for both arrangements,
because at that point it stops asking about payment and starts asking you to
reactivate. Its button is Go to Billing.

## Connecting Microsoft 365

This is the first step in every sense. Without admin consent, Sigil cannot read
your directory, so there is nothing to personalise a signature with and no users
to pull in.

It completes when Sigil's application registration can actually read your
directory, which means it also un-ticks itself if that consent is later revoked.
A Microsoft 365 administrator grants it once. See
[connect your organisation](/deploy/connect-your-organisation/).

## The add-in step

This is the one that matters and the one that is easiest to get wrong, so it
carries the full instructions and a button that opens Sigil's
[Microsoft Marketplace listing](https://appsource.microsoft.com/product/office/WA200011511).

It completes only when the service has actually heard from the add-in in your
organisation: a signature request, or a reported apply. Finishing the
deployment does not tick it. Somebody composing a message does.

That is the point. Deployment is asynchronous and takes 6 to 72 hours to
propagate, so a step that completed on deployment would tell you nothing useful.

See [deploy the add-in](/deploy/deploy-the-add-in/).

## Checking the signature in Outlook

The add-in step proves the add-in is running. This step proves it worked. It
completes only when the add-in reports that it applied a signature to a
message, so a request that failed to apply leaves it open.

1. Open Outlook as somebody in your pilot group.
2. Start a new message and wait for the signature to appear.
3. Back in the portal, choose Check progress on Getting started.
4. If the step is still open, choose Check Activity and look up that mailbox to
   see what happened. See [Activity](/monitoring/activity/).

The step reads a per-mailbox summary that Sigil keeps for longer than the raw
request log, so the tick survives after the individual request has aged out.

## Publishing a signature

New tenants are seeded with a ready-made starter design, so this step completes
when you replace it with something of your own.

That is a deliberate default. Opening a signature product on a blank page makes
the first hour harder than it needs to be, and a seeded design gives you
something to edit rather than something to invent.

If you would rather start from your own branding, the New template dialog can
build the starter from the logo, brand colour, address and social profiles your
website already publishes. See
[starting from your website](/signatures/templates/#starting-from-your-website).

## The panel

The checklist shows automatically until the required steps are done, or until
you dismiss it. Dismissing it is the one piece of state stored about the
checklist; everything else is computed.

1. Open Getting started in the portal sidebar.
2. Choose Dismiss.

The portal confirms it is hidden and that you can still reach it from the
sidebar, then opens Templates.

You can return to it from Getting started in the sidebar at any time.

## After the checklist

Once the basics work, the usual next steps are
[assignment rules](/targeting/assignment-rules/) if different groups need
different signatures, a [compliance footer](/targeting/footers/) if legal needs
one, and [Activity](/monitoring/activity/) to confirm coverage across the
organisation.

For a larger deployment, [planning a rollout](/start/rollout/) sets out a phased
approach.
