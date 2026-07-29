---
title: The HTML editor
description: Edit signature markup directly, with placeholder autocomplete and a diff before publishing.
sidebar:
  order: 3
---

The HTML editor edits a template's markup directly. It is the right tool when you
need exact control, most often when recreating an existing signature so that a
migration is invisible to recipients.

It is a code editor built on CodeMirror, not a rich-text surface. That is
deliberate. Conditional sections and Outlook-safe nested-table markup are exactly
the things generic rich-text editors mangle. Visual authoring belongs in the
[designer](/signatures/designer/), whose documents compile to that markup for
you.

## Placeholder autocomplete

Typing `{{` offers the placeholder list. Typing `{{#` offers the same list as
conditional section openers.

The list comes from the API rather than being hard-coded in the editor, so it
cannot drift from what the renderer actually knows how to resolve. If a
placeholder appears in the picker, it renders.

See [placeholders](/signatures/placeholders/) for the full set and what each one
maps to.

## Writing for Outlook

Outlook's HTML support is closer to a mid-1990s browser than a modern one. A few
habits carry most of the weight:

Lay out with nested tables rather than flexbox or grid. Use `<table>`,
`<tr>` and `<td>` with explicit widths.

Put styles inline on elements. A `<style>` block is unreliable, and external
stylesheets do not survive at all.

Use pixel values for widths and font sizes rather than relative units.

Reference images as `cid:` and let the add-in attach them inline. See
[images](/signatures/images/).

The [Outlook constraints](/signatures/outlook-constraints/) page covers the hard
limits, including the 30,000 character ceiling and the lack of SVG support.

## Conditional sections

Wrap anything optional so it disappears rather than leaving a stray separator:

```html
{{#jobTitle}}{{jobTitle}}{{#department}} &middot; {{department}}{{/department}}{{/jobTitle}}
```

Sections nest. Values are HTML-escaped when they are substituted. Any placeholder
that is left unresolved is stripped, so a literal `{{jobTitle}}` can never reach a
recipient.

## Preview and diff

Preview renders the template with sample data, which is the fastest way to check
that a conditional section collapses the way you intended.

Before you publish, the editor shows a line diff between what you have written
and the live version. That is worth reading every time; it catches the edit you
did not mean to make far more reliably than re-reading the whole template.

## Drafts

Each template holds one unpublished working copy. You can save, close the portal,
and come back to it without anything reaching users. See
[drafts and publishing](/signatures/publishing/).

## If the editor does not load

The editor loads from a CDN. If that CDN is unreachable, it degrades to a plain
text area underneath rather than to a blank card. The text area stays synced with
the editor, so you lose syntax highlighting and autocomplete but keep the ability
to work.

## Desktop only

Editing markup on a phone is not a real workflow, so the editor is blocked below
768px rather than offered in a form nobody could use.
