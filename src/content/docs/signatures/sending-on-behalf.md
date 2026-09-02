---
title: Sending on behalf of a mailbox
description: What a shared or delegated mailbox sends, and how to name the person behind it.
sidebar:
  order: 5
---

A shared mailbox such as `sales@` has its own signature, and switching the From
field in Outlook is what fetches it. Sigil can also name the colleague who
actually wrote the message, so what arrives reads "Jane Doe on behalf of Sales"
rather than just "Sales".

One template covers both cases. You do not need a second template for the shared
mailbox, and nothing about the add-in changes.

## The two identities

Every compose request carries a mailbox and a person. The From address says which
mailbox the message leaves from; the add-in's token says who is signed in. On an
ordinary send they name the same account, and on a shared or delegated mailbox
they do not. Everything on this page is about that gap. See
[how it works](/start/how-it-works/#two-identities-not-one).

The mailbox is the one that decides almost everything:

| Decision | Made from |
| --- | --- |
| Which template applies | The mailbox. [Assignment rules](/targeting/assignment-rules/) match its own directory record, so a delegate's department cannot route the shared mailbox somewhere else |
| Every ordinary placeholder | The mailbox. `{{displayName}}` from `sales@` is "Sales" |
| [Profile fields](/admin/profile-fields/) | The mailbox, so `{{custom.…}}` is whatever was filled in for `sales@` rather than for the delegate |
| The three sender fields | The person who pressed Send |

That split is deliberate. A signature mixing the shared mailbox's address with
the delegate's own phone number would be worse than one that mixed nothing, so
only the names cross over.

Signing in is always the person's own act. The add-in authenticates as whoever is
signed in to Outlook, never as the mailbox they are sending from, so a shared
mailbox needs no sign-in and no licence of its own to get a signature. Nothing
has to be done to `sales@` for a delegate's message to be signed.

## The sender placeholders

Three placeholders describe the person rather than the mailbox:
`{{sender.displayName}}`, `{{sender.firstName}}` and `{{sender.lastName}}`. They
are listed with everything else on
[placeholders](/signatures/placeholders/#sender).

When nobody else is sending, they resolve to the mailbox's own names. That
fallback is what lets one line serve a personal mailbox and a shared one:

```html
Kind regards, {{sender.firstName}} {{sender.lastName}}{{#onBehalfOf}} on behalf of {{displayName}}{{/onBehalfOf}}
```

Sent from `sales@` by Jane Doe, that renders "Kind regards, Jane Doe on behalf of
Sales". Sent from Jane's own mailbox, the same line renders "Kind regards, Jane
Doe" and the clause closes.

`{{onBehalfOf}}` is the switch. It is the only condition in Sigil that can be
true for one person sending from a mailbox and false for another, which is why it
exists rather than leaving you to compare a name against an address.

## Building it

In the [drag-and-drop designer](/signatures/designer/), you do not type any of
that. Insert the sender fields from the field menu, and put whole blocks, single
field chips or individual social icons behind the "Sent on behalf of the mailbox"
condition. See
[lines that appear only on a shared mailbox send](/signatures/designer/#lines-that-appear-only-on-a-shared-mailbox-send).

In the [HTML editor](/signatures/html-editor/), write the tokens and the
conditional section as above.

Both are also available in a [compliance footer](/targeting/footers/), which is
rendered with the same values as the template.

## What counts as sending on behalf

Sigil compares the signed-in person against every address the mailbox owns, not
just the one in the From field. So sending from an alias of your own mailbox is
not a delegation: if your account is `jane.doe@` and you send from `jane@`, the
addresses differ but the person does not, and your own alias never opens an "on
behalf of" clause.

The person is taken from the verified token rather than from anything the request
asks for, so a signature cannot be made to claim somebody else wrote it.

None of this happens for a template that never mentions the sender. Sigil reads
the published template first and only asks who is sending when the answer can
change what it prints, so an organisation not using this costs nothing for it.

## When the directory cannot answer

Once somebody else is sending, their own values are printed as they stand. A
delegate with no first name in the directory prints nothing there rather than
borrowing the shared mailbox's name, which would read as that person being called
"Sales".

If the directory is unreachable at the moment of composing, the message gets the
signature the mailbox would have had anyway, with the clause closed. That is
deliberate: the alternative is "Kind regards,  on behalf of Sales", and the
template can live without the name more easily than the recipient can live with
the gap.

## Where the fields are filled in

Only the add-in knows who is composing, so only the add-in's request fills these
in. A signature downloaded from the Templates view, a
[test email](/admin/test-email/) and a preview all render the mailbox sending for
itself unless you tell the preview otherwise.

Telling the preview otherwise is a second address box, labelled "sent by", in
both editors. Put `sales@` in the first box and a colleague in the second, and
you see what a delegate's message will actually say, including whether the
condition opens. Sample data in the first box works too. See
[previewing a shared mailbox send](/signatures/templates/#previewing-a-shared-mailbox-send).

Naming somebody who is not a delegate does nothing visible. The preview applies
the same test a real send does, so it cannot show you an output no message could
produce.

## Cost

Shared mailboxes are unlicensed, so they are free. A colleague sending from one
is already a billable seat in their own right, and sending on behalf of a mailbox
does not add another. See [billing](/admin/billing/).
