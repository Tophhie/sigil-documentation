---
title: Contact card link
description: A "save my contact" link in the signature that downloads the sender's own vCard, and the schema.org markup that goes with it.
sidebar:
  order: 7
---

The [QR code block](/signatures/per-user-images/#qr-codes) has been able to carry
somebody's contact card since dynamic images shipped. A QR code is the right
answer on a phone and useless on a desktop, because nobody photographs their own
monitor.

The contact card link is the other half. It is a placeholder that resolves to a
URL for the sender's own vCard, so a "Save my contact" button downloads a file
the recipient's contacts app understands.

Both are built from the same directory record, so the two can never disagree.

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

## What the card contains

| vCard field | Directory source |
| --- | --- |
| Name | `displayName`, with given and family name separately |
| Organisation | `companyName` |
| Title | `jobTitle` |
| Email | The sending address |
| Work phone | `businessPhone` |
| Mobile | `mobilePhone` |
| Fax | `faxNumber` |
| Work address | Street, city, state, postal code and country |

Empty attributes are left out of the card rather than written as blanks, so a
person with no fax number has no fax line.

This is exactly the set the QR code carries, which is the point: one function
builds both.

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

## Cards from a suspended organisation

The endpoint stops answering when an organisation is suspended or removed, in the
same way every other serving path does.

## How long a link lasts

A link does not expire. The same mailbox always produces the same URL, so a link
in a message sent last year still works.

That is deliberate. A business card does not expire, and a dead link in an old
email is worse than a live one. It also keeps rendered signatures cacheable,
because the link does not change between renders.

The card itself is built from the directory when it is fetched rather than when
the mail was sent, so somebody who changed job title hands out the new title on
cards downloaded from old mail. The response is cacheable for a day, so a change
can take that long to reach a recipient who has fetched the card recently.

## Machine-readable contact details

Separately, a designer template can emit schema.org `Person` markup around the
signature. It is off by default and switched on per template in
[canvas settings](/signatures/designer/#canvas-settings).

When it is on, the outer table is labelled as a Person and the name, given and
family names, job title, email address, phone numbers, fax and contact card link
each carry the matching property.

Nothing moves and nothing is added. Microdata is attributes on markup that is
already there, so it cannot change how a signature looks, and it introduces no
hidden text for a spam filter to object to.

Company name and the address components are deliberately not marked up. Those
properties need nested Organisation and Postal Address scopes, and there is
nowhere to hang them inside Outlook's table layout without inventing wrapper
elements. Emitting them flat would be invalid, and something reading it would
take the company name as the person's own name, which is worse than emitting
nothing.
