---
title: Images
description: Upload logos and other images, reference them from a template, and understand why they are attached rather than hosted.
sidebar:
  order: 5
---

Images in a Sigil signature are attached to the message inline rather than loaded
from a web server. The add-in attaches each one and the template references it by
name.

Two kinds of image are not uploaded at all. A QR code and a sender's own profile
photo are generated per person when the signature is served, and neither appears
in the image library. See [per-user images](/signatures/per-user-images/).

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

Uploads are recorded in the [change log](/monitoring/change-log/) along with who
uploaded them.

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

Always set an explicit `width` in pixels. Outlook does not reliably scale images
without one, and a logo exported at 2x will render at twice the size you intended.

## Formats

Use PNG or JPG.

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

The 30,000 character limit on a rendered signature applies to the HTML rather
than to the attachments, so images do not count against it. See
[Outlook constraints](/signatures/outlook-constraints/).

## Transparency

A signature sits on whatever background the recipient's mail client uses, which
may be white, off-white or dark. A logo on a transparent background adapts. A
logo with a baked-in white rectangle looks like a white rectangle in dark mode.

Where a logo needs to work on both, a version with sufficient contrast against
both is safer than relying on transparency alone.

## Alt text

Set `alt` on every image. It is what screen readers announce, and it is what
appears in clients that suppress images entirely.

Keep it descriptive rather than decorative: `alt="Acme"` on a company logo, and
an empty `alt=""` on a purely decorative divider so that assistive technology
skips it.

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
