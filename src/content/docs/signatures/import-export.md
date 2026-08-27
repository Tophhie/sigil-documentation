---
title: Import and export
description: Move a template between organisations as a portable JSON bundle, and download a standalone copy of a signature.
sidebar:
  order: 13
---

A template can be exported as a portable JSON bundle and imported into another
organisation. This is how a template moves between a test tenant and production,
between a partner and a client, or between two organisations in a group.

## What an export contains

The bundle holds everything needed to reconstruct the template:

The template body, meaning the HTML that gets rendered.

The design document, if the template was built in the
[designer](/signatures/designer/), so it stays visually editable after import.

Every image the template references, embedded in the bundle.

Export a template from its row menu on the Templates view. The result is a single
JSON file.

## Importing

Import from the Templates view. An import always creates a new library entry
rather than overwriting an existing template, so there is no way to import over
something by accident. If the bundle's name is already taken, the new entry gets
a numbered suffix rather than the import being refused, which is worth knowing
before you import the same bundle twice and wonder which one is live.

If an image name in the bundle collides with one that already exists in the
target organisation, the import creates a numbered variant and repoints the
imported template at it. The existing image is left alone, and the imported
template points at its own copy.

That applies to a designer-built template as well as a hand-written one. A design
holds its images by name inside the document rather than as `cid:` references in
markup, so those references are remapped in the document itself before it is
compiled.

[Built-in social icons](/signatures/designer/#social-icons) are not images in the
library, so they travel with the design and need no remapping at all.

## What does not travel

An export is a template, not a configuration. These do not come with it:

Role assignments. The imported template is not made active for anything.

[Assignment rules](/targeting/assignment-rules/), which reference templates by
identity and belong to the organisation rather than to any one template.

[Banners](/targeting/banners/) and [footers](/targeting/footers/), which are
separate objects applied at render time.

Version history. The imported template starts fresh.

[Link tracking](/monitoring/link-clicks/). The bundle records whether the
original had it switched on, but nothing reads that back on import, so the new
template arrives with tracking off whatever the original did. Switch it on again
in the target organisation if you want it. The links themselves are counted per
organisation anyway, so an imported template could not have inherited the
original's figures even if the switch had travelled.

Set those up in the target organisation after importing.

## Using export as a backup

Version history keeps the last ten published bodies of a template, which covers
ordinary mistakes but is not a long-term archive.

For anything you want to keep indefinitely, export it. The bundle is a file you
control with no retention limit, and it includes the images, which version
history does not.

Exporting before a significant redesign is cheap insurance.

## Downloading a standalone signature

A different kind of export exists for one person's rendered signature: a
self-contained HTML file with images inlined as `data:` URIs rather than
attached.

| Where | What it produces |
| --- | --- |
| Templates view, download action | The live signature for any mailbox you name |
| The "My signature" pane in Outlook | The signed-in person's own signature |

This is useful for pasting a signature into another system, keeping a personal
copy, or sending somebody exactly what their signature looks like. It is a
rendered signature rather than a template, so it contains one person's real
details and no placeholders.

See [the My signature pane](/users/my-signature-pane/#download-my-signature).
