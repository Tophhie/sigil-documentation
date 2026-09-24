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

Where [signature previews](/signatures/previews/) are switched on, each row also
carries a thumbnail after the name: the top-left corner of the live signature, at
close to its own size, which is enough to tell a template from its near-identical
duplicate. Clicking the thumbnail opens the whole picture. A row whose template
has no picture yet simply has no thumbnail.

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

Creating one asks for a name and where to start from. That choice also decides
which editor the template belongs to, and it is stored against the template, so
the library always opens it in the editor it was authored in.

| Start from | Opens in | What you get |
| --- | --- | --- |
| Starter signature | Designer | The same ready-made design new organisations get |
| Blank canvas | Designer | Nothing at all |
| From your website | Designer | The starter, with your logo, brand colour, address, social profiles and legal page read off your public website |
| HTML editor | HTML editor | The default signature's markup |

The starter and the default markup are meant to be edited or cleared rather than
kept. They are there so the first thing you see is a working signature to change
instead of an empty canvas. Both carry [the same two
placeholders](#two-things-in-it-are-placeholders) as the seed, so a template
started from either needs the same edit before it is published.

A blank canvas left empty is a signature that renders nothing. Occasionally that
is the point: assigned to a mailbox, it lets the mailbox send without a signature
while it stays served and on the seat count.

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

## Starting from your website

Turning the starter into your own signature usually means finding the logo file,
the brand colour, the registered address and the social profile links, then
putting each one in by hand. Most organisations already publish all of those on
their website, in places a browser reads them from. From your website reads them
from there.

Type the site's address, such as `example.com`, and choose Look up. Sigil fetches
the page and shows what it found:

| Finding | Where it comes from |
| --- | --- |
| Logo | The logo the site declares for itself, or failing that its touch icon or its largest PNG icon. A large page image is used only when the site declares nothing else |
| Brand colour | The theme colour the site declares for browsers |
| Address | The postal address in the site's structured data |
| Social profiles | Links to your profiles on networks the designer has an icon for |
| Legal page | The first link that reads as a disclaimer page, or failing that a legal, privacy or terms page, in that order |

Nothing has been created at this point. Each finding has a Leave out button, and
social profiles can be dropped one at a time. Creating the template stores the
logo in your [image library](/signatures/images/) and opens the result in the
designer, where it behaves like any other template.

### What changes in the starter

The logo goes at the top, scaled to fit within 180 by 80 pixels with its
proportions kept, and with your organisation's name as its alt text.

The brand colour replaces the starter's own colour wherever it appears, which
covers the name, the labels and the links.

The address line becomes your organisation's address as written, rather than
each person's office from the directory. It also stops disappearing for people
with no city on record.

A row of social icons is added, one per profile you kept.

Both [placeholders](#two-things-in-it-are-placeholders) are dealt with. The
`postmaster@` address takes your website's domain, and the legal line points at
the page that was found. Where no legal page was found, the line is removed
rather than left pointing at Contoso.

Everything that differs per person, such as names, job titles, phone numbers and
the Teams link, still comes from your directory, exactly as in the starter.

### What it will not do

It only reads what a site declares. A site that states no theme colour gets no
colour, because guessing one from the logo's pixels goes wrong on any logo with a
white background.

A colour too pale to read against white is shown with a warning, and the design
keeps the starter's text colour. A pale brand colour painted onto somebody's name
is exactly the result to avoid.

The logo has to be a PNG or JPEG, at least 32 pixels wide and under 1 MB, which
are the same rules an upload follows. An SVG logo is passed over because Outlook
does not render one. Where the site offers nothing usable, the template is
created without a logo and you can add one in the designer.

If your library already holds an image with the same name as the logo, the logo
is stored under a numbered name such as `logo-2.png`, and the existing image is
left alone.

Only a public website address is accepted. An IP address, a single-word intranet
name, or an internal suffix such as `.local` is refused with a message saying it
does not look like a public website. A site that does not answer, or answers with
an error, is reported as such.

What was found is kept nowhere except in the template it created. Looking the
site up again reads it again.

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

The sample person is invented, and so is everything beside them. The telephone
numbers come from the ranges Ofcom reserves for drama, which connect to nobody,
so nothing in a preview points at a real mailbox or a real phone.

To see a real person's real signature, use the download option on the Templates
view, which produces the live signature for a chosen mailbox as a standalone HTML
file. To see it in a real mail client, send a [test email](/admin/test-email/).

### Previewing a shared mailbox send

A second address box sits beside the first, labelled "sent by". It renders the
template as if that person had sent from the mailbox named in the first box,
which is how you check a signature using the
[sender placeholders](/signatures/placeholders/#sender). Leaving it blank gives
you the ordinary send, where the mailbox is sending for itself. Both editors
have it. See
[sending on behalf of a mailbox](/signatures/sending-on-behalf/).

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

### Two things in it are placeholders

Everything in the seed that names a person or a mailbox is filled from your own
directory when it renders. Two things cannot be, because no directory attribute
holds them, and both sit in the small print at the bottom:

| Placeholder | What it should become |
| --- | --- |
| `postmaster@contoso.com` | Wherever you want misdirected mail reported |
| `contoso.com/email-disclaimer` | Your own legal or disclaimer page, or nothing at all |

They are obviously not yours on purpose. Contoso is a fictitious company, and a
seeded signature that pointed your recipients somewhere plausible but wrong would
be worse than one that visibly asks to be edited. Publish the seed unchanged and
every message you send asks its recipients to report misdirected mail to a
company nobody at your organisation reads.

Both are ordinary text in the template, so change them in whichever editor you
are using, or delete the disclaimer block if your organisation does not want one.

## Publishing

Editing does not affect anyone until you publish. Each template can hold one
unpublished [draft](/signatures/publishing/), and the HTML editor shows a line
diff against the live version before you commit.

Publishing increments the template's version, which strands every cached
signature for it. Changes reach users within seconds, with no redeploy and
nothing to purge.
