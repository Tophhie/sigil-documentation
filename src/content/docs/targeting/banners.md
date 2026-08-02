---
title: Campaign banners
description: Inject a time-boxed image above or below every signature, scheduled in the time zone of your choice.
sidebar:
  order: 2
---

A banner is an image injected above or below every rendered signature while its
window is open. It needs no template edit, and it removes itself when the window
closes.

This is the marketing surface. An event, a campaign, a seasonal message: set the
window and forget about it.

## Creating a banner

Create a banner in the Banners view. It needs an image, a destination link, a
position relative to the signature, and a window.

The image follows the same rules as any [signature image](/signatures/images/):
PNG or JPG, no SVG, sized sensibly since it is attached to every message anyone
sends while the window is open.

## Scheduling

A banner's start and end are authored as a wall-clock time in an IANA time zone
that you choose.

That matters more than it sounds. A campaign can be scheduled for a region other
than the one the administrator sits in, and daylight saving is handled correctly:
a banner set to end at 23:59 on a date does so at 23:59 local to the chosen zone,
whichever side of a clock change that falls on.

The portal shows the window back to you in the zone you chose, rather than
converting it to yours.

Opening or closing a window takes effect immediately. The active banner is part
of the rendered-signature cache key, so there is nothing to wait for and nothing
to purge.

## Position

A banner sits either above or below the signature.

Below is the usual choice. It keeps the signature immediately under the message
body, where readers expect it, and treats the banner as an appendix. Above works
when the campaign is the point and the signature is context.

## Click tracking

Banner click-throughs are always tracked. Banner links are routed through
[tracked links](/monitoring/link-clicks/) automatically, and there is no opt-out.

Tracking records counts only. No IP address and no recipient identity is logged,
so a banner tells you how many people clicked, not who.

Click totals appear in the Link clicks view.

## Who can manage banners

Admins and the Marketing [role](/admin/users-and-roles/), and nobody else.

Marketing reaches campaign banners and link click analytics and nothing else,
which is usually the right level for a marketing team: they can run campaigns
without being able to change the signature templates or reach billing.

The Editor role does not reach banners. Editors own the template a banner is
attached to, but a campaign is a separate thing with its own schedule and its own
owner, so the two are granted separately.

## Practical notes

Keep the file small. A banner is attached to every message sent while the window
is open, so a 500KB image is a real cost at organisational volume.

Set an explicit pixel width on the image, and design it to sit comfortably at the
width of a signature rather than at the full width of an email client.

Set meaningful alt text. Some recipients will see only that.

Test it before the window opens by setting a short window now, sending a
[test email](/admin/test-email/), and then setting the real window.

## Overlapping windows

A signature carries at most one banner. Two campaigns cannot stack on the same
message.

When more than one window is open, the one that started most recently wins. A new
campaign therefore takes over from a running one for as long as it lasts, and the
older banner reappears if its own window is still open when the newer one closes.

That is a deliberate behaviour rather than a tie-break to rely on. Overlapping
windows still make it harder to say what any given person received on any given
day, which matters when somebody asks later.

## Ending a campaign

Do nothing. The window closes and the banner disappears from every signature at
once.

If you need it gone sooner, edit the end of the window to a time in the past, or
delete the banner. Both take effect immediately.
