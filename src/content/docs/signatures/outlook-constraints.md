---
title: Outlook constraints
description: The limits Outlook imposes on signature HTML, why each exists, and how to design within them.
sidebar:
  order: 9
---

Outlook sets the rules for what a signature can contain. These are not Sigil's
limits, and no signature product can work around them. Designing within them from
the start is easier than discovering them at publish time.

## 30,000 characters

A rendered signature must stay under 30,000 characters of HTML.

The portal blocks a publish that would exceed it, which means you find out at your
desk rather than through a report of broken signatures.

Attached images do not count toward this, because the limit applies to the markup
rather than to the attachments. What does count is the markup itself, and
table-heavy layouts add up faster than they look.

If you are close to the limit, the usual savings are collapsing unnecessary
nested tables, removing repeated inline styles that could sit on a parent element,
and cutting whitespace. A signature produced by exporting from a rich-text editor
is often several times larger than it needs to be, because such editors tend to
wrap each run of text in its own table.

## No SVG

Outlook does not render SVG. A signature containing one shows nothing where the
image should be.

Use PNG for logos and line art, JPG for photographs. Export at roughly twice the
display size for sharpness on high-density screens, then set an explicit pixel
`width` on the `<img>` so it displays at the intended size.

## Images are attached, not hosted

Images are referenced as `cid:name.png` and attached inline by the add-in.

A hosted image, pointing at an external URL, is suppressed by Outlook's default
image blocking. Recipients see a broken image placeholder unless they explicitly
choose to download pictures, which most people never do.

See [images](/signatures/images/).

## Layout with tables

Outlook on Windows renders HTML with Word's rendering engine. Modern CSS layout
does not survive it.

Use nested tables with explicit widths. Put styles inline on elements rather than
in a `<style>` block. Use pixel values rather than relative units. The
[designer](/signatures/designer/) compiles to exactly this shape, which is one of
the reasons to use it.

## Mobile visibility on replies

On Outlook mobile, the signature on a reply is not visible until the compose
window is expanded to full screen. The signature is applied; it is just not shown
in the collapsed view.

This is documented Outlook behaviour and is regularly reported as a fault.

## Other client behaviours worth knowing

A new message with no other edits will not autosave a draft, even though the
signature was set. Outlook decides that an unmodified message is not worth saving.

`OnNewMessageCompose` does not fire for a message started from the iOS Share
sheet, so a message begun that way gets no automatic signature.

Only one event-based add-in runs at a time. If your organisation has several
deployed, they run sequentially.

## Testing your design

Preview in the portal shows the shape of a template with sample data, which is
enough to check that conditional sections collapse correctly.

To see how a client actually renders it, send a [test email](/admin/test-email/)
and open it in the clients your organisation uses. Outlook on Windows is the one
worth checking most carefully, since its rendering engine is the most restrictive.
