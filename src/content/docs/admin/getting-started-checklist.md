---
title: The Getting started checklist
description: The onboarding checklist a new administrator lands on, and why each step completes itself.
sidebar:
  order: 7
---

A new administrator lands on a checklist rather than an empty portal.

Every step's completion is worked out from real state rather than being ticked
off by hand. That makes the list honest: it cannot say the add-in is deployed
when nobody has ever received a signature.

## The steps

| Step | Completes when | Required |
| --- | --- | --- |
| Connect Microsoft 365 | Sigil's application can read your directory | Yes |
| Add a payment method | A card is on file in Stripe | Yes |
| Add your billing details | A company name and a complete billing address are saved | Yes |
| Accept the Data Processing Agreement | Acceptance is recorded against your organisation | No |
| Customise your signature | The active template is no longer the seeded starter | Yes |
| Deploy the Outlook add-in | Sigil has seen a real signature request from your tenant | Yes |
| Invite your team | At least one other person has been given a role | No |
| Send a test email | A test email has been sent | No |

## Required and optional steps

The required steps are the ones without which signatures do not reach anybody.
The panel stays open until all of them are done.

The optional steps are prompts rather than gates. They matter, but an
organisation whose signatures are working correctly should not be nagged by a
permanently open checklist because of them.

The data processing agreement is deliberately in the optional group for that
reason. It is how you evidence Article 28, so it belongs on the list, but an
unsigned document holding the checklist open for a tenant whose signatures work
would be the wrong trade. See [compliance](/security/compliance/).

An organisation exempted from invoicing by arrangement has both billing steps
satisfied automatically and never has to add a card. Being managed by a partner
is a separate thing from being exempt, so a managed client can still see the two
billing steps listed as outstanding even though its provider is the one invoiced.
Nothing stops working as a result, and the client is not charged. See
[partner billing](/partners/billing/).

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
carries the full instructions: the Microsoft 365 Integrated apps steps and the
manifest URL, with a button to copy it.

It completes only when the service has actually seen a signature request arrive
from your organisation. Uploading the manifest does not tick it. Somebody
composing a message and getting a signature does.

That is the point. Deployment is asynchronous and takes 6 to 72 hours to
propagate, so a step that completed on upload would tell you nothing useful.

See [deploy the add-in](/deploy/deploy-the-add-in/).

## Publishing a signature

New tenants are seeded with a ready-made starter design, so this step completes
when you replace it with something of your own.

That is a deliberate default. Opening a signature product on a blank page makes
the first hour harder than it needs to be, and a seeded design gives you
something to edit rather than something to invent.

## The panel

The checklist shows automatically until the required steps are done, or until
you dismiss it. Dismissing it is the one piece of state stored about the
checklist; everything else is computed.

You can return to it from Getting started in the sidebar at any time.

## After the checklist

Once the basics work, the usual next steps are
[assignment rules](/targeting/assignment-rules/) if different groups need
different signatures, a [compliance footer](/targeting/footers/) if legal needs
one, and [Activity](/monitoring/activity/) to confirm coverage across the
organisation.

For a larger deployment, [planning a rollout](/start/rollout/) sets out a phased
approach.
