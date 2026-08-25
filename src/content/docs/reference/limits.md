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
| Column width | 1 to 100 per cent, or 1 to 900 pixels |
| Text size | 6 to 72, in pixels or points |
| Line height | 6 to 120 |
| Block padding, per side | 0 to 200 pixels |
| Image width and height | 1 to 1000 pixels |
| QR code size | 60 to 400 pixels |
| Profile photo size | 16 to 400 pixels |
| Social icon size | 8 to 128 pixels |
| Gap between social icons | 0 to 60 pixels |
| Built-in social marks | 27, being 24 networks plus website, email and phone |
| Button corner radius | 0 to 40 pixels |
| Button padding, horizontal and vertical | 0 to 60 pixels |
| Divider thickness | 1 to 20 pixels |
| Divider width | 1 to 100 per cent |
| Spacer height | 1 to 200 pixels |
| Border width | 1 to 20 pixels |
| Block minimum height | 1 to 600 pixels |

A design that breaks one of these is rejected at publish with a message naming
the block at fault. See [the designer](/signatures/designer/).

These are ceilings rather than recommendations. A signature is read in a preview
pane a few hundred pixels wide, so the useful range for most of them sits well
below the maximum.

## Assignment rules

| Item | Value |
| --- | --- |
| Rules per organisation | 100 |
| Attributes a rule can match on | 10 |
| Values in one attribute rule | No limit, comma separated |
| How a group is named | Its Entra object id, typed or pasted, not checked when saved |
| Roles a rule must set | At least one of new messages and replies |

See [assignment rules](/targeting/assignment-rules/).

## Retention

| Data | Retention |
| --- | --- |
| Template version history | Last 10 published bodies per template |
| Recently deleted templates | 30 days, then purged by a daily sweep |
| Change log | Indefinite |
| Signature telemetry | Indefinite |
| Daily click totals per tracked link | Indefinite |
| Per-click records behind the analytics splits | 90 days, then purged by a nightly sweep |
| Operator audit log | Indefinite |
| Onboarding attempt records | Indefinite, and kept after a deprovision |
| Sign-up diagnostics held on those records | 90 days, then cleared while the attempt stays |
| Sign-ins from an organisation that never connected | 90 days from the last sighting, then removed in full |

Click totals and the daily chart outlive the per-click records they were built
from, so they reach back to the day a link was created. The device, client,
referring page and hour-of-day splits are computed from the per-click records
and therefore only cover the last 90 days. See
[link clicks](/monitoring/link-clicks/).

## How much of the change log you can read at once

| Item | Value |
| --- | --- |
| Entries on the portal's Template changes card | Most recent 100, paged |
| Entries in a tenant export | Most recent 5,000 |

Both are display limits rather than retention ones. The card also narrows to the
changes that alter what a signature looks like, so role changes, exclusions, API
keys and settings are recorded without appearing on it. See the
[change log](/monitoring/change-log/).

## Link analytics windows

| Item | Value |
| --- | --- |
| Windows offered in the portal | 7 days, 30 days, 90 days, 12 months |
| Shortest and longest window the API accepts | 7 to 365 days, clamped rather than rejected |
| Trend column on the links table | Last 30 days |
| Referring hosts shown before the tail is bucketed | 8 |

## How long changes take to reach users

| Change | Time |
| --- | --- |
| Template publish | Seconds |
| Staged publish, for the mailboxes in the slice | Seconds |
| Promoting or abandoning a staged rollout | Seconds |
| Scheduled publish | Within 15 minutes after its instant, never before |
| Version restore | Seconds |
| Image upload or replacement | Seconds |
| Footer edit | Seconds |
| Banner window opening or closing | Immediately |
| Assignment rules change | Next compose |
| Directory change affecting which rule matches | Up to 10 minutes |
| Profile field value saved, by anybody in the organisation | Next compose |
| Directory attribute change in Entra | Up to an hour, without a republish |
| Microsoft 365 profile photo added or changed | Up to a day |
| Add-in manifest change | Requires redeploy, plus 6 to 72 hours propagation and fresh consent |
| Initial add-in deployment | 6 to 72 hours propagation |

The two rules rows are different events. Saving a rule list changes the version
its cached decisions are filed under, so the edit lands on the next compose. A
change made in Entra changes nothing in Sigil, so a cached decision has to reach
the end of its ten minute life before the new department or group can route
somebody differently.

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

## Scheduled publishing

| Item | Value |
| --- | --- |
| Pending schedules per template | One. Booking a second replaces the first |
| Furthest ahead a publish may be booked | 365 days |
| How often schedules are checked | Every 15 minutes |
| Retries after a failed schedule | None. The failure and its reason are kept |

See [scheduled publishing](/signatures/scheduled-publishing/).

## Approval and settings

| Item | Value |
| --- | --- |
| Publish approval | Off by default, per organisation |
| Rejection note | Required, and kept up to 1,000 characters |
| Approving your own submission | Permitted, and recorded as such |
| Profile editing | Off by default, per organisation |
| Health digest | Weekly by default. Weekly, monthly or off |

See [publish approval](/signatures/approvals/) and
[the health digest](/monitoring/health-digest/).

## Profile fields

| Item | Value |
| --- | --- |
| Fields per organisation | 24 |
| Field key | Starts with a lower-case letter, then letters and numbers, up to 32 characters |
| Field label | 60 characters |
| Help text | 200 characters |
| Types | Text, choice, URL, email, phone |
| Options on a choice field | 1 to 24, each up to 100 characters |
| Maximum length of a value | 500, and never above the field's own maximum |
| Default maximum length | 200 characters |
| Whole profile per mailbox | 8 KB |
| Renaming a field key | Not offered. Delete and re-add |
| Saves per mailbox | Rate limited, well above normal use |

A required field is advisory. One nobody filled in renders empty rather than
failing a compose. See [profile fields](/admin/profile-fields/).

## API keys

| Item | Value |
| --- | --- |
| Keys per organisation | No limit |
| Key name | 80 characters |
| Expiry | Optional, and must be in the future |
| Times the secret is shown | One, at creation |
| Requests per key | 600 a minute, then 429 until the rate falls back under it |
| Requests presenting a key, per calling address | 2,000 a minute, counting invalid keys as well as valid ones |
| Resolution of "last used" | One hour |
| Effect of revoking | Immediate, and irreversible |
| Endpoints reachable | Only those on the allow-list shown in the portal. Anything else answers 404 |

See [API keys](/admin/api-keys/).

## Trial and billing

| Item | Value |
| --- | --- |
| Trial length | 14 days |
| Price | £0.70 per licensed mailbox per month |
| Billing period | Monthly |
| Billable seat | A licensed member mailbox that has not been excluded |
| Free | Shared and resource mailboxes, accounts invited in from outside, disabled accounts, excluded mailboxes |
| Longest agreed discount term | 60 months, or open-ended |
| Seat sync | Daily, with no mid-cycle proration |
| Exclusion suggestion window | 90 days without a successful apply |
| Exclusion note | 200 characters |

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
