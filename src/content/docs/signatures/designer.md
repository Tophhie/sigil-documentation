---
title: The drag-and-drop designer
description: Build a signature visually from blocks, without writing HTML.
sidebar:
  order: 2
---

The designer is a visual, block-based editor for building signatures. You
assemble a design from blocks; when you publish, the Worker validates the design
and compiles it to Outlook-safe nested-table HTML.

That compiled HTML is what gets stored, versioned, rendered and cached. Nothing
downstream knows design documents exist, which means a designed template behaves
identically to a hand-written one everywhere else in the product.

Open it from the portal, or directly at `portal.usesigil.app/admin/designer/`.

## Blocks

A design is a tree of blocks on a canvas.

| Block | What it does |
| --- | --- |
| Row | A multi-column layout row. Compiles to a nested table |
| Text | A run of text, with placeholders and inline formatting |
| Image | A logo, headshot or badge, attached inline |
| Button | A styled call-to-action link |
| Social | A row of social icons |
| Divider | A horizontal rule |
| Spacer | Vertical space |
| Raw HTML | An escape hatch for markup the blocks do not cover |

Rows are how you get side-by-side layouts, such as a logo on the left and contact
details on the right. Columns can be sized as a percentage of the row or at a
fixed pixel width, and columns you do not size share what is left.

## Canvas settings

The canvas holds the defaults every block inherits:

The overall width in pixels, which is the width of the outer table.

The font family, the default text colour, and the default link colour. A block or
an individual run of text can override any of them.

The background colour, which defaults to transparent. Transparent is the right
default for email, because a signature sits on whatever background the recipient's
client uses.

## Placeholders in the designer

Text blocks accept the same [placeholders](/signatures/placeholders/) as a
hand-written template. Insert them from the field menu rather than typing them,
so the token always matches something that actually renders.

The designer fetches its field list from the API, which means the picker cannot
drift from what the renderer knows how to resolve.

## Conditional blocks

Any block can be given a "visible when" field. The block is emitted wrapped in a
conditional section and disappears entirely for people where that field is empty.

This is how you avoid the classic problems: a phone row that leaves a dangling
label for people with no phone number, or an address block that collapses to a
line of commas.

Two derived fields help here. `anyPhone` is true when the person has any phone
number at all, and `anyAddress` when they have any address component. Attaching a
whole row to one of those lets the entire row disappear rather than each field
inside it.

## Publishing

Publishing validates the design and compiles it. Validation errors are written to
be actionable rather than technical, so a rejected publish tells you which block
is wrong and why.

The compiled output carries the same `{{placeholder}}` and `{{#section}}` syntax
as a hand-written template, and is subject to the same
[Outlook constraints](/signatures/outlook-constraints/), including the 30,000
character limit.

## Ejecting to HTML

A designer template can be ejected to HTML. This converts it to a hand-authored
template containing the compiled markup, and it is one-way.

Eject when you need something the blocks cannot express and the Raw HTML block is
not enough. After ejecting, the template is edited in the
[HTML editor](/signatures/html-editor/) from then on.

HTML cannot be imported back into the designer.

## When to use the designer, and when not to

The designer is the right tool when you are building a signature from scratch and
want it to look right without writing markup.

The [HTML editor](/signatures/html-editor/) is usually better when you are
recreating an existing signature exactly, such as during a migration from another
product where the goal is for recipients to notice nothing.

## Desktop only

The designer is a code-adjacent surface with a lot of precise interaction, so it
is desktop only. Below 768px the portal blocks it rather than offering a cramped
version of it.
