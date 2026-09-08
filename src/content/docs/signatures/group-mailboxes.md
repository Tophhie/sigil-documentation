---
title: Sending as a Microsoft 365 Group
description: What happens when someone sends from a group's address, what the signature contains, and the one way of sending that Outlook keeps add-ins out of.
sidebar:
  order: 5.5
---

A Microsoft 365 Group, a distribution list or a mail-enabled security group has
an email address of its own, and a member who has been granted *Send As* or
*Send on behalf* on it can put that address in the From field. Sigil treats the
group's address as a mailbox like any other: switching the From field to it
fetches the group's signature, and the person who pressed Send can be named in
it exactly as for a [shared mailbox](/signatures/sending-on-behalf/).

Nothing has to be set up in Sigil for this. The group needs no licence, no
sign-in and no entry anywhere; the permission to send as it is granted in
Microsoft 365, not here.

## How to send as a group

The person switches the From field in Outlook, in a message started from their
own mailbox. That is the whole gesture, and it is the one Sigil sees. A new
message, a reply or a forward all work.

For the group's address to appear in that dropdown, an administrator grants the
permission in the Microsoft 365 admin center or Exchange admin center, under the
group's settings. Microsoft's guide is
[Allow members to send email as a group](https://learn.microsoft.com/microsoft-365/solutions/allow-members-to-send-as-or-send-on-behalf-of-group).
*Send As* makes the message appear to come from the group alone; *Send on behalf*
shows the recipient both names. Sigil signs both the same way.

## The way that is not signed

Outlook on the web and the new Outlook also let a member open the group itself,
under **Groups** in the folder pane, and write a message from inside it. That
message is composed in the group's own mailbox rather than the person's, and
Outlook does not run add-ins there at all. It is a rule of the platform for
every add-in, not a limit of Sigil's, and there is nothing to configure around
it.

So a message written from inside the group's space goes out with no signature,
while the same message written in the person's own mailbox with the From field
switched to the group is signed. If people in your organisation write from the
group's space, the practical answer is to tell them to switch From instead. The
result is the same message from the same address, and this one carries the
signature.

## What the signature contains

A group has a name and addresses, and not much else. It has no job title,
department, phone numbers, postal address or manager, and no photo Sigil can
reach. So when the group's signature renders:

- `{{displayName}}` is the group's name and `{{email}}` is the address the
  message is sent from, the group's own or one of its aliases;
- every other mailbox placeholder is empty, and a
  [conditional section](/signatures/placeholders/#conditional-sections) around
  one closes, exactly as it does for a shared mailbox with no phone;
- the [sender placeholders](/signatures/sending-on-behalf/) work unchanged. The
  person sending is never the group, so `{{#onBehalfOf}}` opens and
  `{{sender.firstName}}` names them. "Kind regards, Jane Doe on behalf of Sales"
  is what an ordinary template renders from a group, with nothing added.

Your existing template is therefore already right for a group in most cases. The
one thing to look at is any line that assumes a person: a "Chat with me in
Teams" link, say, which leads nowhere useful from a group's address. Two ways to
handle it. Put the line behind the `notGroup` condition, so it disappears for a
group and stays for everyone else; in the designer that is "not sent from a
group mailbox" in a block's "show when" list. Or give groups their own template,
below. Its twin, `isGroup`, is for a line only a team mailbox should carry. They
are a pair because a condition cannot be negated.

## Giving groups their own template

[Assignment rules](/targeting/assignment-rules/) can match on **mailbox kind**,
which is `user` for a person, a shared mailbox or a resource mailbox, and `group`
for a group's mailbox. One rule with the value `group` sends every group in the
organisation to a template of your choosing, and covers groups created next
month without anybody touching Sigil. An email-address rule works too, for one
group at a time.

Rules that match on an Entra group's membership do not apply to a group's own
mailbox, because a group is not a member of anything a rule can name. Every other
attribute is empty for a group and so matches nothing, which means a group that
no rule names gets your default template.

## Where groups appear in the portal

Every box in the portal that takes an email address accepts a group's, and the
suggestions list offers groups alongside people, marked "Group mailbox". You can
preview a group's signature, simulate the rules for it, send a
[test email](/admin/test-email/) as it and download its signature, all as for
any other mailbox.

The preview's second address box, "sent by", shows what a colleague's message
from the group will say, including whether the on-behalf-of clause opens. See
[previewing a shared mailbox send](/signatures/templates/#previewing-a-shared-mailbox-send).

## Cost

Group mailboxes are free, alongside shared and resource mailboxes. A group holds
no licence, so it is never a seat, and the colleague sending from it is already
counted in their own right. See [billing](/admin/billing/).

In [cost management](/admin/cost-management/) a group can be listed like any
mailbox. In exclusion mode that saves nothing and only stops its signature, and
the row says so; in inclusion mode a group nobody lists gets no signature, so the
row says it is included for free.

## If a group is not getting its signature

Check, in this order:

1. **Was the message written in the person's own mailbox with the From field
   switched?** A message written from inside the group's space is never signed,
   as above.
2. **Is the group mail-enabled and visible?** A group hidden from address lists
   cannot be sent as from Outlook for Windows at all; that is a Microsoft
   restriction on the *Send As* permission, and the message never reaches Sigil.
3. **Does the person's own signature apply?** If not, the problem is not the
   group. Start with [troubleshooting](/deploy/troubleshooting/).
4. **Has a group just been created or given a new alias?** Sigil remembers what
   the directory said for a quarter of an hour, so a brand-new group may take
   that long to be found on its first send.
