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

You need a Global Administrator account for this, because Microsoft refuses
consent from anyone else.

1. Go to `https://portal.usesigil.app/admin/consent`.
2. Sign in on Microsoft's screen with the administrator account.
3. Approve the permissions Microsoft lists.
4. Wait to be returned to the portal.

The portal shows "Your organisation is connected" and takes you straight into
Microsoft sign-in.

If you signed in to the portal before consent was granted, the portal stops at
"One more step to set up" instead of opening. Choose Approve as an
administrator to start the same flow. If you are not a Global Administrator
yourself, choose "Not an administrator? Copy the link" and send the link to
somebody who is.

Full detail: [connect your organisation](/deploy/connect-your-organisation/).

## 2. Sign in to the portal

Go to `https://portal.usesigil.app/admin` and sign in with your Microsoft
account. There is no separate password.

1. Go to `https://portal.usesigil.app/admin`.
2. Choose Sign in with Microsoft and sign in with your work account.
3. Open Getting started in the portal sidebar if the checklist is not already
   showing.

The checklist runs from Connect Microsoft 365 through billing details, a
payment method, the Data Processing Agreement, your signature, the add-in,
your team and a test email. Only an Admin sees it. Choosing Dismiss hides it,
and it stays reachable from the sidebar.

The [Getting started checklist](/admin/getting-started-checklist/) is the first
entry in the sidebar, so an empty portal is never where you start. Each step's
completion is worked out from real state rather than being ticked off by hand,
so the list stays honest.

## 3. Design your signature

Open Templates. You already have a starter template. From here you can either
build a new one in the [drag-and-drop designer](/signatures/designer/) or edit
markup directly in the [HTML editor](/signatures/html-editor/).

To skip most of the branding work, create a new template from your website
instead. Sigil reads your logo, brand colour, address and social profile links
from your public site, shows you what it found, and builds the starter signature
with them. See
[starting from your website](/signatures/templates/#starting-from-your-website).

If you are moving from another product, the usual approach is to recreate your
existing signature so the switch is invisible to recipients. Both editors can do
that; the HTML editor gives you exact control.

Drop in [placeholders](/signatures/placeholders/) such as `{{displayName}}` and
`{{jobTitle}}` wherever directory data belongs, and wrap optional parts in
[conditional sections](/signatures/placeholders/#conditional-sections) so a
missing phone number does not leave a stray separator behind.

Preview with sample data, then publish. In the HTML editor there is a line diff
against the live version to read before you commit.

### Create a template

You need the Admin or Editor role and a desktop browser, because the editors
do not open on a phone.

1. Open Templates in the portal sidebar.
2. Choose New template.
3. Enter a template name.
4. Under Start from, pick Starter signature, Blank canvas, From your website
   or HTML editor.
5. If you picked From your website, choose Next, enter your website address
   and choose Look up. Use Leave out on anything found that you do not want.
6. Choose Create in designer, or Create in HTML editor for the HTML choice.

The new template opens in the editor you chose. To work on the starter
template instead, choose Design or Edit next to it in the library.

### Publish it

1. In the editor, check the preview of the rendered signature.
2. In the HTML editor, choose Diff to read the changes against the live
   version.
3. Choose Publish.
4. In the HTML editor, choose Publish again in the confirmation.

The portal confirms with a "Published" message. If your organisation requires
publish approval and you are not an admin, the button reads Submit for review
instead, and an admin publishes it or sends it back.

A template you created new is not in use until you make it so: in Templates,
open the template's menu and choose Set active for new mail.

## 4. Deploy the Outlook add-in

This is the step that makes signatures appear, and the one that needs care.

In the Microsoft 365 admin centre, go to Settings, then Integrated apps, then
Upload custom apps, and upload the Sigil manifest. The Getting started checklist
carries the exact manifest URL for your tenant.

Target a pilot group first. Allow 6 to 72 hours for propagation before treating
a missing add-in as a fault.

Event-based add-ins only auto-launch when an administrator deploys them. A
person installing it themselves will not get automatic signatures.

You need an account that can upload add-ins in the Microsoft 365 admin
centre.

1. Open Getting started in the portal sidebar and, under Deploy the Outlook
   add-in, choose Copy next to the manifest URL.
2. In the Microsoft 365 admin centre, go to Settings, then Integrated apps.
3. Choose Upload custom apps, and select Office Add-in.
4. Provide the manifest URL, `https://static.usesigil.app/manifest.xml`.
5. Assign it to your pilot group.
6. Accept the permissions request and finish the deployment.

The checklist marks this step done once Sigil has seen a signature request
from your tenant, not when you finish the upload.

Full detail: [deploy the add-in](/deploy/deploy-the-add-in/).

## 5. Check it is working

Open Activity in the portal. It shows every signature request and every apply
outcome, per mailbox, plus a list of mailboxes that have never successfully
applied one.

1. Open Activity in the portal sidebar.
2. Under Signature adoption, read how many mailboxes have applied their
   signature at least once and how many never have.
3. Under By mailbox, find each pilot mailbox and check its Outcome.
4. Choose Export mailboxes (CSV) for the never-applied mailboxes as a list.

Send yourself a [test email](/admin/test-email/) to see the rendered signature in
a real client.

1. Open Templates in the portal sidebar.
2. Choose Send a test.
3. Under Render as, enter the mailbox whose details should fill the
   template.
4. Under Signature, pick New-message signature or Reply signature.
5. Under Send to, enter an address, or leave it blank to send to yourself.
6. Choose Send test.

If something is missing, [troubleshooting](/deploy/troubleshooting/) works from
tenant state down to a single mailbox.

## 6. Invite colleagues and add a card

Under Users and roles, invite the people who need portal access and give each a
role. There are six, and most people need a narrow one: Marketing reaches banners
and link analytics, Compliance reaches the legal footer, Viewer reads without
changing anything. See [users and roles](/admin/users-and-roles/).

You need the Admin or Billing role to invite, and only an Admin can give
somebody the Admin role.

1. Open Users & roles in the portal sidebar.
2. Choose Invite user.
3. Under Email address, start typing their name or address and pick them
   from your directory.
4. Under Role, pick a role.
5. Choose Add user.

They get access the next time they sign in with their Microsoft 365 account.

Under Billing, add a card through Stripe Checkout. At the end of the trial Stripe
either charges the card or, if there is no card on file, cancels the
subscription. An organisation that never adds a card simply stops rather than
being billed by surprise, and once the trial ends without an active subscription
signatures stop being served.

You need the Admin or Billing role, and your billing details have to be saved
before a card can be added.

1. Open Billing in the portal sidebar.
2. Open the Billing details tab and enter your legal company name, address,
   country and billing email.
3. Choose Save billing details.
4. Open the Your subscription tab.
5. Choose Add payment method.
6. Enter the card on Stripe's checkout page.

Stripe returns you to Billing once the card is saved.

## What comes next

Once the basics work, the pieces that usually follow are
[assignment rules](/targeting/assignment-rules/) to give different departments
different signatures, a [compliance footer](/targeting/footers/) for legal, and
[banners](/targeting/banners/) when marketing wants a campaign.

For a phased rollout across a larger organisation, see
[planning a rollout](/start/rollout/).
