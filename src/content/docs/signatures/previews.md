---
title: Signature previews
description: Pictures of each published version and each submitted draft, shown in the library, in version history, in the approval email and in the digest.
sidebar:
  order: 14.5
---

Outside the editor, most of what Sigil shows you about a signature is text: a name
in the library, a date in the version history, a line in the digest saying
something was published. None of that answers what the signature actually looks
like, which normally means signing in and opening it.

Signature previews answer it. Sigil renders each published version, and each draft
submitted for review, to a picture, and shows that picture wherever the
signature's own HTML cannot go or is not worth reading.

This is being rolled out gradually, so it may not be switched on for your
organisation yet. Nothing about it changes what your users receive.

## Where the pictures appear

| Surface | What you see |
| --- | --- |
| [Template library](/signatures/templates/) | A thumbnail after each template's name, showing the top-left corner of the live signature |
| [Version history](/signatures/versions/) | The live version in full above the table, and a thumbnail on every archived version |
| Approval request email | The proposed signature, and the live one above it, inline in the mail an admin gets when a draft is submitted |
| [Health digest](/monitoring/health-digest/) | A picture under each line of Published this week |

A thumbnail is a way in rather than the picture itself. Clicking one opens the
render at full size, with a note saying what it is a render of.

The corner is shown at close to its own scale rather than the whole signature
shrunk to fit a table row. A 640-pixel-wide signature scaled into a row is
unreadable at any row height, whereas the name line, the logo and the colours in
the corner are enough to tell one template from another at a glance.

Where there is no picture, nothing is drawn. A row with an empty placeholder box
would read as a fault in organisations where previews are simply not switched on.

To open a picture at full size:

1. Open Templates or Versions in the portal sidebar.
2. Click the thumbnail after the template's name, or on the version's row.
3. Close the dialog when you have seen it.

## What the picture shows

The render uses the same sample person the editor's preview uses, and your
[profile fields](/admin/profile-fields/) appear as their own labels in angle
brackets rather than as anybody's answers. Where a template prints a photo, a
placeholder photo is drawn.

That is a deliberate constraint rather than a shortcut. A stored picture carrying
a real colleague's name, title and number would be a record of their directory
details kept in its own right, which is exactly what Sigil's
[privacy commitments](/security/data-and-privacy/) say it does not do. Renders are
of the sample person, always.

Images the template holds in Sigil are drawn from Sigil. An image the template
links to on your own website is fetched by the renderer the way a mail client
would fetch it, so a logo on a host that does not answer leaves a blank box in the
picture and nothing else fails.

The picture is as wide as the signature itself, up to 640 pixels, on white, and is
captured at twice that resolution so it stays sharp on a high-density screen. A
narrow signature gets a narrow picture rather than one padded out to a fixed size.

## It is a modern client's rendering, not Outlook for Windows

The renderer is a headless browser. What it draws matches new Outlook and Outlook
on the web closely, and it is not the Word engine that classic Outlook for Windows
uses to display a message.

So a picture is good evidence that a layout works and poor evidence that it
survives Word. For that, the checks that matter are the ones on
[Outlook's constraints](/signatures/outlook-constraints/) and a
[test email](/admin/test-email/) opened in the client your organisation actually
uses.

## When pictures are made

A version is rendered once and the picture reused, so opening the library
repeatedly costs nothing.

Rendering runs in the background after a version becomes live, by every route
that can make one live: a publish, a publish from a draft, a restore, a
[scheduled publish](/signatures/scheduled-publishing/) firing, and a
[staged rollout](/signatures/staged-rollouts/) being promoted. A nightly pass
catches anything the moment misses, so an organisation that has just had previews
switched on has pictures of its whole history by the next morning.

A submitted draft is rendered when it is submitted, as part of building the
approval email. A draft is rendered per body, so resubmitting an unchanged draft
reuses the picture and editing it makes a new one.

Because the work happens after the publish rather than during it, a version can
be live for a few moments before its picture exists. Nothing waits on a render:
publishing, previewing and approving all behave as they did.

A template created but never published has nothing to show, so it has no picture
until its first publish.

## What happens to the pictures

A picture lives exactly as long as the version it depicts.

| When | What happens to the picture |
| --- | --- |
| A version falls out of the last ten kept per template | Removed with the version |
| A template is deleted and leaves Recently deleted | Removed with the template |
| A draft is withdrawn or edited | Its picture stops being referenced and is cleared on the next pass |
| Your organisation is deprovisioned | Removed with everything else under your organisation's storage |

They are held in the same EU-jurisdiction storage as your uploaded images. See
[where data lives](/security/data-and-privacy/#where-data-lives).

## They are not part of your image library

Preview pictures do not appear in [Images](/signatures/images/), and they do not
count towards your image allowance.

Sigil makes them, sizes them and deletes them, so charging them against your
allowance or listing them beside your logo with a Delete button beside each one
would both be wrong. They also cannot be referenced from a template, so there is
nothing to be gained by reaching them.

## What it will not do

Previews show you a version. They do not compare two of them: there is no image
diff, and the [line diff](/signatures/publishing/#the-diff) remains the way to
read what changed in an HTML template.

There is no dark-mode render. What a signature does on a dark background is
covered by [dark mode](/signatures/dark-mode/) and its own preview toggle in the
editor.

There is no picture of your working draft inside the portal. The editor's own
preview is live and already shows it, and the approval email carries the draft for
the person who is not in the editor.

## Previewing as a particular person

The pictures always show the sample person. To see a template rendered with a
real colleague's details, use the editor's own preview.

1. Open the template in its editor from Templates.
2. In the HTML editor, type the person's address into the box in the Preview
   card's header, which reads sample data until you do. In the designer,
   choose Expand on the Live preview if it is collapsed, then type the address
   under Render as.
3. To render as if somebody else pressed Send from that mailbox, as with a
   shared mailbox, put their address in the sent by box, or under Sent by in
   the designer.

The preview re-renders for that mailbox. The HTML editor also lists the
mailbox's directory attributes under the preview, with "not set" against any
that are empty. Clear the box to return to the sample person.

Send a test and Download on the Templates page render the live signature for a
person rather than what is in the editor. Both ask which mailbox to render as.
See [test email](/admin/test-email/).

## API keys

The routes that serve these pictures are not available to
[API keys](/admin/api-keys/). A key asking for a version gets the HTML preview
instead, which is the form a script can do something with. See
[API keys](/reference/api/#api-keys).
