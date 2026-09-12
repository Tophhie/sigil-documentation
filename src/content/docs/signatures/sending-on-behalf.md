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
mailbox.

Everything on this page also holds for a Microsoft 365 Group or distribution
list that people send as. What is particular to groups, including the one way of
sending that Outlook keeps add-ins out of, is on
[sending as a Microsoft 365 Group](/signatures/group-mailboxes/).

## Where the add-in runs in a shared mailbox

Before any of this matters, the add-in has to be running in the window somebody
is typing in, and whether it is depends on how their Outlook holds the shared
mailbox rather than on anything set up in Sigil. The rules are Microsoft's and
they differ by client.

| How the shared mailbox is open | Signature applied |
| --- | --- |
| Outlook on the web, in the same tab as the person's own mailbox | Yes |
| New Outlook for Windows, mapped in automatically and left as a folder | Yes |
| Classic Outlook for Windows | Yes |
| Outlook for Mac | Yes, from manifest 1.4.0.0 |
| Outlook on the web, opened with Open another mailbox in its own tab | Yes, from manifest 1.4.0.0 |
| New Outlook for Windows, added by the person or promoted to a full account | Yes, from manifest 1.4.0.0 |
| Outlook for Android and iOS, where the shared mailbox is added as its own account | No |

The last four rows are the ones worth reading twice. Outlook only loads an
add-in into those windows if the manifest declares support for shared folders,
and Sigil's manifest declares it from version 1.4.0.0. An organisation still on
an older manifest gets no Sigil at all in those compose windows, however the
add-in was deployed and however long it waited. Microsoft now steers
administrators towards promoting a shared mailbox to a full account in new
Outlook for Windows, so this is a common way to meet it.

If that describes what you are seeing, the fix is to re-upload the manifest. The
portal tells you when your organisation is behind: see
[which manifest version you are on](/deploy/deploy-the-add-in/#which-manifest-version-you-are-on).

Deploy the add-in to the people, never to the shared mailbox. Microsoft's own
guidance is that administrators should not deploy add-ins to a shared mailbox,
and an add-in deployed to somebody's own mailbox follows them into every shared
mailbox they open, subject to the table above. Adding `sales@` itself to the
deployment group is not a fix for a missing signature, and neither is waiting
longer.

Mobile is a flat no, and not Sigil's decision. Microsoft does not support
shared mailbox scenarios for add-ins on Android or iOS at all, so a shared
mailbox added as its own account on a phone gets no signature from any add-in.
The person's own account on the same phone is unaffected.

### Who the add-in signs in as inside a promoted mailbox

With the mailbox held as an account of its own, Outlook reports the mailbox's
address as the signed-in user. Sigil does not take it at face value: it
authenticates as whoever the client is actually signed in as, which is the
person, and treats the mailbox as the mailbox. So the split described below
still holds, and "Jane Doe on behalf of Sales" still renders with Jane's name
in it.

This matters because a shared mailbox is never meant to be signed into with a
password, which is Microsoft's position as well as ours. Nothing in Sigil ever
asks anybody to.

It also settles what happens on a shared computer. The copy of the last
signature a device keeps records who it was fetched for, not just which address
it was for, and a copy fetched for somebody else is discarded rather than put
into the message. So two colleagues taking turns at a reception desk cannot end
up sending each other's "on behalf of" line: the second one waits for a fresh
signature instead of starting from the first one's.

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
| [Profile fields](/admin/profile-fields/) | Either, and you choose per placeholder. `{{custom.…}}` is whatever was filled in for `sales@`; `{{sender.custom.…}}` is what the delegate filled in for themselves |
| The sender fields | The person who pressed Send |

That split is deliberate. The sender fields cover who the person is and how to
reach them directly. What describes the site or the brand, including the address
lines, the office and the company name, stays the mailbox's, because a signature
mixing the shared mailbox's brand with the delegate's postal address would be
worse than one that mixed nothing.

Signing in is always the person's own act. The add-in authenticates as whoever is
signed in to Outlook, never as the mailbox they are sending from, so a shared
mailbox needs no sign-in and no licence of its own to get a signature. Nothing
has to be done to `sales@` for a delegate's message to be signed.

## The sender placeholders

A set of placeholders describes the person rather than the mailbox. Each is an
ordinary field name with `sender.` in front of it: their names, job title and
department, their employee number and type, their own email address and phone
numbers, and their fifteen extension attributes. They are listed in full on
[placeholders](/signatures/placeholders/#sender).

The names are what "Jane Doe on behalf of Sales" needs, and are what this started
as. The rest exists because an organisation whose staff carry a personal licence
or registration number has to print the sender's, not the mailbox's.

Your own [profile fields](/admin/profile-fields/) join them. A field you defined
as `pronouns` is available both as `{{custom.pronouns}}`, the mailbox's answer,
and as `{{sender.custom.pronouns}}`, the answer given by whoever pressed Send.
The second is almost always the one a shared mailbox wants: a line that names a
person should carry that person's pronouns, not an answer filled in against
`sales@`.

When nobody else is sending, every one of them resolves to the mailbox's own
value. That fallback is what lets one line serve a personal mailbox and a shared
one:

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
that. The field menu has a Sender segment holding all of them, and whole blocks,
single field chips or individual social icons can be put behind the "Sent on
behalf of the mailbox" condition. See
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

Profile fields follow the same rule, and it is worth stating plainly because
these are answers people gave rather than attributes an administrator maintains.
Once a delegate is sending, `{{sender.custom.…}}` prints what that person
entered and nothing else. A delegate who left the field blank prints nothing,
rather than falling back to whatever was filled in for the shared mailbox. Sigil
never attributes one colleague's answer to another.

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
condition opens. The named colleague's own [profile field](/admin/profile-fields/)
answers are loaded too, so `{{sender.custom.…}}` previews as truthfully as their
name does. Sample data in the first box works too. See
[previewing a shared mailbox send](/signatures/templates/#previewing-a-shared-mailbox-send).

Naming somebody who is not a delegate does nothing visible. The preview applies
the same test a real send does, so it cannot show you an output no message could
produce.

## Cost

Shared mailboxes are unlicensed, so they are free, and so are group mailboxes. A
colleague sending from one is already a billable seat in their own right, and
sending on behalf of a mailbox does not add another. See
[billing](/admin/billing/).
