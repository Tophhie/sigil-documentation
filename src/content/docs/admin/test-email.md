---
title: Test emails
description: Send a rendered signature to a real inbox to see how a mail client renders it.
sidebar:
  order: 5
---

Preview shows a signature with sample data inside the portal. A test email shows
the real thing in a real client, which is the only way to know how Outlook
actually renders it.

## Sending one

From the portal, send a rendered signature to an inbox. The mail arrives
containing the signature exactly as a recipient would receive it, including
inline images, the current [banner](/targeting/banners/) if a window is open, and
the applicable [footer](/targeting/footers/).

## Where a test can be sent

The recipient defaults to your own address, and you can name a different one.

Addresses that are verified destinations on Sigil's sending domain always arrive.
Anything else depends on what that domain is currently permitted to send to, and
a refusal comes back as a send error in the portal rather than disappearing
quietly. If a test does not arrive and no error was shown, check the junk folder
before assuming the send failed.

Sigil does not restrict the recipient to your own organisation. Whoever sends the
test decides where it goes, including an outside address. This documentation
previously said the mail service would only deliver to verified destinations and
that this confined test emails to your administrators. That was wrong: the
restriction applies to the address Sigil sends *from*, not the one it sends to.

## What to check

Open the test in the clients your organisation actually uses. Outlook on Windows
is worth checking most carefully, because it renders with Word's engine and is
the most restrictive of the group.

Look at the layout at a narrow window width, since a fixed-width table can force
horizontal scrolling. Check that images appear rather than showing as broken.
Check that conditional sections collapsed the way you expected, with no stray
separators or empty labels. And read the footer, if you have one, since it is the
part nobody proofreads.

## Testing a different person's signature

A test email renders one mailbox's signature. To check what a specific colleague
receives, use the download action on the Templates view, which produces the live
signature for any mailbox you name as a standalone HTML file.

That is the reliable way to verify an [assignment rule](/targeting/assignment-rules/),
because it resolves the rules exactly as a real request would.

## Testing a banner before it launches

Set a short window covering now, send a test email, then set the real window.
Banner windows take effect immediately in both directions, so this costs nothing.

## Who can send them

Admins and Editors, who hold the same capability that covers the template
library. No other [role](/admin/users-and-roles/) reaches test emails.

Read that alongside the section above: granting somebody the template capability
also lets them mail a rendered signature to an address of their choosing, from
Sigil's sending domain. It is a reason to keep the Editor role to people you
would trust with the template library anyway.
