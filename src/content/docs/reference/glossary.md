---
title: Glossary
description: The terms Sigil uses.
sidebar:
  order: 3
---

**Active template**
The template served for new messages. A separate one may cover replies.

**Add-in**
The Outlook extension, built on Office.js, that applies the signature when
somebody composes a message.

**Assignment rule**
An ordered predicate that picks a template for a person by directory attribute or
Entra group membership. See [assignment rules](/targeting/assignment-rules/).

**Banner**
A time-boxed campaign image injected above or below the signature. See
[banners](/targeting/banners/).

**Conditional section**
Markup of the form `{{#field}}...{{/field}}` that disappears when the underlying
attribute is empty.

**Direct tenant**
A tenant that signed up itself and pays for itself, as opposed to one managed by
a partner.

**Draft**
A template's unpublished working copy. One per template.

**Failure rate**
The share of attempts to apply a given version that Outlook did not accept. The
number a staged rollout compares between the new version and the current one.

**Footer**
A legal or compliance block appended below every signature at render time. See
[footers](/targeting/footers/).

**Founding tenant**
Tophhie Cloud's own organisation. Billing-exempt, and the home of the platform
operators.

**Integrated apps**
The area of the Microsoft 365 admin centre where an administrator deploys the
add-in.

**Managed client**
A tenant linked to a partner, configured and billed through that partner.

**NAA**
Nested app authentication, the mechanism by which the add-in acquires an Entra
token silently from inside Outlook.

**Never-applied list**
The list of mailboxes that have never successfully applied a signature, produced
by cross-referencing the directory against telemetry. See
[activity](/monitoring/activity/).

**Partner**
A managed service provider running Sigil for a client base. Not a tenant. See
[the partner programme](/partners/overview/).

**Placeholder**
A token such as `{{jobTitle}}` replaced with directory data at render time. See
[placeholders](/signatures/placeholders/).

**Platform console**
Tophhie Cloud's cross-tenant operator view.

**Rollout**
A publish served to a percentage of mailboxes first, promoted or withdrawn on the
evidence of the add-in's apply results. See
[staged rollouts](/signatures/staged-rollouts/).

**Role**
Two meanings, distinguished by context. A signature role is the slot a template
fills: `new` or `reply`. A portal role is a permission level: Admin, Editor,
Marketing, Viewer, Compliance or Billing.

**Seat**
A billable licensed member mailbox. Shared and resource mailboxes are free, as
are accounts invited in from outside the organisation.

**Template**
A signature design containing HTML and placeholders. Library-managed and
versioned.

**Tenant**
A customer organisation, keyed by its Entra tenant id.

**Tracked link**
A redirect under `e-clk.usesigil.app/r/<slug>` that counts clicks without
identifying the clicker. See [link clicks](/monitoring/link-clicks/).
