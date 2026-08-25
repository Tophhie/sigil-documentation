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

Ten attributes can be matched on: department, job title, company, employee type,
office location, city, county or state, country, email address and email domain.
A rule matches when the person's value for that attribute is one of the values
you list, so a single rule can cover several departments. Values are matched
without regard to case.

This is a shorter list than the [placeholders](/signatures/placeholders/) a
template can print. In particular the extension attributes are not on it, so a
rule cannot target the slot your organisation uses for something of its own. An
Entra group is the way to express that.

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

The group is named by its object id rather than picked from a list. Copy the
object id from the group's own page in the Microsoft Entra admin centre and paste
it into the rule. There is no search-by-name on this form, which is the one place
rules and [cost management](/admin/cost-management/#excluding-an-entra-group)
differ on the same idea: the exclusion picker searches your directory by name,
the rule form does not.

The id is not checked against your directory when you save. A rule carrying an id
that does not exist, or one from a different tenant, is stored happily and simply
never matches anybody. Nothing warns you, so paste rather than retype, and use
the simulator below to confirm the rule fires for somebody you know is in the
group.

Groups are often the more maintainable option. Membership is managed where your
organisation already manages access, rather than depending on an attribute being
filled in consistently, and adding somebody to a group is a familiar action for
most IT teams.

Group rules require the `GroupMember.Read.All` permission, which is granted at
admin consent along with everything else. The same permission is what lets
[cost management](/admin/cost-management/) exclude a group's members, so an
organisation that can write group rules can already do that too. See
[permissions](/deploy/permissions/).

## Order matters

Rules are evaluated in order and the first match wins.

The two roles are resolved independently, which is worth knowing before you leave
one of them blank. A rule that matches somebody but names only a new-message
template settles their new messages and lets the search carry on down the list
for their reply template. So a broad rule setting only a reply signature can sit
below several narrow ones and still apply to all of them.

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

## Testing a rule against one mailbox

Test a user, at the top of the rules page, dry-runs the rules against one of your
mailboxes and reports what that person gets. Enter their address and run the
simulation.

The panel names the template for new messages and the template for replies, and
says what decided each one: the rule that matched, with its position in the list,
or the organisation default where nothing matched. It also shows the mailbox's
own value for every attribute your rules test, and how many Entra groups the
mailbox is in.

Every rule in the list below then carries its own verdict from that walk.

| Verdict | What it means |
| --- | --- |
| Applied to new messages, to replies, or to both | The rule matched and settled that role |
| Matched, but a rule above decided first | The rule matched, and changed nothing, because every role it names was already settled higher up |
| No match, followed by the mailbox's value | An attribute rule that was tested and missed, quoting the value it was tested against |
| Not a member | A group rule the mailbox is not in |

The second of those is the reason the feature exists. A rule that matches but
decides nothing looks entirely healthy in the list, and the only way to spot it
otherwise is to read every rule above it against a mental picture of that
person's directory record.

## What the simulation does and does not do

It runs against the saved rules. If you have unsaved edits, the simulation is
blocked until you save them. The rules the server holds are the ones your users
are being served, and a result taken against a list that exists only on your
screen would describe nobody. Editing the list also clears a result already on
screen, for the same reason.

It reads the directory and group membership fresh, rather than from the ten
minute resolution cache, so it answers for the rules as they stand now rather
than for what that mailbox was last served. Nothing is written back to the cache,
nothing is sent, and no signature changes. It is not recorded in the
[change log](/monitoring/change-log/) either, because nothing changed.

Give it an alias and it evaluates the rules on that alias, exactly as a real send
from that address would, while reading group membership from the mailbox behind
it. The panel says which address it routed on when the two differ.

If group membership cannot be read, usually because the `GroupMember.Read.All`
permission has not been granted, the simulation says so and carries on. Every
group rule counts as no match, which is what would happen on a real send too, and
the attribute rules still answer.

Where a rule points at a template that no longer exists, the simulation reports
that the organisation default was served in its place. That should be rare, since
deleting a template a rule uses is blocked, but it is reported rather than
silently resolved.

## Who can change them

Admins only. No other [role](/admin/users-and-roles/) reaches assignment rules,
including Editor.

Rules are the only part of Sigil held that tightly. An Editor changing a template
changes what one group of people send; a rule changing which template a group
resolves to reaches the whole organisation at once, and the two are not the same
risk.

The same capability covers the org-wide `new` and `reply` role assignments, for
the same reason. It also covers the simulator, which reads one person's
directory attributes back to you.

## How many rules

A list holds up to 100 rules. Saving a longer one is refused.

That is well beyond what most organisations need. A list approaching it usually
means several rules are saying the same thing in different words, or that an
Entra group would express in one rule what a dozen attribute rules are
expressing between them.

## The fallback

Anyone no rule matches gets the template assigned to the `new` and `reply`
[roles](/signatures/templates/#roles-which-template-is-served). That is the
organisation-wide default and it always applies, so there is no way for somebody
to end up with no signature because no rule covered them.

## How quickly changes take effect

Rules changes land on the next message anybody composes.

Evaluating a rule needs directory data, which would put a lookup on the path of
every compose, so the decision each rule list reaches for a given mailbox is
cached. What makes an edit land is the shape of that cache rather than its
lifetime: the stored decision is filed under a version number that changes every
time you save the rule list, so saving strands every cached decision in the
organisation at once and the next compose works the routing out again.

The ten minute lifetime on those entries covers the change the version number
cannot see. Nothing happens in Sigil when somebody moves department or joins a
group, so a cached decision has to age out on its own before the new attribute
can route them somewhere else. That is the delay to expect after a change made
in Entra, not after a change made here.

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

Simulating a mailbox answers the routing question: which rule fires, and so which
template that person resolves to. It is the quicker of the two checks and the
only one that explains itself.

To see the finished signature rather than the decision behind it, use the
download action on the Templates view to render the live signature for a specific
mailbox. That runs the whole path, placeholders and images included, so it shows
what the add-in will actually produce.

The two agree as soon as you save a rule list, because saving strands the cached
decisions the download reads from. They can disagree for up to ten minutes after
a change made in Entra: the simulation reads the directory live, while a download
answers from a decision that was cached before the person moved. The simulation
is the one that is right in that window.
