---
title: Contact card link
description: A "save my contact" link in the signature that downloads the sender's own vCard, and the schema.org markup that goes with it.
sidebar:
  order: 8
---

The [QR code block](/signatures/per-user-images/#qr-codes) has been able to carry
somebody's contact card since dynamic images shipped. A QR code is the right
answer on a phone and useless on a desktop, because nobody photographs their own
monitor.

The contact card link is the other half. It is a placeholder that resolves to a
URL for the sender's own vCard, so a "Save my contact" button downloads a file
the recipient's contacts app understands.

Both are built by the same function from the same directory attributes. The one
place they can differ is the email address when somebody sends from an alias:
see the Email row below.

## Using it

`{{contactCardUrl}}` resolves to the link. It is a URL rather than text, so its
natural use is the target of a button or a link rather than something printed.

In the [designer](/signatures/designer/), it appears in the field menu under
Contact and can be used as a Button block's link. In the
[HTML editor](/signatures/html-editor/), put it in an `href`.

Wrap it in a conditional section:

```html
{{#contactCardUrl}}<a href="{{contactCardUrl}}">Save my contact</a>{{/contactCardUrl}}
```

The section matters. Where no card link can be minted for a mailbox, the
placeholder resolves to nothing, and the section removes the button rather than
leaving a link that goes nowhere.

The template preview, in the designer and in the HTML editor, never has a card
link to show, even with Render as set to a real mailbox. A button wrapped in the
section, or carrying the Show when rule below, is therefore hidden in every
preview. That is expected. Download the signature from Templates or send a
[test email](/admin/test-email/) to see the button as recipients will.

To add the link in the designer:

1. Open the template in the designer, using Design on its row in Templates.
2. Drag a Button block from the rail onto the canvas, or select one already
   there.
3. In the inspector, under Button, open the field menu beside the Link box and
   choose Contact card link from the Contact group.
4. Under Visibility, add a Show when rule that Contact card link has a value,
   so the button disappears where no link can be minted.
5. Choose Save draft or Publish.

To add it in the HTML editor:

1. Open the template in the HTML editor, using Edit on its row in Templates.
2. Put the cursor inside the `href` of the link.
3. Under Placeholders beneath the editor, choose Contact card link in the
   Contact group. It inserts `{{contactCardUrl}}` at the cursor.
4. Wrap the whole link in `{{#contactCardUrl}}` and `{{/contactCardUrl}}` as
   above.
5. Choose Save draft or Publish.

## What the card contains

| vCard field | Directory source |
| --- | --- |
| Name | `displayName`, with given and family name separately |
| Organisation | `companyName` |
| Title | `jobTitle` |
| Email | The mailbox's primary address (see below for aliases) |
| Work phone | `businessPhone` |
| Mobile | `mobilePhone` |
| Fax | `faxNumber` |
| Work address | Street, city, state, postal code and country |

Empty attributes are left out of the card rather than written as blanks, so a
person with no fax number has no fax line.

This is the set the QR code carries, which is the point: one function builds
both.

The difference is when each is built. A QR code is drawn as the message is
composed, so it carries the address the message is sent from, alias included.
The contact card link is opened later, by the recipient, and Sigil reads the
directory again at that point. An alias resolves to the mailbox that owns it, so
the card carries that mailbox's primary address rather than the alias. Somebody
who sends from a brand alias and wants recipients to save the alias should use
the QR code, or show the alias as text in the signature.

It is the directory record and only the directory record. The details staff
[fill in themselves](/admin/profile-fields/) do not appear on the card, even
though they can appear in the signature above it, because vCard has no field to
put a pronoun or a booking link in that a contacts app would do anything useful
with. If one of those details is something you want a recipient to keep, put it
in the signature body where they can read it, rather than expecting the saved
contact to carry it.

## Who can fetch a card

The link is public, because a recipient clicking it holds no Sigil credentials.

The mailbox is not in the URL. It is carried in a signed token, and Sigil only
ever mints a token while rendering that mailbox's own signature. So the only
cards that can be fetched are ones somebody was actually sent.

That is the whole design. An unsigned link of the form
`/vcf/<organisation>/<address>` would be a directory lookup for anybody willing
to guess addresses, which is a considerably worse thing to publish than a
signature.

A card discloses precisely the attributes the signature already prints, to
somebody who already has the signature in front of them. It is not a way to learn
anything the recipient was not already told.

## Cards from an organisation Sigil no longer serves

The endpoint stops answering when an organisation is suspended or removed, and
when its subscription has lapsed or been cancelled, in the same way every other
serving path does. A card link in an old message then comes back as not found.

The recipient is told nothing about why. The same answer is given for a link that
never existed, so a card link reveals nothing about the state of your account.

## How long a link lasts

A link does not expire. The same sending address always produces the same link,
so a link in a message sent last year still works. Mail sent from an alias
carries a different link from mail sent from the primary address, though both
fetch the same card.

The one thing that ends a link early is the person leaving. The card is looked
up in your directory when it is fetched, so once the address no longer resolves
to anybody, the link comes back as not found.

That is deliberate. A business card does not expire, and a dead link in an old
email is worse than a live one. It also keeps rendered signatures cacheable,
because the link does not change between renders.

The card itself is built from the directory when it is fetched rather than when
the mail was sent, so somebody who changed job title hands out the new title on
cards downloaded from old mail. The response is cacheable for a day, so a change
can take that long to reach a recipient who has fetched the card recently.

Where your organisation has a [branded link domain](/monitoring/branded-link-domain/)
active, card links are minted on it, and that domain serves your organisation's
cards only. Card downloads are deliberately not counted as clicks in link
analytics.

## Machine-readable contact details

Separately, a designer template can emit schema.org `Person` markup around the
signature. It is off by default and switched on per template in
[canvas settings](/signatures/designer/#canvas-settings).

When it is on, the outer table is labelled as a Person and the name, given and
family names, job title, email address, phone numbers, fax and contact card link
each carry the matching property where they appear as a field in a text block. A
field used only as the target of a link or a Button block, such as the Save my
contact button above, is not marked up.

Nothing moves and nothing is added. Microdata is attributes on markup that is
already there, so it cannot change how a signature looks, and it introduces no
hidden text for a spam filter to object to.

Company name and the address components are deliberately not marked up. Those
properties need nested Organisation and Postal Address scopes, and there is
nowhere to hang them inside Outlook's table layout without inventing wrapper
elements. Emitting them flat would be invalid, and something reading it would
take the company name as the person's own name, which is worse than emitting
nothing.

To switch it on:

1. Open the template in the designer, using Design on its row in Templates.
2. Click an empty part of the canvas, or press Escape, so the inspector shows
   the canvas settings.
3. Under Contact details, tick Machine-readable contact details.
4. Choose Save draft or Publish.
