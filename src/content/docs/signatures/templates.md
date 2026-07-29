---
title: Templates and the library
description: How the template library works, which template is served to whom, and the lifecycle of a template.
sidebar:
  order: 1
---

A template is a signature design: HTML plus [placeholders](/signatures/placeholders/)
that are filled in per person when the signature is rendered.

Templates live in a named library. You can keep as many as you like, and each
one carries its own independent version history.

## Roles: which template is served

Two roles decide what people actually receive.

| Role | Served for |
| --- | --- |
| `new` | New messages |
| `reply` | Replies and forwards |

The template assigned to the `new` role is what most people mean by "the active
signature". Assigning a reply template is optional; without one, replies get the
new-message template.

Reply templates are usually shorter. A full brand block on every message in a
long thread gets tiresome quickly, so a name, title and phone number is a common
choice.

The add-in works out which is needed. It calls `getComposeTypeAsync` and requests
`type=reply` for a reply or a forward. The method is probed rather than assumed,
so an older Outlook client that does not support it simply gets the new-message
signature.

Whichever template is served, it is still personalised per person from the
directory.

## Refining assignment

Roles set the organisation-wide default. To give different groups different
signatures, add [assignment rules](/targeting/assignment-rules/): an ordered list
of predicates that match on a directory attribute or an Entra group and name a
template per role. First match wins, and anyone no rule matches falls back to the
role assignment.

## The Templates view

The Templates view lists the library, shows which template is active for new
messages and which covers replies, and is where you create, assign, duplicate,
rename, download or delete a template.

Selecting a template opens the Editor for it.

## Creating a template

New templates start empty and can be authored in either editor:

The [drag-and-drop designer](/signatures/designer/) edits a block tree and
compiles to email-safe HTML when you publish. It suits people who do not want to
write markup.

The [HTML editor](/signatures/html-editor/) edits that markup directly, with
placeholder autocomplete. It suits hand-authored templates and exact control,
which is what you usually want when recreating an existing signature from another
product.

A designer template can be ejected to HTML, which is a one-way move. HTML cannot
be pulled back into the designer, because visual authoring is the designer's job
and reverse-engineering arbitrary markup into blocks would produce something
neither faithful nor editable.

## Duplicating, renaming and deleting

Duplicating copies a template into a new library entry, which is the usual way to
create a variant for one department without risking the original.

Renaming affects the library entry only. Nothing that references the template
breaks.

Deleting is blocked while a template is assigned to a role or referenced by an
assignment rule. Reassign first.

A deleted template goes to Recently deleted rather than disappearing. It keeps
its full version history and can be restored for 30 days. See
[versions and rollback](/signatures/versions/#recently-deleted).

## Previewing

Preview renders the template with sample data so you can see the shape of it
without publishing. It is the fastest way to check that a conditional section
collapses the way you expect.

To see a real person's real signature, use the download option on the Templates
view, which produces the live signature for a chosen mailbox as a standalone HTML
file. To see it in a real mail client, send a [test email](/admin/test-email/).

## The starter template

New tenants are seeded with a ready-made design rather than a blank page. It is
editable like any other template, and replacing it is expected.

The Getting started checklist treats "publish a signature" as complete when the
active template is no longer the seed, so swapping it out is what marks that step
done.

## Publishing

Editing does not affect anyone until you publish. Each template can hold one
unpublished [draft](/signatures/publishing/), and the editor shows a line diff
against the live version before you commit.

Publishing increments the template's version, which strands every cached
signature for it. Changes reach users within seconds, with no redeploy and
nothing to purge.
