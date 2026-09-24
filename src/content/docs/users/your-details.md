---
title: Filling in your own details
description: The page where you fill in the parts of your signature that come from you rather than from your IT department.
sidebar:
  order: 3
---

Most of your signature comes from your Microsoft 365 account. Your name, job
title, phone number and office all live there, and your IT team maintains them.

Some things do not belong there. Your pronouns, a link to your own booking page,
a direct line, the days you work. If your organisation has switched this on, you
fill those in yourself.

The page is at `portal.usesigil.app/me`.

## Getting there

Sign in with your work account. There is nothing to install and no role you need
to be given: the page works for anybody in an organisation that has switched it
on, and it shows you your own details and nothing else.

If you use the [My signature pane](/users/my-signature-pane/) in Outlook, there
is an "Edit my details" button on it that opens the same page in your browser.
The button only appears when there is actually something for you to fill in.

From Outlook:

1. Start a new message, a reply or a forward.
2. On the ribbon, choose My signature.
3. In the pane, choose Edit my details.

The page opens in your browser. To go there directly instead:

1. Open `portal.usesigil.app/me` in your browser.
2. Choose Sign in with Microsoft.
3. Sign in with your work account.

The page is headed "Your signature details", with your email address at the
top and a Sign out button beside it.

## What is on the page

Your organisation's fields come first, as a form. What is in it is entirely up
to your organisation: it might be one box for pronouns, or half a dozen things.
Some fields carry a line of guidance underneath explaining what your organisation
wants in them.

Underneath sits a preview of your actual signature, so you can see the change
land rather than take it on trust.

The page also tells you when Sigil last added your signature to an email. See
[whether your signature is working](#whether-your-signature-is-working).

Alongside them, greyed out, are the details Sigil reads from your Microsoft 365
account. You cannot change those here, and they are shown anyway, because the
first question this page provokes is "why can't I fix my job title". They are
also the honest picture of what your signature is made of: most of it is the
directory, and this page edits the rest.

Custom attribute slots are only listed when your organisation has put something
in them, so an empty panel there is normal.

## Whether your signature is working

The page answers the question that otherwise ends up with your IT team: is my
signature actually going on my emails?

| What it says | What it means |
| --- | --- |
| Added to an email, with when and in which Outlook | The last time Sigil put your signature into a new message, Outlook accepted it. There is nothing to do |
| Last tried, but it didn't go in | The last attempt failed. The line underneath says why in plain terms, and usually what to do about it |
| Outlook asked for your signature | A signature was sent, but that version of Outlook did not report back whether it went in. That is normal for older versions |
| Not added to an email yet | Nothing has asked for your signature so far. It happens by itself the first time you start a new message |

If you have already sent a few messages and the page still says not added yet,
open the Sigil pane from the ribbon once.

This is the same record your administrators see for your mailbox in
[Activity](/monitoring/activity/), shown to the person it is about. It holds no
message content, no recipients and no count of what you sent. It only says when a
signature last went in, in which Outlook, and whether that worked.

It covers your own mailbox and nothing else. A signature added while you send
from a shared mailbox is recorded against the shared mailbox, so it does not show
here.

## Fixing something you cannot edit here

Ask your IT team. Everything in the read-only panel comes from your Microsoft 365
account, and Sigil only reads it. Nothing you do on this page is written back
there, so correcting your job title in Sigil is not possible even in principle.

The upside is that a correction made in your directory reaches your signature on
its own, without anybody re-editing a template.

## Saving

1. Under "Yours to fill in", type into each field, or pick from its list.
2. Choose Save.

Save stays greyed out until you have changed something. When the save has gone
through, "Saved. Your next email will use it." appears beside the button, and
the preview under "How your signature looks" is redrawn with your new details.
A field marked "asked of everyone" is one your organisation would like filled
in; the number still to fill in is shown beside the button, and you can save
without them.

To clear a value you no longer want:

1. Delete the text from the field, or choose "Prefer not to say" from a list.
2. Choose Save.

Your next email uses what you saved. There is no waiting period and nothing to
restart.

Some fields only accept certain values, and you are told at the point of saving
rather than finding out later. A field for a web address wants a full one
beginning `https://` or `http://`. A field offering a list of choices takes one
of those choices. That is your organisation's decision about the field, not Sigil being
particular.

If your organisation changes what a field may hold after you filled it in, an
answer that no longer fits is removed rather than left in your signature. That
happens when a field's type changes altogether, and when an option you chose is
taken off a list. Pick again from the new list the next time you visit. A field
that only had its label, help text or length changed keeps your answer.

Leaving a field empty is fine. Your signature closes up around anything you have
not filled in, so an empty field leaves no gap, no stray comma and no empty
label.

## If you send from a shared mailbox

What you enter here can follow you. Where your organisation's template asks for
it, a message you send from a shared mailbox such as `sales@` carries your own
answers rather than anything filled in against that mailbox, in the same way it
carries your name rather than the mailbox's.

Whether it does is your organisation's decision, taken in the template, so it is
worth asking your IT team if it matters to you. What will never happen is your
answer appearing under a colleague's name, or theirs under yours. If you left a
field empty, a message you send prints nothing there rather than borrowing
somebody else's answer.

A shared mailbox can have answers of its own, but nobody signs in as one, so
only an administrator can enter them.

## Who can see what you enter

Your organisation's administrators can see what everybody has entered, and can
correct it on your behalf if you ask them to. That is the same access they
already have to the rest of your signature. They can also fill your details in
before you have been to the page at all, which is how a starter's direct line
can be in place on their first day.

When an administrator edits your details, it is recorded in your organisation's
change log with their name on it. When you edit your own, it is not: that log is
your IT team's record of changes to the organisation's signatures, not a record
of you keeping your own number up to date.

## If the page says editing is not available

Three things can cause it, and none of them is a fault.

Your organisation may not have switched profile editing on. It is off until an
administrator turns it on, and there is nothing you can do from your end.

Or your organisation's Sigil subscription may not be active at the moment, in
which case the page says there is nothing to edit right now.

A third message looks different. If your mailbox is one your organisation has
deliberately left out of Sigil, which is normal for shared and unattended
mailboxes, the page reports the mailbox as excluded instead.

In every case your IT team can tell you which, and the values you may already
have entered keep appearing in your signature regardless. Switching editing off
stops people changing their details; it does not remove them.
