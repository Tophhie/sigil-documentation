---
title: Compliance footers
description: A legal block appended below every signature at render time, per email domain, that no template can omit.
sidebar:
  order: 3
---

A footer is a block appended below every rendered signature at render time. No
template carries it, which means no template can forget it.

This is the compliance surface. Where a legal disclaimer is mandatory, putting it
in a footer rather than in each template removes the possibility of somebody
creating a template without it.

## One per email domain

You can define one footer per email domain, plus an optional default that applies
to any domain without its own.

The domain used for matching is the domain of the address the message is being
sent from, not the mailbox's primary address. Somebody sending from a
subsidiary's alias gets the subsidiary's footer. See
[how it works](/start/how-it-works/#the-sending-address-not-the-mailbox).

Selection is specific first: a footer matching the sending domain wins over the
default.

## Writing a footer

Footer HTML supports the same [placeholders](/signatures/placeholders/) and
conditional sections as a template, so a footer can include the company name or
the office address without being written per office.

```html
<p style="font-size:11px;color:#666;">
  {{companyName}} is registered in England and Wales.
  {{#streetAddress}}Registered office: {{streetAddress}}, {{city}} {{postalCode}}.{{/streetAddress}}
</p>
```

Keep footers plain. They are legal text rather than design, most people never
read them, and a heavy footer costs size on every message.

Style footer text down: a smaller size and a lower contrast grey is conventional
and keeps the signature itself readable.

## What a footer counts against

The 30,000 character limit applies to the whole rendered signature, which includes
the footer. A long disclaimer eats into the budget available to the template.

See [Outlook constraints](/signatures/outlook-constraints/).

## How quickly changes take effect

Footer edits reach users within seconds. The footer in force is part of the
rendered-signature cache key, so publishing a change strands the affected cached
entries immediately.

## Footers and banners together

Both apply on top of the template. A signature can carry a
[banner](/targeting/banners/) above or below it and a footer beneath, and the
three are assembled per request.

The assembled result is cached against all three identities and their versions,
so changing any one of them takes effect without touching the others.

## Who can manage footers

Footers are managed by Admins. The Editor role covers templates and images but
not footers, and the Marketing role reaches neither. See
[users and roles](/admin/users-and-roles/).

That split is deliberate: a compliance footer is usually owned by legal or IT
rather than by whoever is editing the signature design.

## Checking a footer

Use the download action on the Templates view to render the live signature for a
mailbox on the domain in question. The footer appears in the output exactly as a
recipient would see it.

To check it in a real mail client, send a [test email](/admin/test-email/).
