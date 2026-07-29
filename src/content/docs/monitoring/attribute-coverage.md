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

## Why the count differs from your seat count

Attribute coverage counts shared mailboxes, because a shared mailbox still needs
a signature.

[Billing](/admin/billing/) does not, because shared and resource mailboxes are
unlicensed and therefore free.

The two numbers answer different questions and are expected to differ.

## Who can run it

Admins and Editors. The Marketing role does not reach it. See
[users and roles](/admin/users-and-roles/).
