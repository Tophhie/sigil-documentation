---
title: Ask the documentation
description: A question box inside the portal that answers from this documentation and links the pages it drew on.
sidebar:
  order: 12
---

This documentation runs to about seventy pages. Most of the time the problem is
not that the answer is missing, it is that you do not know which page holds it,
so you leave the portal, search, read something adjacent, and come back.

Ask the documentation is a question box inside the portal for exactly that
moment. You type the question in your own words, and an answer comes back written
from these pages, with links to the ones it drew on.

This is being rolled out gradually, so it may not be switched on for your
organisation yet. Nothing about it changes what your users receive, and nothing
in the portal depends on it.

## Where it is

There are two ways to it, and both are the same conversation.

| Where | What it looks like |
| --- | --- |
| Every page of the portal | A sparkle button in the bottom right corner. It opens a panel over the page you are on, so you can ask without losing your place |
| Help, in the portal sidebar | The question box sits at the top of the dialog, above the documentation and support links |

The bubble keeps your conversation while you move between pages. The Help dialog
forgets it when you close the dialog, which is what closing a dialog means.

It is not in the "My signature" pane in Outlook, and not on the
[your details](/users/your-details/) page. Those are for the people whose
signature Sigil manages, not for the people configuring it.

## Asking a question

1. Choose the sparkle button in the bottom right of any portal page, or choose
   Help in the sidebar.
2. Type the question into the box at the bottom. It reads
   "How do I exclude a shared mailbox?" until you do.
3. Press Enter, or choose the send arrow. Shift and Enter together make a new
   line instead of sending.
4. Read the answer, then follow one of the links under "From these pages" to the
   page it came from.

While the answer is being written the panel says "Searching the documentation".
An answer is normally a few seconds.

## Following up

A second question carries the conversation, so "what about for a group?" means
what it says rather than starting again from nothing.

The box changes to read "Ask a follow-up" once there is something to follow up.
To drop the thread and start clean, choose the new conversation control in the
panel's header, or close and reopen the Help dialog.

The transcript is your browser's and nobody else's. It is sent back with each
follow-up so the question can be understood in context, it is bounded at the last
eight messages, and it is stored nowhere. Signing out or closing the tab ends it.

## Where the answers come from

Only from this documentation site. Sigil keeps a search index of the public pages
at `docs.usesigil.app`, and each question retrieves the passages that match,
which a model then answers from.

That is a deliberate limit rather than a shortcoming. What the documentation says
is what Sigil promises, and an answer drawn from anything else is a promise
nobody made.

Under each answer, "From these pages" links the pages the passages came from, at
most four, best match first. A page whose match is weak is not listed at all: a
link under a confident answer is a claim that the page answers the question, and
listing near misses teaches you to stop reading the links.

When the documentation changes, the index catches up within about six hours, so an
answer can trail a very recent change by part of a day.

## What it will not answer

It reads the documentation. It cannot read your organisation.

| Question | Where it goes instead |
| --- | --- |
| "Why isn't the signature showing for one person?" | It explains the reasons a signature does not apply, and cannot look up that mailbox. See [troubleshooting](/deploy/troubleshooting/) and [activity](/monitoring/activity/) |
| "Which template will Sam get?" | The rules simulator answers it against your real rules. See [assignment rules](/targeting/assignment-rules/) |
| "What are we paying?" | [Billing](/admin/billing/) in the portal. The answer here can only describe how billing works |
| "Change this setting for me" | It writes nothing and does nothing. Every change is still yours to make |

It also has no access to the operator side of the service, your invoices, or
anybody's directory record.

## Answers can be wrong

The panel says so under every answer, every time, rather than once. The line
reads "Answers are written by an AI model from the documentation and can be wrong.
Check the page it links before you act on one, and leave people's details out of
your question."

Both halves of that are meant. The model is instructed to answer only from the
passages it was given, to say plainly when they do not contain the answer, and
never to state a setting, price, limit or time frame the documentation does not.
It can still read a page badly. The links are there so you can check, and the
page is the authority where the two differ.

If the answer and the documentation disagree, the documentation is right. Tell us
through Help, and we will fix whichever of the two is wrong.

## What happens to your question

Nothing is kept.

| | |
| --- | --- |
| Stored by Sigil | No. The question and the answer are not written to any database, and the service's own log line records how long the answer took and how many pages it cited, never the text |
| Stored by Cloudflare | No. The similarity cache that would otherwise hold question and answer pairs is switched off, and request logging is off on the gateway the requests pass through |
| Used to train a model | No. Cloudflare does not use content sent to its AI service to train models |
| Visible to other people in your organisation | No. A conversation exists in your browser and nowhere else, and it is not in the [change log](/monitoring/change-log/) |

The question is processed by Tophhie Cloud as a controller in its own right,
rather than on your organisation's behalf, because it is text an administrator
typed rather than directory data or signature content. The privacy policy in the
portal carries a row for it. See [data and privacy](/security/data-and-privacy/).

Ask about the product, not about people. The instruction to leave people's
details out of the question is there because a question is sent for inference,
and the surest way for a colleague's details not to be processed is for them not
to be in the question in the first place. Nothing needs them: "how do I exclude a
shared mailbox" gets the same answer as the version with the address in it.

## Who can use it

Everyone with a portal role, including Viewers, and partner staff working in a
client's portal. Every role gets stuck, and the answers describe the
documentation rather than your data, so there is nothing here to restrict by
role. See [roles and capabilities](/reference/roles-and-capabilities/).

It is not available to [API keys](/admin/api-keys/). A key is a script, and a
script wants the pages themselves rather than prose about them.

## What it costs

Nothing. It is not priced, not an add-on, and not counted against anything on
your bill.

## Limits

| Item | Value |
| --- | --- |
| Question length | 3 to 500 characters |
| Conversation carried into a follow-up | The last 8 messages |
| Pages cited under an answer | Up to 4 |
| Questions per administrator per organisation | 20 a minute |
| How long an answer may take | 25 seconds, after which it asks you to try again |

## When something goes wrong

| What you see | What it means |
| --- | --- |
| "Ask a question of between 3 and 500 characters." | The box was empty, nearly empty, or holds something longer than a question |
| "That took too long. Try a shorter question." | The answer did not arrive within 25 seconds. Asking again usually works |
| "The documentation couldn't be searched just now. Try again shortly." | The search service did not answer. Nothing is wrong with your organisation's signatures |
| "Documentation search isn't available right now." | The feature is temporarily unavailable across the service |
| "Documentation search is not turned on for your organisation." | It has not reached your organisation yet |
| A message about waiting a moment | More than 20 questions in a minute from you. Nothing is lost, and the next one works |

None of these affect anything else. Signatures, publishing and delivery do not
depend on this feature, and the documentation site itself is always there to read
directly.

## Still stuck

An answer that does not resolve it is a support case, and Help is where that
starts. The same dialog carries the support address, the response commitment, and
your IT provider's details if one manages Sigil for you. See
[troubleshooting](/deploy/troubleshooting/#still-stuck).
