---
title: How your signature works
description: For everyone at an organisation using Sigil. What happens when you write an email, and what to do if the signature is missing.
sidebar:
  order: 1
---

Your organisation manages email signatures centrally with Sigil. Somebody in IT
or marketing designs the signature; your own details are filled in from the
company directory.

You do not need to install or configure anything.

## What you will notice

Very little, which is the intention.

When you start a new message, reply or forward, your signature appears at the
bottom. It carries your name, job title, phone number and anything else your
organisation has chosen to include, taken from the company directory rather than
typed into each message by you.

If you send from more than one address, the signature follows the address you are
sending from.

Replies and forwards may get a shorter signature than new messages, if your
organisation has set one up.

## Why it sometimes changes as you watch

Your device keeps a copy of the last signature you were served, and Sigil puts
that copy into the message as soon as it knows which address you are sending
from. That is why the signature appears almost at once rather than after a pause
while something loads.

Sigil then checks the copy against the current signature while you are writing.
Most of the time they match and nothing happens. If somebody has published a
change since your last message, the signature is replaced with the new one a
second or so later, in front of you. That is the change arriving rather than a
fault.

What leaves your mailbox is the current signature, whenever Sigil can be reached
at all. The check finishes before the message can be sent, so anything you saw
swap in the editor had already settled by the time you pressed Send.

If Sigil cannot be reached at all, the kept copy stays and your message goes out
with it, so a brief network problem does not leave you signing off with nothing.
If your organisation has excluded your mailbox or paused signatures, the kept
copy is taken back out of the message instead of being left standing.

The copy is your own signature on your own device, which is the same thing
Outlook keeps for a signature you configured yourself. It is held for 45 days
after the last message you wrote from that address, and every message renews it.

The copy also records who it was fetched for. If you share a computer with a
colleague, a copy that was fetched for them is discarded rather than put into
your message, so you wait a moment for your own instead of starting from theirs.

## Your own Outlook signature

Sigil suppresses any signature you have configured in Outlook, so you get one
signature rather than two.

If you had a personal signature before, it is not deleted. It is simply not
applied while Sigil is active.

## If your details are wrong

Your name, job title, phone number and address come from your organisation's
directory, not from Sigil. A wrong job title is a directory record to be
corrected, and the signature will follow within minutes once it is.

Ask whoever maintains your organisation's directory, usually IT or HR.

## Details you fill in yourself

Some organisations add a few fields the directory has no place for: pronouns, a
link to your own booking page, the days you work. Where yours has, those are
yours to fill in rather than IT's to maintain.

The page is at `portal.usesigil.app/me`, and the "My signature" pane offers an
"Edit my details" button that opens it. What you save appears in your next
email. See [filling in your own details](/users/your-details/).

Not every organisation switches this on, and there is nothing missing if yours
has not. Everything in your signature then comes from the directory.

## If the signature is missing

Open the "My signature" button on the compose ribbon. It applies the signature on
demand and, if it cannot, tells you why. See
[the My signature pane](/users/my-signature-pane/).

The most common cause is the first time you use it. The automatic path cannot
prompt you to sign in, so if a sign-in is needed it stops quietly rather than
interrupting you mid-message. Opening the pane once completes the sign-in, and it
works automatically from then on.

## On your phone

The signature is applied automatically on Outlook for iOS and Android, but there
is no "My signature" button, because Outlook mobile does not support one.

If your signature is not working on your phone, open the pane once on a computer.
That fixes the phone too, because the sign-in is tied to you rather than to a
device.

Two things on mobile are normal rather than faults: on a reply, the signature is
not visible until you expand the compose window to full screen, and a message
started from the iOS Share sheet does not get a signature.

## Sending from a shared mailbox

Switch the From field to a shared mailbox and you get that mailbox's signature
rather than your own, which is the point of having one. Your organisation can
also have it name you, so a message from `sales@` signs off "Jane Doe on behalf
of Sales" rather than just "Sales".

Whether it does is up to whoever writes the templates. If yours does not name
you and you think it should, that is a request for the person who looks after
signatures rather than something you can change from Outlook. See
[sending on behalf of a mailbox](/signatures/sending-on-behalf/) for what they
would have to set up.

If the shared mailbox is open as a separate account rather than as a folder in
your own, and you get no signature there at all while your own messages are fine,
that is not something you can fix from Outlook either. Outlook only runs add-ins
in that kind of window when the add-in has been set up to allow it, and your
administrator is the one who can update it. Tell them, and point them at
[where the add-in runs in a shared mailbox](/signatures/sending-on-behalf/#where-the-add-in-runs-in-a-shared-mailbox).

## Things that look wrong but are not

A new message you have not typed anything into will not be saved as a draft, even
though the signature was applied. Outlook does not save an otherwise untouched
message.

## Getting a copy of your signature

The "My signature" pane offers a download. It saves your signature as a
self-contained HTML file, which is useful if you want to paste it into another
system or keep a copy.

## Who to ask

Your own IT team administers Sigil. They can see whether your mailbox is
receiving signatures and why an attempt failed, which is more than you can see
from Outlook.
