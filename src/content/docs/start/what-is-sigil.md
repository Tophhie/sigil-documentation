---
title: What Sigil is
description: An overview of Sigil, the centrally managed email signature platform for Microsoft 365 and Outlook.
sidebar:
  order: 1
---

Sigil is an email signature platform for organisations running Microsoft 365.
An administrator designs one or more signature templates in a web portal. Every
person's signature is then rendered from those templates, personalised from the
company directory, and applied inside Outlook as they compose a message.

It is built by Tophhie Cloud and delivered as two pieces: a web admin portal at
`portal.usesigil.app`, and an Outlook add-in served from `static.usesigil.app`
that a Microsoft 365 administrator deploys once across the organisation.

| | |
| --- | --- |
| Category | Email signature management |
| Platform | Microsoft 365 and Exchange Online |
| Delivery | Outlook add-in plus a web admin portal |
| Identity | Microsoft Entra ID, with no separate login |
| Price | £0.70 per licensed mailbox per month, 14 day free trial |
| Vendor | Tophhie Cloud |

## The problem it solves

Left to individuals, signatures drift. Fonts wander, job titles go stale,
disclaimers get dropped, images break. Marketing wants brand consistency and the
occasional campaign banner. Legal wants a disclaimer that nobody can forget. IT
owns the deployment and would rather not touch a thousand mailboxes to change a
phone number.

Sigil moves all of that to one place. Templates are authored once, personalised
per person from Entra and Microsoft Graph, applied automatically by the add-in,
and changed without redeploying anything.

It also measures itself. Client-side signature tools are usually blind to their
own success, because nothing reports back. Sigil records both the signature
requests it serves and the outcome of each attempt to apply one, so the portal
can tell you which mailboxes are covered and which have never had a signature
applied at all.

## Who it is for

Sigil fits organisations on Microsoft 365 with Exchange Online, because the
add-in and the directory reads are both Microsoft-native. Typical buyers are IT
and Microsoft 365 administrators, often replacing Exclaimer Cloud, CodeTwo or a
manual process.

| Who | What they get |
| --- | --- |
| IT and M365 admins | Admin-consent onboarding, one manifest to deploy, Entra-native auth, adoption telemetry |
| Marketing | A drag-and-drop designer, org-wide templates, time-boxed banners, tracked links |
| Legal and compliance | Footers appended at render time, per email domain, that no template can omit |
| Everyone else | A correct signature with no effort, and an optional pane to apply it by hand |

Organisations not on Microsoft 365, such as those on Google Workspace, are not a
fit today. The product is built on Outlook add-ins and Entra.

## What it does

The feature set divides roughly into authoring, targeting, and monitoring.

Authoring covers the template library, a drag-and-drop
[designer](/signatures/designer/), a direct [HTML editor](/signatures/html-editor/),
[drafts and publishing](/signatures/publishing/) with a line diff before you go
live, [version history and rollback](/signatures/versions/), and
[import and export](/signatures/import-export/) as portable JSON.

Targeting decides who gets what.
[Assignment rules](/targeting/assignment-rules/) pick a template by directory
attribute or Entra group membership. [Banners](/targeting/banners/) inject a
time-boxed campaign image above or below every signature.
[Footers](/targeting/footers/) append a legal block per email domain.

Monitoring covers [activity and adoption](/monitoring/activity/), including the
list of mailboxes that have never applied a signature,
[attribute coverage](/monitoring/attribute-coverage/) across the directory,
[link click totals](/monitoring/link-clicks/), and an append-only
[change log](/monitoring/change-log/) of what admins did and when.

## How people experience it

Most people never see Sigil. The add-in fires on new messages, replies and
forwards, and on a change of sending account. There is no task pane to open and
nothing to click.

A compose ribbon button called "My signature" exists as a fallback. It applies
the signature on demand, explains why it did not if something failed, and offers
a download of the signature as a standalone HTML file. It also completes the
first-run sign-in that the silent event handler cannot do on its own. See
[how your signature works](/users/how-your-signature-works/).

Outlook on Windows, on the web and on Mac get full support. Outlook mobile gets
event-based application but no manual pane, because Outlook mobile activates
add-ins in read mode only.

## What it does not do

Some limits are worth knowing before you commit.

Sigil is Microsoft 365 only. Automatic application requires administrator
deployment of the add-in, because event-based add-ins do not auto-launch when a
user installs them individually. Propagation after deployment takes 6 to 72
hours.

Outlook itself constrains the templates: a rendered signature must stay under
30,000 characters, SVG is not supported, and images are attached inline rather
than hosted. [Outlook constraints](/signatures/outlook-constraints/) covers each
one and why it exists.

On the very first compose, or after an MFA prompt or an expired session, the
silent sign-in inside the event runtime can fail. The signature applies once the
person opens the "My signature" pane, and it self-heals from there.

## Where to go next

Read [how it works](/start/how-it-works/) for the mechanism, or go straight to
the [quickstart](/start/quickstart/) to connect an organisation.
