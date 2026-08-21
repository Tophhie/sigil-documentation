---
title: Link clicks
description: Count clicks on signature and banner links, filter out security scanners, and read the result without ever identifying who clicked.
sidebar:
  order: 3
---

Sigil can count clicks on links in a signature. It records how many people
clicked, and describes them only in groups large enough that no one person can
be picked out of them.

## How tracking works

A tracked link is a redirect under the dedicated domain
`e-clk.usesigil.app/r/<slug>`. It responds with a 302 to the real destination and
logs the click after the redirect has already gone out, so nothing waits on the
write.

That domain serves redirects and nothing else. Every other path on it returns
404, so the portal and API surface only answer on their own hostname.

The recipient's experience is a redirect they will not notice.

## What is tracked, and what opts in

[Banner](/targeting/banners/) links are always tracked. There is no opt-out,
because measuring a campaign is the point of running one.

Templates opt in per template, using the Tracking toggle on the Templates view.
Turning it on rewrites the template's static links at render time.

## Links that are never rewritten

Any link containing a placeholder is left alone.

That covers Teams deep links built from `{{email}}`, personal booking pages held
in an extension attribute, and anything else that differs per person. Rewriting
those would produce a per-person slug, which would turn a click count into a
record of one individual's behaviour.

Leaving them alone is what keeps the analytics aggregate by construction rather
than by policy.

## What is recorded

Six things per click, and no more.

| Field | Value |
| --- | --- |
| Link | Which tracked link was followed |
| Time | When the click arrived, in UTC |
| Device class | Desktop, mobile or tablet |
| Client family | Edge, Firefox, Outlook, Chrome, Safari or Other, with no version number |
| Referring host | The host name of the referring page, never its path or query string |
| Automated or human | The verdict described below, kept so a filtered hit can be shown separately rather than dropped |

The request's user agent and referring URL are read once, turned into those
descriptors, and then discarded. Neither is written to storage, passed on or
logged anywhere.

The distinction matters more than it looks. A full user agent string carries a
build number, and a build number next to a precise timestamp is a usable
fingerprint. "Mobile, Safari, referred by outlook.office.com" describes a
population and cannot be narrowed to a person.

No IP address is logged. No recipient identity is logged. There is no cookie, no
pixel, and no way to reconstruct who clicked from what is stored.

The consequence is that Sigil can tell you a link was clicked 84 times, that
most of those were on mobile, and cannot tell you who any of them were. See
[data and privacy](/security/data-and-privacy/).

## Automated hits are counted separately

Mail security products fetch every URL in every message before the recipient
sees it. Defender Safe Links, Mimecast, Proofpoint, Barracuda and their
equivalents all do this, and chat apps do the same to build link previews. In a
400-mailbox organisation those machine fetches can outnumber the real ones.

Every click is classified on arrival. A hit is treated as automated when its
user agent names a known scanner, crawler or link preview service, when there is
no user agent at all, or when Cloudflare scores the request as automated on
plans where that score is available.

Filtered hits are kept rather than dropped. They appear as their own figure and
can be overlaid on the chart, because a filter nobody can inspect is a filter
nobody should trust.

The classifier is deliberately broad. A false positive loses one click from a
count; a false negative inflates a campaign's numbers and misleads whoever reads
them. Where it has to guess, it guesses towards the machine.

One seam is worth knowing about. Clicks logged before classification existed
were reclassified retrospectively from the user agent alone, and a scanner that
copies a real browser's user agent cannot be identified after the fact. Older
totals are therefore slightly inflated. Only clicks recorded since then get the
full treatment.

## Reading the numbers

The Link clicks view covers a window you choose: 7 days, 30 days, 90 days or 12
months.

Four figures sit at the top:

| Figure | What it means |
| --- | --- |
| Clicks | Human clicks in the window, with the change against the previous window of the same length |
| Per 1,000 signatures | Clicks divided by signatures applied, as a rate |
| Filtered as automated | Machine hits excluded from every other number on the page |
| Tracked links | How many links exist, and how many banners and templates got clicks |

Below them, clicks over time is a daily bar chart in UTC days, with a toggle to
show the filtered hits alongside the real ones. Then a rollup by banner and
template rather than by bare URL, which is what answers "how did the summer
campaign do" when one banner points at three destinations. A banner or template
that has since been deleted keeps its clicks and is labelled as removed rather
than left under a bare id.

After that come the splits: device, client and referring page. Most clicks show
a referring page of "Direct / hidden", because mail clients strip the header.
That is reported rather than quietly dropped, since "we mostly cannot tell" is
the honest answer and leaving those rows out would imply the visible hosts were
the whole picture.

Last is a weekday by hour grid of when clicks arrive, in UTC, and the table of
every tracked link with a 30-day trend line on each row. Any row opens that
link's own page, which is the same set of charts narrowed to one link plus its
all-time total.

## Per 1,000 signatures

A click count with no base rate cannot be compared to anything. Three hundred
clicks is good or dreadful depending on how many signatures went out underneath
it.

The denominator is successful add-in applies. That is a proxy and the portal
labels it as one: an apply is a compose, not a send and not a read. It is the
right order of magnitude and it moves with the same things clicks move with,
which is enough to make two campaigns comparable to each other.

When no signature activity has been recorded the rate shows a dash rather than
zero, because no base rate is a different statement from no interest.

## What reaches back how far

Two copies of the history exist and they answer different questions.

| Data | Retention |
| --- | --- |
| Daily click totals per link | Indefinite |
| Per-click records | 90 days, then purged by a nightly sweep |

Totals and the daily chart come from the rollup, so they reach back to the day a
link was created. The device, client, referring page and hour-of-day splits are
computed from the per-click records, so they only cover the last 90 days.

That asymmetry is deliberate. The per-click detail is the part with a privacy
cost, so it is the part that expires, while the counts that carry no such cost
are kept. When the window you pick is longer than 90 days, the portal states the
date the splits actually start from rather than showing a short window as though
it were the whole period.

## Things worth remembering when interpreting them

A signature link is seen by every recipient of every message, so raw totals
reflect mail volume as much as interest. Comparing a banner against a previous
banner over a similar period is more informative than any absolute number.

All days are UTC days. An organisation working in one time zone will see its
evenings split across two bars.

Filtering removes the automated hits Sigil can recognise. A scanner that
faithfully impersonates a browser and sends no other tell is indistinguishable
from a person, so a small residue of machine traffic remains in the human count.

## Who can see them

Admins, the Marketing [role](/admin/users-and-roles/) and the Viewer role.
Marketing reaches banners and link click analytics; Viewer reads them without
being able to change anything. Editors do not reach link clicks.

## Turning tracking off

Toggle Tracking off for a template and its links stop being rewritten at render
time. Links already sent in existing messages keep working, because the redirect
records remain valid.
