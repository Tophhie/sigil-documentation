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
| Owner | Everything, including partner billing, staff management and releasing clients |
| Admin | Full configuration on every managed client, but not partner billing or staff management |
| Technician | Template, banner, footer and rules work on assigned clients. No client lifecycle, no billing |
| Billing | Partner billing and per-client usage reports only. No client configuration |

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

## Managing staff

Owners manage the staff list from Partner staff in the console. Adding somebody
needs their email address and a role.

## Partner staff and their own tenant

Being partner staff and being an administrator of the MSP's own Sigil tenant are
separate things, and most people at an MSP are both. An engineer administers your
own signatures through the normal tenant views and your clients' through the
partner console.

## Compared with operator access

Tophhie Cloud's own support staff have a separate mechanism entirely: a read-only
"view as tenant" session that expires on the server after 30 minutes.

Partner access is read-write and not time-boxed, because a partner is
administering their clients rather than supporting them from outside. The two are
distinct paths with distinct guards.
