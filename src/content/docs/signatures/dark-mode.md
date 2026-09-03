---
title: Dark mode
description: What Outlook does to a signature's colours when the reader is in dark mode, and how to design so it still reads.
sidebar:
  order: 16
---

A recipient reading in dark mode does not see the signature you designed. Their
mail client rewrites its colours first. Designing with that in mind costs nothing
and is much easier than discovering it from a reply.

## What the client does

Outlook recolours every text and background colour a signature sets explicitly,
and leaves images and borders exactly as they were sent.

The clients that do this are the ones built on Outlook on the web: new Outlook
for Windows and Mac, outlook.com, and the Outlook mobile apps. The Gmail apps
behave the same way.

The rule is Outlook's own, taken from its published code rather than guessed at.
Each colour is converted to a perceptual colour space, its lightness is flipped
and fitted to the range the dark canvas leaves free, and its hue is kept. The
results are worth knowing before you choose a palette.

| What you set | Roughly what the reader sees |
| --- | --- |
| White | The dark canvas colour itself, so white text with nothing behind it disappears |
| A near-black such as `#333333` | A light grey, which is what you want |
| A deep brand colour such as a dark purple | A near-white carrying a tint of the original |
| A silver such as `#c0c0c0` | A dark grey on a dark canvas, which is close to unreadable |

Outlook's compose editor and its reading pane have not always applied this
identically. Sigil models the compose editor, which is the harsher of the two and
the one an author sees the moment a signature lands in a new message. A design
that survives it survives both.

## You cannot fix this in CSS

The client rewrites the inline colours itself, and a `<style>` block does not
survive insertion into a message, so `prefers-color-scheme` never gets the chance
to run. No signature product can work around it.

Every real fix is either a colour choice or a structural one.

## Light text over a picture

This is the failure that surprises people. Text is recoloured and images are not,
so a strip built from a dark picture with white text laid on top loses the text
completely: the words turn dark, the picture stays dark, and nothing is left to
read.

There are two fixes and they work together.

Give the strip a real background colour rather than relying on the picture for
it. A column or block background colour in the [designer](/signatures/designer/),
or `bgcolor` in the [HTML editor](/signatures/html-editor/), is recoloured
alongside the text, so the pair stays legible.

Put the picture beside the text rather than under it. A two-column row with the
image in one column and the words in the other renders the same in both modes.

## Faint grey text

The other common failure is the disclaimer line. A silver such as `#c0c0c0` is
deliberately quiet on white, and on the dark canvas it recolours to a dark grey
that is quieter still.

A mid grey such as `#848484` reads on both. New designs started in the designer
already use it. If you built on the hand-written HTML template instead, its
disclaimer line still uses the lighter silver and is worth changing.

## Previewing it

The designer's live preview has a Dark mode toggle. It shows the render put
through the same rule the client applies, with images and borders left alone.

Leaving images alone is the point of it. Inverting the whole preview would
recolour them too and hide the exact failure the toggle exists to show.

The setting is remembered in your browser, because somebody who is checking dark
mode is checking it on every edit.

It is a simulation rather than a promise. It is modelled on Outlook's own
transform and checked against real renders, but the clients do not publish their
behaviour and can change it.

## The advisory badges

The designer also checks a design for the two failures above as you edit, and
badges anything likely to fail.

| What is checked | What it catches |
| --- | --- |
| Text that ends up under 3:1 contrast against whatever the client paints behind it | Both white text with no background colour behind it and the faint grey disclaimer |
| A raw HTML block whose markup lays content over a background image | A pasted strip that puts words on a picture |

A flagged block carries a "dark mode" badge on the canvas, and the footer shows
how many risks the design has in total. Clicking the count selects the first one.

These never stop a publish. They are advice about how a mail client will treat
the design rather than a fault in the design itself, which is why they are kept
separate from the checks that do gate publishing. See
[what the top bar is telling you](/signatures/designer/#what-the-top-bar-is-telling-you).

A block raises at most one of them, since the fix is the same whichever run of
text triggered it. They also appear only once the design has nothing left that
would block a publish, so an advisory badge is never mistaken for something
stopping you.

Text blocks and HTML blocks are what get checked, because they are where these
two failures show up. A button's own colours are not, so check one in the preview
if it carries light text.

The [HTML editor](/signatures/html-editor/) has no equivalent. The same rules
apply to what you write there, but Sigil cannot reason about hand-written markup
the way it can about a design it built.

## Images are never touched

Because a logo is never recoloured, one with a white rectangle baked into it
stays a white rectangle on a dark background. See
[transparency](/signatures/images/#transparency).

There is no dark variant slot on an image asset, so a logo that only works on
white needs replacing with one that works on both rather than being swapped per
recipient.

## Checking it for real

Send a [test email](/admin/test-email/) and read it in a client set to dark mode.
The preview and the advisories are there to catch the obvious cases at your desk;
the clients your organisation actually uses are the ones that settle it.
