---
title: What's new
description: Recent changes to Sigil that admins, partners and mailbox users can see, newest first.
---

<!-- last-portal-commit: 907534d -->
<!-- last-addin-commit: a648039 -->
<!-- last-flag-check: 2026-11-13T09:09:15Z -->

This page lists changes to Sigil that you can see or need to know about, newest
first. Each entry is dated by the day the change reached Sigil and links to the
page that covers it in full. Features still in testing are left off until they
are available to every organisation.

## November 2026

### 12 November

- **The change log records more of what happens to your account.** Cancelling
  or reactivating from Billing, saving invoice details, saving a card, partner
  management requests and their answers, and a mailbox's signature download now
  each leave an entry. For invoice details, the entry names the fields that
  changed, not their values. See [Change log](/monitoring/change-log/).
- **Support actions carry an operator reference.** Entries made by Tophhie Cloud
  support now read "Sigil operator" with a short reference such as `OP-7K3F`.
  The same person always has the same reference, so you can tell their actions
  apart and quote one to support without being told who they are. See
  [Actions taken by Tophhie Cloud support](/monitoring/change-log/#actions-taken-by-tophhie-cloud-support).

### 10 November

- **Tracked links keep every query parameter.** A tracked link whose destination
  had more than one query parameter used to drop everything after the first.
  Sigil now keeps them all. Links in mail you have already sent are repaired
  too, so nobody needs to resend anything. See [Link clicks](/monitoring/link-clicks/).
- **Roles you give are limited by your own.** Someone who manages users without
  being an admin can only give a role that holds no more than their own, so
  Billing can no longer make another account an Editor. The invite dialog now
  opens on a role you're allowed to give. See [Users and roles](/admin/users-and-roles/).
- **A trial's first charge has no grace period.** If the first payment after a
  free trial fails, signatures pause straight away rather than after the usual
  grace period, and the first email you get says so. See [Billing](/admin/billing/).
- **Contact cards carry only what your signature shows.** A contact card now
  holds your name and address plus the fields your signature itself prints.
  Contact card links made before the change keep company, job title and business
  phone. See [Contact card](/signatures/contact-card/).
- **Partners can't release a client that has no admin.** Releasing a client is
  refused until the client has an admin of its own, so nobody unexpected becomes
  its admin by signing in first. See [Clients](/partners/clients/).

### 9 November

- **Choose the day your health digest arrives.** Admins can now pick the day
  the health digest is sent, and weekly and monthly digests each keep their own
  choice. A monthly digest no longer drifts earlier each month. Settings shows
  when the last digest went out and when the next one is due.
- **The digest covers the time since the last one.** Its published and feedback
  sections now run from the previous digest rather than a fixed seven days. Your
  organisation's first digest covers seven days and waits for your chosen day
  instead of going out at once. See [Health digest](/monitoring/health-digest/).

### 4 November

- **Sigil's emails follow dark mode.** The emails Sigil sends you now switch to
  a dark card when your mail app is in dark mode, and keep a clear edge in light
  mode. See [Emails Sigil sends](/admin/emails-sigil-sends/).

### 3 November

- **A new look for the portal.** The portal and Sigil's own emails use a new
  plum colour scheme, and the portal sits in a framed layout.

## October 2026

### 30 October

- **Plain-text paste and a formatting eraser in the designer.** Text you paste
  into the designer arrives as plain text, without formatting from wherever you
  copied it. A new eraser clears the formatting from highlighted text. See
  [Designer](/signatures/designer/).
- **A letterhead layout for Sigil's emails.** The account and billing emails
  Sigil sends now use a letterhead-style layout. See
  [Emails Sigil sends](/admin/emails-sigil-sends/).

### 29 October

- **Links keep their font size in Outlook.** A link inside a text block sometimes
  showed smaller than the text around it in Outlook. The designer now carries
  the block's font size onto every part of the text, links included. See
  [Designer](/signatures/designer/).

### 27 October

- **Reactivating a cancelled subscription works first time.** Reactivate no
  longer keeps failing after you save a card, and any discount you agreed now
  applies to the first invoice too. If the card is refused, the message tells
  you to add a card and try again. See [Billing](/admin/billing/).

### 26 October

- **Sigil emails you when your account changes.** You now get an email when your
  service or billing changes, including when a colleague or Tophhie Cloud
  changes what you pay. Whoever pays the bill is told, not only the person who
  made the change. Sigil also warns you a week before an API key expires. See
  [Emails Sigil sends](/admin/emails-sigil-sends/).
- **The people an action affects are told about it.** A draft's author hears
  when it is published or sent back, with the reviewer's note. Other admins hear
  when someone gains or loses admin access, and when a restore replaces later
  edits. A new organisation's first admin gets a welcome email with the trial's
  end date. See [Emails Sigil sends](/admin/emails-sigil-sends/).
- **Changes to the legal agreements reach every organisation.** A change to the
  Data Processing Agreement or the Partner Agreement is sent to every
  organisation as a service notice, which product update opt-outs don't stop.
  Adding or replacing a sub-processor carries 30 days' notice. See
  [Compliance](/security/compliance/).
- **Partners get the notices the Partner Agreement promises.** Partners are
  emailed about suspension, removal, the end of a partnership, reactivation and
  a returned client. Suspension and removal emails give the reason and the date
  they take effect. See
  [How you are told](/partners/leaving-the-programme/#how-you-are-told).
- **A lapsed client request no longer blocks the next one.** When a request to
  manage a client, or an invitation, lapses unanswered, it stops showing as
  pending and you can send another. The partner's owners and admins, and whoever
  sent it, are emailed when it lapses. See [Clients](/partners/clients/).

### 25 October

- **Prepaid blocks are confirmed by email.** When Tophhie Cloud records a
  prepaid block of mailboxes, or ends one early, whoever pays for it is emailed.
  For a partner-paid block the email names the client. See
  [Prepaid mailboxes](/admin/billing/#prepaid-mailboxes).

### 23 October

- **Partners covered by prepaid blocks aren't asked for a card.** The partner
  warning about a missing card now counts seats after any prepaid blocks, so a
  partner whose clients are all covered no longer sees it. A live branded link
  domain still needs a card, and the warning names the domains. See
  [Partner billing](/partners/billing/).

### 21 October

- **Your signature shows the moment the pane opens.** The Sigil pane in Outlook
  now shows the signature it kept from last time straight away, then checks for
  a newer one. See [My signature pane](/users/my-signature-pane/).
- **A faster portal.** Pages now load their panels only when you open them,
  card payment forms load on demand, and your browser keeps the portal's files
  between visits.
- **The change log loads a page at a time.** Long change logs now open quickly
  and offer a Load more button for older entries. See
  [Change log](/monitoring/change-log/).
- **Billing counts seats nightly.** The Billing page shows the seat count taken
  in the previous night's directory scan, and says which day it was counted,
  instead of counting every time the page opens. See [Billing](/admin/billing/).

### 19 October

- **Turn the compliance footer off for a template.** A template can now leave
  out your organisation's compliance footer. Whoever turns it off has to
  acknowledge what that means first, and the change is recorded in the change
  log. See [Footers](/targeting/footers/).

### 14 October

- **Keep campaign banners off a template.** A template can now opt out of
  campaign banners, so its signature never carries one while a campaign runs.
  See [Keeping banners off a signature](/targeting/banners/#keeping-banners-off-a-signature).

### 9 October

- **Preview, edit and test any banner.** Every banner, not only the live one,
  now has Edit and Preview, and can be sent to you as a test. The test email
  gains a banner choice, and the designer's live preview has a banner date
  picker so you can see what a signature will carry on a given day. See
  [Banners](/targeting/banners/).

### 6 October

- **Custom roles.** Admins can define their own roles in Users and roles, with
  a name, a description and the areas of the portal each one reaches. Custom
  roles appear wherever a role is chosen, and invite emails describe them. See
  [Users and roles](/admin/users-and-roles/).
- **Prepaid mailboxes.** A block of mailboxes bought up front now shows on the
  Billing page, and billing charges only for mailboxes above it. Partners see
  it on Partner billing, in Usage and in the usage export. See
  [Prepaid mailboxes](/admin/billing/#prepaid-mailboxes).

### 5 October

- **A clearer start to the free trial.** The trial sign-in screen now states the
  trial terms, links the permissions Sigil asks for, and gives a setup link you
  can pass to your IT admin. The Getting started checklist puts a working
  signature first and billing after it. See
  [Starting from the free trial](/deploy/connect-your-organisation/#starting-from-the-free-trial)
  and [Getting started checklist](/admin/getting-started-checklist/).

### 4 October

- **Deploy the add-in from the Microsoft Marketplace.** Sigil's Outlook add-in
  is listed in the Microsoft Marketplace, and the Getting started checklist now
  sends you there instead of asking you to upload a manifest. See
  [Deploy the add-in](/deploy/deploy-the-add-in/).

### 1 October

- **Pay without leaving the portal.** Adding a card now opens a payment form
  inside the portal instead of sending you to a separate checkout page, and an
  open invoice can be paid from the Documents tab. See [Billing](/admin/billing/)
  and [Invoices and credits](/admin/invoices-and-credits/).
- **Partner bills follow the average number of mailboxes.** Partners are billed
  on the average of daily mailbox counts across the period, rather than the
  count on its last day. Each partner moves over at its first billing period
  starting on or after 1 October, and the invoice explains the figure. See
  [Partner billing](/partners/billing/).

## September 2026

### 28 September

- **Live updates, and seeing who else is editing.** The portal and the designer
  now update as colleagues make changes. When someone else has the same template
  open, the editor says so. When they save a draft, you're told and can reload
  to see it, rather than having what you typed replaced. See [Publishing](/signatures/publishing/).

### 25 September

- **Prices exclude VAT.** Prices are now shown excluding VAT, and VAT is added to
  invoices where it applies. See [Billing](/admin/billing/).
- **Payment failure emails say what the bank said.** When a card payment fails,
  the email gives the bank's reason, names the card, and tells you what to do
  about that particular reason. See [Emails Sigil sends](/admin/emails-sigil-sends/).
- **Saves no longer overwrite a colleague's change.** If someone else changed a
  template since you opened it, your save is refused and your text is kept, so
  nothing is lost silently. Booking a schedule or starting a rollout over an
  existing one now asks you to confirm the replacement. See
  [Publishing](/signatures/publishing/).

### 24 September

- **Pictures of your signatures.** Each published version, and each draft sent
  for approval, now has a picture of the signature filled in for a sample
  person. Pictures appear in the template library, in version history, in the
  approval email and in the health digest. See [Previews](/signatures/previews/).
- **Ask the documentation.** A question box in the portal answers from this
  documentation and links the pages it used. See
  [Ask the documentation](/admin/ask-the-documentation/).
- **Combine conditions with and, or and not.** The designer's "Show when"
  setting opens a rules dialog where conditions can be grouped and combined.
  The HTML editor accepts the same logic. See [Designer](/signatures/designer/)
  and [HTML editor](/signatures/html-editor/).
- **The digest names who published.** Each template listed as published in the
  health digest now shows who published it. See
  [Health digest](/monitoring/health-digest/).

### 22 September

- **Branded link domains.** A new paid add-on lets tracked links in signatures
  use your own domain instead of Sigil's. You set it up in Settings, where the
  DNS record to add is shown for you to copy, and buy or drop it from Billing. See
  [Branded link domain](/monitoring/branded-link-domain/).
- **Partners can add the link domain for clients.** Partners can turn the
  branded link domain on for a client from Clients, and it is billed on the
  partner's invoice. See [Partner billing](/partners/billing/).
- **A paused mailbox isn't asked again for ten minutes.** When Sigil refuses a
  mailbox's signature, for example because delivery is paused, the add-in notes
  it on that device and waits ten minutes before asking again. After you resume
  delivery, signatures can take up to ten minutes to come back on a device. See
  [Pausing delivery](/signatures/pausing-delivery/).

### 16 September

- **Images and backups are stored in the EU.** Uploaded images and backups are
  now kept in Cloudflare's EU jurisdiction. See
  [Infrastructure](/security/infrastructure/).

### 15 September

- **Every directory attribute for the sender.** The sender fields now cover
  company, address, office, fax and the manager's name, job title, email and
  phone. See [Placeholders](/signatures/placeholders/).
- **Rules on part of a text block.** In the designer, you can highlight some
  text and give just that text its own rule, so it only shows when the rule
  matches. See [Designer](/signatures/designer/).
- **Logos keep their shape on phones.** Images in a signature now keep their
  proportions when a mail app narrows them to fit a small screen. Outlook for
  Android used to squash wide logos. See [Images](/signatures/images/).
- **More time for a first signature.** The first message from a mailbox, or from
  a device with no saved copy, now waits up to fifteen seconds for its signature
  instead of five, so fewer go out unsigned. See [Activity](/monitoring/activity/).
- **One more Microsoft address to allow.** Outlook's own runtime loads part of
  itself from `ajax.aspnetcdn.com`. If your network limits outbound addresses,
  allow it. See [Requirements](/deploy/requirements/).
- **Product update emails, with an off switch.** Admins can receive occasional
  emails about what has changed in Sigil. A switch in Settings stops them for
  the whole organisation, and each email has its own opt-out link. See
  [Settings](/admin/settings/).

### 13 September

- **Start a template from your website.** The New template dialog can read your
  logo, brand colour, address and social profiles from your public website. You
  check what it found before anything is created. See
  [Templates](/signatures/templates/).
- **Check your own signature is working.** The page for mailbox users shows
  whether Sigil last added your signature to an email, and the reason if it
  didn't. See [Your details](/users/your-details/#whether-your-signature-is-working).
- **Limits on image uploads.** Each image can be up to 1 MB, as PNG or JPEG.
  The Images page shows how many images and how much storage your organisation
  has used. See [Images](/signatures/images/) and [Limits](/reference/limits/).
- **Signature request records are kept for 90 days.** Records of individual
  signature requests and their outcomes are now deleted after 90 days. Summaries
  per mailbox and daily totals are kept while you use Sigil. See
  [Activity](/monitoring/activity/).
- **Billing details are needed before a trial converts.** A trial only becomes
  a paid subscription once your billing details are complete. Without them, the
  trial ends on its date and nothing is charged. The checklist asks for billing
  details before the payment method. See [Billing details](/admin/billing-profile/).
- **Billing is split into tabs.** The Billing page now has tabs for your
  subscription, billing details, documents and the DPA. A tab that needs
  something from you is marked. See [Billing](/admin/billing/).

### 10 September

- **Sender profile fields.** Templates can use the sender's own profile answers
  with `{{sender.custom.<key>}}`, for mail sent from a shared or delegated
  mailbox. See [Profile fields](/admin/profile-fields/).
- **Fill in profile fields for any mailbox.** Admins can add answers for a
  mailbox nobody has filled in yet, such as a shared mailbox, with Add mailbox.
  See [Profile fields](/admin/profile-fields/).

### 9 September

- **Shared mailboxes added as an account.** Sigil now works in a shared mailbox
  added as a full account in new Outlook for Windows, or opened in its own tab
  in Outlook on the web. See [Deploy the add-in](/deploy/deploy-the-add-in/).
- **See which add-in version each mailbox has.** Activity shows the add-in
  version each mailbox installed, and a notice appears when mailboxes are behind.
  See [Activity](/monitoring/activity/).
- **An audit log page of its own.** The change log moved to its own page under
  Monitoring, with filters, a CSV export and a detail view of what changed. See
  [Change log](/monitoring/change-log/).
- **People shown by name.** Across the portal, people are shown by their current
  name alongside their email address. See [Users and roles](/admin/users-and-roles/).
- **The pane's preview fits the pane.** The preview in the Sigil pane is laid out
  at the pane's own width, so text wraps rather than the whole signature being
  shrunk. See [My signature pane](/users/my-signature-pane/).

### 8 September

- **Microsoft 365 group mailboxes.** Signatures can now be targeted at mail sent
  from a group mailbox, with conditions for sent from a group mailbox and not
  sent from one. See [Group mailboxes](/signatures/group-mailboxes/).
- **Rules save as you go.** Adding, editing, removing or reordering an assignment
  rule is saved straight away. See [Assignment rules](/targeting/assignment-rules/).
- **Signatures appear faster in Outlook.** The add-in applies the signature it
  kept from the mailbox's last message at once, then checks it against the
  current one. The first message after a publish can show the old signature
  before it switches. See [Publishing](/signatures/publishing/).

### 7 September

- **A feedback board.** Help and the support page now link to the feedback board
  at `feedback.tophhie.cloud`. See [Troubleshooting](/deploy/troubleshooting/).
- **Preview an old version before restoring it.** Archived versions can be
  previewed with sample details before you restore one. See
  [Versions](/signatures/versions/).

### 6 September

- **Aliases are matched to the mailbox.** An alias typed into the exclusion or
  inclusion list is now matched to the mailbox's main address. See
  [Cost management](/admin/cost-management/).

### 5 September

- **Three ways to start a template.** The New template dialog offers a starter
  signature, a blank canvas or the HTML editor. See
  [Templates](/signatures/templates/).
- **Service status in the portal.** The portal header shows the service status,
  read from Sigil's status page. See [Infrastructure](/security/infrastructure/).
- **Include mailboxes instead of excluding them.** Cost management has an
  inclusion mode, where only the mailboxes you list get signatures and are
  billed. See [Cost management](/admin/cost-management/).
- **A sample person from a fictitious company.** The starter template and the
  sample person in previews now use Contoso, a fictitious company. See
  [Templates](/signatures/templates/).

### 4 September

- **Pay by invoice, and account credits.** Accounts can be set up to pay by
  invoice, and the Billing page lists your invoices with credits and credit
  notes beside them. See [Invoices and credits](/admin/invoices-and-credits/).
- **Bank transfers shown on Billing.** Money received by bank transfer but not
  yet applied to an invoice now shows on the Billing page. See
  [Invoices and credits](/admin/invoices-and-credits/).
- **Free arrangements with an end date.** A partner's client list shows "Free
  until" and the date when a client's free arrangement runs to a date. See
  [Clients](/partners/clients/).

### 3 September

- **Cancelling runs to the end of the paid period.** A cancelled subscription
  keeps working until the period you've paid for ends. A banner says when
  signatures aren't being served for a billing reason. See
  [Cancelling](/admin/billing/#cancelling).
- **A billing warning on every page.** People who can open Billing see a banner
  when a trial is in its last week with no card, or a failed payment is counting
  down to the date signatures stop. See [Billing](/admin/billing/).
- **A prompt to accept the DPA.** Admins see a prompt at the top of the portal
  when the Data Processing Agreement hasn't been accepted, or a newer version is
  out. See [Compliance](/security/compliance/).
- **Footer fixes.** A blank footer can no longer be saved, a leading @ on the
  domain is accepted, and editing a paused footer keeps it paused. See
  [Footers](/targeting/footers/).

### 2 September

- **Dark mode in the designer's preview.** The live preview can show a signature
  the way Outlook and Gmail recolour it in dark mode, and warns about text that
  could become hard to read. See [Dark mode](/signatures/dark-mode/).
- **Mailbox and Sender fields side by side.** The designer's field menu is split
  into Mailbox and Sender, so you choose whose details a field shows. See
  [Designer](/signatures/designer/).
- **No Google Fonts needed.** The portal, the designer and the Outlook pane now
  serve their own fonts, so Google's font hosts don't need to be reachable. See
  [Requirements](/deploy/requirements/).

### 1 September

- **Pause signatures for the whole organisation.** Delivery can be paused and
  resumed from the Templates page. See [Pausing delivery](/signatures/pausing-delivery/).
- **Help inside the portal.** A Help button opens links to the documentation and
  your support contact. For a managed organisation, that contact is its partner.
  See [Troubleshooting](/deploy/troubleshooting/).
- **Trial and payment reminders.** Sigil emails you three days and one day before
  your trial ends, and tells you when a payment fails. Partners' billing contacts
  are emailed when a partner payment fails, with the date clients' signatures
  would stop. See [Emails Sigil sends](/admin/emails-sigil-sends/).
- **Works behind data loss prevention proxies.** The add-in now sends the
  mailbox address in the body of its request rather than in the web address,
  which some data loss prevention tools blocked.
- **Clearer errors in the pane.** The Sigil pane now tells a problem at Sigil's
  end apart from not being able to reach Sigil at all. See
  [Troubleshooting](/deploy/troubleshooting/).

## August 2026

### 30 August

- **Per-client detail on partner invoices.** Partner invoices list seats for
  each client, and Usage lists the periods already invoiced. See
  [Partner billing](/partners/billing/).
- **Support actions show in your change log.** Anything Tophhie Cloud support
  does to your organisation now appears in your change log as a Sigil operator.
  See [Change log](/monitoring/change-log/).
- **Partner Agreement revised.** The revised agreement adds breach notification
  within 24 hours, the terms for leaving the programme, and 90 days' notice
  before the programme closes. Partners accept the new version. See
  [Partner Agreement](/partners/agreement/) and
  [Leaving the programme](/partners/leaving-the-programme/).

### 29 August

- **Signatures for shared mailboxes and sending on behalf.** Templates can tell
  a send from your own mailbox apart from one sent from a shared mailbox or on
  someone's behalf, and show the sender's details. See
  [Sending on behalf](/signatures/sending-on-behalf/).

### 22 August

- **An uptime commitment for partners.** The Partner Agreement commits to 99.9%
  monthly uptime with service credits, and sets out how support is split
  between partners and Tophhie Cloud. See [Service level](/partners/service-level/).

### 19 August

- **Enter adds a new line in dialogs.** Pressing Enter in a dialog's text editor,
  such as the footer's, now starts a new line instead of saving the dialog.

### 12 August

- **Sigil is provided by Tophhie Cloud Ltd.** The legal documents and Sigil's
  emails now name Tophhie Cloud Ltd, its company number and registered address.
  See [Compliance](/security/compliance/).
