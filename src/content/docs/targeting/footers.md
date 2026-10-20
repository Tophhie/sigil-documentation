---
title: Compliance footers
description: A legal block appended below every signature at render time, per email domain, that a template can only leave out through an acknowledged switch.
sidebar:
  order: 3
---

A footer is a block appended below every rendered signature at render time. No
template carries it, which means no template can forget it. A template can still
be set to go out without it, but only by someone who owns the footer, and only
after they have acknowledged what that means. See
[keeping the footer off a signature](#keeping-the-footer-off-a-signature).

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
default. The match is on the exact domain, so a footer for `contoso.com` does not
cover `uk.contoso.com`. A subdomain that sends mail needs a footer of its own, or
falls to the default.

Each domain takes one footer, and so does the default. Creating a second one is
refused with a message naming the footer that already holds the slot, for example
"A footer for contoso.com already exists ("Contoso legal"). Edit it instead."

To decide which domain a footer applies to:

1. Open the footer's dialog, from New footer or from Edit on its row.
2. In Applies to domain, enter the bare domain, such as `contoso.com`, or
   leave it blank for the default that covers every other domain.
3. Choose Create footer or Save changes.

The Applies to column then shows the domain, or All other domains for the
default.

## Creating and editing a footer

You need the Admin or Compliance role, or a
[custom role](/admin/users-and-roles/#custom-roles) that includes Compliance
footers.

1. Open Footers in the portal sidebar.
2. Choose New footer.
3. Enter a Footer name.
4. In Applies to domain, enter the domain the footer is for, or leave it blank
   for the default.
5. Write the footer in Footer content. The next section describes the editor.
6. Choose Create footer.

The footer is live at once. The toast says it was created and live and that
every matching signature now carries it, and the list shows it as Live.

To change a footer:

1. Open Footers in the portal sidebar.
2. Choose Edit on the footer's row.
3. Change its name, its domain or its content.
4. Choose Save changes.

Signatures pick the change up within seconds. A paused footer stays paused; see
[pausing a footer](#pausing-a-footer).

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
Scripts, frames, embedded objects, forms and their fields, media elements and
inline SVG are removed along with their contents. Event handler attributes such as `onerror` and
`onload` are stripped from whatever they were attached to. A link or image
address is kept only if it is relative or uses `http`, `https`, `mailto`, `tel`,
`cid`, or a `data:` address holding an ordinary raster image, and the address is normalised
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

Sigil does not check this for you. Saving a footer has no length check, and the
check that blocks an oversized template measures the template without its footer.
A long footer can therefore push a template that passed over the limit with no
warning. Leave a margin on the template for the footer it will carry.

See [Outlook constraints](/signatures/outlook-constraints/).

## Pausing a footer

A footer can be paused from the list rather than deleted. A paused footer stops
appearing in signatures within seconds, and its wording and domain are left
alone, so taking a disclaimer out of circulation for a month does not mean
writing it again afterwards.

Pausing a domain's footer hands that domain to the default footer, if you have
one, rather than leaving its signatures with no footer at all. While a default is
live, there is no way to give one domain no footer. The switch on a template,
described in the next section, works per signature rather than per domain.

Editing a paused footer leaves it paused. Fixing a typo in something that was
deliberately taken out of circulation must not quietly put it back into every
signature, so the edit changes the wording and nothing else. The dialog says so
while you are in it, and resuming stays a separate deliberate act from the list.

A newly created footer is live immediately. There is no separate publish step for
a footer the way there is for a template. The confirmation after Create footer
says so, "Footer created and live. Every matching signature now carries it.",
rather than leaving you to find out from the first message that goes out with
it.

To pause or resume a footer:

1. Open Footers in the portal sidebar.
2. Open the row's menu, the button at the right of the row labelled Footer
   actions.
3. Choose Pause, or Resume on a footer that is paused.

The Status column changes to Paused, or back to Live.

## Keeping the footer off a signature

Each template has a Compliance footer switch. It is on for every template,
including a new blank one, and while it is on the template gets whatever footer
is in force for the sending domain. Turned off, the template never carries a
footer, from any domain, including footers created later.

The usual reason is a reply signature. A blank reply template that sends no
signature, with campaign banners already off, would otherwise go out carrying
the legal block on its own three messages into a thread. The switch is the way
to stop that without pausing the footer for everyone.

The switch belongs to the template, not to the footer or to an assignment rule.
A rule that routes a department to a template with the footer off sends that
department out without it, so there is no setting for this on the rule itself.
The rule dialog says as much under its template pickers, and lists such a
template with "(footer off)" after its name.

### Who can turn it off

Turning the footer off removes a legal block, so it is the footer owner's
decision rather than the template editor's. The switch needs the Compliance
footers capability in both directions: the Admin role, a
[custom role](/admin/users-and-roles/#custom-roles) given Compliance footers, or
a partner's Owner, Admin and Technician staff. The Editor role cannot. An Editor
sees the menu item greyed out, and hovering over it gives the reason.

The switch lives in the template library, which the Compliance role cannot open,
so in practice a Compliance user can turn a footer back on, from the Footers
view, but not off. Somebody who holds both Templates and Compliance footers,
such as an Admin, does the turning off.

### Turning it off

1. Open Templates in the portal sidebar.
2. Open the menu at the end of the template's row.
3. Choose Turn the compliance footer off.
4. Read the dialog. It names the footer or footers this signature would stop
   carrying, and says so plainly when no footer is live yet, since the switch
   also covers footers added later.
5. Turn on the switch labelled "I understand this signature will be sent
   without the compliance footer". The button stays disabled until you do.
6. Choose Turn the footer off.

The dialog's warning reads:

> Messages sent with this signature will go out without the legal footer your
> organisation adds to every other signature. Sigil adds the footer at the
> moment a message is composed, so turning it off here is the only way a
> signature leaves without it. This is recorded in your change log with your
> name and the time.

The portal confirms with a toast naming the signature, and the row gains a
Footer off chip in warning colours. Hovering over the chip says who turned the
footer off and on which day.

The acknowledgement is enforced by Sigil, not only by the dialog. A request
through the [API](/reference/api/) that turns the footer off without saying it
has been acknowledged is refused. What gets recorded, on the template and in
the [change log](/monitoring/change-log/), is who did it, when, and which
version of the warning they were shown, so that a later rewording can be told
apart from this one.

### Seeing which signatures go without it

The Footers view has a card headed Signatures without the footer. It lists
every template with the switch off, the day it was turned off and by whom, and
a Turn on button for each. When every template carries the footer it says
"Every signature carries the footer." The card is there because the people who
own the footer may not be able to open the template library at all.

A template in Recently deleted is left off the card. Restoring it brings it
back with the footer still off, since it is the same template.

### Turning it back on

Turning the footer back on puts the protection back, so it asks for no
acknowledgement. It still needs the Compliance footers capability.

1. Open Footers in the portal sidebar.
2. Find the template in Signatures without the footer.
3. Choose Turn on.

Choosing Turn the compliance footer on from the template's row menu does the
same thing.

### How it behaves

| Situation | What happens |
| --- | --- |
| Speed | As fast as a publish. The template's cached signatures are thrown away and rebuilt, so the next compose picks it up |
| Version history | Unchanged. The switch is a property of the template, kept across publishes, drafts and restoring an earlier version |
| Previews and test emails | All honour it. Unlike a banner, there is no way to name a footer and see it anyway |
| Designer preview | With Banner & footer on, no footer is shown, and hovering over the switch says "The compliance footer is off for this signature, so none is shown" |
| Duplicating | The copy starts with the footer on. The acknowledgement was given for the original |
| Importing | The template arrives with the footer on, whatever the export says. An export records the setting, but an import is not an acknowledgement |
| Change log | Recorded as "Toggled compliance footer", with the template's name, on or off, and the version of the warning that was acknowledged |

## Deleting a footer

1. Open Footers in the portal sidebar.
2. Open the row's menu, labelled Footer actions.
3. Choose Delete.
4. Confirm with Delete in the Delete footer dialog.

The dialog says that signatures stop carrying it immediately. Deletion is
permanent: there is no recycle bin for footers. To take a footer
out of circulation without losing its wording, pause it instead.

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

Admins, the Compliance [role](/admin/users-and-roles/), and any
[custom role](/admin/users-and-roles/#custom-roles) given Compliance footers.
Where a partner manages your organisation, its Owner, Admin and Technician staff
can manage footers too. The Editor role covers
templates and images but not footers, and the Marketing role reaches neither.
The same capability decides who can
[keep the footer off a signature](#keeping-the-footer-off-a-signature).

That split is deliberate: a compliance footer is usually owned by legal or IT
rather than by whoever is editing the signature design. The Compliance role
exists precisely so the footer's owner can maintain it without also being given
the template library, the campaign banners or the bill.

## Checking a footer

Use the download action on the Templates view to render the live signature for a
mailbox on the domain in question. The footer appears in the output exactly as a
recipient would see it.

To check it in a real mail client, send a [test email](/admin/test-email/).
