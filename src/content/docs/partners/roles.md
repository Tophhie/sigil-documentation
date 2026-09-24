---
title: Partner roles
description: The four partner roles and what each one can reach across your client base.
sidebar:
  order: 3
---

Partner staff are people at the MSP, authenticated from the MSP's own Entra
tenant. Each is given a partner role that applies across the client base.

## The four roles

| Role | Grants |
| --- | --- |
| Owner | Everything: the client lifecycle, partner billing, staff management and accepting the partner agreement |
| Admin | The client lifecycle and full configuration inside a client, but not partner billing or staff management |
| Technician | Signature work inside a client, and correcting what its staff entered about themselves. No client lifecycle, no client user management, no billing |
| Billing | Partner billing and per-client usage reports only. No access inside a client at all |

The client lifecycle means adding a client, inviting one, asking to take over an
existing tenant, and releasing one. Owner and Admin both hold it.

Owner and Admin reach the same things inside a client. Where they differ is at
partner level: only an Owner touches the partner subscription or the staff list,
and only an Owner can accept the
[partner agreement](/partners/agreement/#accepting-it). Accepting
it commits the MSP commercially and under data protection law, which is not a
signature a service desk shift should be able to give.

A Technician reaches templates, rules, banners, footers, link analytics and
monitoring inside a client, but not that client's own users and roles, not its
[settings](/admin/settings/), and not its
[cost management](/admin/cost-management/). Turning a client's publish approval
off is exactly the kind of change that control exists to prevent, and excluding a
mailbox switches off a colleague's signature, so both sit with the roles that
also decide who has access.

A Technician can also see and correct what a client's staff entered in their own
[profile fields](/admin/profile-fields/). "She is on leave and her number is
wrong" is a service desk call rather than an account decision, and it would be a
strange programme that routed it to the partner Owner. Defining which fields a
client asks for is settings work, so a Technician does not get that half: they
arrive on the page able to fix a value and not to change the form.

No partner role reaches a managed client's billing, because a managed client has
no subscription of its own. The money is handled at partner level.

Cost management is the one deliberate exception, and the reason it is a separate
permission from billing. A managed client's seats are carried on your
consolidated bill, so excluding its dormant mailboxes is your decision to take.
Owner and Admin can do it without ever being shown that client's card, invoices
or subscription, none of which any partner role reaches.

The split follows the shape most MSP programmes use, which means it usually maps
onto how an MSP is already organised: an owner or two, service desk technicians
doing the day-to-day work, and somebody in finance who needs the numbers and
nothing else.

## What a partner role is not

A partner role is not a role inside a client's tenant.

Partner staff never appear in a client's user list. Their access comes from the
partner link, and the capabilities they get inside a client are derived from
their partner role rather than from anything the client granted.

The practical consequence: removing somebody at the MSP removes their access to
every client at once, with nothing to clean up in each client's tenant.

## Client scoping

Staff can be scoped to a subset of clients rather than all of them, which is the
usual arrangement for technicians on a large client base.

Scoping is set per person rather than per role. Somebody with no scope set
reaches every client of the partner; somebody scoped reaches only the clients
listed against them.

It applies to the three roles that reach clients at all, so an Owner, an Admin or
a Technician can each be narrowed. The Billing role cannot, because it has no
access inside any client to narrow. A scope list against a Billing user would
read as though it granted something, so the console does not offer one and a
scope sent for that role is discarded rather than stored.

## Managing staff

Owners manage the staff list from Partner staff in the console. Adding somebody
needs their email address and a role.

1. Open Partner staff in the portal sidebar.
2. Choose Add staff.
3. Enter their Email address. It must be a mailbox in your own organisation.
4. Pick a Role.
5. Under Client access, switch on the clients they may reach, or leave every
   switch off for access to all clients. The list is not shown for the
   Billing role.
6. Choose Save.

They appear in the list with their role and, under Client access, either the
clients named or All clients. To change somebody's role or scope, add them
again with the same email address: the form is titled Add or update staff,
and saving replaces what was there. You cannot change your own role.

To remove somebody:

1. Open Partner staff in the portal sidebar.
2. Choose Remove on their row.
3. Choose Remove in the confirmation.

They lose access to every client immediately. You cannot remove yourself, and
a partner must keep at least one Owner.

The same page holds the partner's product update switch, which only Owners can
change. With it on, which is the default, the partner's Owners and Admins receive the occasional round-up of
what has changed in Sigil, and turning it off stops them for all partner staff.
It does not change what a client's own administrators receive, since they
decide in their own [settings](/admin/settings/#product-update-emails), and
anybody can still stop product updates for their own address from the link at
the bottom of one. See
[emails Sigil sends](/admin/emails-sigil-sends/#product-updates).

1. Open Partner staff in the portal sidebar.
2. Under Product update emails, switch Send product update emails to your
   owners and admins on or off.

The change is saved as soon as the switch moves.

## Partner staff and their own tenant

Being partner staff and being an administrator of the MSP's own Sigil tenant are
separate things, and most people at an MSP are both. An engineer administers your
own signatures through the normal tenant views and your clients' through the
partner console.

## Compared with operator access

Tophhie Cloud's own support staff have a separate mechanism entirely: a read-only
"view as tenant" session that expires on the server after 30 minutes.

Partner access is read-write and not time-boxed, because a partner is
administering their clients rather than supporting them from outside. The two
are distinct paths with distinct guards.
