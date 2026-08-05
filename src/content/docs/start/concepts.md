---
title: Core concepts
description: The vocabulary Sigil uses, and how templates, roles, rules, banners and footers fit together.
sidebar:
  order: 4
---

Sigil has a small number of moving parts. Knowing how they relate makes the rest
of the documentation easier to follow.

## Tenant

A tenant is one customer organisation, keyed by its Microsoft Entra tenant id.
Everything you create belongs to a tenant, and every request is scoped to the
tenant on the caller's token.

## Template

A template is a signature design containing HTML and
[placeholders](/signatures/placeholders/). Templates live in a named library, so
you can keep as many as you like. Each one carries its own version history.

A template is authored either in the [designer](/signatures/designer/), which
edits a block tree and compiles to email-safe HTML on publish, or in the
[HTML editor](/signatures/html-editor/), which edits that markup directly.

## Role

A role is a slot that a template fills. There are two: `new` for new messages,
and `reply` for replies and forwards. The template assigned to the `new` role is
what people usually mean by "the active signature".

Assigning a reply template is optional. Without one, replies get the new-message
template.

## Draft

Each template can carry one unpublished working copy. You edit and preview a
draft without changing what anyone receives. Publishing promotes the draft, files
the outgoing body in version history, and clears the draft. See
[drafts and publishing](/signatures/publishing/).

A draft can also be submitted for review, and an organisation can require that
every publish is approved by an admin. See
[publish approval](/signatures/approvals/).

## Scheduled publish

A publish booked for an instant you choose rather than applied now, for a change
that has to land at a particular moment. The body is captured when the schedule
is made, so later edits do not alter what goes live. See
[scheduled publishing](/signatures/scheduled-publishing/).

## Version

Every publish archives the body it replaced. Sigil keeps the last ten published
bodies per template, each template with its own independent history, and any of
them can be restored in one click. See [versions and rollback](/signatures/versions/).

## Rollout

A publish that goes to part of the organisation first. The template keeps serving
the current body to everyone outside the slice, and the new one spreads through
10%, 25%, 50% and then everyone as the add-in reports that it is applying. If it
applies worse than the version it would replace, it is withdrawn automatically.
See [staged rollouts](/signatures/staged-rollouts/).

## Assignment rule

An ordered list of predicates that refines which template a person gets. Each
rule matches on a directory attribute equalling one of a set of values, or on
membership of an Entra group, and names a template per role. First match wins;
anyone unmatched falls back to the organisation-wide roles. See
[assignment rules](/targeting/assignment-rules/).

## Banner

A time-boxed image injected above or below every rendered signature while its
window is open. Banners need no template edit and remove themselves when the
window closes. See [banners](/targeting/banners/).

## Footer

A legal or compliance block appended below every rendered signature at render
time. Because no template carries it, no template can forget it. There is one
footer per email domain, plus an optional default. See [footers](/targeting/footers/).

## Placeholder

A token such as `{{jobTitle}}` that is replaced with directory data when the
signature is rendered. Placeholders can be wrapped in conditional sections so
that optional content disappears when the underlying attribute is empty. See
[placeholders](/signatures/placeholders/).

## Tracked link

A redirect under `e-clk.usesigil.app/r/<slug>` that counts clicks without
recording who clicked. Banner links are always tracked. A template opts in per
template, which rewrites its static links at render time. Links containing a
placeholder are never rewritten, and hits from security scanners are counted
apart from the human ones. See [link clicks](/monitoring/link-clicks/).

## Seat

A billable licensed member mailbox. Shared and resource mailboxes are unlicensed
and therefore free. Accounts invited in from outside the organisation are
excluded, as are disabled ones. See [billing](/admin/billing/).

An organisation can also exclude a licensed mailbox itself, which takes it off
the bill and stops its signature at the same time. See
[cost management](/admin/cost-management/).

## Portal role

A permission level inside the portal, stored per tenant and assigned by an
administrator. The six roles are Admin, Editor, Marketing, Viewer, Compliance and
Billing. The Entra token establishes who you are and which organisation you
belong to; the portal role decides what you can do. See
[users and roles](/admin/users-and-roles/).

## Partner

A managed service provider running Sigil on behalf of a client base. A partner
is not a tenant: the MSP's own signatures live in a normal tenant, while the
partner record owns the client relationships and the consolidated bill. See
[the partner programme](/partners/overview/).

## How they fit together

On every compose, Sigil answers three questions and assembles the result:

| Question | Answered by |
| --- | --- |
| Which template? | Assignment rules, falling back to the `new` or `reply` role |
| Which banner, if any? | Whichever campaign window is open right now |
| Which footer, if any? | The sending address's email domain, falling back to the default |

The chosen template is personalised with that person's directory attributes, the
banner is injected above or below it, and the footer is appended underneath. The
whole thing is cached against those three identities and their versions, which is
why publishing any of them takes effect immediately.
