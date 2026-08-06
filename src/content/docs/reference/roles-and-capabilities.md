---
title: Roles and capabilities
description: What each portal role and each partner role can reach.
sidebar:
  order: 1
---

## Portal roles

Roles are assigned per organisation from [users and roles](/admin/users-and-roles/).

There are six, and each grants a set of capabilities. A capability is the unit
each route actually checks, so this table is what the server enforces rather than
a description of it.

| Capability | Covers | Admin | Editor | Marketing | Viewer | Compliance | Billing |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Templates and signatures | Library, editor, drafts, versions, staged rollouts, images, import and export, preview, download, test email | Yes | Yes | No | No | No | No |
| Assignment rules | Which template each group or person gets, the org-wide role assignments, and simulating a mailbox against the rules | Yes | No | No | No | No | No |
| Campaign banners | Scheduled promotional banners | Yes | No | Yes | No | No | No |
| Compliance footers | Legal and disclaimer footers | Yes | No | No | No | Yes | No |
| Link click analytics | Click tracking and its reports | Yes | No | Yes | Yes | No | No |
| Monitoring | Activity feed, attribute coverage, change log | Yes | Yes | No | Yes | Yes | No |
| Users and roles | Invite users and assign roles | Yes | No | No | No | No | Yes |
| Billing | Plan, seats, subscription and billing profile | Yes | No | No | No | No | Yes |
| Cost management | Which mailboxes and Entra groups are excluded from Sigil, and the suggestions behind that | Yes | No | No | No | No | Yes |
| Settings | The organisation-wide switches: publish approval and the health digest | Yes | No | No | No | No | No |

Admin is the only role that holds every capability. Assignment rules and settings
are the two capabilities no other role holds. Rules decide who receives which
signature, and settings decide who may publish at all, so both have
organisation-wide reach that a narrower role should not.

Where [publish approval](/signatures/approvals/) is switched on, holding the
templates capability is no longer enough to put a body live. Publishing,
restoring a version, staging a rollout and scheduling any of it then need the
Admin role, while everything else an Editor does is unchanged.

Cost management is deliberately its own capability rather than part of billing.
The two travel together for a tenant, where the Admin and Billing roles hold
both, but they come apart for a partner: a managed client's dormant mailboxes are
its provider's to trim, while its card and invoices are not its provider's to
see. Note that it is also the one capability outside templates that changes what
a colleague's outgoing mail looks like, which is why every use of it is written to
the [change log](/monitoring/change-log/).

Only an Admin can create, change or remove another Admin. A Billing role holds
the users capability and can manage ordinary colleagues, but cannot promote
anybody to Admin, including a second account of their own.

A valid sign-in with no role assigned is authenticated but authorised for
nothing, and is told to request access. A sign-in from an organisation that never
granted consent is prompted to connect it instead.

The portal hides navigation a role cannot reach. Every server route independently
checks the capability it requires, so hiding a menu item is presentation rather
than the control.

## API keys hold capabilities and no role

An [API key](/admin/api-keys/) is the one principal in Sigil that is not a
person. It carries a set of capabilities drawn from the same table above, chosen
when it is created, and it holds no role at all.

That distinction decides part of what a key cannot reach. Anything guarded by the
Admin role rather than by a capability is refused to a key however its access is
set: rejecting a submitted draft, the getting started checklist, accepting the
data processing agreement, managing keys, and every publish path while
[publish approval](/signatures/approvals/) is switched on.

A second limit sits on top of the capabilities, and it has no equivalent for a
person. A key may only call operations on an allow-list, so holding a capability
is necessary rather than sufficient. The template capability, for instance,
reaches most of the signature library under a key but not the per-mailbox
download, the preview against a real address or the test email, all of which a
person holding the same capability can still use. See
[API keys](/admin/api-keys/) for the whole list and the reasoning behind it.

A key can never be granted access its creator does not hold, and only an Admin
can create one. There is deliberately no capability for key management that a
narrower role could come to hold, because issuing a credential is a question
about access rather than an area of the product.

A key also carries a read-only flag that is independent of its capabilities.
With it set, the key can read every area it was given and write to none of them.

## Partner roles

Partner roles apply across a managed client base. See
[partner roles](/partners/roles/).

| Area | Owner | Admin | Technician | Billing |
| --- | --- | --- | --- | --- |
| Work inside a managed client at all | Yes | Yes | Yes | No |
| Exclude a client's mailboxes from Sigil | Yes | Yes | No | No |
| Create an API key inside a managed client | Yes | Yes | No | No |
| Add, invite, transfer or release a client | Yes | Yes | No | No |
| Partner billing and invoice details | Yes | No | No | Yes |
| Usage and rebilling export | Yes | No | No | Yes |
| Manage partner staff | Yes | No | No | No |

Inside a client, Owner, Admin and Technician reach templates, rules, banners,
footers, analytics and monitoring. Owner and Admin additionally reach the
client's own users and roles, its [settings](/admin/settings/) and its
[cost management](/admin/cost-management/); a Technician reaches none of the
three. No partner role reaches a client's billing, because a managed client has
no subscription of its own.

A Technician is deliberately kept out of settings and cost management. Turning a
client's publish approval off is exactly the kind of change that control exists
to prevent, and switching off a mailbox's signature is an account decision rather
than signature work. Both belong with the roles that also decide who has access.

Any staff member can also be scoped to particular clients, whatever their role.
Somebody with no scope set reaches every client of the partner; somebody scoped
reaches only the clients listed against them.

Partner staff never appear in a client's user list. Their capabilities inside a
client come from their partner role rather than from anything the client granted,
so removing somebody at the MSP removes their access to every client at once.

## Vendor operator tiers

Tophhie Cloud's own staff have a separate, tiered access list. It is not something
a customer configures, but it is relevant to a security review.

| Capability | Support | Operator |
| --- | --- | --- |
| Read-only console, overview, health, exceptions | Yes | Yes |
| Preview, audit, notes, export | Yes | Yes |
| Read-only impersonation, expiring after 30 minutes | Yes | Yes |
| Message a tenant's administrators, resend consent | Yes | Yes |
| Suspend, reactivate, reprovision, rename | No | Yes |
| Billing levers such as seat correction and discounts | No | Yes |
| Deprovision or purge a tenant | No | Yes |

Destructive actions additionally require a fresh interactive re-authentication.
The last operator cannot be removed or demoted, so the console cannot lock itself
out. See [compliance](/security/compliance/).
