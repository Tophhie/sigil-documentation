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
template is editing the same draft rather than creating a competing one.

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

## The diff

Before you publish, the editor shows a line diff between the draft and the live
version.

Read it. It is the cheapest check available and it catches the class of mistake
that is otherwise invisible: the stray character, the tag you closed in the wrong
place, the paste that brought more than you meant.

The diff is specific to the HTML editor. A designer template has no lines to
compare, so its review step is the canvas and the preview instead.

## Publishing

Publishing does four things. It promotes the draft to the live body. It files the
outgoing body in the template's [version history](/signatures/versions/). It
increments the template's version. And it clears the draft.

Incrementing the version strands every cached signature for that template at
once, so the next request renders fresh. Changes reach users within seconds. No
redeploy, no push, nothing to purge, and nobody has to restart Outlook.

Publishing is recorded in the [change log](/monitoring/change-log/) with who did
it and when.

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
| Directory attribute change affecting which rule matches | Up to 10 minutes |
| Add-in manifest change | Requires redeploy and re-consent |

Assignment rules look like an exception and are not quite one. Evaluating a rule
needs directory data, so the decision reached for each mailbox is cached, but the
cache key carries a version that changes whenever you save the rule list. Saving
strands every cached decision at once, so the edit reaches each person the next
time they compose. The ten minute lifetime on those entries is for the change
Sigil never sees, which is somebody moving department or joining a group in
Entra.

## If you publish something wrong

Restore the previous version. Sigil keeps the last ten published bodies of every
template, and restoring publishes the old body as a new version, so the version
you rolled back from stays recoverable too.

See [versions and rollback](/signatures/versions/).

A [staged rollout](/signatures/staged-rollouts/) avoids needing this in the first
place for the changes where it would hurt most, because the version everyone is
on never changes until the new one has been shown to apply.
