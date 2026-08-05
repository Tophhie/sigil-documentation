---
title: Attribute coverage
description: See which directory attributes are actually populated across your organisation before you design a signature around one.
sidebar:
  order: 2
---

Attribute coverage audits your directory. For each attribute a signature can use,
it shows how much of your organisation actually has a value.

Run it before you design, not after. A signature built around `department` looks
fine in preview and falls apart in production if a third of the directory has
none.

## What it covers

Every attribute that maps to a [placeholder](/signatures/placeholders/): the
identity fields, the phone numbers, job title and department, the address
components, the manager fields, and all fifteen extension attributes.

Two kinds of placeholder are left out, because neither has a populated or missing
state to score. The derived helpers `anyPhone`, `anyAddress` and `hasPhoto` are
computed rather than stored, and `contactCardUrl` is
[supplied by Sigil](/signatures/contact-card/) rather than read from the
directory. Auditing either would report a gap in something that was never a
directory attribute.

The manager fields cover all four placeholders, not just the manager's name. A
manager's job title, email address and phone number are each scored separately,
so a template that prints a manager's contact details can be checked properly
before it is published.

Manager details are a navigation property in Microsoft Graph rather than a plain
attribute, so the audit asks for them explicitly. That makes it slower on a large
directory than the seat count or the adoption report, neither of which reads
manager at all.

The extension attributes are the ones most worth checking. They have no enforced
meaning, so whether they are populated at all is entirely up to how your
organisation uses them.

## How to use it

Three situations call for it.

Before designing a template, to find out which attributes you can rely on.

Before writing an [assignment rule](/targeting/assignment-rules/) that matches on
an attribute, because a rule matching on `officeLocation` only reaches the people
who have one.

When a signature is missing a field for some people, to find out whether it is
one person or a systemic gap.

## What to do about a gap

Two options, and they are not exclusive.

Populate the directory. This is the better fix where the data should exist
anyway. It improves the address book at the same time, and it is often less work
than it looks, since much of it is bulk-editable.

Design around it. Wrap the affected part of the template in a
[conditional section](/signatures/placeholders/#conditional-sections) so it
disappears cleanly for people without the value, rather than leaving a stray
separator or an empty label.

The derived helpers `anyPhone` and `anyAddress` are built for this. Attaching a
whole contact row to `{{#anyPhone}}` lets the entire row disappear rather than
each field inside it.

## Extension attributes and on-premises sync

Extension attributes are writable for cloud-only users but read-only for users
synced from on-premises Active Directory. If your users are synced, populating
them means changing AD and letting the change flow through, rather than editing
in Entra.

## Who is counted

Everyone with a mailbox in your organisation, shared and resource mailboxes
included.

Two groups are left out.

Accounts invited in from outside. They have no mailbox here, never compose
through the add-in, and their attributes are set by their own organisation, so
counting them would inflate every missing figure on the report. That covers
guests and B2B invitees who were later converted to member accounts, because how
an account was created is what Sigil tests rather than what type it is now.

Mailboxes you have [excluded from Sigil](/admin/cost-management/). They will
never be sent a signature, so an empty job title on a warehouse account is not a
data quality problem to fix. Counting them would make the coverage score worse
the more diligently you used cost management.

The report gives each of those counts rather than dropping the accounts silently,
and gives them separately rather than as one total, because an account can be
both. If the number of mailboxes looks lower than you expected, those two figures
are the first thing to read.

## Why the count differs from your seat count

Attribute coverage counts shared mailboxes, because a shared mailbox still needs
a signature.

[Billing](/admin/billing/) does not, because shared and resource mailboxes are
unlicensed and therefore free.

The two numbers answer different questions and are expected to differ.

## Having the gaps come to you

The [health digest](/monitoring/health-digest/) reports the same gaps by email,
narrowed to the attributes your live templates actually reference and to those
missing on at least 10% of mailboxes.

That is the shorter question, answered without anybody opening the portal. This
page is where you go once it has told you there is something to look at, because
it covers every attribute rather than only the ones in use.

## Who can run it

Admins, Editors, Viewers and the Compliance role, which all hold monitoring. The
Marketing and Billing roles do not reach it. See
[users and roles](/admin/users-and-roles/).
