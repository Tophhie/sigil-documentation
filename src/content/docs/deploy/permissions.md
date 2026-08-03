---
title: Permissions Sigil requests
description: The Microsoft Graph permissions Sigil asks for, what each one is used for, and why no write access is requested.
sidebar:
  order: 3
---

Sigil requests three Microsoft Graph application permissions at admin consent.
All are read-only. No write permission is requested anywhere, so Sigil cannot
modify your directory even if it were asked to.

| Permission | Used for |
| --- | --- |
| `User.Read.All` | Reading the directory attributes that personalise a signature |
| `Organization.Read.All` | Reading your organisation's name and domain at onboarding |
| `GroupMember.Read.All` | Evaluating assignment rules that match on Entra group membership |

## Why User.Read.All rather than something narrower

`User.ReadBasic.All` is the obvious narrower option, and it does not work.

It excludes `jobTitle`, `department` and the phone numbers, which are exactly the
attributes a signature is made of. `User.Read.All` is the narrowest permission
that returns them.

## What is actually read

The attributes Sigil reads are the ones that can appear in a signature, plus what
it needs to resolve the right mailbox:

Identity and contact details: display name, given name, surname, mail, business
phones, mobile phone, fax number.

Role: job title, department, company name, employee id, employee type.

Location: street address, city, state, postal code, country, office location.

Manager: expanded explicitly, because Graph treats it as a navigation property
rather than an attribute. Read on the compose path for the manager placeholders,
and by [attribute coverage](/monitoring/attribute-coverage/) so it can be scored.

On-premises extension attributes 1 to 15, which Graph only returns when
explicitly selected.

Proxy addresses, used to verify that a sending alias genuinely belongs to the
mailbox before it is printed into a signature.

Licence and account state, including how each account was created, used to count
billable seats and to exclude disabled accounts and accounts invited in from
outside your organisation.

The profile photo, but only for organisations whose template contains a Photo
block. `User.Read.All` already covers it, so adding one needs no new consent. See
[per-user images](/signatures/per-user-images/).

These are the same attributes every colleague can already see in the address
book. What Sigil adds is that they can only be read with a valid, verified Entra
token.

## Organization.Read.All

Used once, at onboarding, to name your tenant record and to pre-fill the billing
profile from your registered address. It is not read on the signature path.

## GroupMember.Read.All

Only needed if you write [assignment rules](/targeting/assignment-rules/) that
match on Entra group membership. Rules that match on directory attributes do not
touch it.

It is requested at consent time regardless, because asking for it later would
mean a second consent round trip at the moment an administrator is trying to
write a rule.

## Application permissions, not delegated

The Graph reads happen with an app-only token, per tenant. That is what allows a
signature to be rendered for a shared mailbox or an alias, where there is no
signed-in user to borrow permissions from.

The app-only token reads your tenant's directory and nothing else. There is no
cross-tenant read path: an address outside your organisation simply does not
resolve.

## No domain allow-list

Sigil deliberately has no configured list of permitted email domains. A list
would add nothing, because the app-only token is already scoped to one directory,
and it would break every user whose address is not on the listed domain. Many
organisations span several domains.

## Two delegated scopes

Alongside the Graph permissions, Sigil's own API exposes two delegated scopes:

| Scope | Used by |
| --- | --- |
| `access_as_user` | The Outlook add-in |
| `portal_admin` | The admin portal and the designer |

The presence of `portal_admin` in a token is what distinguishes an administrator
token from an add-in token, so an add-in token can never reach an admin endpoint.

## Reviewing what was granted

In the Microsoft 365 admin centre or the Entra portal, look under Enterprise
applications for Sigil. The Permissions tab lists exactly what was consented to
and when.

Consent can be withdrawn there at any time. Withdrawing it stops Sigil reading
your directory, which stops signatures rendering.
