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

A footer cannot be saved empty. Deleting everything in a formatting editor rarely
leaves it truly empty, because the browser keeps a stray line break behind, so
what counts is whether anything would actually render: text or an image. Markup
with neither is treated as nothing and refused, rather than saved as a footer
that appends a blank line to every signature in the organisation.

The domain is checked as you type it. It wants a bare domain such as
`tophhie.co.uk`, not an address with `https://` or a path on the end, and a
leading `@` is forgiven since that is how the list prints one back to you.

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

## What the markup may contain

Footer HTML is cleaned when it is saved, whichever view you wrote it in. What
survives is everything a footer legitimately needs: inline formatting, links,
images, tables, inline styles and the conditional sections above.

What is taken out is the markup that can run code or pull in another document.
Scripts, frames, embedded objects, forms and their fields, and media elements are
removed along with their contents. Event handler attributes such as `onerror` and
`onload` are stripped from whatever they were attached to. A link or image
address is kept only if it uses `http`, `https`, `mailto`, `tel`, `cid`, or a
`data:` address holding an ordinary raster image, and the address is normalised
before that check so a scheme cannot hide behind an entity or a stray control
character. A `style` attribute that tries to navigate or execute goes the same
way.

Nothing about this is aimed at how a footer renders in Outlook, which strips most
of it anyway. It is about who can write one. The
[Compliance role](/admin/users-and-roles/) and an MSP Technician can both edit
footers without being able to touch users, settings or billing, and stored markup
is loaded back into the editor when another administrator opens it. Without the
clean-up, a footer would be a way to run code in the session of an administrator
who has all three.

The same clean-up runs a second time when stored markup is loaded back into the
editor, so a footer written before the rule existed is handled on the way in as
well as on the way out.

If you paste in markup and find part of it missing when you reopen the footer,
this is why. What is stored is what was kept.

## What a footer counts against

The 30,000 character limit applies to the whole rendered signature, which includes
the footer. A long disclaimer eats into the budget available to the template.

See [Outlook constraints](/signatures/outlook-constraints/).

## Pausing a footer

A footer can be paused from the list rather than deleted. A paused footer stops
appearing in signatures within seconds, and its wording, domain and history are
left alone, so taking a disclaimer out of circulation for a month does not mean
writing it again afterwards.

Editing a paused footer leaves it paused. Fixing a typo in something that was
deliberately taken out of circulation must not quietly put it back into every
signature, so the edit changes the wording and nothing else. The dialog says so
while you are in it, and resuming stays a separate deliberate act from the list.

A newly created footer is live immediately. There is no separate publish step for
a footer the way there is for a template, which the create button says rather
than leaving you to find out from the first message that goes out with it.

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
