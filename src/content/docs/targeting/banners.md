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

Create a banner in the Banners view. It needs a campaign name, an image, a
position relative to the signature, and a window. A click-through link and alt
text are offered alongside them and neither is required.

The image follows the same rules as any [signature image](/signatures/images/):
PNG or JPG, no SVG, sized sensibly since it is attached to every message anyone
sends while the window is open. It is chosen from the images already uploaded, so
upload it under Images first if it is not there yet.

The campaign name is how the banner is listed and how its clicks are reported, so
it is worth naming for the campaign rather than for the file.

A banner with no link is a picture rather than a call to action, which is the
right shape for an announcement nobody is meant to click. Leaving alt text blank
falls back to the campaign name, so a recipient reading with images switched off
sees something rather than nothing.

You need the Admin or Marketing role, and the image must already be uploaded
under Images. The Image list is read from Images, which only the Admin and Editor
roles reach, so somebody with the Marketing role alone sees an empty list and
cannot create a banner. Give them the Editor role as well, or have an Admin
create it. Once it exists they can preview it, test it, and edit everything
about it except the image.

1. Open Banners in the portal sidebar.
2. Choose New banner.
3. Enter a Campaign name.
4. Pick the image from the Image list.
5. Enter a Click-through URL if the banner should be clickable, and Alt text
   if the campaign name is not the right description of it.
6. Under Placement, choose Below the signature or Above the signature.
7. Pick the Time zone the window should be read in.
8. Set Starts and Ends. The end has to be after the start.
9. Choose Create banner.

The banner appears in the list with its Status alongside, Scheduled until its
window opens. It goes live at the start time and signatures pick it up
immediately.

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

## Editing a banner

Any banner can be changed after it is created, whatever its status: the name,
the image, the link, the alt text, the placement and the window.

1. Open Banners in the portal sidebar.
2. Choose Edit on the banner's row.
3. Change what needs changing. Starts and Ends show the window in the time
   zone the banner was scheduled in, not in yours.
4. Choose Save changes.

Editing a banner whose Status is Live asks first, in a dialog titled Edit a live
banner, because the change reaches signatures straight away. Confirm with Save
changes. A banner that is scheduled, paused or ended saves without asking.

The portal confirms with "Banner saved", and the edit is written to the
[change log](/monitoring/change-log/) with what moved.

Moving the window of an ended banner so that it covers now puts it back on
signatures immediately, the same as creating it would.

Somebody with the Marketing role alone can edit a banner but cannot give it a
different image, for the same reason they cannot create one: the Image list is
empty for them. Leave Image alone and the banner keeps the picture it has.

This page used to say a banner could not be edited in the portal and had to be
deleted and created again. That stopped being true in October 2026.

## Checking a banner before it goes live

A scheduled banner used to be invisible until the moment it reached recipients.
There are now four ways to see one first, and none of them needs its window to
be open.

| Where | What it shows | Who can use it |
| --- | --- | --- |
| Preview on the banner's row | The banner on your own signature, in the portal | Anyone who can manage banners |
| Send test to me, in that preview | The same thing as an email in your own inbox | Anyone who can manage banners and has a mailbox in the organisation |
| The Banner choice on [Send a test](/admin/test-email/) | The banner on any colleague's signature, sent to an inbox in your directory | Anyone who can send test emails |
| Banner date in the [designer's](/signatures/designer/#seeing-the-banner-and-footer) live preview | Whichever banner runs on a date you pick, under the design you are working on | Anyone who can edit templates |

To preview a banner:

1. Open Banners in the portal sidebar.
2. Choose Preview on the banner's row.

The dialog shows your own new-message signature with the banner attached, and
names the mailbox and the template underneath. The banner appears whatever its
schedule says, so this works for one that is scheduled, paused or ended. Links
in the preview go straight to their destination and are not tracked, so clicking
one does not count against the campaign.

To see it in a real mail client, choose Send test to me in the same dialog. The
portal confirms the address it went to, which is always your own. The message is
the same one a [test email](/admin/test-email/) sends, and its grey line above
the rule names the banner it carries. The send is recorded in the
[change log](/monitoring/change-log/) as a test email, like any other.

Both are fixed to the person who is signed in. A preview never renders as a
colleague and a test never goes to one. The Marketing role reaches banners
without reaching templates or the directory, and letting it name a mailbox would
hand it a way to read colleagues' details. To see the banner on somebody else's
signature, use Send a test on the Templates view, which needs the template
capability.

If your account has no mailbox in the organisation, which is the usual case for
partner staff working in a client's portal, the preview uses sample data on the
live new-message template and says so. Send test to me is unavailable then,
because there is no signature of yours to send.

Unlike the preview, a test email behaves like the real thing: the banner's link
is tracked, so a click in a test counts towards the banner's total.

## Position

A banner sits either above or below the signature.

Below is the usual choice. It keeps the signature immediately under the message
body, where readers expect it, and treats the banner as an appendix. Above works
when the campaign is the point and the signature is context.

## Click tracking

Where a banner carries a link, its click-throughs are always tracked. Banner
links are routed through [tracked links](/monitoring/link-clicks/) automatically,
and there is no opt-out.

No IP address and no recipient identity is logged, so a banner tells you how
many clicks it drew, not who made them. Somebody who clicks twice counts twice.

Totals appear in the Link clicks view, rolled up per banner rather than per URL,
so a campaign pointing at three destinations reads as one number. Security
scanners that pre-fetch every link in a message are counted separately and kept
out of that number, which matters most for a banner because a banner is measured
on its click rate.

## Who can manage banners

Admins and the Marketing [role](/admin/users-and-roles/), and nobody else.

Marketing reaches campaign banners and link click analytics and nothing else,
which is usually the right level for a marketing team: they can run campaigns
without being able to change the signature templates or reach billing. The one
catch is that picking a banner's image reads your image library, which Marketing
cannot see, so a Marketing-only user can preview, test, edit, pause, resume
and delete banners but cannot create one or change a banner's image. See
[creating a banner](#creating-a-banner).

The Editor role does not reach banners. Editors own the template a banner is
attached to, but a campaign is a separate thing with its own schedule and its own
owner, so the two are granted separately.

## Practical notes

Keep the file small. A banner is attached to every message sent while the window
is open, so a 500KB image is a real cost at organisational volume.

A banner has no width setting. It shows at the image's own pixel size, shrinking
only where the reading pane is narrower, so export it at exactly the width it
should appear, ideally no more than 600 pixels. Design it to sit comfortably
under a signature rather than across the full width of an email client.

Set meaningful alt text. Some recipients will see only that, and the campaign
name it falls back to was written for your banner list rather than for them.

Look at it before the real window opens. See
[checking a banner before it goes live](#checking-a-banner-before-it-goes-live).
There is no longer any need to create a throwaway copy with a short window.

## Overlapping windows

A signature carries at most one banner. Two campaigns cannot stack on the same
message.

When more than one window is open, the one that started most recently wins. A new
campaign therefore takes over from a running one for as long as it lasts, and the
older banner reappears if its own window is still open when the newer one closes.

That is a deliberate behaviour rather than a tie-break to rely on. Overlapping
windows still make it harder to say what any given person received on any given
day, which matters when somebody asks later.

The Status column shows which banner is winning at the moment.

| Status | Meaning |
| --- | --- |
| Live | This is the banner signatures carry right now |
| Scheduled | Its window has not opened yet |
| Superseded | Its window is open, but a newer banner is winning |
| Ended | Its window has closed |
| Paused | Switched off by hand, whatever its window says |

## Ending a campaign

Do nothing. The window closes and the banner disappears from every signature at
once.

If you need it gone sooner, pause it or delete it. Both take effect immediately.
Pausing keeps the banner in the list and can be undone with
Resume. If the window is still open when you resume, the banner goes straight
back on. Deleting cannot be undone.

To pause a banner:

1. Open Banners in the portal sidebar.
2. Choose Pause on the banner's row.

Its Status changes to Paused. Choose Resume on the same row to put it back.

To delete a banner:

1. Open Banners in the portal sidebar.
2. Choose Delete on the banner's row.
3. Confirm with Delete in the Delete banner dialog.

The dialog says that signatures stop carrying it immediately.
