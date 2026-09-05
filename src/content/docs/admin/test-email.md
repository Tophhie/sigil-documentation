---
title: Test emails
description: Send a rendered signature to a real inbox to see how a mail client renders it.
sidebar:
  order: 10
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

The recipient defaults to your own address, and you can name a different one, as
long as it is a mailbox in your own directory.

| Recipient | Result |
| --- | --- |
| Your own signed-in address | Sent |
| Any mailbox in your Microsoft 365 directory | Sent |
| Anything else | Refused, with a message saying why |

That covers what the feature is for, which is seeing a signature land in a real
inbox, usually your own or the colleague you are setting up. It leaves no route
to an address outside your organisation.

The check is Sigil's own rather than something the mail platform does. The
platform restricts the address mail is sent from, which is always Sigil's own
sending domain, and places no restriction at all on where it goes. Without a
check in front of it, the template capability would carry with it a scriptable
outbound mailer, sending from Sigil's domain to any address in the world.

A partner Technician running a test passes too. Their address is not in the
client's directory, but it is the address of the person doing the work.

This page previously said Sigil placed no restriction on where a test could go.
That was true until August 2026 and is not any more.

Once a message is accepted, what happens next is the receiving side's decision,
as it is for any mail. A refusal comes back as a send error in the portal rather
than disappearing quietly, so if a test does not arrive and no error was shown,
check the junk folder before assuming the send failed.

The check does not make the endpoint safe for an [API key](/admin/api-keys/),
which is still refused it. A credential that can mail a rendered signature
unattended, to anybody in your organisation, is a different thing from an
administrator doing it once to check a layout. See
[what a key is left out of](/admin/api-keys/#what-is-left-out-and-why).

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
also lets them mail a rendered signature to any colleague in your directory, from
Sigil's sending domain. It is a reason to keep the Editor role to people you
would trust with the template library anyway.
