---
title: Versions and rollback
description: Restore a previous version of any template, and recover a template you deleted.
sidebar:
  order: 9
---

Every publish archives the body it replaced. Sigil keeps the last ten published
bodies of each template, and every template has its own independent history
rather than sharing one.

## Restoring a version

Restore from the Versions view, using the signature picker to choose which
template's history you want, or from a template's row menu on the Templates view.

Restoring publishes the old body as a new version. That is worth understanding:
it is a forward action rather than a rewind, so the version you rolled back
*from* is itself archived and stays recoverable. Rolling back a rollback works.

Restored versions reach users in seconds, exactly like any other publish.

Rollbacks are recorded in the [change log](/monitoring/change-log/).

## Rollbacks and staged rollouts

Restoring a version is the recovery path for something that is already live for
everyone. It is a real publish, and it takes a moment to notice the problem and a
moment more to put it right.

A [staged rollout](/signatures/staged-rollouts/) is the path that avoids reaching
that point. Because the live body never changes until the new version has
proved itself, abandoning one republishes nothing and archives nothing. The two
are worth keeping straight: one undoes a publish, the other declines to complete
it.

A rollout that promotes behaves like an ordinary publish here. The outgoing body
is archived and can be restored in the usual way.

## Ten versions per template

The history holds ten published bodies per template. The eleventh publish drops
the oldest.

If you are about to make a series of experimental publishes, consider
[duplicating](/signatures/templates/#duplicating-renaming-and-deleting) the
template and experimenting on the copy, so the original's history stays intact.

For anything you want to keep permanently, [export](/signatures/import-export/)
it. An exported bundle is a file you control, with no retention limit.

## Recently deleted

Deleting a template moves it to Recently deleted rather than destroying it. It
keeps its full version history and can be restored for 30 days.

An administrator who is certain can delete it permanently straight away. Anything
left in Recently deleted is purged by a daily sweep once the 30 day window has
elapsed.

Deleting is blocked while a template is assigned to a role or referenced by an
[assignment rule](/targeting/assignment-rules/), so you cannot accidentally
delete the signature people are currently receiving. Reassign first, then delete.

Restoring from Recently deleted puts the template back in the library with its
history. It does not reassign it to a role, so you also need to point the role or
the rule back at it if that is what you want.

## What is not versioned

Version history covers template bodies. Other objects have their own lifecycle:

Images are replaced in place. Uploading over an existing name replaces it, and
the upload is recorded in the change log, but the previous file is not retained.
Keep your source files.

Banners and footers are edited in place with no version history. They are small
and quick to reconstruct, and the change log records that they were edited.

Assignment rules are replaced as one ordered list on each save. The change log
records the edit.

## The change log

The [change log](/monitoring/change-log/) is the append-only trail of what
happened: publishes, rollbacks, creates, renames, duplicates, deletes, restores,
permanent deletions, role assignments and asset uploads, each with who did it and
when.

Version history tells you what a template used to contain. The change log tells
you who changed it and in what order. They answer different questions and are
worth reading together when something has gone wrong.
