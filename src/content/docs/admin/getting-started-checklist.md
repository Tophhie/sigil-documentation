---
title: The Getting started checklist
description: The onboarding checklist a new administrator lands on, and why each step completes itself.
sidebar:
  order: 4
---

A new administrator lands on a checklist rather than an empty portal.

Every step's completion is worked out from real state rather than being ticked
off by hand. That makes the list honest: it cannot say the add-in is deployed
when nobody has ever received a signature.

## The steps

| Step | Completes when |
| --- | --- |
| Add a card | A payment method exists in Stripe |
| Publish a signature | The active template is no longer the seeded starter |
| Deploy the add-in | Sigil has seen a real signature request from your tenant |
| Invite colleagues | At least one other person has been given a role |
| Send a test email | A test email has been sent |

## The add-in step

This is the one that matters and the one that is easiest to get wrong, so it
carries the full instructions: the Microsoft 365 Integrated apps steps and the
exact manifest URL for your tenant.

It completes only when the Worker has actually seen a signature request arrive
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
