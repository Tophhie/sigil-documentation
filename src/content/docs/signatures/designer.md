---
title: The drag-and-drop designer
description: Build a signature visually from blocks, without writing HTML.
sidebar:
  order: 2
---

The designer is a visual, block-based editor for building signatures. You
assemble a design from blocks; when you publish, the service validates the design
and compiles it to Outlook-safe nested-table HTML.

That compiled HTML is what gets stored, versioned, rendered and cached. Nothing
downstream knows design documents exist, which means a designed template behaves
identically to a hand-written one everywhere else in the product.

Open it from the portal, or directly at `portal.usesigil.app/admin/designer/`.

## Blocks

A design is a tree of blocks on a canvas.

| Block | What it does |
| --- | --- |
| Columns | A multi-column layout row. Compiles to a nested table |
| Text | A run of text, with placeholders and inline formatting |
| Image | A logo, headshot or badge, attached inline |
| Button | A styled call-to-action link |
| Social icons | A row of linked icons, drawn from a built-in set or from your own uploads |
| QR code | A scannable link, or the sender's own contact card |
| Photo | The sender's own Microsoft 365 profile photo |
| Divider | A horizontal rule |
| Spacer | Vertical space |
| HTML | An escape hatch for markup the blocks do not cover |

Rows are how you get side-by-side layouts, such as a logo on the left and contact
details on the right. Columns can be sized as a percentage of the row or at a
fixed pixel width, and columns you do not size share what is left.

The QR code and Photo blocks behave differently from the rest, because the image
each one produces depends on who is sending. See
[per-user images](/signatures/per-user-images/).

## Social icons

A social icons block ships with 27 built-in marks, so a row of logos needs no
upload and no hunting for artwork.

| Group | Marks |
| --- | --- |
| Social networks | LinkedIn, X, Facebook, Instagram, YouTube, TikTok, WhatsApp, Threads, Bluesky, Mastodon, Pinterest, Snapchat, Reddit, Discord, Telegram, Twitch, Vimeo, GitHub, Behance, Dribbble, Medium, Substack, Spotify, Xing |
| Contact | Website, Email, Phone |

Every mark is drawn on the same grid, which is what makes a row of them line up.
Sourcing twenty logos from the web and cropping them yourself rarely does.

Choosing a mark fills in its label and the start of its link for you, so a
LinkedIn icon arrives already pointing at the right kind of address. Both are
yours to change, and the link can carry
[placeholders](/signatures/placeholders/) so each person's icon points at their
own profile.

Each icon is either a built-in mark or an image you uploaded, never both. Anything
the set does not cover is still an upload, exactly as before.

### Ordering the icons

Icons render in the order they are listed, and each one has a pair of buttons for
moving it earlier or later in the row. They are buttons rather than a drag,
because the list lives in the inspector panel rather than on the canvas.

### Icons that appear only for some people

Each icon carries its own "visible when", the same as any block, so a row can
hold one icon per attribute and show each person only the ones they have. Point
the link at a placeholder and the icon reaches that person's own profile.

When every icon in the row is conditional and nobody in a particular message has
any of them, the whole row disappears rather than leaving its padding, background
and border wrapped around nothing. You do not have to set that up. Sigil works
out the condition for the row from the conditions on the icons inside it.

An icon with no condition means the row always has something to show, so the row
is never hidden. Text blocks collapse the same way and for the same reason. See
[blocks that empty themselves](#blocks-that-empty-themselves).

### Styling the row

The look is set once for the whole block rather than per icon, because a row
where one logo sits on a circle and the next is a bare glyph reads as a mistake.

| Setting | Options |
| --- | --- |
| Icon style | Just the mark, on a circle, on a rounded square, or on a square |
| Colour | Each network's own brand colour, or one colour for the whole row |
| Mark colour | The mark knocked out of the backdrop, where there is one. White by default |

Size and the gap between icons are set on the block as usual. Nothing here fixes
the artwork at a size or a colour beforehand, so changing any of it costs
nothing.

### What the marks cost you

Built-in marks are drawn when a message is signed rather than stored, so they
take no space in your [image library](/signatures/images/) and there is nothing
to clean up when you change the row.

They are attached to the message like any other signature image, at roughly
2.5KB for a typical icon, which is the same trade every inline image makes. See
[images](/signatures/images/#why-not-a-hosted-image).

The marks are the trademarks of the networks they belong to. They are there so a
signature can link to a profile on that network, which is what those brands'
guidelines allow, and not for any other use.

## Block styling

Every block, and every column, can carry a background colour and a border.

The border is uniform on all four sides, with a width, a style of solid, dashed
or dotted, and a colour. There is deliberately no corner radius and no per-side
control. Classic Outlook renders a rounded table cell as square anyway, and
per-side borders produce more misaligned signatures than good ones.

A background plus a border on a column is what a card or a coloured sidebar
stripe is made of. Backgrounds default to transparent, which is the right default
for email.

Buttons are the exception. A button's background colour is the button's own fill
rather than the cell behind it, because a button already is a coloured box.

## Vertical alignment

Blocks and columns can both be aligned vertically, but they answer different
questions and it is easy to reach for the wrong one.

Column alignment is the one you usually want. When one column is taller than
another, setting the shorter column's vertical alignment to middle is what puts
contact details level with the photo beside them.

Block alignment only does something when the block has room to move within its
own cell, which means setting a minimum height as well. A block normally sits in
a cell exactly as tall as its content, so alignment alone has nothing to work
with. The designer says so rather than letting you set a value that does nothing.

## Text formatting

Selecting a text block brings up a formatting toolbar inside the block itself, so
the controls sit where you are already looking rather than at the top of the
stage. It covers bold, italic, underline, colour, links and inserting a field.

Adding a link opens a dialog rather than a browser prompt, and the dialog says so
when nothing is selected. Linking needs selected text to attach itself to, so
with only a cursor there is nothing to link and the old prompt looked broken
rather than refused.

Text blocks can be sized in points as well as pixels. Points are what people
authoring in Word and Outlook think in; pixels are what the web thinks in.
Fractional sizes are accepted, which matters when you are matching an existing
signature.

## Canvas settings

The canvas holds the defaults every block inherits:

The overall width in pixels, which is the width of the outer table.

The font family, the default text colour, and the default link colour. A block or
an individual run of text can override any of them.

The background colour, which defaults to transparent. Transparent is the right
default for email, because a signature sits on whatever background the recipient's
client uses.

Machine-readable contact details, which is off by default. Switching it on labels
the signature with schema.org `Person` markup, so a client or a crawler can read
it as a contact rather than as text. Nothing moves and nothing is added to what
the recipient sees, because microdata is attributes on the markup that is already
there. See [the contact card link](/signatures/contact-card/#machine-readable-contact-details).

## Placeholders in the designer

Text blocks accept the same [placeholders](/signatures/placeholders/) as a
hand-written template. Insert them from the field menu rather than typing them,
so the token always matches something that actually renders.

The field menu is grouped and filterable. Each row shows the field's label with
its `{{token}}` underneath, so a long field name never competes with its token
for width. Typing in the filter narrows the list; choosing a row inserts that
field at the cursor.

The designer fetches its field list from the API, which means the picker cannot
drift from what the renderer knows how to resolve. Any
[profile fields](/admin/profile-fields/) your organisation has defined arrive
that way too, under a "User profile" heading after the directory groups.

The menu includes a Sender group, which is the person composing rather than the
mailbox. Those fields look identical to the mailbox's own on an ordinary send, so
the preview pane's second address box exists to show you the case where they
differ. See [previewing](/signatures/templates/#previewing), the
[sender placeholders](/signatures/placeholders/#sender), and
[lines that appear only on a shared mailbox send](#lines-that-appear-only-on-a-shared-mailbox-send)
for hiding content behind that case rather than printing it.

## Placeholders in links

Every link box in the designer accepts placeholders too, and each one carries the
same field picker as the text toolbar. That covers the link dialog and the link
on a field chip, an image, a button, a social icon, a QR code and a photo block.

This is what `tel:{{mobilePhone}}`, `mailto:{{mail}}` and a per-person booking
link such as `{{custom.booking}}` are made of. The token is inserted where the cursor is rather than appended,
so a prefix such as `tel:` stays in front of the field. Clicking the picker
without putting the cursor in the box appends instead, which is what somebody who
goes straight to the menu is asking for.

The boxes have always accepted placeholders. Until now the label said so and left
you to remember the field names, which is exactly the knowledge the picker exists
to remove.

## Conditional blocks

Any block can be given a "visible when" field. The block is emitted wrapped in a
conditional section and disappears entirely for people where that field is empty.

This is how you avoid the classic problems: a phone row that leaves a dangling
label for people with no phone number, or an address block that collapses to a
line of commas.

Four derived conditions help here. `anyPhone` is true when the person has any
phone number at all, `anyAddress` when they have any address component, and
`hasPhoto` when their mailbox has a Microsoft 365 profile photo. Attaching a whole
row to one of those lets the entire row disappear rather than each field inside
it. The fourth is
[sent on behalf of the mailbox](#lines-that-appear-only-on-a-shared-mailbox-send),
which is about who is sending rather than about what the directory holds.

None of the four appears in the field menu, because none of them prints anything.
They are offered in the visibility controls only, at the end of the same list the
directory fields are in.

A Photo block carries the `hasPhoto` condition automatically, so you do not need
to set it yourself.

### Conditions on a single field

Selecting a field chip inside a text block gives that chip its own visibility
list, separate from the block it sits in. The chip is shown only when every field
you tick has a value, so one line can carry a job title, a department and a
qualification and print only the parts a given person actually has.

Plain text you typed cannot be made conditional on its own. It belongs to the
block, so a label that should come and go with a field belongs in the same block
as that field, with the condition on the block.

### Lines that appear only on a shared mailbox send

A signature can carry a line that shows up only when somebody is sending from a
shared or delegated mailbox, so `sales@` reads "Jane Doe on behalf of Sales"
while the same design from Jane's own mailbox does not. The condition is called
"Sent on behalf of the mailbox", and it is set exactly like any other visibility
condition.

| What you want to hide | Where the setting is |
| --- | --- |
| A whole block, including a row and everything in it | Select the block, open Visibility, and set Show when |
| One field chip inside a line of text | Select the chip, open Visibility, and tick it in the list |
| A single social icon | Select the social block and set Show when on that icon |

A block carrying a condition shows an "if Sent on behalf of the mailbox" badge on
the canvas, so a line that is invisible for most people is not invisible to you
while you are working.

The two Show when menus append "has a value" to every entry they list, so this
one reads "Sent on behalf of the mailbox has a value". That is the wording every
entry gets rather than a claim about a directory attribute. There is no such
attribute; Sigil works the answer out for each message.

Condition the line on that entry rather than on one of the Sender fields. The
Sender fields fall back to the mailbox's own names when nobody else is sending,
so they almost always have a value, and a chip conditioned on "Sender first name"
would show on every send. See
[sending on behalf of a mailbox](/signatures/sending-on-behalf/).

A text block whose chips are all conditional on it collapses on its own, so you
do not have to set the same condition on the block as well. See
[blocks that empty themselves](#blocks-that-empty-themselves).

Two limits are worth knowing before you build around it.

The condition cannot be inverted. There is no way to show a line only when
somebody is *not* sending on behalf of the mailbox. Usually you do not need one,
because the Sender fields already read correctly both ways. When you genuinely
need different content for a shared mailbox, give it its own template with an
[assignment rule](/targeting/assignment-rules/), which matches the mailbox.

A line behind this condition disappears when the directory cannot be reached at
the moment of composing. Sigil falls back to the signature the mailbox would have
had anyway rather than printing a half-filled clause.

To check it, use the second address box in the designer's live preview, labelled
"Sent by". Name the shared mailbox in the first box and a colleague in the
second, and the conditional lines appear. Leaving it blank gives you the ordinary
send, which is what everybody who is not a delegate will see.

### Blocks that empty themselves

A block whose contents have all disappeared used to leave its own shape behind:
the padding, the background, the border, and for a text block the height of a
line. In a signature that reads as an unexplained gap, and it only ever showed up
for the people whose directory record was sparse.

Sigil now works the condition out for you. When everything a block can print is
conditional and none of it applies to a particular person, the block goes with
its contents. That covers a text block whose field chips are all conditional, and
a social row whose icons all are. Anything unconditional anywhere in the block
means it always has something to show, so it is never hidden.

Line breaks and spacing do not count as something to show. A text block of
conditional chips separated by breaks still collapses, because a block left
standing for the sake of its own line breaks is exactly the blank line this
removes. A block that holds nothing but line breaks is left alone: that is
deliberate vertical space, and no condition of Sigil's belongs on it.

## Publishing

Publishing validates the design and compiles it. Validation errors are written to
be actionable rather than technical, so a rejected publish tells you which block
is wrong and why.

The compiled output carries the same `{{placeholder}}` and `{{#section}}` syntax
as a hand-written template, and is subject to the same
[Outlook constraints](/signatures/outlook-constraints/), including the 30,000
character limit.

## The same publishing controls as the HTML editor

Everything the [HTML editor](/signatures/html-editor/) can do with a body before
it goes live, the designer can do too.

| Control | What it does |
| --- | --- |
| Save draft | Keeps the working copy without changing what anybody receives |
| Discard | Reverts unsaved edits, or with a draft saved, deletes it and reloads the published design |
| Submit for review | Puts the draft in the [approvals queue](/signatures/approvals/) |
| Approve and publish, Send back | The approver's two choices on a submitted draft |
| Schedule | Books the publish for an instant you choose |
| Staged | Publishes to 10% of mailboxes first, as a [staged rollout](/signatures/staged-rollouts/) |

This matters most where [publish approval](/signatures/approvals/) is switched on.
A designer template only ever opens in the designer, so an editor who could not
publish and had no draft to submit would have had no way forward from this screen
at all. Submit for review takes the primary position for them, rather than
sitting next to a Publish button the server would refuse.

The one thing the designer does not have is the line diff. A diff of a block
document says nothing useful, so the review step here is reading the canvas and
the preview rather than reading changed lines.

## What the top bar is telling you

The state beside the template name describes what is on the canvas, which is not
always what users are receiving.

| State | What it means |
| --- | --- |
| Published, with the version number | The canvas matches the live signature |
| Unpublished changes | Edits that are not saved anywhere yet |
| Draft, saved, not published | A saved draft. Users are still on the published version |
| Draft, unsaved changes | A saved draft with further edits on top of it |
| Draft, awaiting review | Submitted, and waiting for an approver |

Opening a saved draft leaves the canvas clean, so a bar that only distinguished
clean from dirty would read as published while showing something nobody has ever
received.

## Watching a rollout from the designer

While a [staged rollout](/signatures/staged-rollouts/) is running on the template
you have open, a strip sits under the top bar showing the percentage, both
versions' apply failure rates, and what the evaluator will do at its next pass.
Promote now and Roll back are on the strip.

It refreshes every 60 seconds, so the counts move continuously even though the
evaluator only takes a decision every fifteen minutes.

A booked publish shows as its own strip, with the option to cancel it, and says
plainly that it publishes the design captured when it was booked rather than
what is on the canvas now.

Those strips are read-only status. Anything that takes input, including
scheduling and sending a draft back, opens a dialog.

## Ejecting to HTML

A designer template can be ejected to HTML. This converts it to a hand-authored
template containing the compiled markup, and it is one-way.

Eject when you need something the blocks cannot express and the HTML block is not
enough. After ejecting, the template is edited in the
[HTML editor](/signatures/html-editor/) from then on.

HTML cannot be imported back into the designer.

Do not eject a template that uses a QR code or a Photo block. Those images are
generated from the design document, and ejecting discards it. See
[per-user images](/signatures/per-user-images/#designer-only).

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
