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

## The three roles

| Role | Can do |
| --- | --- |
| Admin | Everything, including users, roles, footers and billing |
| Editor | Templates, drafts, versions, images, export and import, preview, download, test email, plus Activity and attribute coverage |
| Marketing | Campaign banners and link click analytics only |

The Marketing role is deliberately narrow. A marketing team can run campaigns and
see how they performed without being able to change signature templates or reach
billing.

The Editor role covers the signature work but not the organisation's
configuration: no users, no billing, no compliance footers.

## Inviting somebody

Invite from Users and roles. You need their email address and a role.

They sign in at `portal.usesigil.app/admin` with their Microsoft account. There
is no separate password to set and no account to activate.

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
