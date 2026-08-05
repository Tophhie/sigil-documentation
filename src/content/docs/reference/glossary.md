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

**API key**
A credential belonging to an organisation rather than to a person, created by an
Admin so that a script can reach Sigil unattended. It carries capabilities and no
role. See [API keys](/admin/api-keys/).

**Assignment rule**
An ordered predicate that picks a template for a person by directory attribute or
Entra group membership. See [assignment rules](/targeting/assignment-rules/).

**Banner**
A time-boxed campaign image injected above or below the signature. See
[banners](/targeting/banners/).

**Conditional section**
Markup of the form `{{#field}}...{{/field}}` that disappears when the underlying
attribute is empty.

**Capability**
The unit of permission each server route actually checks. A portal role is a
named set of them. See
[roles and capabilities](/reference/roles-and-capabilities/).

**Contact card**
A vCard built from the sender's own directory record, offered either as a QR code
or as a signed download link in the signature. See
[the contact card link](/signatures/contact-card/).

**Direct tenant**
A tenant that signed up itself and pays for itself, as opposed to one managed by
a partner.

**Draft**
A template's unpublished working copy. One per template.

**Health digest**
A regular email to a tenant's administrators summarising coverage, apply failures
and anything waiting on a decision. Weekly by default. See
[the health digest](/monitoring/health-digest/).

**Failure rate**
The share of attempts to apply a given version that Outlook did not accept. The
number a staged rollout compares between the new version and the current one.

**Filtered click**
A hit on a tracked link attributed to a security scanner or a link preview
service rather than to a person. Counted separately and excluded from the
headline figures, but shown rather than hidden so the filter can be checked. See
[link clicks](/monitoring/link-clicks/).

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

**Publish approval**
An optional per-tenant switch requiring an admin to put any body live. Editors
submit drafts for review instead. See
[publish approval](/signatures/approvals/).

**Rollout**
A publish served to a percentage of mailboxes first, promoted or withdrawn on the
evidence of the add-in's apply results. See
[staged rollouts](/signatures/staged-rollouts/).

**Role**
Two meanings, distinguished by context. A signature role is the slot a template
fills: `new` or `reply`. A portal role is a permission level: Admin, Editor,
Marketing, Viewer, Compliance or Billing.

**Scheduled publish**
A template body booked to go live at a chosen instant. The body is captured when
the schedule is made rather than read when it fires. See
[scheduled publishing](/signatures/scheduled-publishing/).

**Excluded mailbox**
A mailbox the organisation has switched off in cost management. It receives no
signature on any path, and it does not count towards the seats. One decision does
both, and there is no way to have one without the other. See
[cost management](/admin/cost-management/).

**Seat**
A billable licensed member mailbox. Shared and resource mailboxes are free, as
are accounts invited in from outside the organisation, disabled accounts, and
mailboxes the organisation has excluded, whether individually or through an
excluded Entra group.

**Template**
A signature design containing HTML and placeholders. Library-managed and
versioned.

**Tenant**
A customer organisation, keyed by its Entra tenant id.

**Tracked link**
A redirect under `e-clk.usesigil.app/r/<slug>` that counts clicks without
identifying the clicker. See [link clicks](/monitoring/link-clicks/).
