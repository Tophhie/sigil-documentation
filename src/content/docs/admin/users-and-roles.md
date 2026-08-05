---
title: Users and roles
description: Invite colleagues to the Sigil portal and give each of them the right level of access.
sidebar:
  order: 1
---

Portal access is managed inside Sigil rather than through Entra app roles. An
administrator invites colleagues and assigns each a role, stored against your
organisation.

Your Entra token establishes who you are and which organisation you belong to.
Your role decides what you can do.

## The six roles

| Role | Can do |
| --- | --- |
| Admin | Everything, including assignment rules, users, roles, billing and the organisation-wide settings |
| Editor | Templates, drafts, versions, staged rollouts, images, export and import, preview, download, test email, plus activity, attribute coverage and the change log |
| Marketing | Campaign banners and link click analytics only |
| Viewer | Reads activity, attribute coverage, the change log and link clicks. Changes nothing |
| Compliance | Compliance footers, plus the same read-only monitoring a Viewer gets |
| Billing | The subscription, the billing profile, cost management, and inviting colleagues |

Each one is narrow on purpose, so the person who needs one part of Sigil does not
have to be given all of it.

The Editor role covers the signature work but not the organisation's
configuration: no assignment rules, no users, no billing, no compliance footers.

Marketing lets a marketing team run campaigns and see how they performed without
being able to change signature templates or reach billing.

Viewer is the role for somebody who needs to answer "is this working" without
being able to change anything, which is usually a service desk.

Compliance owns the legal footer and can watch activity, but has no say over
template design, banners, rules or billing. That matches how the footer is
usually owned by legal rather than by whoever is editing the design.

Billing is the account owner who pays for Sigil without editing signatures. It
carries user management alongside the subscription, because the person holding
the account is normally the person deciding who has access to it.

It also carries [cost management](/admin/cost-management/), which is the one
thing a Billing role does that changes what a colleague's mail looks like:
excluding a mailbox takes it off the bill and stops its signature together. Every
use of it is written to the [change log](/monitoring/change-log/) for that
reason.

Only an Admin can create, change or remove another Admin. Somebody with the
Billing role can manage ordinary colleagues but cannot promote anybody to Admin,
including themselves through a second account.

The Admin role is also the only one that reaches [settings](/admin/settings/). If
[publish approval](/signatures/approvals/) is switched on there, it becomes the
only role that can put a signature live, and an Editor works through drafts and
submits them for review.

The full capability grid is in
[roles and capabilities](/reference/roles-and-capabilities/).

## Inviting somebody

Invite from Users and roles. You need their email address and a role.

They sign in at `portal.usesigil.app/admin` with their Microsoft account. There
is no separate password to set and no account to activate.

Somebody added for the first time is emailed their portal link and told which
role they have been given. Changing an existing user's role sends nothing, since
it takes effect on their next request. See
[emails Sigil sends](/admin/emails-sigil-sends/).

## Changing or removing access

Change a role from the same view. The change applies on their next request.

Removing somebody removes their access entirely. They can still sign in, because
signing in is an Entra matter, but they are told to request access and can reach
nothing.

## What somebody without a role sees

Two situations are handled distinctly.

A valid sign-in from a connected organisation, with no role assigned, is
authenticated but authorised for nothing. They are told to request access from an
administrator.

A sign-in from an organisation that has never granted consent gets a prompt to
connect their organisation instead. That is the self-serve onboarding path in
[connect your organisation](/deploy/connect-your-organisation/).

## The portal hides, the server enforces

The portal hides navigation a role cannot reach, which keeps the interface
uncluttered.

That is presentation rather than security. Every route on the server declares the
capability it requires and checks it independently, so hiding a menu item is not
what stops somebody reaching it.

## Not Entra app roles

Sigil does not use Entra app roles for authorisation, which means there is no app
role assignment to configure in the Microsoft admin centre and no group mapping
to maintain.

The trade is that portal access is managed in one more place than your other
applications. In exchange, granting somebody Editor access does not require an
Entra administrator.

## Partner staff

If your organisation is managed by a partner, that partner's staff can administer
your tenant without appearing in your user list. Their access comes from the
partner relationship rather than from a role you granted, and removing a member
of staff at the partner removes their access to every client at once.

See [the partner programme](/partners/overview/).
