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

What managing users does not extend to is reading what colleagues entered in
their own [profile fields](/admin/profile-fields/). That sits behind a separate
capability the Billing role does not hold, because somebody's pronouns and
personal booking link are not part of running the account, and editing them puts
words in a colleague's signature.

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

### Addresses that cannot be invited

Access is granted by matching a sign-in to the address you invited, so an address
no sign-in will ever present is an invitation nobody can accept. Sigil checks
before creating the user rather than leaving you to discover it, and the refusal
names the problem:

| Address | Why it is refused |
| --- | --- |
| Not in your Microsoft 365 directory | Only members of your own organisation can produce a sign-in for it |
| A guest account | A guest signs in to their own organisation, not yours |
| A mailbox with sign-in disabled | Shared, room and equipment mailboxes have nobody to sign in as |
| An alias | Sign-in presents the primary address instead, so the invitation could never be matched. The message names the address to use instead |

The same check runs again whenever anybody is promoted to Admin, including a
user created before the check existed. An Admin who cannot sign in is worse than
a dead invitation, because the guard below counts them as an Admin while there is
nobody there.

An alias is the one refusal that can look wrong, since Sigil resolves aliases
elsewhere on purpose: a message sent from one gets that alias's signature. That
is a different question from who signed in, and the two do not have to agree.

## Changing or removing access

Change a role from the same view. The change applies on their next request.

Removing somebody removes their access entirely. They can still sign in, because
signing in is an Entra matter, but they are told to request access and can reach
nothing.

Nobody can change their own role or remove their own access, which is what stops
an accidental self-demotion.

## Your organisation always keeps an Admin

The last remaining Admin can be neither demoted nor removed. Whichever of the two
you attempt, Sigil refuses it and tells you to grant somebody else the role
first.

This holds even when two people are tidying up at once, because the rule is part
of the change rather than a check made beforehand. Two administrators each
removing the other, or an offboarding script running while somebody works down
the list by hand, cannot between them leave the organisation with none.

Granting Admin is never refused on these grounds, whatever the current count.
That direction is the way back, and an organisation cannot be locked out of
regaining an administrator.

If your organisation does end up with nobody holding the role, by whatever route,
Tophhie Cloud support can grant it back. Reach them from Help in the portal's
sidebar. An organisation managed by a partner is a normal exception rather than a
fault: its partner administers it through the partner relationship, and it may
hold no Admin of its own at all.

## What somebody without a role sees

Two situations are handled distinctly.

A valid sign-in from a connected organisation, with no role assigned, is
authenticated but authorised for nothing. They are told to request access from an
administrator.

One page is the exception, and it is deliberate. Where
[profile editing](/admin/settings/) is switched on, anybody in the organisation
can open `portal.usesigil.app/me` and fill in their own signature details without
holding a role. That page consults no role and grants none, so signing in there
opens nothing else in the portal, and it can never turn the first colleague who
tries it into an administrator. See
[profile fields](/admin/profile-fields/).

A sign-in from an organisation that has never granted consent gets a prompt to
connect their organisation instead. That is the self-serve onboarding path in
[connect your organisation](/deploy/connect-your-organisation/).

## The portal hides, the server enforces

The portal hides navigation a role cannot reach, which keeps the interface
uncluttered.

That is presentation rather than security. Every route on the server declares the
capability it requires and checks it independently, so hiding a menu item is not
what stops somebody reaching it.

## Access that is not a person

A script can be given access without a user account, through an
[API key](/admin/api-keys/). A key carries capabilities directly and no role,
belongs to the organisation rather than to whoever created it, and does not
appear in the user list here.

Only an Admin can create one, and a key can never be granted access its creator
does not hold.

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
