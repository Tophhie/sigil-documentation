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

Footers are written in a small formatting editor rather than by hand. The toolbar
carries bold, italic and underline, four text sizes, a text colour, and a link you
can add and take off again. Beside them is a control that strips the formatting
from whatever you have selected, which is the quickest way out of styling you did
not mean to inherit.

Pasting brings in plain text only. Formatting from Word or from another email is
discarded on the way in, deliberately, because that markup is the usual reason a
block of legal text renders differently in one client from another.

A link has to be a full address beginning `http://` or `https://`. A bare domain
is refused as you enter it rather than saved and found broken later.

### Placeholders

Beneath the editor is a placeholders panel. Open it and click one to insert it at
the cursor, which saves remembering how a field name is spelled.

Footers support the same [placeholders](/signatures/placeholders/) and conditional
sections as a template, so a footer can name the company or the office address
without being written per office. The yes or no fields insert as a conditional
pair ready for you to fill, since there is nothing useful to print from one on its
own.

### Editing the HTML directly

The HTML button swaps the editor for the markup behind it, and swaps back.
Whatever you do in one view is waiting in the other, so a footer can be laid out
with the toolbar and then have one attribute corrected by hand.

That is also where conditional sections are written. They are markup rather than
formatting, so the toolbar has nothing to offer them.

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

Admins and the Compliance [role](/admin/users-and-roles/). The Editor role covers
templates and images but not footers, and the Marketing role reaches neither.

That split is deliberate: a compliance footer is usually owned by legal or IT
rather than by whoever is editing the signature design. The Compliance role
exists precisely so the footer's owner can maintain it without also being given
the template library, the campaign banners or the bill.

## Checking a footer

Use the download action on the Templates view to render the live signature for a
mailbox on the domain in question. The footer appears in the output exactly as a
recipient would see it.

To check it in a real mail client, send a [test email](/admin/test-email/).
