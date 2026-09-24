---
title: Images
description: Upload logos and other images, reference them from a template, and understand why they are attached rather than hosted.
sidebar:
  order: 6
---

Images in a Sigil signature are attached to the message inline rather than loaded
from a web server. The add-in attaches each one and the template references it by
name.

Not every image in a signature is an upload. A QR code and a sender's own profile
photo are generated per person when the signature is served, and the designer's
social icons are drawn on request from artwork Sigil ships. None of the three
appears in the image library and none of them counts against it. See
[per-user images](/signatures/per-user-images/) and
[social icons](/signatures/designer/#social-icons).

## Why not a hosted image

Outlook blocks external images by default. A signature using
`<img src="https://example.com/logo.png">` renders as a broken image placeholder
for most recipients until they choose to download pictures, which most people
never do.

Inline attachment sidesteps that entirely. The image travels with the message and
displays immediately.

## Uploading

Upload images in the Images view of the portal. Each one is stored against your
organisation and is available to any template in your library.

Uploading needs the admin or editor role.

1. Open Images in the portal sidebar.
2. Choose Upload image.
3. Pick a PNG or JPG file of up to 1 MB.

The new row shows the stored name and the `cid:` reference to use in a
template. The designer's Image block has its own Upload button, which adds to
the same library.

Uploads are recorded in the [change log](/monitoring/change-log/) along with who
uploaded them.

A logo read from your website when you
[start a template from it](/signatures/templates/#starting-from-your-website) is
stored here too, in the same way.

## The name an image ends up with

The name is also the `cid:` reference a template uses, so it has to survive being
written into HTML. Sigil normalises it on upload rather than refusing the file:
spaces become dashes, characters outside letters, digits, dots, dashes and
underscores are dropped, and leading and trailing separators are trimmed. A file
called `Acme Logo (final).png` is stored as `Acme-Logo-final.png`. The Images
view shows the name that was actually used, which is the one to reference.

Uploading a file whose own name is already in the library replaces that image in
place. That is how a logo is updated: every template referencing it picks up the
new bytes on the next compose, with nothing to republish.

Replacement needs the file name to arrive as the stored one, though. Where
normalisation had to change the name and the result is already taken, Sigil
stores a numbered variant rather than overwriting. Landing on an existing name
after being rewritten is a coincidence rather than an intention, and overwriting
the logo every live signature references would be an expensive way to discover
that. The practical consequence is that a logo you want to replace should be
re-uploaded under exactly the name shown in the Images view, so `Acme-Logo.png`
rather than the `Acme Logo.png` still sitting on your desktop.

To replace an image:

1. Open Images in the portal sidebar and note the Name shown for the image.
2. Give the new file exactly that name on your computer.
3. Choose Upload image and pick the file.

Every template referencing the image picks up the new file on its next
compose, with nothing to republish.

## Seeing what you have

The Images view shows a thumbnail of every uploaded image alongside its name and
the `cid:` reference to use in a template. Selecting a thumbnail opens the image
at full size with its file size.

The file size is the number to look at. It is the one property of an image that
affects every message anyone sends, and it is invisible from the file name.

## Referencing an image

In the [HTML editor](/signatures/html-editor/), reference an uploaded image by
name with a `cid:` URL:

```html
<img src="cid:logo.png" width="140" alt="Acme">
```

In the [designer](/signatures/designer/), add an Image block and pick the image.
The compiler emits the same reference.

1. Drag Image from the Blocks rail onto the canvas.
2. In the inspector, under Image, pick the image from the list, or choose
   Upload to add one from your computer.
3. Set the width and height in pixels, and the Alt text.

Always set an explicit `width` in pixels. Outlook does not reliably scale images
without one, and a logo exported at 2x will render at twice the size you intended.

## Images on a phone screen

A phone can narrow a signature to fit its screen, and an image with a fixed
`width` and `height` does not always survive that. Outlook for Android shrinks
the width but keeps the height as set, so a wide logo comes out squashed.

The designer guards against this for you. Image and Photo blocks carry
`max-width:100%;height:auto` in their inline style beside the `width` and
`height` attributes, so a client that narrows the picture keeps it in
proportion. Classic Outlook for Windows ignores that style and sizes the image
by its attributes, exactly as before. QR code and social icon blocks do not
carry it.

The designer's HTML is built when you publish, so a design last published on or
before 15 September 2026 may still have the old markup. Publish it again to pick
this up.

The HTML editor sends your markup as written, so add the same style yourself:

```html
<img src="cid:logo.png" width="140" height="40" alt="Acme" style="display:block;border:0;max-width:100%;height:auto;">
```

## Formats

Use PNG or JPG. They are the only formats an upload accepts, and the check reads
the file itself rather than trusting its extension, so a GIF renamed to `.png` is
refused.

SVG is not supported. Outlook does not render it, and a signature containing one
will show nothing where the image should be.

PNG is the usual choice for logos, because it keeps edges crisp and supports
transparency. JPG suits photographs, such as a headshot.

## Size

Every attached image adds to the size of every message anyone sends. A 400KB logo
on a mailbox sending a hundred messages a day is 40MB of avoidable traffic per
person per day.

Export at the size you will display, at roughly twice that in pixels for sharp
rendering on high-density screens, and compress. A typical signature logo should
be a handful of kilobytes.

An image larger than 1 MB is refused at upload. That is a ceiling for the unusual
case, such as a photograph, rather than a size to aim for.

The 30,000 character limit on a rendered signature applies to the HTML rather
than to the attachments, so images do not count against it. See
[Outlook constraints](/signatures/outlook-constraints/).

## How much the library holds

An organisation's library holds up to 250 images and 50 MB in total. The Images
view shows both as meters, which turn amber at 80% and red when the library is
full. New uploads are then refused until something is deleted.

Uploading under the name of an image already in the library replaces it. The old
file's size is freed rather than added to, and the replacement does not take up
another of the 250 places.

Every image in a signature travels inside the cached copy served for every
mailbox, which is why the library has a ceiling at all. The limits sit far above
what a real signature uses.

The pictures behind [signature previews](/signatures/previews/) are not part of
the library and do not count against either meter. Sigil makes them, and it
deletes them with the version they show, so they are not yours to manage and not
yours to pay for in shelf space.

## Transparency

A signature sits on whatever background the recipient's mail client uses, which
may be white, off-white or dark. A logo on a transparent background adapts. A
logo with a baked-in white rectangle looks like a white rectangle in dark mode.

Where a logo needs to work on both, a version with sufficient contrast against
both is safer than relying on transparency alone. There is no dark variant slot
on an image, and no client recolours one, so the single file has to work
everywhere. See [dark mode](/signatures/dark-mode/).

## Alt text

Set `alt` on every image. It is what screen readers announce, and it is what
appears in clients that suppress images entirely.

Keep it descriptive rather than decorative: `alt="Acme"` on a company logo, and
an empty `alt=""` on a purely decorative divider so that assistive technology
skips it.

## Deleting an image

Deleting is blocked while anything still references the image. The refusal names
what is holding it: each template whose live body uses it, each template whose
unpublished draft uses it, and each banner that is the image.

Drafts count deliberately. A draft referencing a deleted image renders nothing
the moment somebody publishes it, and the person publishing would have no reason
to connect the two.

Detach it from everything the message lists, then delete. Deletions are recorded
in the [change log](/monitoring/change-log/), and the previous file is not
retained, so keep your source files.

1. Open Images in the portal sidebar.
2. Choose Delete at the end of the image's row.
3. Choose Delete in the confirmation.

An image something still uses is refused with a message listing what uses it.

## Images and export

When you [export a template](/signatures/import-export/), every referenced image
travels with it inside the JSON bundle. Importing into another organisation
recreates them.

If an imported image name collides with an existing one, the import creates a
numbered variant and rewrites the `cid:` references to match, so nothing is
overwritten.

## Downloading a signature with images inlined

The download option, from both the portal and the "My signature" pane, produces a
standalone HTML file with images inlined as `data:` URIs rather than as
attachments. That makes the file self-contained and portable, which is what you
want when pasting the signature somewhere else. See
[download a copy](/users/my-signature-pane/#download-my-signature).
