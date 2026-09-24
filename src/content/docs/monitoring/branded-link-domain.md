---
title: Branded link domain
description: Serve the tracked links in your signatures from a hostname of your own instead of Sigil's shared one.
sidebar:
  order: 3.5
---

Tracked links in a signature normally point at `e-clk.usesigil.app`. The branded
link domain add-on serves them from a hostname of your own instead, so a
recipient hovering over a link in your mail sees `links.example.com` rather than
a name they have never heard of.

Nothing else about tracking changes. The redirect behaves the same way, the same
six things are recorded per click, and the same figures appear in
[link clicks](/monitoring/link-clicks/).

## Why an organisation wants one

Three reasons, in the order most people care about them.

A third party's hostname in your outbound mail is the most visible place Sigil
appears to people outside your organisation. Replacing it with your own is the
last piece of presenting Sigil as part of your own infrastructure.

Link reputation stops being shared. Every organisation's tracked links sit on one
hostname by default, so a filter's opinion of that hostname is formed by everyone
using it. A hostname of your own is judged on your mail alone.

"Why is our mail linking to a domain we do not control?" is a question that comes
up in security reviews, and a branded domain is a better answer than an
explanation.

## It is a paid add-on

Sigil's per-seat price includes every feature. The branded link domain is the one
exception: it is charged separately, per organisation rather than per mailbox,
and the price is shown on the Billing view under Add-ons.

The charge is per organisation, not per domain, because an organisation can hold
one branded domain at a time. See [adding it to your subscription](#adding-it-to-your-subscription).

## What you need before you start

A subdomain you are not already serving a website from, on a domain whose DNS you
can edit. `links.example.com` is the usual shape.

Sigil asks for a subdomain rather than a bare domain on purpose. Pointing
`example.com` itself at us would need a flattened CNAME or an ALIAS record, which
not every DNS provider offers, and it would take your website with it.

A few hostnames are refused before anything is created: anything under
`usesigil.app`, a wildcard, a bare domain, and any hostname another organisation
has already claimed.

## Setting it up

Settings, then the Link domain card.

Adding a domain opens a dialog that shows you the CNAME record to create before
it asks you to confirm. That order is deliberate: the certificate authority
proves you own the hostname by fetching a token over it, so a domain added before
the record exists sits waiting until it appears, while one added afterwards is
usually live within a few minutes.

The record is shown as a table rather than written into a sentence, because it is
going to be retyped into a DNS provider. The name is the full hostname. Most
providers accept that; the ones that want only the label in front of your domain
say so on their own form.

Once you confirm, Sigil claims the hostname and orders a certificate for it. The
card on Settings is where you come back to watch that happen.

### Adding the domain

The add-on must already be on your subscription, and you need the Admin role,
or a partner Owner or Admin role inside a managed client.

1. Open Settings in the portal sidebar, under Organisation.
2. On the Link domain card, choose Add a link domain.
3. Under Hostname, enter the subdomain, such as links.example.com. The record
   beneath updates to match.
4. In your DNS provider, create the record shown: Type CNAME, Name as shown,
   and Value as shown. Copy beside Name and Value puts each on the clipboard.
5. Choose Add domain.

A message confirms the hostname was added and is waiting for DNS, or that it is
already live. The card then shows a badge for the state it is in.

### Checking it has gone live

1. Open Settings in the portal sidebar, under Organisation.
2. Read the badge on the Link domain card. While it reads Waiting for DNS or
   Setting up, the card repeats the CNAME record and says which stage it is at.
3. Once your record is in place, choose Check again.

A message says either that your link domain is live or that it is still waiting
for DNS. The badge changes to Live once the certificate is deployed.

## The four states

| Badge | What it means |
| --- | --- |
| Waiting for DNS | The hostname is claimed. Your CNAME has not been seen yet |
| Setting up | Your record has been seen. The certificate is being validated, issued or deployed |
| Live | The hostname resolves, has a valid certificate, and new links are minted on it |
| Not working | The certificate could not be issued. Links stay on the shared hostname |

While a domain is pending, the card names which of the four stages it is in:
checking the CNAME, validating, issuing, or deploying. The first real domain read
as stuck through ninety seconds of ordinary certificate issuance, because one
word covered all four, which is why the stage is spelled out.

Sigil re-reads the state every night, and Check again asks immediately. There is
no penalty for pressing it, and it is what you want after creating the record.

Nothing stops working while a domain is pending or failed. Links keep being
minted on the shared hostname until yours is live, so an unfinished setup costs
you nothing.

## When it does not work

The card shows the reason the certificate authority gave, in its own words,
rather than "validation failed". Two causes account for almost all of them.

The CNAME does not exist yet, or points somewhere else. This is the common one,
and it fixes itself once the record is right and you press Check again.

A CAA record on your domain does not allow the certificate authority Sigil uses.
CAA records restrict which authorities may issue for a domain, and an
organisation that has set one is usually doing so deliberately, so this one needs
a decision from whoever manages that domain rather than a change in Sigil.

A hostname that stays pending for more than about fifteen minutes with the CNAME
resolving correctly is worth reporting to support rather than waiting out.

## When a branded domain starts being used

A signature is rendered once and then cached, so switching a domain on does not
rewrite links in signatures already rendered.

Making a domain live changes what a signature is built from, so the cached copies
are invalidated and the next compose for each person renders against the new
hostname. The same applies in reverse when a domain is removed.

Links already sitting in mail you sent before the change keep working, because
the redirect record they point at is still valid on whichever hostname it was
minted on. The exception is removal, described below.

## Removing a domain

Remove is on the Link domain card, behind a confirmation.

1. Open Settings in the portal sidebar, under Organisation.
2. On the Link domain card, choose Remove. While the domain is still pending,
   the same button reads Cancel.
3. In the confirmation, which says that links already in sent mail stop working
   once the hostname stops resolving, choose Remove.

A message confirms the hostname was removed and the card returns to offering
Add a link domain.

New links go back to the shared hostname from the next render. Links already in
mail you have sent stop working once the hostname stops resolving, which happens
as soon as the removal completes. That is the one irreversible part of this
feature, and the confirmation says so.

Dropping the add-on from Billing removes the domain as well, for the same reason:
an organisation should not keep serving links from a hostname nobody is paying
for. If your provider manages Sigil for you, the same is true when they disable
it.

## What happens if billing lapses

A cancelled or lapsed organisation keeps its hostname. Links already in sent mail
carry on resolving, which is the whole reason for keeping it.

No new link is minted on it, from anywhere: not a compose, not a test email, not
a per-mailbox download. Reactivating brings the add-on back with the rest of the
subscription and new links resume on the branded hostname.

## One hostname answers one organisation's links

A branded hostname resolves only the links belonging to the organisation that
claimed it. A slug belonging to anybody else returns 404 on it, even though the
same slug resolves perfectly well on the shared hostname.

This is the security-relevant part of the feature rather than a detail of it.
Without it, any organisation's branded hostname could resolve any other
organisation's links and log the click against them.

A hostname an organisation has ever claimed answers for that organisation or for
nobody, for as long as the record naming it exists. It is released only when the
domain is removed.

The rest of the rule from the shared hostname still holds: a branded hostname
answers `/r/` redirects and [contact card](/signatures/contact-card/) downloads,
and returns 404 for everything else. The portal and the API are not reachable on
it.

## Adding it to your subscription

Where and how you add the add-on depends on how your organisation is billed.

| Arrangement | How the add-on is added |
| --- | --- |
| Per-seat or trial | Add it yourself on the Billing view, under Add-ons |
| Managed by a partner | Ask your IT provider. They enable it from their own portal |
| Comped or NFR | Add it yourself. The base subscription stays free; the add-on is not |
| Tophhie Cloud's own organisation | Granted internally |

A direct organisation is charged from the day it is added, for the part of the
month it is used, rather than a full month for a few days. Seat counts do not
work that way, but an add-on is bought once on a day you chose, so it prorates.

An organisation whose subscription is free has never been asked for billing
details or a payment method, because it had nothing to pay. Adding an add-on
gives it something to pay, so the Billing view asks for both first and says which
is missing. The add-on is then billed on its own monthly invoice, and the
subscription itself stays free.

Removing the add-on is self-serve in the same place, and takes the domain with
it.

### Adding the add-on

You need the Admin or Billing role, and your organisation must be billed
directly rather than through a partner.

1. Open Billing in the portal sidebar, under Organisation.
2. Scroll to the Add-ons card and find Branded link domain, with its price
   beside it.
3. If the card asks you to complete your billing details or add a payment
   method first, do that. An organisation whose subscription is free will not
   have been asked for either before.
4. Choose Add for the price shown.

A message confirms the add-on was added, the card shows an Included badge, and
it points you to Settings to set the hostname up. To drop it later, choose
Remove add-on on the same card and confirm Remove; the confirmation says that
links already in sent mail stop working once the domain stops resolving.

## If your organisation is managed by a partner

You cannot add the add-on yourself. Your provider is invoiced for your
organisation, and a client adding a line to somebody else's invoice is not
something Sigil allows. The Billing view says so and names what to do instead.

Your provider enables it from the Clients view in their own portal. Once they
have, setting the domain up is yours to do: the hostname is on your DNS, and your
administrators do it in Settings exactly as described above.

Enabling it is recorded in your [change log](/monitoring/change-log/), attributed
to your provider, so an add-on you did not ask for is not something you find with
no explanation of where it came from.

See [partner billing](/partners/billing/) for how it reaches their invoice.

## Who can do what

| Action | Who |
| --- | --- |
| Add, remove or re-check the domain | Admins, and partner Owners and Admins inside a managed client |
| Buy or drop the add-on | Admins and the Billing role |
| Enable it for a managed client | Partner Owners, Admins and Technicians |

A partner Technician can switch the add-on on for a client and cannot then set
the hostname up inside it, because setting up is a settings capability and a
Technician does not hold one. That is the same line that keeps a Technician out
of a client's other organisation-wide switches, and it means the client's own
administrators, or a partner Owner or Admin, finish the job.

Setting a domain up and paying for one are deliberately different permissions.
The Billing role can decide what the organisation buys without also being able to
change what the signatures do, and it is the Settings capability rather than the
Billing one that reaches the domain itself. See
[roles and capabilities](/reference/roles-and-capabilities/).

An [API key](/admin/api-keys/) can read the domain's state and nothing more.
Claiming a hostname starts a recurring charge, and removing one breaks every link
in sent mail at once, so both are for a person on a screen rather than a script.

## Limits worth knowing

| | |
| --- | --- |
| Domains per organisation | One |
| Hostname length | 253 characters, and each label at most 63 |
| Time to go live | Usually a few minutes after the CNAME appears |
| How often the state is re-read | Nightly, plus whenever you press Check again |

One domain per organisation is the current limit rather than a permanent one.
What multiple domains need is not billing but a rule deciding which domain a
given signature's links use, in the way
[compliance footers](/targeting/footers/) already resolve per sending address.
That is a feature in its own right and has not been built.
