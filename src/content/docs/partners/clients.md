---
title: Managing clients
description: Onboard a client, work inside their tenant, and release them when the relationship ends.
sidebar:
  order: 2
---

The Clients view is the partner workbench. One row per managed client, and the
way into any of them.

## What the client list shows

Each row carries the client's name and primary domain, the seat count last
recorded for them, whether they have a published template, and how many users
their tenant holds. A client whose tenant has been suspended is badged as such.
Alongside each row are Manage, which opens the client, and a menu holding
Release.

The seat figure is the last one the daily count recorded rather than a live
number, so a client added today shows no seats until the next count runs.

The list is deliberately narrow. It tells you whether a client is set up and how
large they are, and nothing about their billing state, add-in activity or open
exceptions. A client whose signatures have stopped for some reason other than
never being published looks the same here as one that is fine, so a problem of
that kind shows in the client's own [attribute
coverage](/monitoring/attribute-coverage/) and [activity](/monitoring/activity/)
views rather than on this list.

## Adding a client

You cannot grant admin consent inside somebody else's Entra tenant. Only an
administrator of that tenant can, so onboarding is an invite flow.

Add the client with their name and, if you have it, the client administrator's
email address. Sigil issues a single-use invitation that expires after 14 days.

Give an address and Sigil emails the invitation for you. Leave it out and you get
the link back to pass on through your own channels, which is often what an MSP
wants when the introduction is already in a thread of its own.

The client administrator follows it, grants admin consent for their own tenant,
and the tenant provisions itself as it would for any direct customer, except that
it is linked to your partner record and billed to you rather than to them.

A pending invitation can be revoked before it is used.

An invitation is only honoured for an organisation that has genuinely granted
consent. Microsoft's consent redirect names the tenant it came back for, and that
name alone is not proof of anything, so Sigil checks the named tenant against
Microsoft directly before attaching it to you. Where the check comes back
definite that the organisation has not granted consent, the tenant is provisioned
as an ordinary direct customer, the partner link is withheld, and your invitation
is left unused so it can be sent again.

The check only refuses on a definite answer. A Microsoft outage, a timeout or a
slow moment during consent all count as no answer rather than as evidence against
the client, and the onboarding goes ahead with the partner link attached. That
asymmetry is deliberate: a real client should never lose a signup to a check that
could not reach Microsoft.

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

Owners and Admins can also create an [API key](/admin/api-keys/) inside a client,
which is how work across a client base gets automated. A key belongs to the
client rather than to you: it appears on their own list, flagged as created by
their IT provider, and their Admin can revoke it. There is no key that spans
several clients, so a provider with forty clients manages forty of them.

## Taking over an existing tenant

A client that already uses Sigil directly can be transferred to your management.
Because that changes who is billed and who can administer the tenant, it needs
the tenant's own administrator to approve the request rather than happening on
your say-so.

Name the organisation by its primary domain or by its Entra tenant id. Either
works, and the tenant id is the way round a client who has since changed the
domain on their Sigil account.

Their administrators are emailed the request and approve or decline it in their
own portal. The request expires after 14 days if nobody answers, and an
organisation can only have one pending at a time.

Nothing moves until it is approved. A transfer request is a request, not a claim.

### Taking back a client you previously managed

An organisation that has already left your management, whether you released it,
handed it back, or it removed your access itself, is treated differently from a
new one. Relinking it hands your staff back access to their directory and moves
their bill, and the organisation is not asked at the point the link is made.

So the ordinary route back is the transfer request above, which the client
approves for itself. Tophhie Cloud can also relink by hand, but only at the
organisation's own request, and an operator has to confirm they hold that request
before the link is made. Clause 7.2 of the [partner
agreement](/partners/agreement/) commits to that in writing, and the console
enforces it rather than leaving it to memory.

## Releasing a client

Releasing removes the partner link. The tenant reverts to a direct tenant, and
its billing becomes its own responsibility again.

Your staff lose access to that client immediately. Their signatures keep working,
and they get the same grace period a client-initiated departure gets, so somebody
who did not choose this has time to add a card before anything stops.

Their administrators are emailed, so a release is never something a client
discovers by noticing. Owners and Admins can release; a Technician cannot.

Do this when a relationship ends, so the client is not left unable to administer
their own signatures and you are not left paying for them.

Tophhie Cloud can also release a client on the same terms, one at a time. That
exists for the case where you cannot: a partner whose staff are locked out cannot
release anybody, and their clients would otherwise be stranded under a
partnership that is ending. The client sees no difference either way, because it
is the same release, with the same return to direct billing, the same grace
period and the same email to their administrators. See
[leaving the programme](/partners/leaving-the-programme/).

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

A client's administrators are also emailed directly for the three events they
must not learn about only by noticing: a transfer request, a release, and their
provider's billing failing. See
[emails Sigil sends](/admin/emails-sigil-sends/).
