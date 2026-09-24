---
title: The "My signature" pane
description: The compose ribbon button that applies your signature on demand, explains failures, and downloads a copy.
sidebar:
  order: 2
---

"My signature" is a button on the Outlook compose ribbon. It opens a small pane
that applies your signature on demand.

Most of the time you will never need it. It exists for the times when the
automatic path cannot do its job.

## Opening the pane

The button is there in Outlook on Windows, Outlook on Mac and Outlook on the
web. Outlook on your phone has no button; see
[where it is not available](#where-it-is-not-available).

1. In Outlook, start a new message, a reply or a forward.
2. On the ribbon, choose My signature. It sits in a group called Signature.

The pane opens. While it finds out about your signature it says "Checking
your signature", and then shows a preview labelled with which signature it is:
new messages, or replies and forwards.

## What it does

It applies your signature immediately and shows you a preview of what was
applied.

The preview is laid out at the pane's own width, the way a narrow email window
would lay it out, so text wraps and nothing is shrunk. Only where something in
the signature cannot wrap, such as a fixed-width table or a banner image, is the
preview scaled down, and then only enough to show the whole of it rather than
its left third. A plain text signature is never made smaller than it will
actually be.

If it could not, it says why, in language you can act on rather than an error
code.

It offers a download of your signature as a self-contained file.

Where your organisation has switched it on, it also offers "Edit my details",
which opens the page where you fill in your own signature details. See
[filling in your own details](/users/your-details/).

To apply your signature yourself:

1. Open the pane from the compose ribbon.
2. Choose Apply my signature.

The button reads "Applying" while it works. When it has finished, the pane says
"Signature applied" and shows the signature it put into your message. If it
could not, the pane says why.

## What it tells you when something is wrong

The pane distinguishes between problems worth retrying and problems that retrying
cannot fix.

Where a retry might work, the Apply and Download buttons stay where they are and
the explanation sits beneath them, so the button you just pressed does not move.
A failed sign-in, a connection that dropped, or Outlook declining the signature
all fall into this group.

Where nothing can be applied to this mailbox at all, the buttons are removed and
only the explanation remains. That covers a mailbox with no signature configured,
an organisation that has not finished setting Sigil up, a subscription that is not
active, and a version of Outlook too old to support the add-in. Offering a button
that could only fail would waste your time and tell you nothing.

Each of these names who can fix it, which is usually your IT team rather than
you.

One of those messages is worth reading loosely. If the pane says Sigil is not set
up for your organisation, it can mean two other things as well. Your own mailbox
may have been [kept out of Sigil](/admin/cost-management/) deliberately, which
is a normal thing for an organisation to do for a shared or unattended mailbox.
Or your organisation may have
[paused delivery](/signatures/pausing-delivery/) for everybody, which is what IT
does while a signature is still being set up.

The add-in cannot tell the three apart, because Sigil declines them all the same
way. Your IT team can see which it is.

The pane also keeps a subscription problem separate from a connection problem. A
lapsed subscription says so rather than reading as a network fault you could fix
by trying again.

It draws one more line for the same reason. A connection that could not reach
Sigil at all asks you to check your connection, while Sigil answering with a
problem of its own says so and suggests trying again in a moment. The second is
not something your connection can fix, and if it persists your IT team has
something concrete to report.

Opening the pane does not front an error on its own. If something is merely
transient, you find out when you press a button rather than the moment the pane
loads.

## Why it exists

The automatic path runs in a part of Outlook with no user interface. It can sign
you in silently, but it cannot show you a sign-in prompt.

So on your very first message, or after your session expires, or after a
multi-factor prompt, the automatic path may have no way to authenticate you. When
that happens it stops quietly rather than interrupting you, because an error bar
on every message you write would be worse than a missing signature.

The pane can show a sign-in prompt. That is what makes it the fix: opening it once
completes the sign-in that the automatic path could not, and from then on the
automatic path works.

When the pane needs you to sign in, it says "Sign in to see and apply your
signature" and the main button reads Sign in and apply instead of Apply my
signature.

1. Open the pane from the compose ribbon.
2. Choose Sign in and apply.
3. Sign in with your work account in the prompt that appears.

Once you are signed in, the pane applies your signature and says "Signature
applied". If it says "Sign-in didn't complete, so your signature wasn't
applied. Try again.", choose the button once more. From then on the automatic
path signs you in on its own.

## Download my signature

The download saves your signature as a standalone HTML file with the images
embedded in it, so it works anywhere without needing anything else alongside it.

It is useful for pasting your signature into another system, keeping a personal
copy, or sending somebody exactly what your signature looks like.

1. Open the pane from the compose ribbon.
2. Choose Download my signature.

The button reads "Preparing" while the file is built, and you may be asked to
sign in if you have not already. The file is saved as "Sigil signature.html",
and the pane says "Signature downloaded".

## Where it is not available

Outlook for iOS and Android have no "My signature" button. Outlook mobile
activates add-ins in read mode only, and a compose pane is not one of the
exceptions.

Your signature is still applied automatically on mobile. What you lose is the
manual fallback.

If your signature is not working on your phone, open the pane once on a computer.
The sign-in is tied to you rather than to a device, so fixing it once fixes both.

## If the pane itself does not appear

The button appears on the compose ribbon once the add-in has been deployed to
you. If it is not there, the add-in has not reached your mailbox yet.

Deployment propagates over 6 to 72 hours, so if your organisation rolled it out
in the last few days, waiting is the answer. Otherwise ask your IT team, who can
check whether you are in scope for the deployment.
