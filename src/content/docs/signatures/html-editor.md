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

The diff is the one thing this editor has that the
[designer](/signatures/designer/) does not. Everything else about getting a body
live, drafts, review, scheduling and staged publishing, works the same way in
both. A diff of a block document would say nothing useful, which is why the
designer does without it rather than approximating one.

## Drafts

Each template holds one unpublished working copy. You can save, close the portal,
and come back to it without anything reaching users. See
[drafts and publishing](/signatures/publishing/).

## How it loads

The editor is bundled into the portal itself rather than fetched from a content
delivery network at the moment you open it. There is no second load that can
fail on its own: if the portal loads, the editor loads with it.

An earlier version of the portal did pull the editor from a CDN and kept a plain
text area as a fallback for when that failed. Neither the CDN fetch nor the
fallback exists any more.

## Desktop only

Editing markup on a phone is not a real workflow, so the editor is blocked below
768px rather than offered in a form nobody could use.
