---
title: Emails Sigil sends
description: Every message Sigil sends to administrators and users, what triggers it, and the address it comes from.
sidebar:
  order: 10
---

Sigil is not a mailing product, and it sends very little. The list below is all
of it, which is worth having in front of you when somebody forwards you a message
asking whether it is genuine.

## Where they come from

Every message Sigil sends comes from `signatures@usesigil.app`, with the display
name "Sigil by Tophhie Cloud".

Nothing else sends on Sigil's behalf. A message that claims to be from Sigil and
comes from any other address is not.

Payment failure notices are the one thing that reaches you from elsewhere. They
come from Stripe to your billing contact, under Stripe's own sender, because
Stripe is what holds the card. See [billing](/admin/billing/). Partners get one
from Sigil as well, from the address above, and the two say the same thing.

## To your administrators and users

| Message | Sent when |
| --- | --- |
| You've been given a role | Somebody is added to Users and roles for the first time. Names the role and what it covers |
| You've been invited to manage your organisation | An organisation is provisioned for you rather than self-served, so the first administrator has a link to start from |
| Signature test | You send a [test email](/admin/test-email/). Goes to the address you name, defaulting to your own |
| Sigil health digest | Weekly by default, to every administrator. Coverage, apply failures and anything waiting on a decision |
| Sigil health digest, on request | An administrator presses "Send me one" in [settings](/admin/settings/). Goes to that administrator only |
| Action needed: reconnect Sigil | Admin consent has lapsed and signatures have stopped updating. Sent to every administrator |
| A message from Tophhie Cloud | Support needs to tell your administrators something specific about your organisation |

The [health digest](/monitoring/health-digest/) is the only one of these that
arrives on a schedule rather than in response to something. It reports rather
than alerts, so a healthy organisation still gets one, and it carries a link to
[settings](/admin/settings/) where you can change it to monthly or turn it off.

An administrator can also send themselves a copy on demand. That one goes to the
person who pressed the button and to nobody else, and it does not move the
schedule, so the real digest still arrives when it was going to.

The reconnect prompt is sent by Tophhie Cloud support rather than fired
automatically. A nightly scan across the fleet flags organisations whose Graph
consent has stopped working, and somebody looks before your administrators are
mailed, so a transient Graph outage does not become a fleet-wide alarm.

The role email goes out only when somebody is added, not when an existing user's
role is changed. Changing a role takes effect on their next request and needs no
announcement.

Tophhie Cloud may contact organisation administrators about their account, onboarding, configuration, support requests, billing, security or other matters directly related to their use of Sigil. These messages are service communications, not marketing emails.

## If your organisation is managed by a partner

| Message | Sent when |
| --- | --- |
| Your provider has invited you to set up Sigil email signatures | An MSP is onboarding you for the first time. Carries the link that starts admin consent, and expires after 14 days |
| Your provider has asked to manage your account | An MSP requests a transfer of your existing tenant. Approve or decline it yourself in the portal |
| Your provider has released your account | Your MSP has ended the relationship. Billing returns to you |
| Action needed: your email signatures are at risk | Your MSP's payment has been failing long enough that your signatures have a stop date |

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

Sigil sends partner staff almost nothing. An MSP joining the partner programme is
given a signup link to follow rather than being mailed one, and after that
partner staff learn about their client base from the console rather than from
their inbox.

| Message | Sent when |
| --- | --- |
| Action needed: your Sigil payment failed | A payment on the partner subscription has failed. Names the date signatures stop across every managed client if it stays unpaid |
| Your Sigil partnership is at risk | The partnership has gone six consecutive months without an active client. Written to the partner's Owners, and it starts the 30 days the agreement gives them to respond |

The partnership-at-risk notice exists because the partner agreement promises it.
Removal for going six months without a client cannot happen until the notice has
been sent and the 30 days have run, so it is a required step rather than a
warning somebody chose to send. See
[leaving the programme](/partners/leaving-the-programme/).

The payment failure notice goes to the billing email on the partner's invoice
details, if one is set, and to every Owner and Billing member of partner staff.
It is sent once when the failure starts rather than on each retry, so a card that
declines three times produces one message and one stop date.

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

There is no alerting. Nothing is sent early because something broke, there is no
threshold to configure and nothing pages anybody. The health digest arrives on
its schedule whatever the numbers say, and [activity](/monitoring/activity/) is a
view you open rather than something that mails you.

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
