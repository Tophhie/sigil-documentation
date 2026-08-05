---
title: Quickstart
description: Take an organisation from nothing to a working signature in Outlook.
sidebar:
  order: 3
---

This is the whole path, from an organisation that has never heard of Sigil to a
signature appearing in Outlook. Each step links to the detail.

You need a Microsoft 365 tenant with Exchange Online, and an account that can
grant admin consent in Entra and upload an add-in in the Microsoft 365 admin
centre. Global Administrator covers both.

## 1. Connect your organisation

Visit `https://portal.usesigil.app/admin/consent`. You are redirected to
Microsoft's admin consent screen, which lists the read-only Graph permissions
Sigil needs. Granting consent installs Sigil's service principal in your tenant.

The callback provisions your tenant automatically: it creates a trial
subscription, pre-fills the billing profile from your organisation's registered
address, and seeds a ready-made starter signature so you do not open the portal
to a blank page.

The first person to sign in afterwards becomes the tenant administrator.

Full detail: [connect your organisation](/deploy/connect-your-organisation/).

## 2. Sign in to the portal

Go to `https://portal.usesigil.app/admin` and sign in with your Microsoft
account. There is no separate password.

You land on the [Getting started checklist](/admin/getting-started-checklist/)
rather than an empty portal. Each step's completion is worked out from real
state rather than being ticked off by hand, so the list stays honest.

## 3. Design your signature

Open Templates. You already have a starter template. From here you can either
build a new one in the [drag-and-drop designer](/signatures/designer/) or edit
markup directly in the [HTML editor](/signatures/html-editor/).

If you are moving from another product, the usual approach is to recreate your
existing signature so the switch is invisible to recipients. Both editors can do
that; the HTML editor gives you exact control.

Drop in [placeholders](/signatures/placeholders/) such as `{{displayName}}` and
`{{jobTitle}}` wherever directory data belongs, and wrap optional parts in
[conditional sections](/signatures/placeholders/#conditional-sections) so a
missing phone number does not leave a stray separator behind.

Preview with sample data, then publish. In the HTML editor there is a line diff
against the live version to read before you commit.

## 4. Deploy the Outlook add-in

This is the step that makes signatures appear, and the one that needs care.

In the Microsoft 365 admin centre, go to Settings, then Integrated apps, then
Upload custom apps, and upload the Sigil manifest. The Getting started checklist
carries the exact manifest URL for your tenant.

Target a pilot group first. Allow 6 to 72 hours for propagation before treating
a missing add-in as a fault.

Event-based add-ins only auto-launch when an administrator deploys them. A
person installing it themselves will not get automatic signatures.

Full detail: [deploy the add-in](/deploy/deploy-the-add-in/).

## 5. Check it is working

Open Activity in the portal. It shows every signature request and every apply
outcome, per mailbox, plus a list of mailboxes that have never successfully
applied one.

Send yourself a [test email](/admin/test-email/) to see the rendered signature in
a real client.

If something is missing, [troubleshooting](/deploy/troubleshooting/) works from
tenant state down to a single mailbox.

## 6. Invite colleagues and add a card

Under Users and roles, invite the people who need portal access and give each a
role. There are six, and most people need a narrow one: Marketing reaches banners
and link analytics, Compliance reaches the legal footer, Viewer reads without
changing anything. See [users and roles](/admin/users-and-roles/).

Under Billing, add a card through Stripe Checkout. At the end of the trial Stripe
either charges the card or, if there is no card on file, cancels the
subscription. An organisation that never adds a card simply stops rather than
being billed by surprise, and once the trial ends without an active subscription
signatures stop being served.

## What comes next

Once the basics work, the pieces that usually follow are
[assignment rules](/targeting/assignment-rules/) to give different departments
different signatures, a [compliance footer](/targeting/footers/) for legal, and
[banners](/targeting/banners/) when marketing wants a campaign.

For a phased rollout across a larger organisation, see
[planning a rollout](/start/rollout/).
