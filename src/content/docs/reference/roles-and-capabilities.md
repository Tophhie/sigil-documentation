---
title: Roles and capabilities
description: What each portal role and each partner role can reach.
sidebar:
  order: 1
---

## Portal roles

Roles are assigned per organisation from [users and roles](/admin/users-and-roles/).

| Area | Admin | Editor | Marketing |
| --- | --- | --- | --- |
| Templates, drafts, versions | Yes | Yes | No |
| Staged rollouts, including promote and roll back | Yes | Yes | No |
| Images | Yes | Yes | No |
| Import and export | Yes | Yes | No |
| Preview and download | Yes | Yes | No |
| Test email | Yes | Yes | No |
| Assignment rules | Yes | Yes | No |
| Campaign banners | Yes | Yes | Yes |
| Compliance footers | Yes | No | No |
| Link click analytics | Yes | Yes | Yes |
| Activity and adoption | Yes | Yes | No |
| Attribute coverage | Yes | Yes | No |
| Change log | Yes | Yes | No |
| Users and roles | Yes | No | No |
| Billing and billing profile | Yes | No | No |

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
| Configure a managed client | Yes | Yes | Assigned clients | No |
| Add a client | Yes | Yes | No | No |
| Release a client | Yes | No | No | No |
| Partner billing | Yes | No | No | Yes |
| Usage and rebilling export | Yes | No | No | Yes |
| Manage partner staff | Yes | No | No | No |

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
