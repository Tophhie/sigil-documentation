---
title: Deploy the Outlook add-in
description: Upload the Sigil manifest through Integrated apps, pilot it, and wait out propagation.
sidebar:
  order: 4
---

This is the step that makes signatures appear. It is also the step most likely to
be misdiagnosed, because propagation is slow enough that a correct deployment
looks broken for the first day.

## Administrator deployment is required

Event-based add-ins only auto-launch when an administrator deploys them. If
somebody installs the Sigil add-in themselves from their own Outlook, it will not
fire on compose and they will get no automatic signature.

There is no way around this. It is a Microsoft platform rule, not a Sigil
restriction.

## Upload the manifest

In the Microsoft 365 admin centre:

1. Go to Settings, then Integrated apps.
2. Choose Upload custom apps, and select Office Add-in.
3. Provide the manifest URL:

   ```
   https://static.usesigil.app/manifest.xml
   ```

4. Choose who gets it. Start with a pilot group rather than the whole
   organisation.
5. Accept the permissions request and finish the deployment.

The same URL is shown with a copy button on the
[Getting started checklist](/admin/getting-started-checklist/) in the portal.

It is the same manifest for every organisation. The add-in is multi-tenant and
works out which organisation somebody belongs to from their sign-in, so there is
nothing tenant-specific to generate and nothing to keep secret.

### The publisher name

Integrated apps shows the add-in as "Sigil by Tophhie Cloud", published by
Tophhie Cloud Ltd. That matches the privacy policy, the terms, the data
processing agreement and your invoices, so a security review comparing the
publisher against the contracting entity finds the same company on both.

It has not always. Until August 2026 the manifest named the sole trader Sigil
traded as before the company was incorporated, and a review that stopped on the
difference was stopping on something real. The correction is in the manifest now.

It reaches an organisation that had already deployed the add-in only when an
administrator updates the custom app, because
[a URL upload is not self-updating](#uploading-by-url-does-not-make-it-self-updating).
If yours still shows the old name, that is what it is telling you, and the update
carries a fresh consent prompt like any other manifest change. See
[compliance](/security/compliance/) for the company details in full.

## Wait for propagation

Allow 6 to 72 hours before treating a missing add-in as a fault. Nothing you do
speeds this up, and it is normal for the add-in to appear for some people well
before others.

While you wait, the [Getting started checklist](/admin/getting-started-checklist/)
tracks this step honestly: it only marks the add-in as deployed once Sigil has
actually seen a signature request arrive from your tenant. It is not a checkbox
you tick.

## Pilot first

Pick ten to twenty people across more than one department, and across more than
one client if you can. Somebody on Outlook for Windows, somebody on Mac,
somebody who lives in Outlook on the web, and somebody who sends from a phone
will between them surface most of what a rollout can surface.

Ask them to check new messages, replies and forwards. If anyone uses a shared
mailbox, ask them to send from it, because that path goes through
`OnMessageFromChanged` rather than `OnNewMessageCompose`. Include somebody who
opens a shared mailbox as an account of its own rather than as a folder if you
have one, since Outlook treats that as a different case entirely. See
[where the add-in runs in a shared mailbox](/signatures/sending-on-behalf/#where-the-add-in-runs-in-a-shared-mailbox).

Then look at [Activity](/monitoring/activity/). You want to see signature
requests arriving and apply outcomes succeeding.

## Go tenant-wide

Once the pilot is clean, widen the assignment in Integrated apps to the whole
organisation or to the groups you intend to cover. Allow the propagation window
again.

Watch the never-applied list in Activity over the following week. It
cross-references your directory, so it lists mailboxes that have never had a
signature applied rather than only reporting on the ones that have.

## What needs a redeploy, and what does not

Almost everything the manifest points at is a URL, so most changes never touch
it.

| Change | Manifest redeploy needed? |
| --- | --- |
| Signature templates, images, banners, footers | No. Published from the portal, live in seconds |
| Add-in code and icons | No. Outlook picks up new code within a compose or two, and caches icons, so allow a restart |
| New buttons inside the pane, such as "Edit my details" | No. The pane is add-in code |
| Hostnames, support URL, permissions, events, requirement set | Yes, and admin consent again |

The practical version: your day-to-day work as an administrator never requires a
redeploy. Only a change to the add-in's declared shape does, and those are made
by Tophhie Cloud rather than by you.

New add-in code arrives without anybody being kept waiting for it. Outlook uses
the copy it already has and fetches the newer one in the background, so a client
holding an older copy writes one more message with it and has the new code from
then on. The alternative would put a download in front of every message somebody
starts, which is a worse trade than one message written with the previous code.

## When a manifest change does happen

Two rules apply, and both bite when ignored.

The manifest `<Version>` must be raised on every change. Microsoft requires it,
and an update deployed without a version bump may simply not take.

Any manifest change to an admin-deployed event-based add-in requires admin
consent again, and users are blocked from the add-in until it is granted. This is
why the manifest is worth getting right before going tenant-wide.

## Uploading by URL does not make it self-updating

Only Marketplace add-ins update automatically. When you upload by URL, Microsoft
takes its own copy at that moment. Updating remains an explicit administrator
action, either through the admin centre or with `Set-OrganizationAddIn`, which
accepts a file path or a URL.

A Marketplace listing is the one path that would spare you that, and Sigil is not
published there yet, so every organisation running Sigil today has uploaded it as
a custom app. Plan on being told when a new manifest is worth taking, rather than
on receiving one. The portal does the telling, in
[Activity](/monitoring/activity/), and
[which manifest version you are on](#which-manifest-version-you-are-on) covers
what it shows.

The manifest itself changes rarely. It names the add-in, the events it listens
for and where its files live, and none of those move when Sigil's own features
change. Most releases reach you without a manifest at all.

## Which manifest version you are on

Because the upload is a copy, an organisation can sit on a manifest from months
ago without noticing. The add-in's own code is not the problem: everything the
manifest points at is a fixed URL, so every client runs the current code
whatever manifest it was installed from. What an old manifest is missing is
exactly the part only a manifest can declare, such as
[shared mailbox support](/signatures/sending-on-behalf/#where-the-add-in-runs-in-a-shared-mailbox),
and the code cannot see that it is missing.

So the add-in reports which manifest it was installed from, on the same beacon
that reports whether the signature applied, and
[Activity](/monitoring/activity/) shows you the answer. When any mailbox that
has composed in the last 30 days is on an older manifest than the one Sigil is
serving, the view carries an "Add-in update available" notice naming the current
version, how many mailboxes are behind, and a link to the manifest to re-upload.
The per-mailbox table has an Add-in column with each mailbox's version in it.

A mailbox reading `pre-1.5` is one whose manifest is older than the stamp
itself, which arrived in 1.5.0.0. It can also be classic Outlook for Windows on
a build too old to report the version at all, which is old in its own right.
Either way it means out of date rather than not known, and it is labelled that
way rather than left blank, because blank invites the wrong reading.

| Version | What it added |
| --- | --- |
| 1.4.0.0 | Shared mailbox support for the clients that require the manifest to declare it, including a mailbox promoted to a full account in new Outlook for Windows |
| 1.5.0.0 | The version stamp itself, so the portal can tell you when your organisation is behind |

The notice never appears while Sigil cannot read its own served manifest, so it
will not tell you to update towards a version nobody can name. It also counts
only mailboxes that have actually composed in the last 30 days, so somebody who
left in March does not hold your organisation at "behind" for ever.

Updating is the same job as the first upload: point Integrated apps at the same
manifest URL again, and expect the consent prompt described above. Until you do,
those mailboxes keep working exactly as they did. They simply do not get
whatever the newer manifest declares.

## Removing the add-in

Remove it from Integrated apps in the same place you uploaded it. Signatures stop
being applied once the removal propagates. Existing messages are unaffected,
because Sigil only ever writes into the compose window.
