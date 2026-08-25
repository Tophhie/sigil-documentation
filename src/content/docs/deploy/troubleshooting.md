---
title: Troubleshooting deployment
description: Work out why a signature is not appearing, from tenant-wide problems down to a single mailbox.
sidebar:
  order: 5
---

Work from the widest scope inwards. Most reports of "the signature is missing"
turn out to be one of four things, and the order below finds them fastest.

## Nobody in the organisation has a signature

### Is the trial still running, and is there a card on file?

Billing hard-gates the signature path. Once a trial ends with no active
subscription, the add-in receives a 402 and applies nothing. This is the most
common cause of a sudden organisation-wide stop.

Check the Billing view. If the subscription is past due or cancelled, that is
your answer. See [billing](/admin/billing/).

### Has admin consent lapsed?

If consent has been withdrawn or the enterprise application removed, Sigil can no
longer read your directory and cannot personalise anything. Re-visit
`/admin/consent` and grant consent again. See
[connect your organisation](/deploy/connect-your-organisation/).

### Was the add-in ever actually deployed?

The [Getting started checklist](/admin/getting-started-checklist/) only marks the
add-in step complete once Sigil has seen a real signature request from your
tenant. If that step is still open, the deployment has not reached anyone yet.

If you deployed it in the last three days, this is probably just propagation.
Allow 6 to 72 hours.

## Some people have a signature and others do not

### Check the never-applied list

Open [Activity](/monitoring/activity/). It cross-references your directory to
list mailboxes that have never successfully applied a signature. That list is
usually the fastest route to the pattern: one department, one office, one client
platform.

### Is it a first-run sign-in failure?

The event handler runs in a runtime with no user interface, so it can only
acquire a token silently. On somebody's very first compose, or after an MFA
prompt or an expired session, that silent acquisition fails and the add-in gives
up quietly by design. An error bar on every compose would be worse than a
missing signature.

The fix is for the person to open the "My signature" pane once on a desktop
client, which can complete an interactive sign-in. It self-heals from there, and
because consent is per user rather than per device, one desktop sign-in also
fixes their phone.

These pre-token failures carry no verified identity, so they cannot be reported
back. They appear as a mailbox's absence from the telemetry rather than as a
recorded failure.

### Is the add-in assigned to them?

Check the assignment in Integrated apps. A pilot deployment that was never
widened is a common cause of a clean split between two groups of people.

## Some people have a different signature from everyone else

Check whether a [staged rollout](/signatures/staged-rollouts/) is running. A
rollout deliberately serves the new version to a slice of mailboxes and leaves
everyone else on the previous one, so a report of "my signature does not match my
colleague's" during a rollout is the feature working rather than a fault.

The template editor shows a panel while one is in flight, with the percentage
currently covered. Promote it to put everyone on the same version, or roll it
back to do the same in the other direction.

## One person has no signature

Ask them to open the "My signature" pane from the compose ribbon. It applies the
signature on demand and, when it cannot, says why. That message is usually the
whole diagnosis.

One message is misleading, and it is worth checking first. If the pane says Sigil
is not set up for the organisation yet, and everybody else has a signature, that
mailbox has almost certainly been
[excluded from Sigil](/admin/cost-management/). The add-in cannot tell the two
apart, because the service refuses both the same way. Look for the address on the
Cost management list and put it back if it should not be there.

If the pane works but automatic application does not, the add-in is present and
authenticated, and the problem is with event activation rather than with Sigil.
An Outlook restart is worth trying, and on classic Outlook for Windows a client
too old to support nested app authentication will report as unsupported.

## The signature is wrong rather than missing

### Missing name, title or phone number

The directory attribute is empty for that person. Run
[attribute coverage](/monitoring/attribute-coverage/) to see how widespread the
gap is, then either populate the directory or wrap the affected part of the
template in a [conditional section](/signatures/placeholders/#conditional-sections)
so it disappears cleanly.

### The wrong template

Run Test a user on the rules page against the affected mailbox. It replays the
same walk the compose path runs and reports which rule decided that person's
signature, so it answers the question directly rather than leaving you to read
the list against your idea of their directory record. See
[simulating a mailbox](/targeting/assignment-rules/#testing-a-rule-against-one-mailbox).

The usual answer is ordering. Rules are evaluated in order and the first match
wins, so a broad rule placed above a narrow one will shadow it, and the
simulation marks the shadowed rule as having matched too late to decide anything.

Saving a rule list reaches everyone on their next compose, so a rules edit you
have just made is rarely the explanation. What does lag is a change made in
Entra: the decision reached for each mailbox is cached for ten minutes, and
nothing tells Sigil that somebody has moved department. If the simulation shows
the right rule but the mailbox is still sending the old signature shortly after a
directory change, that window is the likeliest reason.

### An old version of the template

Template edits are live within seconds, so a stale signature usually means the
change was saved as a draft rather than published. Check the template's draft
state in the editor. See [drafts and publishing](/signatures/publishing/).

A [staged rollout](/signatures/staged-rollouts/) produces the same symptom for
most of the organisation, and legitimately so: the live template does not change
until the rollout promotes.

### Broken images

Images must be attached inline as `cid:` references. A hosted `<img>` pointing at
an external URL is suppressed by Outlook's default image blocking and renders as
a broken image. SVG is not supported at all. See
[images](/signatures/images/).

### A missing profile photo

A Photo block hides itself for anybody whose mailbox has no photo, so the usual
answer is that the person has not set one. Photos are also cached for a day, so a
photo added this morning may not appear until tomorrow.

If nobody in the organisation gets one, the photo read is being refused rather
than each mailbox lacking a picture. Check what was consented to under
[permissions](/deploy/permissions/).

### A missing QR code

A contact-card code is left out when the person's directory record is too long to
fit in a readable code, which is rare but not impossible. The rest of the
signature is served normally.

Codes that scan for some readers and not others are usually a contrast problem.
The light colour has to be pale and opaque. See
[per-user images](/signatures/per-user-images/).

## Mobile-specific behaviour

Three things on mobile are documented Outlook behaviour rather than faults:

On a reply, the signature is not visible until the compose window is expanded to
full screen.

`OnNewMessageCompose` does not fire for a message started from the iOS Share
sheet.

There is no "My signature" pane on mobile, because Outlook mobile activates
add-ins in read mode only. A mobile-only failure is fixed from a desktop client.

## Other things that look like faults

A new message with no other edits will not autosave a draft, even though the
signature was set. That is Outlook's behaviour, not a signature failure.

If other event-based add-ins are deployed in your tenant, they run sequentially
rather than in parallel, which can make signature application feel slower.

The pane's "Edit my details" button is missing for most organisations, and that
is the normal state. It appears only where
[profile editing](/admin/settings/) is switched on and at least one
[profile field](/admin/profile-fields/) is available to fill in, and it stays
hidden for a mailbox that has been [excluded](/admin/cost-management/) from
Sigil. The add-in asks the server rather than deciding for itself, so a button
that leads nowhere is not a state it can reach.

## Still stuck

Collect the affected email address, the Outlook client and platform, and whether
the "My signature" pane works. Those three facts narrow almost everything. The
support page at `portal.usesigil.app/support` has current contact details.
