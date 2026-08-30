---
title: Publish approval
description: An optional review step that stops anyone but an admin putting a signature live, without stopping them working on one.
sidebar:
  order: 10
---

By default, anybody holding the templates capability can publish. That suits most
organisations and it is how Sigil has always worked.

Publish approval is a switch that changes it. With approval on, editors still do
all the same work, but putting a body in front of users needs an admin.

It is off by default, and turning it on is a deliberate act. Switching it on in
an organisation that has drafts in flight would strand that work behind a review
nobody asked for, so Sigil will not do it for you.

## Turning it on

The switch lives in [settings](/admin/settings/) and applies to the whole
organisation. It needs the settings capability, which only an Admin holds. See
[roles and capabilities](/reference/roles-and-capabilities/).

## What changes when it is on

| Action | Without approval | With approval |
| --- | --- | --- |
| Edit and save a draft | Anyone with templates | Anyone with templates |
| Preview, download, test email | Anyone with templates | Anyone with templates |
| Submit a draft for review | Available | Available |
| Publish | Anyone with templates | Admin only |
| Publish from a draft | Anyone with templates | Admin only |
| Restore an earlier version | Anyone with templates | Admin only |
| Start or promote a staged rollout | Anyone with templates | Admin only |
| Schedule a publish for later | Anyone with templates | Admin only |
| Abandon a running rollout | Anyone with templates | Anyone with templates |

Every route that changes what users receive is gated, rather than the publish
button alone. A gate that covered publishing by itself would be decorative,
because restoring a version reaches users just as directly.

Abandoning a staged rollout is the deliberate exception and is never gated.
Whoever notices a problem has to be able to stop it, and stopping a rollout puts
users back on the body that was already approved.

## The review cycle

An editor saves a draft and submits it for review. The template then appears in
the approvals queue with who submitted it and when.

An admin opens it, reads the [line diff](/signatures/publishing/#the-diff)
against the live body, and either publishes it or sends it back. A
[designer](/signatures/designer/) template has no diff, so there the review is
the canvas and the preview.

Both editors carry the whole cycle. Approval would otherwise be a trap rather
than a control for designer templates: they only ever open in the designer, so an
editor refused a publish with no draft to submit would have had nowhere to go.

Approving is publishing. There is no third state where a draft has been approved
but is not yet live, because such a body would be a fourth kind of content
alongside the live one, the draft and a canary, with no answer for what should
happen when the live body changes underneath it.

Sending it back needs a reason. A rejection with no note is a dead end for
whoever has to act on it, so Sigil requires one and keeps up to 1,000 characters
of it.

The body is left exactly as it was when it is sent back. A rejection is a request
for changes rather than an undo, so the editor reopens the same work with the note
attached to it.

## Editing resets the review

Saving a draft clears its review state. A submitted draft drops out of the queue,
and a rejection note stops being displayed.

This is deliberate. A body that has changed is not the body a reviewer was
looking at, and a note that describes text somebody has since rewritten is worse
than no note. The [change log](/monitoring/change-log/) keeps both permanently,
so nothing is lost.

Resubmitting a rejected draft clears the note for the same reason: a
resubmission answers whatever the last reviewer objected to.

## Submitting without approval turned on

Submitting a draft for review works whether or not the switch is on.

An organisation may want a second pair of eyes on one significant change without
imposing a review step on every typo fix. The queue is there either way.

## Approving your own work

An admin can publish a draft they submitted themselves.

A strict four-eyes rule would lock an organisation with a single admin out of its
own signatures, which is a worse failure than the one it prevents. Sigil permits
self-approval and records it instead: the change log entry names who submitted,
who approved, and whether those were the same person.

That makes the control auditable, which is what an auditor is actually asking
for. If your own policy requires two people, the log is where you evidence it.

## What an editor sees when they are refused

A publish attempt that approval blocks returns a message saying the organisation
requires publishing to be approved, and telling them to save the change as a
draft and submit it.

The portal hides the buttons an editor cannot use, but the server checks
independently, so the refusal is the control rather than the hidden button.

## What is recorded

Submitting, rejecting and approving each write a [change log](/monitoring/change-log/)
entry under the Approval action, with the transition and the rejection note.

A publish that came from a submitted draft records the submitter, the approver
and whether the two were the same person.

## Partner-managed organisations

A partner Owner or Admin working inside a managed client can change the client's
approval switch. A partner Technician cannot.

Turning off a client's publish approval is exactly the kind of change the control
exists to prevent, so it sits with the partner roles that also manage access
rather than with the role that does the signature work. See
[partner roles](/partners/roles/).

## When it is the wrong tool

Approval slows every publish down by however long it takes an admin to look. That
is the point of it, and it is a poor trade for an organisation where the same
person would be doing both halves.

If what you actually want is confidence that a large change works before everyone
gets it, a [staged rollout](/signatures/staged-rollouts/) measures that directly
and needs nobody to be watching.

The two compose. A rollout can be started by an approver, and it will still stop
itself if the new body starts failing.
