---
title: Per-user images
description: QR codes and Microsoft 365 profile photos, generated for each sender at the moment their signature is served.
sidebar:
  order: 6
---

Most images in a signature are the same for everybody. A logo is one file in the
[image library](/signatures/images/) and every mailbox attaches the same bytes.

Two designer blocks are not like that. A QR code carrying somebody's own contact
card, and somebody's own profile photo, are different for every sender. Sigil
generates those per mailbox at the point the signature is served.

## QR codes

The QR block encodes one of two things.

| Encodes | What it contains |
| --- | --- |
| The sender's contact card | A vCard built from that person's directory record: name, job title, company, email, phone numbers and address |
| A link | A URL you write. It may contain `{{placeholders}}`, so it can be per-person |

A contact-card code is what most organisations want. Someone scanning it with a
phone camera gets an add-to-contacts prompt with the sender's details already
filled in, rather than a link they have to follow.

Fields the directory has no value for are left out of the card entirely rather
than written empty, so a person with no fax number does not import as a contact
with a blank fax field.

A link code is the same image for everyone unless the URL contains a
placeholder. `https://example.com/book/{{extensionAttribute3}}` gives each
person their own booking link; a plain URL does not, and Sigil recognises the
difference so it does not do per-person work it has no need to do.

### Sizing and colour

| Setting | Range |
| --- | --- |
| Size | 60 to 400 pixels |
| Dark modules | Any hex colour |
| Light modules | Any hex colour |

The 60 pixel floor is enforced rather than advised. Below it the individual
modules of a contact-card code fall under a pixel each on screen, and a phone
held at arm's length cannot read it. An unscannable code looks exactly like a
working one to the person who placed it, which is why this is a hard limit.

Keep the light colour pale and the dark colour strong. Readers reject codes
without enough contrast, and the light colour has to be opaque, so it is a
separate setting from the block's cell background.

The code is drawn at a whole-number multiple of its module size and never scaled
up by the mail client, so it stays crisp.

### When a code cannot be built

A contact card for a mailbox with unusually long values can exceed what a QR
code of a readable size can carry. When that happens the code is left out and
the rest of the signature is served normally. One missing image is a better
outcome than a failed signature for that person.

## Profile photos

The Photo block shows the sender's own profile photo from Microsoft 365.

| Setting | Range |
| --- | --- |
| Size | 16 to 400 pixels |
| Shape | Square or circle |
| Link | Optional |

Classic Outlook renders a circular image as a square. That is a Word rendering
engine limitation rather than a Sigil choice, and it is the same caveat that
applies to rounded button corners. Choose circle if you are happy for classic
Outlook recipients to see a square.

### People without a photo

A photo block is always compiled inside a conditional section on the derived
`hasPhoto` field, so it disappears entirely for anybody whose mailbox has no
photo. Nobody gets a broken image icon where their face should be.

This is worth knowing before you design around it. If half your organisation has
no photo, half of them get a signature with a gap where the photo block was, and
whatever sat beside it moves. Check the proportion in
[attribute coverage](/monitoring/attribute-coverage/) first, and consider putting
the photo in its own column so its absence changes the layout predictably.

### Aliases

If somebody sends from a secondary alias rather than their primary address,
Microsoft Graph will not resolve their photo by that address directly. Sigil
resolves the alias to the mailbox behind it and asks again, so a person sending
under a brand alias still gets their photo.

### Caching

Photos are cached for a day, and so is the knowledge that a mailbox has none.
Adding a photo in Microsoft 365 therefore takes up to a day to appear in a
signature, rather than appearing immediately as a directory attribute change
would.

## How they reach the message

Both blocks compile to a reserved `cid:` reference rather than to a library
image. The compiled HTML is identical for every person in your organisation, and
only the attached bytes differ.

That matters for a reason that is invisible in normal use: rendered signatures
are cached, and a template whose HTML changed per person could not be. Keeping
the difference in the attachment rather than in the markup means adding a photo
or a QR code costs nothing in cache efficiency.

The reserved names cannot be claimed by an upload. An attempt to upload an image
whose name begins with the reserved prefix is rejected, so a library image can
never shadow a generated one.

## No extra permission

Profile photos are read with `User.Read.All`, which Sigil already holds. Adding a
photo block does not require a new consent round trip. See
[permissions](/deploy/permissions/).

If your organisation has restricted photo access specifically, the read fails and
Sigil treats every mailbox as having no photo, so the block hides rather than
breaking.

## Where they appear

Per-user images are generated everywhere a real signature is served: the add-in
on compose, both download paths, the test email, and the portal's live download
for a named mailbox.

The designer's own preview is the exception. It renders with sample data and
there is no mailbox to have a photo, so it draws a generic avatar in place of
one. That is deliberate: a block that silently vanished in preview would tell you
nothing about the space it occupies.

A QR code in the designer preview is real, and encodes the sample data.

## Designer only

Both blocks exist only in the [designer](/signatures/designer/). They have no
equivalent you can hand-write in the [HTML editor](/signatures/html-editor/),
because generating them depends on the design document that the HTML editor does
not have.

This has one consequence worth planning around. Ejecting a designer template to
HTML discards the design document, and the reserved references left in the
markup then have nothing to resolve them. If a template uses a QR code or a photo
block, treat it as one you will keep editing in the designer.
