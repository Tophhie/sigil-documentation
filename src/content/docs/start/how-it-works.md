---
title: How it works
description: The mechanism behind Sigil, from admin consent to the signature appearing in a compose window.
sidebar:
  order: 2
---

Six things happen between an administrator publishing a template and a signature
appearing at the bottom of somebody's email.

## The lifecycle of one signature

1. A Microsoft 365 administrator grants admin consent to Sigil's multi-tenant
   Entra application and deploys the Outlook add-in manifest through Integrated
   apps. This happens once.
2. Someone starts a message. The add-in fires on `OnNewMessageCompose`, which
   covers new messages, replies and forwards, and on `OnMessageFromChanged` when
   the sending account switches. No clicks, no task pane.
3. The add-in acquires an Entra access token silently, using MSAL nested app
   authentication (NAA) brokered by Outlook.
4. The add-in calls the signature API. The API verifies the token, reads that
   person's directory attributes from Microsoft Graph, and merges them into the
   template that applies to them. The result is Outlook-safe HTML with any
   images attached inline.
5. The add-in applies it with `setSignatureAsync`, attaches the inline images,
   and suppresses any locally configured signature so only one appears.
6. The add-in reports the outcome back to the API, which is what makes the
   [Activity](/monitoring/activity/) view possible.

## What is checked at the API boundary

The add-in's JavaScript is served from a public URL, so anything hidden inside
it would be public too. There is no shared secret, and the security boundary is
the token rather than anything embedded in the client.

Every signature request must carry a valid Entra access token. The server checks
the token's cryptographic signature against the calling tenant's published keys,
then its issuer, its audience, its home tenant claim (`tid`) and its delegated
scope, before returning anything.

The directory attributes in a signature (name, job title, phone number) are
already visible to every colleague in the address book. The token requirement is
what keeps them off the open internet. See
[the security model](/security/security-model/) for the full picture.

## How a template is chosen

Sigil resolves three questions on every request: which template, which banner,
and which footer.

The template comes from the [assignment rules](/targeting/assignment-rules/),
evaluated in order, first match wins. A rule matches on a directory attribute
being one of a set of values, or on membership of an Entra group, and names a
template for new messages and a template for replies. Anyone that no rule matches
gets the organisation-wide defaults.

The compose type decides which of the two roles is used. The add-in calls
`getComposeTypeAsync`, and a reply or forward is fetched as `type=reply`. When no
reply template is configured, the new-message template is served instead.

The [banner](/targeting/banners/) is whichever campaign window is currently open.
The [footer](/targeting/footers/) is the one matching the sending email domain,
or the default if there is one.

## Why changes are fast

Rendered signatures are cached in Cloudflare KV, keyed by template id, template
version, and the recipient's email address. Publishing a template increments its
version, which strands every cached entry for that template at once. The next
request renders fresh.

That is why a template edit reaches users within seconds without an explicit
purge. Banners and footers are part of the same cache key, so opening or closing
a campaign window takes effect immediately.

A template that names the person sending, rather than only the mailbox, cannot be
cached per mailbox alone: the first person to send from `sales@` would otherwise
hand their own name to everybody who sent from it next. Sigil detects that case
from the template itself, and from the compliance footer, and adds the sender to
the cache key for it. Templates that do not mention the sender keep the key they
had, so nothing here costs anything to an organisation not using the feature.

Assignment rules work the same way with a second cache in front of them.
Evaluating a rule needs directory data, so the routing decision reached for each
mailbox is cached too, keyed by a rules version that changes on every edit.
Saving a rule list strands all of those at once, so a rules change also lands on
the next compose. The ten minute lifetime on those entries exists for the change
no version number can see, which is somebody moving department or joining a group
in Entra.

## The sending address, not the mailbox

The add-in sends the address the message is actually being sent from, which is
the Outlook From field. That may be a proxy or alias address rather than the
mailbox's primary one.

The signature follows the send. The `{{email}}` placeholder, the compliance
footer, and any `emailDomain` rule all reflect the sending address. One person
can carry a different brand's address and template when sending from that
brand's alias.

Two things keep that safe. A secondary alias that Graph cannot address directly
is resolved through a `proxyAddresses` directory filter, and the sending address
is printed only after it has been verified against the mailbox's own
`proxyAddresses`. An unrecognised address falls back to the primary and can never
be injected into a signature.

### Two identities, not one

The compose request carries both the mailbox and the person. The From address
says which mailbox the message leaves from, and the add-in's token says who is
signed in. On an ordinary send they name the same account. On a shared or
delegated mailbox they do not, and that gap is what the
[sender placeholders](/signatures/placeholders/#sender) render out of.

Sigil takes the person from the verified token rather than from anything the
request asks for, so a signature cannot be made to claim somebody else wrote it.
Sending from an alias of your own mailbox is not treated as a delegation, because
the comparison is against every address the mailbox owns rather than against the
one in the From field alone. See
[sending on behalf of a mailbox](/signatures/sending-on-behalf/).

## Multi-tenancy

Sigil is multi-tenant. Any organisation can connect and manage its own
signatures against the same application registration and the same add-in
manifest.

A tenant is an organisation, keyed by its Entra tenant id, which arrives on every
verified token. All tenant data shares one database with a tenant id on every
row, storage keys are prefixed by tenant, and cache keys are tenant-salted. The
signature endpoint resolves the tenant from the token and refuses an unknown or
suspended one.

There is nothing tenant-specific in the add-in. It uses the `/organizations`
authority, so NAA brokers each person's token through their own tenant, whichever
that is.

## What it runs on

Sigil runs on Cloudflare's edge network. Templates and metadata live in D1, inline
images in R2, and rendered signatures in a KV cache. Billing runs on Stripe. Mail
for invites, test emails and operator notices goes through Cloudflare Email
Routing.

The practical consequence is that the signature path is edge-executed and close
to the user wherever they are. See [infrastructure](/security/infrastructure/).
