---
title: The partner programme
description: Run Sigil for a client base from one console, with delegated administration and a single consolidated bill.
sidebar:
  order: 1
---

The partner programme lets a managed service provider run Sigil across a client
base: sign clients up, configure their signatures, support them day to day, and
receive one consolidated bill covering every client's usage.

It follows the delegated administration model MSPs already know from Microsoft's
CSP and GDAP programmes: a partner organisation, a client list, delegated roles,
invite-then-consent onboarding, aggregated per-seat billing, and per-client usage
export for rebilling.

## A partner is not a tenant

The distinction matters and it shapes everything else.

Your own signatures live in a normal Sigil tenant, exactly like any customer's.
The partner record is a separate entity that owns the client relationships and
the commercial arrangement.

Keeping them apart means a managed client is still an ordinary tenant in every
respect: same data model, same isolation, same portal. Nothing about being managed
changes how a client's signatures work.

| Term | Meaning |
| --- | --- |
| Partner | The MSP organisation |
| Partner staff | A person at the MSP, authenticated from the MSP's own Entra tenant |
| Managed client | A tenant linked to a partner |
| Direct tenant | A self-signed-up, self-billed tenant |
| Partner home tenant | The MSP's own Sigil tenant, for their own signatures |

## How access works

Partner staff sign in from the MSP's own Entra tenant. There is no extra consent
beyond the admin consent the MSP already grants for its own tenant.

When a member of partner staff acts on a client, the portal switches into that
client's context. Every existing view works unchanged, with a persistent banner
showing which client is being edited and a one-click exit.

Partner staff never appear in a client's user list. Their access comes from the
partner relationship rather than from a role granted inside the client's tenant,
which means removing somebody at the MSP removes their access to every client at
once.

This is delegated administration, and it is read-write. It is a different
mechanism from the read-only "view as tenant" that Tophhie Cloud's own operators
use for support.

## What partner staff can see

The partner console has its own section in the portal, shown when you sign in as
partner staff:

Clients, which is the workbench. One row per managed client, showing seats,
billing state, signature health, last activity and any open exceptions. It is
built to answer "which client needs me today" without drilling into each one.

Partner billing, covering the consolidated subscription, the current aggregate
seat count, the card on file and invoice history.

Usage and rebilling, with per-client seat counts for the current and prior
periods, exportable for your own billing system.

Partner staff, for managing who at the MSP has access and at what level.

## Onboarding a client

An MSP cannot grant admin consent inside a client's Entra tenant. Only an
administrator of that tenant can, which makes onboarding an invite flow rather
than something you can complete alone. See [managing clients](/partners/clients/).

## Billing

Managed clients have no subscription of their own. Their seats are counted into
the partner's single subscription, and the partner receives one bill covering
every client.

You then rebill through your own arrangement, using the per-client usage export.
See [partner billing](/partners/billing/).

## The partner agreement

The partner agreement is published at `portal.usesigil.app/partner-agreement`.
Acceptance is recorded against the partner, with the accepted version tracked, so
what was agreed and when is a record rather than an assertion.

It covers how client data is handled, the uptime Sigil commits to and the credits
if that commitment is missed, who answers a client's support questions, and
billing. Only a partner Owner can accept it, and accepting is what unblocks
taking a client on. See
[support and service level](/partners/service-level/).

It is separate from the [data processing agreement](/security/compliance/) a
client accepts. A partner cannot accept a client's DPA on their behalf, because
the client is the data controller and the agreement is theirs to make.

## Getting set up

Partner onboarding is not self-serve, because it establishes a commercial
relationship rather than just a tenant. Contact Tophhie Cloud through
`portal.usesigil.app/support` to start.

What you get back is a single link. Following it walks through the programme
terms offered to you, then sends you to Microsoft admin consent for your own
organisation. Granting it provisions your tenant, creates the partner record on
those terms, and makes the administrator who consented the partner Owner. There
is no further step at either end.

The link is single-use and expires.
