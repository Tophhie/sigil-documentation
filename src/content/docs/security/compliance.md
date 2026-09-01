---
title: Compliance and governance
description: Audit trails, subject access requests, the data processing agreement, and how vendor operator access is controlled.
sidebar:
  order: 3
---

## Who you are contracting with

Sigil is a product of Tophhie Cloud Ltd, a company registered in England and
Wales under number 17393069, whose registered office is at 21 Manor Way, Hoyland,
Barnsley, England, S74 9QX.

Tophhie Cloud is the brand. The company is the party your organisation contracts
with, which is why every published agreement names it in full at the top rather
than leaving it to the branding. If you are reconciling the company against
another record, it is the same identity that appears on the Companies House
register, on the Microsoft Publisher Attestation, and on the invoices Stripe
issues.

## Audit trails

Sigil keeps two separate append-only records.

The [change log](/monitoring/change-log/) covers what was done to your
organisation. It is not confined to templates: publishes and rollbacks, the whole
template lifecycle from create to permanent deletion, assignment rules, banners,
footers, link tracking, image uploads and deletions, test emails, and changes to
who has access and at what role, each with who and when. The Activity view shows
all of it across two cards, template changes on one and everything else on the
other.

It also covers what Tophhie Cloud staff did on your organisation. Those entries
are badged as support against the operator's own address, so the log answers
whether Sigil touched your data without your having to ask. See [actions taken by
Tophhie Cloud
support](/monitoring/change-log/#actions-taken-by-tophhie-cloud-support).

The operator audit log is the second record. It spans every organisation rather
than one, which is why it is Tophhie Cloud's copy rather than yours, and it is
retained indefinitely and can be exported. Keeping both is deliberate: your copy
is deleted with your data, and a record of an operator action that a purge
destroys would evidence nothing about that purge.

Neither is pruned and neither can be edited.

## Subject access requests

Sigil can export everything held about a single mailbox, which is what a subject
access request under GDPR or similar regimes needs. Request it through support.

One file answers the request. It carries that mailbox's signature telemetry, the
values the person entered in your profile fields, their portal role, any
exclusion covering them and the note written against it, and the record of them
signing in before your organisation connected. The full list, and what is
deliberately left out of it, is in
[data and privacy](/security/data-and-privacy/#subject-access-requests).

Erasure of an individual mailbox is deliberately not offered. Removing one
person's entries from an append-only audit trail would undermine the trail, so the
available erasure path is a full tenant purge.

## Controller, processor, and lawful basis

For your directory data, your signature content and your usage telemetry, your
organisation is the controller and Tophhie Cloud is the processor. Sigil acts on
your documented instructions, on the terms of the DPA below. Deciding the lawful
basis for that processing is your organisation's job, not Sigil's.

Tophhie Cloud is the controller for a narrower set of records it holds in its own
right, and the published privacy policy states the basis for each: your tenant,
subscription and billing records, on the contract with you and on the tax and
accounting law that governs the financial part of it; portal access records, on
that same contract and on the legitimate interest in keeping the portal secure
and giving your administrators an audit trail; and the sign-up diagnostics, on the
legitimate interest in telling a real administrator apart from the crawlers that
follow a public sign-up link.

## Individual rights

The privacy policy sets out the rights a person in the UK or the EEA has over
their data: to be informed, of access, to rectification, to erasure, to
restriction, to portability, and to object. It names the Information
Commissioner's Office as the UK supervisory authority for a complaint, and the
authority for the person's own country in the EEA.

Requests about your directory data, signature content and telemetry go to your
own administrators, because your organisation controls that data. Tophhie Cloud
assists as processor and can locate an individual's records by their email
address. Requests about the records Tophhie Cloud controls go to
`privacy@usesigil.app`, and are answered within one month.

Sigil makes no decision about a person by automated means. It does not profile
individuals, score them, or decide anything about them without a human, so the
right not to be subject to a solely automated decision has nothing to bite on
here. That is worth stating plainly in a review, because a product that reads a
directory and renders per-person output invites the question.

## Data processing agreement

The DPA is published at `portal.usesigil.app/dpa`. Acceptance can be recorded
against your organisation, with the accepted version tracked, so there is a record
of what was agreed and when rather than an assertion that something was.

Accepting it in the portal also writes an entry to your own
[change log](/monitoring/change-log/), deliberately, so you can evidence your
acceptance from your own records rather than asking Tophhie Cloud for it.

## What the agreement commits Tophhie Cloud to

Some of the processor obligations in the agreement are worth reading on their
own, because nothing you can see in the portal evidences them.

Sigil processes your data only on your documented instructions, and the agreement
defines what those are rather than leaving it vague: the agreement itself, the
terms of use, and the configuration you make in the portal. Nothing you have not
asked for is a lawful instruction. If law compels processing beyond that, you are
told before it happens unless the law forbids the telling. An instruction that
Tophhie Cloud believes breaks data protection law is raised with you rather than
carried out quietly.

Staff authorised to handle your data are under a duty of confidentiality that
outlasts their engagement, and access is limited to the people who need it to run
or support the service. See [operator access](#vendor-operator-access) for the
controls behind that second half.

The Article 32 security measures are documented across this section of the site
rather than listed in one place: [tenant
isolation](/security/security-model/#tenant-isolation),
[authentication through Entra ID](/security/security-model/#authentication-paths)
with roles you set, [read-only Graph permissions](/deploy/permissions/) your own
administrator grants and can revoke, the
[change log](/monitoring/change-log/), and the separation of operator access from
customer access. The one measure not covered elsewhere is encryption: data is
encrypted in transit with TLS, and encrypted at rest where it is stored.

## Sub-processors and where data is stored

Three companies process data on Sigil's behalf, and the data processing
agreement names all three rather than reserving the right to add more quietly.

| Sub-processor | What it does | Where |
| --- | --- | --- |
| Microsoft | Identity through Entra ID, and directory data through Graph | Your own tenant's region |
| Cloudflare | Application hosting, storage and caching | Global edge, with data at rest in the UK or EU |
| Stripe | Subscription billing and card processing | UK, EU and US |

Your directory data and the content you author are stored in the United Kingdom
or the European Economic Area. Where one of those sub-processors moves personal
data outside the UK or EEA, the transfer runs on an adequacy decision or on the
UK Addendum to the EU Standard Contractual Clauses, which the agreement
incorporates.

Microsoft appearing on that list is worth reading carefully, because it is not
Sigil choosing a supplier. Your directory already lives in your own Microsoft
tenant, in whichever region you chose when you bought Microsoft 365, and Sigil
reads it there. Nothing about connecting Sigil moves it.

Adding or replacing a sub-processor carries 30 days' notice. If you object on
data protection grounds inside that window, you can end the affected part of the
service without penalty and get a pro-rata refund of anything prepaid. That is a
term of the agreement rather than a courtesy, which is the point of writing it
down.

## If there is a personal data breach

The agreement commits Tophhie Cloud to telling you about a personal data breach
affecting your data without undue delay, and in any event within 48 hours of
becoming aware of it.

The notice has to say what happened rather than that something happened. It
describes the nature of the breach, the categories and approximate number of
people and records involved, the likely consequences, and what has been done or
is proposed about it. Where all of that is not known at once, it is sent in
phases rather than held back until the picture is complete, because a controller
deciding whether to notify anybody needs the first facts early.

Forty-eight hours is deliberately shorter than the seventy-two your organisation
has to notify its own supervisory authority, and the reason is arithmetic. Your
clock starts when you are told, so a processor that took the full seventy-two
would leave you none. Sigil is a processor here and the obligation to notify a
regulator or the people affected stays with your organisation, which is the
reason the notice is written to be usable as the basis for that decision.

Where your organisation is managed by an IT provider in the [partner
programme](/partners/agreement/#breach-notification-reaches-you-sooner), the same
arithmetic is applied once more. The provider is told what is known within 24
hours and given the full particulars within 48, because the chain has one more
link in it and your 72 hours have to survive the extra hop. Where the provider
asks for it, or cannot be reached, Tophhie Cloud notifies your own administrators
directly rather than letting the notice stall with them.

## Auditing Sigil

Most compliance reviews are answered on paper, and the agreement says so rather
than treating a questionnaire as a favour. Tophhie Cloud will make available the
information reasonably necessary to demonstrate compliance with Article 28, and
will complete one reasonable security questionnaire in any twelve-month period.

Where that is genuinely not enough to satisfy a supervisory authority, you have a
right to audit. It runs on 30 days' notice, no more than once a year unless a
breach or a regulator requires otherwise, during business hours, subject to
confidentiality, and without access to any other customer's data. That last
condition cuts both ways and is the point of stating it: the same term protects
your organisation from somebody else's audit.

If you are working through a procurement review, most of what a questionnaire
asks for is already written down. This page and
[data and privacy](/security/data-and-privacy/) cover the processing, the
[security model](/security/security-model/) covers the controls, and the
[published agreements](#published-legal-documents) carry the commitments
themselves. Ask support for the questionnaire route when you need something
answered on your own form rather than found on a page.

## Published legal documents

| Document | Where |
| --- | --- |
| Privacy policy | `portal.usesigil.app/privacy` |
| Terms of use | `portal.usesigil.app/terms` |
| Data processing agreement | `portal.usesigil.app/dpa` |
| Support | `portal.usesigil.app/support` |
| Partner agreement | `portal.usesigil.app/partner-agreement` |

## Vendor operator access

Tophhie Cloud staff can reach customer tenants for support, and that access is
constrained rather than assumed.

Access is an explicit list rather than something implied by working at Tophhie
Cloud, with two tiers. Support staff get a read-only console plus support tooling:
tenant overview, exceptions, health, preview, audit, notes, read-only
impersonation, messaging a tenant's administrators, resending consent, and export.
Operators additionally get mutations such as suspending, reprovisioning and
deprovisioning.

Read-only impersonation is a session that expires on the server after 30 minutes,
so a replayed request stops working once the window elapses rather than relying on
the interface to stop offering it.

Destructive actions require a fresh interactive re-authentication in the moment.

The operator list cannot lock itself out: the last operator cannot be removed or
demoted.

Every operator action is written to the audit log, and every action taken on your
organisation is written to your own [change log](/monitoring/change-log/) as
well. Segregating operator access from customer access is only half a control if
the customer cannot see when it was used, so the visible half is what makes the
separation checkable from your side rather than assertable from Tophhie Cloud's.

## Proactive monitoring

A daily scan reconciles every tenant against Graph and billing and reports
anything needing attention: directory access that has lapsed, past-due billing,
trials ending within seven days, unfinished provisioning, seat drift, and a
suspended tenant whose subscription is still charging.

The last of those is a safeguard rather than a health check. Suspending an
organisation sets its billed seats to zero, so it stops accruing charges, but it
does not cancel the subscription, which stays open so the suspension can be
lifted without reprovisioning anything. The scan surfaces the open subscription
so an operator either restores the organisation or closes it properly, rather
than leaving one standing indefinitely against a tenant nobody can use.

Lapsed directory access is the one worth knowing about as a customer, because it
breaks signatures quietly. The template is still there; there is simply no data to
personalise it with. The scan catches it, and Tophhie Cloud can email your
administrators a re-consent link.

## Retention

| Data | Retention |
| --- | --- |
| Directory attributes read from Microsoft Graph | Never stored as a record of their own. Held inside a rendered signature for at most an hour |
| Template version history | Last 10 published bodies per template |
| Deleted templates | 30 days in Recently deleted, then purged by a daily sweep |
| Change log | Indefinite |
| Operator audit log | Indefinite |
| Signature telemetry | Indefinite |
| Daily click totals per tracked link | Indefinite |
| Per-click records behind the analytics splits | 90 days, then purged by a nightly sweep |
| Onboarding attempt records | Indefinite, and outside the tenant's own data |
| Sign-up diagnostics held on those records | 90 days, then cleared while the attempt stays |
| Sign-ins from an organisation that never connected | 90 days from the last sighting, then removed in full |

Deprovisioning a tenant purges all of it except the onboarding attempt records
and the diagnostics on them, which describe an attempt to connect rather than a
live organisation. That includes the indefinite rows above: telemetry and daily
totals are kept for as long as the organisation exists and go with it when it
does not. A sign-in recorded before an organisation connected is purged with that
organisation too, since the whole record is personal data rather than an account
history.

The coverage of that purge is checked automatically rather than maintained by
hand, so anything Sigil starts storing against an organisation has to be either
purged or recorded as a deliberate exception. See
[data and privacy](/security/data-and-privacy/).

## Deletion on termination, and what backups mean for it

You can export your templates, images and activity data yourself at any time from
the portal, and nothing about ending the service is a precondition for getting
them.

On termination, or on your written request at any point, your organisation's data
is deleted within 30 days, except where law requires it to be kept. The purge
itself is described in
[data and privacy](/security/data-and-privacy/#deleting-your-data), which is
about the live systems: the records, the stored images and the cached entries all
go when it runs.

Backups are the part that a purge cannot reach, and the agreement says so rather
than letting "everything is deleted" imply otherwise. A backup holding your data
is overwritten on its normal cycle, within 90 days, and stays covered by the data
processing agreement until it is. So the honest answer to "when is it all gone"
is that the live systems are cleared on the purge and the last copy expires
inside 90 days, not that both happen at once.

This matters for one kind of request in particular. If you are answering an
erasure request by deprovisioning, the date you can commit to is the backup
expiry rather than the purge, and it is better to say so than to discover the
distinction afterwards.

## What Sigil is not

Sigil does not sit in your mail flow. It writes into the compose window, so it
never sees, stores or processes the content of the messages people send.

That is a meaningful distinction for a compliance review, and it is a different
architecture from server-side signature products that rewrite mail in transit.
