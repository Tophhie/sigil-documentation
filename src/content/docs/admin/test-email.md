---
title: Test emails
description: Send a rendered signature to a verified inbox to see it in a real mail client.
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

## Recipients must be verified

The recipient has to be a verified destination address.

This is a platform rule of the mail service Sigil sends through, and it is also
the guardrail that stops the endpoint being usable to mail anybody other than the
administrators themselves.

If a test email does not arrive, an unverified recipient is the most likely
reason.

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

Admins and Editors. The Marketing role does not reach test emails.
