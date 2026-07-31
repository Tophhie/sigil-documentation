---
title: Assignment rules
description: Give different people different signatures, based on a directory attribute or Entra group membership.
sidebar:
  order: 1
---

Assignment rules decide which template a person gets. They are an ordered list,
evaluated top to bottom, and the first match wins. Anyone that no rule matches
gets the organisation-wide role assignments.

## What a rule contains

Each rule has a condition and an outcome.

The condition is either a directory attribute equalling one of a set of values,
or membership of an Entra group.

The outcome is a template per role: one for new messages and one for replies and
forwards.

## Matching on a directory attribute

Common attributes to match on are department, office location and email domain.
A rule matches when the person's value for that attribute is one of the values
you list, so a single rule can cover several departments.

Email domain matching uses the address the message is being sent from rather than
the mailbox's primary address. That is what lets one person carry a different
brand's signature when sending from that brand's alias. See
[how it works](/start/how-it-works/#the-sending-address-not-the-mailbox).

Attribute matching depends on the directory being populated. Run
[attribute coverage](/monitoring/attribute-coverage/) before building rules around
an attribute; a rule matching on `department` is only as good as the proportion of
your directory that has one.

## Matching on an Entra group

A group rule matches when the person is a member of the named Entra group.

Groups are often the more maintainable option. Membership is managed where your
organisation already manages access, rather than depending on an attribute being
filled in consistently, and adding somebody to a group is a familiar action for
most IT teams.

Group rules require the `GroupMember.Read.All` permission, which is granted at
admin consent along with everything else. See
[permissions](/deploy/permissions/).

## Order matters

Rules are evaluated in order and the first match wins.

Put narrow rules above broad ones. A rule matching everyone in the United Kingdom
placed above a rule matching the Manchester office means the Manchester rule never
fires.

When a signature is wrong for a group of people, the ordering is the first thing
to check.

## Changing the order

Drag a rule by the handle at the left of its row. The order on screen is the
evaluation order, so what you see is what the server will check.

The handle is also a button. Focus it and use the arrow keys to move the rule up
or down without a pointer, or use Move up and Move down in the row's own menu.
Both do exactly what dragging does.

## Editing and saving

The rules list is a working copy. Adding, editing, reordering and removing all
happen locally, and the whole list is saved in one action.

An unsaved changes marker appears as soon as you touch anything, and nothing
reaches users until you save. That means you can reorganise the whole list, or
back out of a change you did not mean to make, without anybody receiving a
half-finished arrangement.

Select a rule to edit it in place. Its condition and its template assignments are
both editable, so correcting a rule does not mean deleting it and building a
replacement.

## Who can change them

Admins only. No other [role](/admin/users-and-roles/) reaches assignment rules,
including Editor.

Rules are the only part of Sigil held that tightly. An Editor changing a template
changes what one group of people send; a rule changing which template a group
resolves to reaches the whole organisation at once, and the two are not the same
risk.

The same capability covers the org-wide `new` and `reply` role assignments, for
the same reason.

## The fallback

Anyone no rule matches gets the template assigned to the `new` and `reply`
[roles](/signatures/templates/#roles-which-template-is-served). That is the
organisation-wide default and it always applies, so there is no way for somebody
to end up with no signature because no rule covered them.

## How quickly changes take effect

Rules changes reach everyone within ten minutes.

That is slower than a template edit, which lands in seconds, and the reason is
that evaluating a rule requires directory data. The per-mailbox result is cached
for ten minutes, keyed by a version that changes whenever you edit the rules, so
an edit invalidates the cache and the resolution is recomputed.

An edit to a template that a rule points at still lands in seconds. It is only
the routing decision that is cached.

## Deleting a template a rule uses

Deletion is blocked while a template is referenced by a rule. Change the rule
first, then delete.

## Worked examples

A subsidiary with its own brand: match on `emailDomain` equalling the
subsidiary's domain, and point both roles at that brand's templates.

A sales team with a booking link: put the sales people in an Entra group and
match on it, pointing at a template that includes the link.

Regional address blocks: match on `officeLocation` with one rule per region, each
naming a template carrying that office's address. Where the only difference is the
address, an alternative is one template using the address placeholders directly,
which needs no rules at all.

Shorter internal signatures: this is not something rules can express, because a
rule condition describes the sender rather than the recipients.

## Checking a rule works

Use the download action on the Templates view to render the live signature for a
specific mailbox. That resolves the rules exactly as a real request would, so it
tells you what that person actually gets rather than what you expect them to get.

Remember the ten minute window: immediately after a rules change, a download may
still reflect the previous resolution.
