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

### The publisher name does not match the company

Integrated apps shows the add-in as "Sigil by Tophhie Cloud", published by
"Chris Greenacre". Everything else you will have read names Tophhie Cloud Ltd,
including the privacy policy, the terms, the data processing agreement and your
invoices.

Both are Sigil. The manifest carries a provider name from before the company was
incorporated, and it has not been corrected yet. It is worth knowing before the
difference is spotted halfway through a security review, because a publisher name
that disagrees with the contracting entity is a reasonable thing to stop on.

The correction is a manifest change, which costs a redeploy and fresh consent for
every organisation that has already deployed it. That is why it is being held for
a release that needs one anyway rather than spent on its own. See
[what needs a redeploy](#what-needs-a-redeploy-and-what-does-not) and
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
`OnMessageFromChanged` rather than `OnNewMessageCompose`.

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
| Add-in code and icons | No. Outlook re-fetches, though it caches icons so allow a restart |
| New buttons inside the pane, such as "Edit my details" | No. The pane is add-in code |
| Hostnames, support URL, permissions, events, requirement set | Yes, and admin consent again |

The practical version: your day-to-day work as an administrator never requires a
redeploy. Only a change to the add-in's declared shape does, and those are made
by Tophhie Cloud rather than by you.

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
on receiving one.

The manifest itself changes rarely. It names the add-in, the events it listens
for and where its files live, and none of those move when Sigil's own features
change. Most releases reach you without a manifest at all.

## Removing the add-in

Remove it from Integrated apps in the same place you uploaded it. Signatures stop
being applied once the removal propagates. Existing messages are unaffected,
because Sigil only ever writes into the compose window.
