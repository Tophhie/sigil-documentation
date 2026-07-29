---
title: Link clicks
description: Count clicks on signature and banner links without recording who clicked.
sidebar:
  order: 3
---

Sigil can count clicks on links in a signature. It records how many people
clicked, not who.

## How tracking works

A tracked link is a redirect under the dedicated domain
`e-clk.usesigil.app/r/<slug>`. It responds with a 302 to the real destination and
logs the click.

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

A count per link. That is all.

No IP address is logged. No recipient identity is logged. There is no cookie, no
pixel, and no way to reconstruct who clicked from what is stored.

The consequence is that Sigil can tell you a link was clicked 84 times and cannot
tell you by whom, which is the intended trade. See
[data and privacy](/security/data-and-privacy/).

## Reading the numbers

The Link clicks view shows click totals per tracked link.

Two things are worth remembering when interpreting them. Some mail clients and
security products follow links automatically to scan them, which inflates counts
slightly. And a signature link is seen by every recipient of every message, so
raw totals reflect mail volume as much as interest.

Comparing a banner's performance against a previous banner over a similar period
is more informative than looking at an absolute number.

## Who can see them

The Marketing [role](/admin/users-and-roles/) reaches banners and link click
analytics. Admins see them too. Editors do not.

## Turning tracking off

Toggle Tracking off for a template and its links stop being rewritten at render
time. Links already sent in existing messages keep working, because the redirect
records remain valid.
