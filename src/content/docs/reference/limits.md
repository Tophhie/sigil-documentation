---
title: Limits and timings
description: The hard limits Sigil and Outlook impose, and how long each kind of change takes to reach users.
sidebar:
  order: 2
---

## Signature limits

| Limit | Value | Imposed by |
| --- | --- | --- |
| Rendered signature size | Under 30,000 characters | Outlook |
| Image formats | PNG and JPG. No SVG | Outlook |
| Image delivery | Inline `cid:` attachments, not hosted URLs | Outlook |

The size limit applies to the HTML, including any [footer](/targeting/footers/).
Attached images do not count toward it. A publish that would exceed it is
blocked in the portal.

See [Outlook constraints](/signatures/outlook-constraints/).

## Designer limits

| Limit | Value |
| --- | --- |
| Blocks per design | 200 |
| Columns per row | 6 |
| Nested rows | 4 deep |
| Canvas width | 100 to 900 pixels |
| Text size | 6 to 72, in pixels or points |
| QR code size | 60 to 400 pixels |
| Profile photo size | 16 to 400 pixels |
| Border width | 1 to 20 pixels |
| Block minimum height | 1 to 600 pixels |

A design that breaks one of these is rejected at publish with a message naming
the block at fault. See [the designer](/signatures/designer/).

## Retention

| Data | Retention |
| --- | --- |
| Template version history | Last 10 published bodies per template |
| Recently deleted templates | 30 days, then purged by a daily sweep |
| Change log | Indefinite |
| Signature telemetry | Indefinite |
| Link click counts | Indefinite |
| Operator audit log | Indefinite |

## How long changes take to reach users

| Change | Time |
| --- | --- |
| Template publish | Seconds |
| Staged publish, for the mailboxes in the slice | Seconds |
| Promoting or abandoning a staged rollout | Seconds |
| Version restore | Seconds |
| Image upload or replacement | Seconds |
| Footer edit | Seconds |
| Banner window opening or closing | Immediately |
| Assignment rules change | Up to 10 minutes |
| Directory attribute change in Entra | Within the cache lifetime, without a republish |
| Microsoft 365 profile photo added or changed | Up to a day |
| Add-in manifest change | Requires redeploy, plus 6 to 72 hours propagation and fresh consent |
| Initial add-in deployment | 6 to 72 hours propagation |

Assignment rules are slower than template edits because evaluating a rule needs
directory data, so the per-mailbox result is cached for ten minutes.

## Staged rollout defaults

| Item | Value |
| --- | --- |
| Percentage steps | 10, 25, 50, then everyone |
| Rollouts per template | One at a time |
| Evaluation frequency | Every 15 minutes |
| Apply outcomes needed before any decision | 20 on the new version |
| Soak per step | 60 minutes |
| Failure rate that can trigger a rollback | Above 10% |
| Margin over the current version needed to call it a regression | 5 percentage points |

Both conditions on the last two rows must hold before a rollout is pulled. See
[staged rollouts](/signatures/staged-rollouts/).

## Trial and billing

| Item | Value |
| --- | --- |
| Trial length | 14 days |
| Price | £0.70 per licensed mailbox per month |
| Billing period | Monthly |
| Billable seat | A licensed member mailbox |
| Free | Shared and resource mailboxes, guests, disabled accounts |
| Seat sync | Daily, with no mid-cycle proration |

Once a trial ends without an active subscription, signatures stop being served.
See [billing](/admin/billing/).

## Client support

| Client | Automatic on compose | "My signature" pane |
| --- | --- | --- |
| Outlook on Windows, classic and new | Yes | Yes |
| Outlook on the web | Yes | Yes |
| Outlook on Mac | Yes | Yes |
| Outlook for iOS and Android | Yes | No |

Only one event-based add-in runs at a time. If several are deployed, they run
sequentially.

## Operator session limits

| Item | Value |
| --- | --- |
| Read-only impersonation session | 30 minutes, expiring on the server |
| Destructive operator actions | Require fresh interactive re-authentication |
