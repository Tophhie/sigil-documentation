---
title: Troubleshooting deployment
description: Work out why a signature is not appearing, from tenant-wide problems down to a single mailbox.
sidebar:
  order: 5
---

Work from the widest scope inwards. Most reports of "the signature is missing"
turn out to be one of four things, and the order below finds them fastest.

## Nobody in the organisation has a signature

Several of the causes below reach Activity as the same badge. Paused delivery, an
organisation still onboarding, a suspended one, and a mailbox the cost management
list does not cover are all reported by the add-in as `not-activated`, because
none of them is anything the person composing could act on. The badge tells you
the refusal was deliberate, not which of them it was. The served request recorded
beside it names that. See [refused
requests](/monitoring/activity/#refused-requests).

### Is Sigil itself up?

Check `status.usesigil.app` before anything else. It carries the current state of
the service and any open incident, and it is hosted away from Sigil so it is
readable when Sigil is not. Everything below assumes the service is running. See
[the status page](/security/infrastructure/#the-status-page).

If you can still reach the portal, the status pill beside the page title answers
the same question without leaving it, and the public support page carries the
same pill for anybody who cannot sign in.

An interruption to Sigil does not stop anybody sending email. What stops is the
signature being applied and the portal being reachable.

### Is delivery paused?

Open the Templates page and look at the In use card. If it says Paused, that is
your answer: somebody switched delivery off for the whole organisation and it is
still off. Resume it there.

1. Open Templates in the portal sidebar.
2. Look at the badge in the header of the In use card: Live or Paused. While
   delivery is paused a warning at the top of the page says "Signatures are
   paused" as well.
3. Choose Resume. The button is shown to administrators.

The next message anybody composes gets a signature, subject to the ten minute
wait described [below](#you-fixed-it-and-the-signature-has-not-come-back).

This is worth checking first because it is silent. Nobody is warned that their
signature has stopped, everything in the portal keeps working, and the add-in is
behaving exactly as it was told to. See
[pausing delivery](/signatures/pausing-delivery/).

### Is the trial still running, and is there a card on file?

Billing hard-gates the signature path. Once a trial ends with no active
subscription, the add-in receives a 402 and applies nothing. This is the most
common cause of a sudden organisation-wide stop.

Check the Billing view. If the subscription is cancelled, that is your answer,
and the portal will be showing a notice at the top of every page saying so. A
subscription shown as ending is not the answer: a cancellation that has been
scheduled leaves signatures running until the day it names.

A past due subscription does not stop signatures straight away either: there is a
21 day window while the card is retried, and they stop at the end of it. So a past
due status explains an organisation-wide stop only once that window has run. See
[billing](/admin/billing/).

An organisation on [invoice terms](/admin/invoices-and-credits/) has no card, so
the question is whether an invoice is overdue instead. The invoice list on the
Billing view says which, and the same 21 days run from its due date.

### Is anybody included?

If cost management is in inclusion mode, only the mailboxes on the list receive a
signature, and an empty list means nobody does. The Cost management page carries
a warning above its figures for exactly this state, and the seat count on your
next invoice would be zero. See
[which way round the list reads](/admin/cost-management/#which-way-round-the-list-reads).

1. Open Cost management in the portal sidebar.
2. If the mode card says Inclusion mode and a warning above the figures says
   the list is empty, nobody is being served.
3. Choose Include a mailbox to add the people who should have Sigil, or choose
   Switch to exclusion mode and confirm with Switch to put everyone back in.

### Has admin consent lapsed?

If consent has been withdrawn or the enterprise application removed, Sigil can no
longer read your directory and cannot personalise anything. Re-visit
`/admin/consent` and grant consent again. See
[connect your organisation](/deploy/connect-your-organisation/).

1. Open Getting started in the portal sidebar.
2. If the Connect Microsoft 365 step is unticked, choose Grant admin consent.
3. Approve on Microsoft's screen. You are returned to the portal.

### Was the add-in ever actually deployed?

The [Getting started checklist](/admin/getting-started-checklist/) only marks the
add-in step complete once Sigil has seen a real signature request from your
tenant. If that step is still open, the deployment has not reached anyone yet.

1. Open Getting started in the portal sidebar.
2. Check whether the "Deploy the Outlook add-in" step is ticked.

If you deployed it in the last three days, this is probably just propagation.
Allow 6 to 72 hours.

### Is something on your network eating the request?

An outbound filter that inspects traffic to `portal.usesigil.app` can stop
signatures without anything in the portal looking wrong. Activity shows the
symptom: outcomes reported with a reason and no matching served request, because
the add-in got far enough to describe the failure but its request for a signature
never arrived.

Two reasons separate the cases, and the difference is worth reading before you
open a ticket with anyone. `server-error` means Sigil answered and the answer was
unexpected; the status it answered with is recorded alongside it. `unreachable`
means the request produced no answer at all, which is what a dropped connection
looks like and also what a filter or firewall blocking the request looks like
from inside Outlook.

A run of `unreachable` confined to one office, one VPN or one network is a
filtering problem rather than a Sigil problem. Where the host is blocked
outright, nothing is reported at all and the mailboxes surface on the
never-applied list instead, so both symptoms point at the same check: whether
`portal.usesigil.app` is reachable from that network. The request carries
nothing in its URL beyond the host, so there is no address or parameter in it for
a content rule to object to. See
[domains Sigil uses](/deploy/requirements/#domains-sigil-uses).

To read the reasons for one network or office:

1. Open Activity in the portal sidebar.
2. In the Signature log, enter an affected address under Mailbox, set Source
   to Add-in (apply), and choose Search.
3. Read the badge on each failed row. It names the reason, `server-error` or
   `unreachable`.

## Some people have a signature and others do not

### Check the never-applied list

Open [Activity](/monitoring/activity/). It cross-references your directory to
list mailboxes that have never successfully applied a signature. That list is
usually the fastest route to the pattern: one department, one office, one client
platform.

1. Open Activity in the portal sidebar.
2. Read the Signature adoption card. It says how many mailboxes have applied
   their signature at least once and how many never have.
3. Choose Export mailboxes (CSV). The file lists every mailbox with Yes or No
   under Signature applied.

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

Ask the person to do this in Outlook on Windows, Mac or the web:

1. Start a new message.
2. Choose My signature on the ribbon.
3. If the pane says "Sign in to see and apply your signature", choose Sign in
   and apply and complete the Microsoft sign-in.
4. The pane says "Signature applied." and shows a preview of the signature.

Their mailbox then appears in the By mailbox table in Activity, with Manual in
the How column for that apply.

### Is the add-in assigned to them?

Check the assignment in Integrated apps. A pilot deployment that was never
widened is a common cause of a clean split between two groups of people.

1. In the Microsoft 365 admin centre go to Settings, then Integrated apps.
2. Open Sigil by Tophhie Cloud.
3. Check who the deployment is assigned to: specific users and groups, or
   Entire organisation. The people without a signature should be covered.
4. Leave shared mailboxes out of the assignment. The add-in runs for the
   person sending, never for the mailbox.

A change to the assignment takes the usual 6 to 72 hours to reach clients.

### Is the signature missing only in a shared mailbox?

If somebody's own messages are signed and only their shared mailbox sends are
not, the question is how their Outlook holds that mailbox. Opened as a folder
alongside their own, the add-in follows them into it. Added as an account of its
own, or promoted to a full account in new Outlook for Windows, Outlook only
loads add-ins whose manifest declares support for shared folders, which Sigil's
does from version 1.4.0.0.

An organisation still on an older manifest sees no Sigil at all in those compose
windows, and no amount of waiting or redeploying to the mailbox changes that. The
Add-in column in [Activity](/monitoring/activity/#which-add-in-version-people-are-on)
says which manifest your organisation is on. The table of which clients need what
is on
[sending on behalf of a mailbox](/signatures/sending-on-behalf/#where-the-add-in-runs-in-a-shared-mailbox).

1. Open Activity in the portal sidebar.
2. Find the person's mailbox in the By mailbox table and read the Add-in
   column. It shows the manifest version, or `pre-1.5` for one older than the
   version stamp.
3. If a notice at the top of the page says mailboxes are still on an older
   version, choose Update and follow the steps in the dialog. See
   [updating the add-in](/deploy/deploy-the-add-in/#updating-the-add-in).

On Android and iOS a shared mailbox added as its own account gets no signature
from any add-in, and there is nothing to fix. Microsoft does not support the
scenario.

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

1. Ask the person to start a new message in Outlook on Windows, Mac or the web
   and choose My signature on the ribbon.
2. Ask them to read you the message the pane shows. Where the pane still offers
   Apply my signature, ask them to choose it and read you the result.

One message is misleading, and it is worth checking first. If the pane says Sigil
is not set up for the organisation yet, and everybody else has a signature, that
mailbox has almost certainly been
[excluded from Sigil](/admin/cost-management/). The add-in cannot tell the two
apart, because the service refuses both the same way. Look for the address on the
Cost management list and put it back if it should not be there.

If your organisation runs cost management the other way round, the same message
means the mailbox is simply not on the list. Include it.

If the pane says "Sigil isn't switched on for your organisation yet":

1. Open Cost management in the portal sidebar.
2. Look for the address in the list.
3. In exclusion mode, choose Put back on its row and confirm with Put back. In
   inclusion mode, choose Include a mailbox and add the address.

Then confirm what Sigil recorded for that mailbox:

1. Open Activity in the portal sidebar.
2. In the Signature log, enter the address under Mailbox and choose Search.
3. Read the newest rows. An add-in row is badged Applied or with the reason it
   failed; a server row is badged Fetched when the signature was served.

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

### Text missing only for some recipients

If a line is there for most people and gone for a few, ask whether those few read
their mail in dark mode. Clients built on Outlook on the web recolour a
signature's text and background colours and leave its images alone, so light text
over a dark picture disappears entirely and a faint grey line becomes hard to
read. It is a rendering behaviour rather than a fault in the template, and the
same signature looks correct on your own screen. See
[dark mode](/signatures/dark-mode/).

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
Entra: the decision reached for each mailbox stays fresh for an hour, and
nothing tells Sigil that somebody has moved department. The re-check runs in the
background after a message has gone, so the first compose past that window sends
under the old decision and the next one follows the directory. If the simulation
shows the right rule but the mailbox is still sending the old signature shortly
after a directory change, that is the likeliest reason, and one more message
settles it.

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

## You fixed it and the signature has not come back

Check this before looking anywhere else, because it resolves itself.

When Sigil refuses a mailbox, the add-in notes the refusal on the device and
stops an automatic message for the next ten minutes rather than asking again.
That covers all three of the refusals above: delivery
[paused](/signatures/pausing-delivery/), the mailbox
[kept out of Sigil](/admin/cost-management/), and
[billing lapsed](/admin/billing/#what-happens-if-billing-lapses). So resuming,
re-including somebody or paying an overdue invoice can take up to ten minutes to
reach anybody who was writing messages at the time, and no time at all to reach
anybody who was not.

Pressing Apply my signature in the "My signature" pane skips the wait, because
the pane always asks Sigil. That is also the quickest way to tell this apart
from a real fault: if Apply produces a signature and automatic messages do not,
you are inside the window. If Apply also refuses, the underlying cause has not
actually been fixed. See [a refusal is remembered for ten
minutes](/start/how-it-works/#a-refusal-is-remembered-for-ten-minutes).

1. Start a new message in Outlook on Windows, Mac or the web.
2. Choose My signature on the ribbon.
3. Choose Apply my signature. The pane says "Signature applied." or explains
   the refusal.

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
the "My signature" pane works. Those three facts narrow almost everything.

Help in the portal's sidebar is the shortest route from there. It carries a link
to this documentation, the support address, and the response commitment, and it
starts an email for you with your organisation name and Microsoft 365 tenant id
already in it. Those two are the details support otherwise has to ask for, and
each round trip costs another day.

1. Choose Help in the portal sidebar.
2. Under Support, choose the support email address. Your mail client opens a
   draft with your organisation name and Microsoft 365 tenant id filled in.
3. Add the affected address, the Outlook client and platform, and whether the
   "My signature" pane works, then send it.

The same dialog carries Open the documentation, Open the feedback portal, and a
Full support page link.

If an IT provider manages Sigil for your organisation, Help names them and points
you at them first. They configure your signatures, so they can usually resolve it
faster, and Tophhie Cloud stays listed underneath if you cannot reach them.

The public support page at `portal.usesigil.app/support` says the same things for
anyone who is not signed in.

Help also carries the feedback board at `feedback.tophhie.cloud`, which is where
to ask for something Sigil does not do yet. It is one board across Tophhie
Cloud's products rather than a Sigil-only one, and it is the one thing in the
dialog that is not routed through your IT provider: a request for a feature is
about the product rather than about your configuration, and an idea passed on
second-hand usually does not arrive.
