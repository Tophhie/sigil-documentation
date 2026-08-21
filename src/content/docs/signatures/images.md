---
title: Images
description: Upload logos and other images, reference them from a template, and understand why they are attached rather than hosted.
sidebar:
  order: 5
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

Uploads are recorded in the [change log](/monitoring/change-log/) along with who
uploaded them.

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
