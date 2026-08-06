---
title: Test emails
description: Send a rendered signature to a real inbox to see how a mail client renders it.
sidebar:
  order: 9
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

Sigil does not restrict where a test goes. Whoever sends it decides, including an
outside address. The restriction on Sigil's side applies to the address the mail
is sent from, which is always Sigil's own sending domain, and not to the address
it is sent to.

What happens after that is the receiving side's decision, as it is for any mail.
A refusal comes back as a send error in the portal rather than disappearing
quietly, so if a test does not arrive and no error was shown, check the junk
folder before assuming the send failed.

This is the reason an [API key](/admin/api-keys/) is refused this endpoint. A
credential that can mail a rendered signature to any address, unattended, is a
different thing from an administrator doing it once to check a layout.

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

The download resolves the rules exactly as a real request would, so it tells you
what that person is being served right now.

To find out why they are being served it, use
[Test a user](/targeting/assignment-rules/#testing-a-rule-against-one-mailbox) on
the rules page instead. It reads the directory live rather than from the
resolution cache and names the rule that decided each role, which is the
difference between seeing the outcome and understanding it.

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
