---
title: Emails Sigil sends
description: Every message Sigil sends to administrators and users, what triggers it, and the address it comes from.
sidebar:
  order: 11
---

Sigil is not a mailing product, and it sends very little. The list below covers the automated messages Sigil sends, which is worth having in front of you when somebody forwards you a message
asking whether it is genuine.

## Where they come from

Automated messages sent by Sigil come from `signatures@usesigil.app`, with the display
name "Sigil by Tophhie Cloud".

Nothing else sends on Sigil's behalf. A message that claims to be from Sigil and
comes from any other address is not.

Nobody reads that sending address, so the notices about your account and the
messages support writes to you carry a reply address of `support@usesigil.app`.
Choosing Reply in your mail client reaches a person. The breach notice described
below points you at `privacy@usesigil.app` instead, in its own text.

Every message ends with the same footer: Tophhie Cloud Ltd, its company number
(17393069, registered in England and Wales), its registered office, and a link to
Sigil's privacy policy at `portal.usesigil.app/privacy`. A message whose footer
names anything else did not come from Sigil.

Stripe sends billing mail of its own as well: the invoice itself, receipts, and
its own payment failure notices, under Stripe's own sender, because Stripe is
what raises the invoice and holds the card. See [billing](/admin/billing/).

Sigil sends its own notices about the same events, from the address above, and
they say the same thing. That duplication is deliberate. The Stripe copy goes to
the billing contact on the Stripe customer record, which is one address and is
sometimes never filled in, while Sigil's copy reaches everybody in your
organisation who can actually act on it.

## To your administrators and users

| Message | Sent when |
| --- | --- |
| You've been given a role | Somebody is added to Users and roles for the first time. Names the role and what it covers |
| You've been invited to manage your organisation | An organisation is provisioned for you rather than self-served, so the first administrator has a link to start from |
| Welcome to Sigil | The first person to sign in to a newly self-served organisation becomes its administrator. Says they can add the rest of the team from Users and roles, and gives the day the free trial ends |
| A named person is now an administrator, or is no longer an administrator | Somebody gains or loses the Admin role, or an Admin is removed. Goes to the other administrators. See [administrator access](#administrator-access) |
| Signature test | You send a [test email](/admin/test-email/). Goes to the address you name, defaulting to your own |
| A signature is waiting for your approval | An editor submits a draft for review. Goes to every administrator except the person who submitted it, and carries a [picture of the proposed signature](/signatures/previews/) |
| Your changes to a named template are live, or were sent back | A draft somebody submitted is approved or sent back. Goes to the person who submitted it, and quotes the reviewer's note when it is sent back. See [approvals](/signatures/approvals/#the-author-hears-the-outcome) |
| A Sigil API key for your organisation expires on a named day | A week before an [API key](/admin/api-keys/) with an expiry date stops working. Goes to your administrators and the person who created the key |
| Your Sigil data has been restored to an earlier point | Tophhie Cloud has restored your organisation's Sigil data to its last nightly checkpoint. Says that changes made since then are gone and need making again. Goes to your administrators |
| Sigil health digest | Weekly by default, to every administrator. Coverage, apply failures and anything waiting on a decision |
| Sigil health digest, on request | An administrator presses "Send me one" in [settings](/admin/settings/). Goes to that administrator only |
| Action needed: reconnect Sigil, followed by your organisation's name | Sigil has lost permission to read your directory, so signatures may have stopped updating. Sent to every administrator, once each time it happens. Carries a Reconnect Sigil button |
| Your Sigil trial ends soon | Three days before the trial ends, and again the day before. The wording depends on whether a card is on file and whether your billing details are complete. Not sent for a trial already set to end |
| Add your billing details before your Sigil trial ends | A trial about to convert still has incomplete billing details, so it has been set to end on its trial date. Names the date and what happens either way |
| Your Sigil payment failed, or your Sigil invoice is overdue | A payment has failed, or an invoice has gone past its due date. Names the day signatures stop |
| Your Sigil signatures stop on a named day | About a week before the grace period runs out, if it is still unsettled |
| Prepaid mailboxes added to your plan | Tophhie Cloud has recorded a [prepaid block](/admin/billing/#prepaid-mailboxes) for you. Gives the number of mailboxes and the days it runs from and to |
| Prepaid mailboxes on your plan have ended | Tophhie Cloud has ended a prepaid block early. Names the day it stopped applying, and says mailboxes are billed monthly at your usual rate from then |
| Your prepaid mailboxes end on a named day | Thirty days before a [prepaid block](/admin/billing/#prepaid-mailboxes) ends, once per block. Says that mailboxes are billed monthly at your usual rate after that |
| Your Sigil renewal date is moving to a named day | A [renewal day move](/admin/billing/#changing-your-renewal-day) has been scheduled. Goes to your administrators, everyone with the Billing role and the invoice email on your billing profile. Names the day it happens, says that day's invoice falls outside the usual cycle, and how to stop it |
| Your exemption from Sigil billing ends on a named day | A week before an agreed exemption from billing runs out. Asks you to check the Billing page has a payment method. See [account changes](#when-tophhie-cloud-changes-your-account) |
| Your Sigil account is no longer exempt from billing | An exemption from billing has ended, on its agreed date or because Tophhie Cloud lifted it. Mailboxes are billed monthly from then |
| Your Sigil account is suspended | Tophhie Cloud has suspended your organisation, and signatures have stopped. Goes to your administrators |
| Your Sigil account is active again, or The suspension on your Sigil account has been lifted | A suspension has been lifted. The second wording is used when your subscription is not active, so signatures do not start again until it is. Goes to your administrators |
| Your Sigil subscription has been cancelled | Your subscription has been cancelled, by Tophhie Cloud or by somebody in your organisation from the Billing page. Names who did it, says the day signatures stop, or that they have stopped already, and that nothing is deleted |
| Your Sigil subscription ends on a named day | A week before a cancelled subscription ends. Points at the Billing page, where it can still be kept. See [reminders](#reminders) |
| Your Sigil subscription is active again | A cancelled subscription has been reactivated, by Tophhie Cloud or by somebody in your organisation. Names who did it |
| Your Sigil trial now ends on a named day | Tophhie Cloud has extended your trial. Asks you to add billing details before the new date if you have not already |
| Your Sigil discount is now a named percentage, or has been removed | Tophhie Cloud has set, changed or removed a [discount](/admin/billing/#discounts). Says when it ends, if it does. The reason recorded for it is not included |
| Your Sigil discount ends on a named day | A week before an agreed discount term runs out. Invoices after that are at the full price |
| How you pay for Sigil has changed | Tophhie Cloud has moved you onto [invoice terms](/admin/invoices-and-credits/#paying-on-invoice-terms), back onto card, or changed the days you have to pay |
| We've added a credit, or issued a credit note, on your Sigil account | Tophhie Cloud has issued a [credit](/admin/invoices-and-credits/#credits-and-corrections). Gives the amount and how it is used |
| The change to your Sigil renewal date is cancelled | A scheduled [renewal day move](/admin/billing/#changing-your-renewal-day) has been called off. Your renewal date stays as it is |
| Your Sigil data will be deleted on a named day | Your organisation has been scheduled for deletion. Gives the date and asks you to reply before then if it is a mistake |
| Your Sigil account has been restored | A scheduled deletion has been called off. Says whether signatures are working again or wait on the subscription being reactivated |
| Your Sigil data is being deleted | The deletion has started. The last message Sigil sends your organisation |
| Personal data breach notice from Sigil | A personal data breach affects your organisation's data. Goes to your administrators. See [if there is a personal data breach](/security/compliance/#if-there-is-a-personal-data-breach) |
| A message from Tophhie Cloud | Support needs to tell your administrators something specific about your organisation |
| An announcement from Tophhie Cloud | Something applies to every customer rather than to you in particular, such as an add-in manifest worth taking or a change to a published policy. A service notice, sent whatever your email preferences |
| A product update from Tophhie Cloud | Occasionally, when enough has changed in the service to be worth a round-up. Nobody has to act on one, so it honours the [product update setting](/admin/settings/#product-update-emails) and each person's own opt-out. See [product updates](#product-updates) |

The [health digest](/monitoring/health-digest/) is the only one of these that
arrives on a schedule rather than in response to something. It reports rather
than alerts, so a healthy organisation still gets one, and it carries a link to
[settings](/admin/settings/) where you can change it to monthly or turn it off.

An administrator can also send themselves a copy on demand. That one goes to the
person who pressed the button and to nobody else, and it does not move the
schedule, so the real digest still arrives when it was going to.

The reconnect prompt comes from the nightly scan that checks whether Sigil can
still read each organisation's directory. It is sent once when that changes from
working to refused, not every night the problem lasts, so a lapse that goes
unfixed for a week produces one message rather than seven. If consent comes back
and later lapses again, that is a new lapse and sends again. A night when
Microsoft does not answer at all is not treated as a refusal, so a Graph outage
sends nothing. Tophhie Cloud support can also resend the same prompt by hand,
and that copy is recorded in your
[change log](/monitoring/change-log/#actions-taken-by-tophhie-cloud-support).

The role email goes out only when somebody is added, not when an existing user's
role is changed. Changing a role takes effect on their next request and needs no
announcement.

### Administrator access

Administrator access is the one role change that is announced, because an Admin
controls everything, users and billing included. The other administrators are
emailed when somebody is made an Admin, moved from Admin to another role, or
removed while an Admin, whether the change was made in the portal or by
Tophhie Cloud. The message names the person and who made the change, and asks
anybody who did not expect it to check Users and roles and the
[change log](/monitoring/change-log/).

The person who made the change is not sent a copy. Neither is somebody added as
an Admin for the first time, whose own invitation already tells them.

The approval request goes out whenever a draft is submitted, whether or not
[publish approval](/signatures/approvals/) is switched on, because submitting is
available either way. It is built a moment after the submit rather than during it,
and it is not sent at all if the draft has been withdrawn or changed by the time
it is built, so a reviewer never opens a picture of something that no longer
exists. An organisation whose only administrator submitted the draft has nobody
else to tell, and nothing is sent.

The last three rows are all written by a person at Tophhie Cloud rather than
fired by an event. The first is about your organisation in particular; the other
two go to many organisations at once. All are addressed to administrators, all
come from the address above, and all leave an entry in your
[change log](/monitoring/change-log/#actions-taken-by-tophhie-cloud-support) so
you can see afterwards that one was sent and when.

An announcement goes to organisations Sigil is actually serving. One whose trial
lapsed months ago without a card is left out, because a notice about the product
is not for somebody who is not using it. A wider notice, a change to the data
processing agreement being the obvious one, goes to every organisation still on
the platform. An announcement is a service notice and has no unsubscribe link:
it is how you hear about a manifest you need to take or a policy that has
changed, which is part of running the service rather than news about it.

An announcement about a change to one of the published agreements (the data
processing agreement, its list of sub-processors, the terms of use, the privacy
policy or the partner agreement) is also a legal notice. Tophhie Cloud records
it against your organisation with the version it introduces, the day that
version takes effect, and the addresses it was sent to, so that having told you
is something that can be shown rather than asserted. It is always a service
notice, so it reaches administrators who have opted out of product updates. A change of sub-processor
cannot be announced with less than 30 days to run, which is the notice the
[data processing agreement](/security/compliance/#sub-processors-and-where-data-is-stored)
promises. The revised document itself goes live on or after the date in the
notice, not before.

### When Tophhie Cloud changes your account

A handful of the messages above exist because something about your account
changed without anybody at your organisation doing it: Tophhie Cloud suspended
or cancelled it, scheduled it for deletion or restored it, changed what you pay,
or an exemption from billing came to an end. Each of those used to happen
silently, with an entry in the change log and nothing else, and signatures
stopping or a different invoice was how most people found out.

Most are sent only when Tophhie Cloud acts. Cancelling or reactivating your
subscription is the exception: it sends the same email whether Tophhie Cloud
did it or one of your own administrators did it from the Billing page, naming
who, because the colleague who pays the invoice is often not the one who
pressed the button.

Who receives each one depends on what it is about:

| Message | Goes to |
| --- | --- |
| Reconnect Sigil, account suspended, account active again or suspension lifted, data restored to an earlier point | Your administrators, since they are the people who can act in the portal |
| Subscription cancelled, ending or active again, trial extended, discount changed or ending, payment method changed, credit added, renewal date change cancelled, data to be deleted, account restored, data being deleted | Your administrators, everyone with the Billing role, and the billing email on your [billing profile](/admin/billing-profile/) |
| Exemption ending, or ended | Whoever pays. For a direct customer that is the same group as the row above. For a partner-managed client it is the partner, not you, because the bill that grows is theirs |

Nothing is sent when nothing changed. Saving the same payment terms again sends
no email.

The exemption warning goes out in the morning, a week before the agreed end
date, and once for that date. If the date is moved, the warning is armed again
for the new one. A warning that reached nobody, because nobody was on record to
send it to, is tried again the next morning.

The deletion messages follow the timetable in
[deleting your data](/security/data-and-privacy/#deleting-your-data). The first
gives the day the data goes, which is the end of the grace window during which a
deletion can still be called off. The last is sent as the deletion starts rather
than after it ends, because once it ends there is nobody left on record to tell.
It says that backups are overwritten on their normal cycle, within 90 days.

### Reminders

Three messages are reminders of a date you already know about, sent a week
ahead so it does not arrive unnoticed:

| Reminder | Seven days before |
| --- | --- |
| Your Sigil subscription ends on a named day | A cancelled subscription ends |
| Your Sigil discount ends on a named day | An agreed discount term runs out |
| A Sigil API key for your organisation expires on a named day | An API key with an expiry date stops working |

Each goes out in the morning, once for each date, so moving the date arms it
again. A reminder that reached nobody is tried again the next morning.

Some are skipped because they would be wrong or redundant. A cancellation made
less than a week before its end date has just sent its own email, so there is
no reminder on top. A trial set to end because its billing details are missing
has its own trial emails instead. No subscription or discount reminder goes to
a suspended organisation, one whose deletion is scheduled, or one a partner
manages, whose own subscription is not what bills it. A discount reminder is
also skipped when the subscription ends before the discount would. The API key
reminder is skipped for a suspended organisation or one being deleted.

### Product updates

A product update is the one message on this page that is news rather than
service. It tells your administrators what has changed in Sigil and asks nothing
of them, so it is also the one you can stop. It only goes to organisations Sigil
is serving, never to one that has left.

There are two ways to stop them, and either is enough:

- An administrator can switch them off for the whole organisation in
  [settings](/admin/settings/#product-update-emails).
- Anybody who receives one can follow **Stop product update emails** at the
  bottom and stop them for their own address. It needs no sign-in, so it still
  works for somebody who has since lost portal access.

The personal choice wins. Switching the organisation's setting back on does not
reach an address that opted out, and nobody can opt somebody else back in. The
link opens a page showing where your address stands, with a button to change
it. Opening the page changes nothing on its own, because mail security scanners
open every link in a message and would otherwise opt out everybody behind one.
Mail clients that show their own unsubscribe option beside the sender use the
same opt-out.

Opting out applies to that address everywhere it receives product updates,
whichever organisation or partner it helps run. It never stops the service
messages in the table above.

### The billing notices

The five billing messages go to everybody who could do something about them:
every Admin and every holder of the Billing [role](/admin/users-and-roles/),
plus the billing email on your [billing profile](/admin/billing-profile/) if you
have set one. Duplicates are removed, so somebody who is both is mailed once.

To add a finance mailbox to those recipients without giving it a portal role,
set it as the billing email:

1. Open Billing in the portal sidebar.
2. Open the Billing details tab.
3. Enter the address in Billing email.
4. Choose Save billing details.

The same address is where Stripe sends the invoice itself. See
[billing profile](/admin/billing-profile/#changing-it-later).

Trial reminders go out three days before the trial ends and again the day
before, in a morning sweep rather than at whatever hour the clock rolls over. A
message about money leaving an account belongs in the morning post. Each is sent
once per trial end date, so extending a trial arms both again rather than
skipping them silently.

What they say depends on how your account is collected. With a card on file it
is a reminder that billing is about to start. With no card it is the one thing
left to do before signatures stop. On
[invoice terms](/admin/invoices-and-credits/#paying-on-invoice-terms) it says the
first invoice follows, since there is no card to be missing.

While your billing details are incomplete, a reminder for a trial that would
convert says the subscription will not start without them. A trial already set to
end gets no reminder, whether you cancelled it or it was set to end for want of
the details, since a message saying billing is about to start would be untrue.

The billing details notice is sent once, when that end is set. It says that
saving the details before the date lets the subscription start as normal, and
that without them signatures stop on that date, with nothing charged and nothing
deleted.

The overdue notice is sent as it happens, the moment a healthy subscription
first goes past due, since there is nothing gained by sitting on it overnight. A
second message lands about a week before signatures stop, from the morning sweep
with the trial reminders.

When a card payment fails, the first notice says what the bank said, where
Stripe recorded a reason. "We couldn't collect your payment" sends people to
Tophhie Cloud, when a declined card can only be fixed by whoever issued it. The
notice names the card by brand and last four digits, then gives one of these:

| What the bank said | What the notice suggests |
| --- | --- |
| It declined the payment | Update the card, or ask the bank to allow the payment so the next automatic retry goes through. A card issued outside the UK gets a line saying such cards are often blocked for payments in pounds until the bank allows them |
| Not enough funds, or a spending limit reached | Update the card on file |
| The card has expired | Update the card on file |
| The card details were not recognised | Update the card on file |
| The bank wants the payment confirmed | Open the invoice from the Billing page and pay it there, confirming with the bank. The button reads View and pay the invoice rather than Update your payment method |
| A temporary fault at the bank | Nothing yet, because the payment is retried automatically. Update the card if it keeps failing |

Declines the bank marks as a lost or stolen card, or as suspected fraud, read as
a plain decline. Without a recorded reason the notice keeps its general wording.
The reason only appears in the first notice, because by the second one it may no
longer be the reason, and neither notice for invoice terms mentions a card at
all.

A card that is retried and declines again does not send another and does not
move the date. The clock runs from the first failure, or on terms from the due
date, so retrying neither buys time nor costs any.

The second message is also the safety net for a failure the first never saw. A
subscription can reach a past due state without passing through the moment that
sends the first notice, and the sweep still reaches those organisations before
the cliff.

Neither goes to an organisation nobody is charging. A partner-managed client and
an organisation on a free arrangement are both left alone, because telling
either that a card is about to be needed would be wrong. So is a suspended
organisation, and one whose deletion is already scheduled, on the grounds that a
payment reminder is not their most relevant news.

## If your organisation is managed by a partner

| Message | Sent when |
| --- | --- |
| Your provider has invited you to set up Sigil email signatures | An MSP is onboarding you for the first time. Carries the link that starts admin consent, and expires after 14 days |
| Your provider has asked to manage your account | An MSP requests a transfer of your existing tenant. Approve or decline it yourself in the portal |
| Your provider has released your account | Your MSP has ended the relationship. Billing returns to you |
| Action needed: your email signatures are at risk | Your MSP's payment has been failing long enough that your signatures have a stop date |
| A named provider now manages your Sigil account | Your organisation has moved under a partner's management, because one of your administrators approved the provider's request or Tophhie Cloud made the link. Says your own subscription has been cancelled and the provider is billed from now on, or that you stay exempt from billing if you were. Also goes to everyone with the Billing role and your billing email |
| Your Sigil signatures have stopped | Your provider's partner account has been suspended because it can no longer trade, so your signatures have stopped. Says your templates and settings are kept and how to move to billing in your own name. It does not give the provider's circumstances |
| Personal data breach notice from Sigil | A breach affects your organisation's data and your provider asked Tophhie Cloud to tell you directly, or could not be reached. Names your provider and says they have been told as well |

These go to every administrator of the managed organisation rather than to the
partner, and they exist because each one is something a client must not learn
about only by noticing it. A managed client has no relationship with Stripe and
no way to see a provider's billing problem coming, so they are told directly, with
the date and who to chase.

An organisation managed by a partner can legitimately have no administrators of
its own, in which case there is nobody to tell and nothing is sent. The partner is
the one who has to act in that case anyway.

The invitation is the exception to everything else on this page, because it
arrives before your organisation exists in Sigil at all. It is sent only if your
provider gives Sigil an address to send it to; a provider who would rather hand
the link over themselves leaves that field empty and nothing is sent. Either way
the link is the same one, it is single use, and it asks for a Global
Administrator, so it is worth confirming with your provider that they sent it
before anybody follows it.

## To a partner's own staff

Sigil sends partner staff little about their day-to-day work. An MSP joining the
partner programme is given a signup link to follow rather than being mailed one,
and after that partner staff learn about their client base mostly from the
console. What does arrive is a welcome for each new member of staff, word when a
client answers or ignores a request or ends the relationship, billing, a client
moving in or out by Tophhie Cloud's hand, and the notices the partner agreement
promises, listed in the table below.

The announcement described above is the other one, which can be addressed to
a partner's Owners and Admins as well as to each client's own administrators. It
exists because a managed client is allowed to have no administrators at all, its
provider being the one who runs it, so a notice that needs somebody to act would
otherwise reach nobody for that client.

An announcement can also be addressed to partners alone, reaching every active
partner's Owners and Admins and no organisation at all. That is for programme
news rather than product news: a revision to the [partner
agreement](/partners/agreement/) is the obvious case, since it concerns the
people who signed it and nobody else. A suspended partner is left out, in the
same way a lapsed organisation is, because terms are announced to partners still
on them. Both kinds can be addressed this way, a service notice and a product
update alike.

A [product update](#product-updates) can reach partner staff the same way. The
partner has its own switch for it on Partner staff in the console, which covers
its Owners and Admins and nobody else. Tophhie Cloud can also turn it off at the
partner's request. Each person can still stop them for their own address from
the link at the bottom of one.

| Message | Sent when |
| --- | --- |
| You've been added to your firm on Sigil | Somebody is added to Partner staff for the first time, by a colleague or by Tophhie Cloud. Names their role and what it covers. Goes to the new member of staff |
| A named client has set up Sigil from your invitation, is now one of your clients, or declined your request | A client acts on your invitation or management request. Goes to your Owners and Admins and whoever sent it. See [what your firm is told](/partners/clients/#what-your-firm-is-told) |
| Your request or invitation has expired | A transfer request or client invitation ran out unanswered in the past week. Goes to the same people |
| A named client no longer has you managing its Sigil account | An administrator at the client removed your firm. Goes to your Owners and Admins |
| Action needed: your Sigil payment failed | A payment on the partner subscription has failed. Names the date signatures stop across every managed client if it stays unpaid |
| Your Sigil partner discount is now a named percentage, has been removed, or ends on a named day | Tophhie Cloud has changed your partner discount, or an agreed term ends in a week. Goes to the same people as the payment failure notice |
| How you pay for Sigil has changed, or a credit was added | Tophhie Cloud has changed how your invoices are collected, or issued a credit. Goes to the same people as the payment failure notice |
| The change to your Sigil invoice date is cancelled | A scheduled [change of invoice date](/partners/billing/#changing-your-invoice-date) has been called off. Goes to the same people as the payment failure notice |
| Prepaid mailboxes added for a client | Tophhie Cloud has recorded a [prepaid block](/partners/billing/#prepaid-mailboxes-for-a-client) you paid for. Names the client, the number of mailboxes and the days it runs from and to. Goes to the same people as the payment failure notice |
| Prepaid mailboxes for a client have ended | Tophhie Cloud has ended a block you paid for early. Names the client and the day it stopped applying. Goes to the same people as the payment failure notice |
| Prepaid mailboxes for a client end on a named day | Thirty days before a [prepaid block](/partners/billing/#prepaid-mailboxes-for-a-client) you paid for ends, once per block. Names the client, and says its mailboxes are billed at your usual rate after that. Goes to the same people as the payment failure notice |
| Your Sigil invoice date is moving to a named day | A [change of invoice date](/partners/billing/#changing-your-invoice-date) has been scheduled. Says that day's invoice covers fewer days than usual, and how to stop it. Goes to the same people as the payment failure notice |
| Your Sigil partnership is at risk | The partnership has gone six consecutive months without an active client. Written to the partner's Owners, and it starts the 30 days the agreement gives them to respond |
| A named client is now one of your Sigil clients | Tophhie Cloud has put an organisation under your management. Says whether its mailboxes count towards your bill from today or it is exempt |
| A named client stops being exempt from billing on a named day | A week before a client's exemption from billing runs out. From then its mailboxes count towards your bill |
| A named client is no longer exempt from billing | A client's exemption has ended, on its date or because Tophhie Cloud lifted it |
| A named client is no longer managed by your firm | Tophhie Cloud has returned a client to billing in its own name, as clause 7.2 of the agreement allows. Your access to it has ended, and its usage up to today stays on your bill |
| Your Sigil partner account will be suspended on a named day | Notice of a planned suspension, with the reason. See [how you are told](/partners/leaving-the-programme/#how-you-are-told) |
| We plan to remove your firm from the Sigil partner programme | Notice of a planned removal, with the reason and the day |
| Notice that your Sigil partnership ends on a named day | The 90 days' written notice of clause 10.2 |
| The notice we sent you has been withdrawn | A notice above no longer stands. Nothing changes |
| Your Sigil partner account is suspended | The suspension has taken effect, with the reason |
| Your Sigil partner account is active again | A suspension has been lifted |
| Your firm is no longer a Sigil partner | A removal, or the end of a partnership, has taken effect |
| Personal data breach notice from Sigil | A personal data breach affects organisations you manage. See [breach notification](/partners/agreement/#breach-notification-reaches-you-sooner) |
| A message from Tophhie Cloud, under a subject its author chose | Somebody at Tophhie Cloud needs to tell the partner something specific. Not a contractual notice |

The partnership-at-risk notice exists because the partner agreement promises it.
Removal for going six months without a client cannot happen until the notice has
been sent and the 30 days have run, so it is a required step rather than a
warning somebody chose to send. See
[leaving the programme](/partners/leaving-the-programme/).

The payment failure notice goes to the billing email on the partner's invoice
details, if one is set, and to every Owner and Billing member of partner staff.
It is sent once when the failure starts rather than on each retry, so a card that
declines three times produces one message and one stop date.

Every other message in that table goes to the same people, unless its row says
otherwise. The suspension,
removal and end-of-partnership notices, and the breach notice, are also written
to a record Tophhie Cloud keeps of each notice the agreement required it to
give, with the date and the addresses it went to.

Stripe sends its own dunning mail as well, from the first failure. Sigil's notice
exists because that one depends on the Stripe customer record carrying an
address, and an MSP whose record had none used to learn about a failed invoice
from their own clients. Between them it is why the client-facing warning above
only starts partway into the grace window: by then the partner has already been
told several times. See [partner billing](/partners/billing/).

## Mail about you rather than to you

One message goes to Tophhie Cloud support instead of to you. If connecting your
organisation fails, or finishes with a step outstanding, support is emailed at
the moment it happens with the attempt reference, your organisation name and
domain, and which step did not complete. It carries no directory contents and no
signature content. It exists so that a half-finished setup reaches somebody while
you are still in front of the portal, rather than being noticed days later. See
[connect your organisation](/deploy/connect-your-organisation/).

## What Sigil never sends

No newsletters, no product announcements to end users, and nothing at all to the
people whose signatures Sigil renders. Your colleagues get a signature on their
mail; they do not get mail from Sigil.

There is no operational alerting. No threshold is configurable, nothing pages
anybody, and no message is sent because coverage dropped or an apply failed. The
health digest arrives on its schedule whatever the numbers say, and
[activity](/monitoring/activity/) is a view you open rather than something that
mails you.

The billing notices above are the exception, and are a deliberate one. They are
not reports on how Sigil is running; they are notice that signatures are going
to stop on a particular day unless somebody acts, which is the one thing nobody
should first learn about by noticing.

## Mail flow and anti-phishing

The messages above land in administrator inboxes and mention granting consent,
adding a card, and approving a change of provider, which is exactly the shape of
message a well-trained administrator is suspicious of.

That suspicion is correct, and the answer is that every action in these emails can
also be started from `portal.usesigil.app/admin` directly. Nothing Sigil asks you
to do requires following the link in the message. If a mail looks wrong, ignore it
and go to the portal.

None of these messages ever ask for a password, and Sigil has no password to ask
for. Portal sign-in is your Microsoft work account. See
[the security model](/security/security-model/).

## Mail from people rather than from the system

Everything above is sent by Sigil itself. Separately from it, Tophhie Cloud may
write to your administrators about your account: onboarding, configuration, a
support request you raised, billing, a security matter, or anything else directly
related to your use of Sigil.

Those are service communications rather than marketing. The published privacy
policy names administering the service and communicating with administrators
about their account among the purposes it holds your tenant, subscription and
billing records for. See [compliance](/security/compliance/#published-legal-documents).

Support itself is reached at `support@usesigil.app`, and the aim is a response
within one business day, Monday to Friday in UK business hours. Sending your
organisation name, what you expected, what happened, and the mailbox or template
involved saves a round trip.
