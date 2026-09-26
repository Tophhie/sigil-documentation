---
title: Drafts and publishing
description: Edit a template without affecting anyone, review a line diff, then publish and have it reach users in seconds.
sidebar:
  order: 9
---

Editing a template does not change what anybody receives. Each template can hold
one unpublished working copy, and users keep getting the live version until you
explicitly publish.

## Drafts

Saving in the editor saves a draft. The live body, its version and every cached
signature are untouched.

You can leave a draft sitting for as long as you like, come back to it, and
preview it. There is one draft per template, so a second person editing the same
template is editing the same draft rather than creating a competing one. If
they both save, the second save is refused rather than overwriting the first.
See [when a colleague saved first](#when-a-colleague-saved-first).

Discarding a draft throws away the working copy and leaves the live version
exactly as it was.

Both editors work this way. Drafts, review, scheduling and staged publishing are
the same in the [designer](/signatures/designer/) as in the
[HTML editor](/signatures/html-editor/), because a designer template only ever
opens in the designer, so anything only the HTML editor could do would be out of
reach for it.

The Templates view shows a Draft badge against anything holding one, so you know
before opening a template that you are about to see something users have not
received.

### Saving a draft

You need the templates capability, which Admins and Editors hold.

1. Open Templates in the portal sidebar.
2. Choose Edit or Design on the template's row, or click its name.
3. Make your changes.
4. Choose Save draft.

A message confirms the draft is saved and that users keep the live version
until you publish. If the rendered signature is over Outlook's size limit, the
draft is still saved and the message says it cannot be published as it is.

### Discarding a draft

1. Open the template in its editor from Templates.
2. Choose Discard draft. Before a draft has been saved the button reads Discard
   and only throws away unsaved edits.
3. Confirm when asked. The button reads Discard in the HTML editor and Discard
   draft in the designer.

The editor returns to the live version.

### When a colleague saved first

Two people can have the same template open at once. Each save, publish,
submission and approval carries the version and the draft the editor loaded,
and Sigil refuses the write if either has changed since, rather than letting
the later click silently overwrite the earlier one.

| Message | What happened |
| --- | --- |
| Someone else saved a draft of this template after you opened it. Reload to see their version. | A colleague saved the draft after you opened the editor |
| This template was published by someone else after you opened it. Reload to see the live version. | A new version went live after you opened the editor |
| This draft changed after you opened it. Reload before publishing. | You were approving or publishing a draft that has since been edited |
| A rollout is already running for this template. Wait for it to finish or cancel it first. | A colleague started a [staged rollout](/signatures/staged-rollouts/) you had not seen |
| A publish is already booked for this template. Cancel it or replace it. | A colleague booked a [scheduled publish](/signatures/scheduled-publishing/) you had not seen |

Nothing you typed is lost when this happens. The editor keeps your text or your
canvas and quietly re-reads the template, so its draft banner, rollout panel and
schedule banner now show what your colleague did. What to do next:

1. Read the banners to see what changed and who changed it.
2. If your version should win, choose the same button again. The editor now
   knows about the other change, so the second attempt goes through, and it is
   a deliberate overwrite rather than an accidental one. A booked publish is
   replaced the same way. A running rollout is the exception: Staged publish
   stays unavailable until it is promoted or rolled back.
3. If theirs should win, reload the page and pick up from their version. Your
   unsaved edits are discarded when you do.

Scripts calling the API with a key are not fenced unless they ask to be. See
[template endpoints](/reference/api/#avoiding-overwriting-a-colleagues-change).

## The diff

Before you publish, the editor shows a line diff between the draft and the live
version.

Read it. It is the cheapest check available and it catches the class of mistake
that is otherwise invisible: the stray character, the tag you closed in the wrong
place, the paste that brought more than you meant.

The diff is specific to the HTML editor. A designer template has no lines to
compare, so its review step is the canvas and the preview instead.

To read it:

1. Open the template in the HTML editor from Templates.
2. Choose Diff in the toolbar.
3. Read the Changes vs the live version card. Added lines carry a plus, removed
   lines a minus, and the header counts both.
4. Choose Diff again to hide it.

If the editor already matches the live version, a message says there are no
changes instead.

## Publishing

Publishing does four things. It promotes the draft to the live body. It files the
outgoing body in the template's [version history](/signatures/versions/). It
increments the template's version. And it clears the draft.

Incrementing the version strands every cached signature for that template at
once, so the next request renders fresh. Changes reach users within seconds. No
redeploy, no push, nothing to purge, and nobody has to restart Outlook.

One detail is worth knowing before somebody reports it as a fault. The add-in
puts the copy it kept from that mailbox's last message in first, so the message
composed immediately after a publish can show the outgoing signature and then
replace it with the new one about a second later, in the editor, while the person
is looking at it. What is sent is the new version, because the check against
Sigil finishes before the message can leave. See
[why it sometimes changes as you watch](/users/how-your-signature-works/#why-it-sometimes-changes-as-you-watch).

Publishing is recorded in the [change log](/monitoring/change-log/) with who did
it and when.

You need the templates capability, and where
[publish approval](/signatures/approvals/) is on you need to be an Admin.

1. Open the template in its editor from Templates.
2. Choose Publish.
3. In the HTML editor, choose Publish in the confirmation. The designer
   publishes as soon as you choose the button.

A message confirms it is published and that new messages pick it up within
seconds.

## What blocks a publish

A publish is rejected if the rendered signature would exceed 30,000 characters.
That is an Outlook limit rather than a Sigil one, and it is checked here because
the alternative is discovering it as a broken signature in the field. See
[Outlook constraints](/signatures/outlook-constraints/).

A [designer](/signatures/designer/) template is also validated on publish. If a
block is misconfigured, the error names the block and the problem.

Where [publish approval](/signatures/approvals/) is switched on, a publish by
anybody but an admin is refused with a message saying so. Editors save a draft
and submit it for review instead.

## Publishing to nobody at all

Delivery can be switched off for the whole organisation, which stops what
mailboxes receive and leaves everything on this page working. You can keep
editing, previewing, testing and publishing while it is paused, and nothing you
publish reaches anybody until you resume.

That is the state to be in while you are still setting Sigil up, or while an old
signature product is still stamping mail. See
[pausing delivery](/signatures/pausing-delivery/).

## Publishing later

Next to Publish is Schedule, which books the change for an instant you choose
rather than applying it now.

The body is captured when you book it, so later edits to the draft do not change
what goes live. See [scheduled publishing](/signatures/scheduled-publishing/).

## Publishing to part of the organisation first

Next to Publish is Staged publish, which sends the new body to 10% of mailboxes
and leaves everyone else on the current version. It steps up to 25%, 50% and then
everyone as the add-in reports that the new version is applying, and rolls itself
back if it starts failing more often than the version it would replace.

The live template does not change until the rollout promotes, so abandoning one
is instant and republishes nothing.

Use it for a change large enough that discovering a problem at 100% would be
expensive. A rebrand qualifies. A corrected phone number does not. See
[staged rollouts](/signatures/staged-rollouts/).

## What else lands in seconds

Banners and footers are part of the same cache key as the template, so both take
effect immediately:

| Change | Time to reach users |
| --- | --- |
| Template publish | Seconds |
| Staged publish | Seconds, for the mailboxes in the slice only |
| Scheduled publish | Within 15 minutes after the instant you booked, never before |
| Image upload or replacement | Seconds |
| Banner window opening or closing | Immediately |
| Footer edit | Seconds |
| Assignment rules change | Next compose |
| Directory attribute change affecting which rule matches | Up to an hour, then one further compose |
| Add-in manifest change | Requires redeploy and re-consent |

Assignment rules look like an exception and are not quite one. Evaluating a rule
needs directory data, so the decision reached for each mailbox is cached, but the
cache key carries a version that changes whenever you save the rule list. Saving
strands every cached decision at once, so the edit reaches each person the next
time they compose.

The hour-long freshness window on those entries is for the change Sigil never
sees, which is somebody moving department or joining a group in Entra. Sigil
checks for that in the background rather than while a message is being written:
the first compose after the window still uses the previous decision and triggers
the re-check, and the one after that follows the directory. In practice a person
who moved department this morning sends at most one more email under their old
team's signature. That is the trade that keeps composing fast, since re-reading
the directory mid-compose is the slowest thing the serving path can do.

## If you publish something wrong

Restore the previous version. Sigil keeps the last ten published bodies of every
template, and restoring publishes the old body as a new version, so the version
you rolled back from stays recoverable too.

See [versions and rollback](/signatures/versions/).

A [staged rollout](/signatures/staged-rollouts/) avoids needing this in the
first place for the changes where it would hurt most, because the version
everyone is on never changes until the new one has been shown to apply.
