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

Selecting a template opens the Editor for it. A designer template opens in the
[designer](/signatures/designer/) and an HTML one in the
[HTML editor](/signatures/html-editor/), so the library is the only place that
shows the whole picture at once.

## Badges in the library

Each entry carries badges for anything true of it that you would otherwise have
to open it to find out.

| Badge | What it means |
| --- | --- |
| Active | Served for new messages |
| Reply | Served for replies and forwards |
| Rolling out, with a percentage | A [staged rollout](/signatures/staged-rollouts/) is in flight, so part of the organisation is on a different body |
| Draft | An unpublished [draft](/signatures/publishing/) is sitting on it. Users still receive the published version |
| Awaiting review | The draft has been submitted and is waiting on an [approver](/signatures/approvals/) |
| Scheduled | A [publish is booked](/signatures/scheduled-publishing/) for a future instant |

The rollout badge leads, because a rollout is the only state in which people in
the same organisation are receiving different signatures.

The Draft badge is a yes or no rather than a preview. The library deliberately
never loads template bodies, since that would mean pulling a full signature per
row to answer a question that fits in a badge.

## Creating a template

Creating one asks for a name and which editor to build it in. The choice is made
at that point and is stored against the template, so the library always opens it
in the editor it was authored in.

Neither editor starts you on a blank page. A designer template is seeded with the
same ready-made design new organisations get, and an HTML template is seeded with
the equivalent markup. Both are meant to be edited or cleared rather than kept,
and they are there so the first thing you see is a working signature to change
instead of an empty canvas.

The [drag-and-drop designer](/signatures/designer/) edits a block tree and
compiles to email-safe HTML when you publish. It suits people who do not want to
write markup. It is the recommended choice and the one the dialog offers first.

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

The address box above the preview swaps the sample data for a real mailbox.
Start typing a name and it completes from your directory. Clear it to go back to
sample data.

To see a real person's real signature, use the download option on the Templates
view, which produces the live signature for a chosen mailbox as a standalone HTML
file. To see it in a real mail client, send a [test email](/admin/test-email/).

### Previewing a shared mailbox send

A second address box sits beside the first, labelled "sent by". It renders the
template as if that person had sent from the mailbox named in the first box,
which is how you check a signature using the
[sender placeholders](/signatures/placeholders/#sender). Leaving it blank gives
you the ordinary send, where the mailbox is sending for itself. Both editors
have it.

Put `sales@` in the first box and a colleague's address in the second, and the
preview shows what a delegate's message from the shared mailbox will actually
say, including whether the `{{#onBehalfOf}}` clause opens.

Naming somebody who is not a delegate does nothing visible. The preview applies
the same test a real send does, so it cannot show you an output no message could
produce. Somebody previewing themselves against their own mailbox, or against one
of their own aliases, gets the ordinary send.

## The starter template

New tenants are seeded with a ready-made design rather than a blank page. It is
editable like any other template, and replacing it is expected.

The Getting started checklist treats "publish a signature" as complete when the
active template is no longer the seed, so swapping it out is what marks that step
done.

## Publishing

Editing does not affect anyone until you publish. Each template can hold one
unpublished [draft](/signatures/publishing/), and the HTML editor shows a line
diff against the live version before you commit.

Publishing increments the template's version, which strands every cached
signature for it. Changes reach users within seconds, with no redeploy and
nothing to purge.
