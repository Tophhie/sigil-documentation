---
title: Frequently asked questions
description: Short answers to the questions that come up most often when evaluating or running Sigil.
sidebar:
  order: 5
---

## Does Sigil work with Google Workspace?

No. Sigil is built on Outlook add-ins and Microsoft Entra, so it requires
Microsoft 365 with Exchange Online.

## Does Sigil see the emails people send?

No. Sigil writes into the compose window and does not sit in your mail flow. It
has no access to message bodies, subjects or recipients. See
[data and privacy](/security/data-and-privacy/).

## Can Sigil change anything in our directory?

No. It requests read-only Graph permissions and no write permission of any kind.
See [permissions](/deploy/permissions/).

That holds for [profile fields](/admin/profile-fields/) too. What a colleague
types on their own profile page is stored by Sigil and never written back to
Entra, which is why those fields exist for the things the directory is the wrong
home for rather than duplicating the things it already holds.

## Can people keep their own signature details up to date?

Yes, for the fields you decide on. You define custom fields such as pronouns, a
booking link or a direct line, and colleagues fill in their own at
`portal.usesigil.app/me`. They cannot change anything that comes from your
directory, which stays your IT team's to maintain.

It is off until you switch it on, and what people enter appears in their
signature on their next message. See
[profile fields](/admin/profile-fields/).

## Do users see their own signature as they write?

Yes. The signature is applied in the compose window, so the sender sees exactly
what the recipient will get. This differs from server-side products that stamp
signatures in transit, where the sender never sees their own.

## Can people delete or edit the signature after it is applied?

The signature is placed in the compose window, so a determined person can edit it
in that message like any other content. What they cannot do is change what appears
next time, because the template is served fresh on every compose.

## Do users need to install anything?

No. An administrator deploys the add-in centrally through Integrated apps.
Individual installation does not work for automatic signatures, because
event-based add-ins only auto-launch when an administrator deploys them.

## How long does deployment take?

6 to 72 hours to propagate after you upload the manifest. Nothing speeds it up.
See [deploy the add-in](/deploy/deploy-the-add-in/).

## How quickly does a template change reach people?

Seconds. Publishing increments the template version, which invalidates every
cached signature for it. Nothing is redeployed and nobody restarts Outlook. See
[limits and timings](/reference/limits/).

## Can we try a new signature on some people before everyone?

Yes. A staged publish goes to 10% of mailboxes and steps up to 25%, 50% and then
everyone as the add-in reports that the new version is applying. The version
everyone else receives does not change until it promotes, so abandoning it takes
effect at once and republishes nothing. See
[staged rollouts](/signatures/staged-rollouts/).

## What happens if a staged rollout goes wrong overnight?

It withdraws itself. An evaluation runs every 15 minutes, and a version failing
to apply materially more often than the one it would replace is pulled without
anyone being asked. The mailboxes in the slice go back to the signature everyone
else has been on throughout.

## Can we require changes to be approved before they go live?

Yes, and it is off unless you turn it on. With
[publish approval](/signatures/approvals/) switched on, anyone who can edit still
edits, but only an admin puts a body in front of users, and that covers restoring
an old version and staging a rollout as well as the publish button.

An admin can approve their own submission, because a strict two-person rule would
lock an organisation with one admin out of its own signatures. Sigil records
whether the submitter and approver were the same person, so the log evidences it
either way.

## Can we make a signature change go live at a particular time?

Yes. A [scheduled publish](/signatures/scheduled-publishing/) books the change for
an instant you choose and fires within fifteen minutes after it, never before.
The body is captured when you book it, so an edit made in between cannot silently
change what goes live overnight.

## Can different departments have different signatures?

Yes, using [assignment rules](/targeting/assignment-rules/) that match on a
directory attribute or Entra group membership.

## Can we check which rule applies to somebody before we rely on it?

Yes. Test a user on the rules page dry-runs the saved rules against one mailbox
and reports which rule decided their signature, which rules missed and why, and
which matched but were beaten to it by a rule above. It reads the directory live,
changes nothing and sends nothing. See
[simulating a mailbox](/targeting/assignment-rules/#testing-a-rule-against-one-mailbox).

## Can we have a shorter signature on replies?

Yes. Assign a separate template to the reply role. The add-in detects replies and
forwards and requests the reply signature. Without one, replies get the
new-message template.

## What happens with shared mailboxes?

They get their own signature, rendered when somebody switches the sending
account. They are unlicensed, so they are free.

## Do we have to pay for people who never send email?

No. A licensed mailbox can be excluded, which stops its signature and takes it
off your seat count together. Frontline and shop floor staff, kiosk accounts and
Teams-only users are the usual cases.

Sigil will tell you which mailboxes are candidates rather than leaving you to
audit 400 licences by hand: it already records whether a signature was ever
successfully applied, so it can list the billable mailboxes that have never once
used one. Nothing is excluded until you choose it.

If those people are already a group in your directory, you can exclude the group
instead of the mailboxes. Membership keeps up on its own, so a new warehouse
starter never quietly appears on the bill. See
[cost management](/admin/cost-management/).

## Can Sigil tell us if it is actually working?

Yes, and this is one of the things it does that most client-side signature tools
cannot. [Activity](/monitoring/activity/) records every request and every apply
outcome per mailbox, and lists mailboxes that have never had a signature applied.

You do not have to go and look, either. A [health digest](/monitoring/health-digest/)
emails your administrators the coverage figure, any apply failures and anything
waiting on a decision, weekly by default.

## Does link tracking identify individual recipients?

No. A click stores the link, the time, a device class, a browser family with no
version number, and the referring page's host name. No IP address, no recipient
identity, no cookie, no pixel, and the raw user agent and referring URL are
discarded rather than stored. Those descriptors are reported only in aggregate.
Links containing a per-person placeholder are never rewritten, and the per-click
records are deleted after 90 days. See
[link clicks](/monitoring/link-clicks/).

## Why does the signature not appear the very first time someone uses it?

The automatic path runs in a part of Outlook with no user interface, so it can
only sign somebody in silently. On a first use, or after an expired session or an
MFA prompt, that can fail and the add-in stops quietly rather than interrupting
somebody mid-message. Opening the "My signature" pane once completes the sign-in,
and it works automatically from then on.

## Why is there no manual button on mobile?

Outlook mobile activates add-ins in read mode only. Event-based activation is one
of a small number of documented exceptions; a compose task pane is not. Signatures
still apply automatically on mobile.

## Can we use SVG logos?

No. Outlook does not render SVG. Use PNG or JPG. See
[Outlook constraints](/signatures/outlook-constraints/).

## What happens if we stop paying?

Signatures stop being served. The add-in receives a 402 and applies nothing.
Nothing is deleted, and restoring an active subscription restores signatures. See
[billing](/admin/billing/).

## What happens at the end of the trial?

Stripe converts it. With a card on file it charges the card. With no card on file
it cancels the subscription, so an organisation that never adds a card stops
rather than being billed unexpectedly.

## Can we get our data out?

Templates export as portable JSON bundles including images. Everything held about
a single mailbox can be exported for a subject access request. See
[import and export](/signatures/import-export/) and
[compliance](/security/compliance/).

## Can we script Sigil, or pull its numbers into a dashboard?

Yes. An Admin can create an [API key](/admin/api-keys/), which is a credential
for a script rather than for a person, with the areas you choose and optionally
read-only.

A key reaches a named list of operations rather than the whole portal API. The
reporting and cost-management pulls people ask for are all on it. Sending mail,
moving money, granting access and reading a mailbox you name are not. The portal
shows the full list beside your keys, and offers it as an OpenAPI document you
can generate a client from.

There are no webhooks, so anything that needs to know about a change polls for
it.

## Can a managed service provider run this for us?

Yes. See [the partner programme](/partners/overview/).

## Can we run Sigil alongside our existing signature product?

Not usefully. A server-side product that stamps signatures in mail flow will add
its own on top of Sigil's, producing two signatures per message. Switch a pilot
group over rather than running both. See [planning a rollout](/start/rollout/).
