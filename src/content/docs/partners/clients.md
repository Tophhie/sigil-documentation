---
title: Managing clients
description: Onboard a client, work inside their tenant, and release them when the relationship ends.
sidebar:
  order: 2
---

The Clients view is the partner workbench. One row per managed client, with the
information you need to decide where to spend your day.

## What the client list shows

Each row carries the client's name, seat count, subscription and billing state,
signature health (whether the tenant has a published template and whether the
add-in is reporting in), last activity, and any open exceptions.

The intent is that the list answers "which client needs me today" on its own,
without opening each one in turn.

## Adding a client

You cannot grant admin consent inside somebody else's Entra tenant. Only an
administrator of that tenant can, so onboarding is an invite flow.

Add the client with their name, primary domain and the client administrator's
email address. Sigil issues a single-use, expiring invitation.

The client administrator follows it, grants admin consent for their own tenant,
and the tenant provisions itself as it would for any direct customer, except that
it is linked to your partner record and billed to you rather than to them.

## Working inside a client

Open a client and choose Manage. The portal switches into that client's context.

Every view works exactly as it does for a direct tenant: templates, the designer,
rules, banners, footers, activity, coverage. There is no separate partner version
of any of them.

A persistent banner shows which client you are editing, with a one-click exit
back to the partner console. That banner matters more than it sounds; the views
are identical, so the banner is what tells you whose signatures you are about to
publish.

Your access is read-write, so everything you do inside a client is a real change
to their signatures.

## Taking over an existing tenant

A client that already uses Sigil directly can be transferred to your management.
Because that changes who is billed and who can administer the tenant, it needs
the tenant's own administrator to approve the request rather than happening on
your say-so.

## Releasing a client

Releasing removes the partner link. The tenant reverts to a direct tenant, and
its billing becomes its own responsibility again.

Do this when a relationship ends, so the client is not left unable to administer
their own signatures and you are not left paying for them.

## A client can end it too

A managed client's own administrator can remove your access without asking you.

That is deliberate rather than an oversight. The client is the data controller,
and a controller has to be able to end a processor relationship it no longer
wants. Needing the processor's cooperation to do so would not be much of a right.

When it happens, the tenant returns to direct billing with a grace period to add
a card, and the action is recorded in the partner audit trail. Their seats stop
counting toward your subscription from that point.

## Your own tenant

Your MSP's own signatures live in a normal tenant, separate from the partner
record. You manage it exactly as any customer manages theirs.

## Audit

Partner-level actions are recorded in an append-only log: clients added, clients
released, staff granted access, discounts changed.

Changes you make inside a client are recorded in that client's own
[change log](/monitoring/change-log/), so the client can see what was changed and
when.
