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
| Assignment rules | Which template each group or person gets, and the org-wide role assignments | Yes | No | No | No | No | No |
| Campaign banners | Scheduled promotional banners | Yes | No | Yes | No | No | No |
| Compliance footers | Legal and disclaimer footers | Yes | No | No | No | Yes | No |
| Link click analytics | Click tracking and its reports | Yes | No | Yes | Yes | No | No |
| Monitoring | Activity feed, attribute coverage, change log | Yes | Yes | No | Yes | Yes | No |
| Users and roles | Invite users and assign roles | Yes | No | No | No | No | Yes |
| Billing | Plan, seats, subscription and billing profile | Yes | No | No | No | No | Yes |

Admin is the only role that holds every capability, and assignment rules are the
only capability no other role holds. Rules decide who receives which signature,
so changing one has organisation-wide reach that a narrower role should not.

Only an Admin can create, change or remove another Admin. A Billing role holds
the users capability and can manage ordinary colleagues, but cannot promote
anybody to Admin, including a second account of their own.

A valid sign-in with no role assigned is authenticated but authorised for
nothing, and is told to request access. A sign-in from an organisation that never
granted consent is prompted to connect it instead.

The portal hides navigation a role cannot reach. Every server route independently
checks the capability it requires, so hiding a menu item is presentation rather
than the control.

## Partner roles

Partner roles apply across a managed client base. See
[partner roles](/partners/roles/).

| Area | Owner | Admin | Technician | Billing |
| --- | --- | --- | --- | --- |
| Work inside a managed client at all | Yes | Yes | Yes | No |
| Add, invite, transfer or release a client | Yes | Yes | No | No |
| Partner billing and invoice details | Yes | No | No | Yes |
| Usage and rebilling export | Yes | No | No | Yes |
| Manage partner staff | Yes | No | No | No |

Inside a client, Owner, Admin and Technician reach templates, rules, banners,
footers, analytics and monitoring. Owner and Admin additionally reach the
client's own users and roles; a Technician does not. No partner role reaches a
client's billing, because a managed client has no subscription of its own.

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
