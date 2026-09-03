---
title: Placeholders
description: The full list of directory placeholders a Sigil template can use, and how conditional sections work.
sidebar:
  order: 4
---

A placeholder is a token such as `{{jobTitle}}` that is replaced with directory
data when a signature is rendered. Coverage roughly matches the Microsoft 365
attribute set you would expect from a signature product.

The list is defined once on the server and offered to both editors through the
API, so the pickers cannot drift from what the renderer resolves. If a
placeholder appears in the autocomplete list, it renders.

## Identity

| Placeholder | Directory source |
| --- | --- |
| `{{displayName}}` | `displayName` |
| `{{firstName}}` | `givenName` |
| `{{lastName}}` | `surname` |
| `{{email}}` | The sending address. Also builds the Teams deep link |

`{{email}}` is the address the message is actually being sent from, which may be
an alias rather than the mailbox's primary address. See
[how it works](/start/how-it-works/#the-sending-address-not-the-mailbox).

## Contact

| Placeholder | Directory source |
| --- | --- |
| `{{businessPhone}}` | The first entry in `businessPhones` |
| `{{mobilePhone}}` | `mobilePhone` |
| `{{fax}}` | `faxNumber` |
| `{{contactCardUrl}}` | Not a directory attribute. A signed link to the sender's own downloadable vCard |

`{{contactCardUrl}}` is the one placeholder here that Sigil supplies rather than
reads from the directory. It is a URL, so its natural use is the target of a
"Save my contact" button rather than something printed, and it resolves to
nothing where the feature is unconfigured, so wrap it in a conditional section.
See [the contact card link](/signatures/contact-card/).

## Role

| Placeholder | Directory source |
| --- | --- |
| `{{jobTitle}}` | `jobTitle` |
| `{{department}}` | `department` |
| `{{companyName}}` | `companyName` |
| `{{employeeId}}` | `employeeId` |
| `{{employeeType}}` | `employeeType` |

## Address

| Placeholder | Directory source |
| --- | --- |
| `{{streetAddress}}` | `streetAddress` |
| `{{city}}` | `city` |
| `{{state}}` | `state` |
| `{{postalCode}}` | `postalCode` |
| `{{country}}` | `country` |
| `{{officeLocation}}` | `officeLocation` |

Note that `city` often holds a compound value in practice, such as "Hoyland,
Barnsley". Check [attribute coverage](/monitoring/attribute-coverage/) to see how
your own directory is populated before you build a layout around it.

## Manager

| Placeholder | Directory source |
| --- | --- |
| `{{managerName}}` | The manager's display name |
| `{{managerJobTitle}}` | The manager's job title |
| `{{managerEmail}}` | The manager's mail address |
| `{{managerPhone}}` | The manager's phone number |

Manager is a navigation property rather than a plain attribute, so Graph only
returns it when it is expanded explicitly. Sigil does that on the compose path
and in [attribute coverage](/monitoring/attribute-coverage/), and leaves it off
everywhere else that does not read manager at all.

People with no manager set in the directory resolve these as empty, so wrap them
in a conditional section.

## Sender

Every other placeholder on this page describes the mailbox a message goes out
from. For `sales@`, `{{displayName}}` is "Sales", which is correct for the
address and wrong for the person who wrote the message. The sender placeholders
are that person.

Each is an ordinary field name with `sender.` in front of it.

| Placeholder | Resolves to |
| --- | --- |
| `{{sender.displayName}}`, `{{sender.firstName}}`, `{{sender.lastName}}` | Their names |
| `{{sender.jobTitle}}`, `{{sender.department}}` | Their role |
| `{{sender.employeeId}}`, `{{sender.employeeType}}` | Their employee number and employee type |
| `{{sender.email}}`, `{{sender.businessPhone}}`, `{{sender.mobilePhone}}` | How to reach them directly. The address is their primary one |
| `{{sender.extensionAttribute1}}` through `{{sender.extensionAttribute15}}` | Their own [extension attributes](#extension-attributes), which a regulated organisation typically uses for a personal licence or reference number |

Not everything the mailbox offers is available here, and the omissions are
deliberate. The address lines, the office and the company name describe a site or
a brand rather than a person, so the mailbox's own are the ones to print. The
manager's details, the profile photo and the
[contact card link](/signatures/contact-card/) are left out for the same reason.
A signature mixing the shared mailbox's brand with the delegate's postal address
would be worse than one that mixed nothing.

Sender fields differ from the mailbox's own only when a message is sent from a
shared or delegated mailbox. On an ordinary send they resolve to the mailbox's own
values, which is what lets one template carry both cases rather than needing a
second one for the shared mailbox.

Pair them with the `{{onBehalfOf}}` condition below to add an "on behalf of"
clause that appears only when there is somebody to name. See
[sending on behalf of a mailbox](/signatures/sending-on-behalf/) for the whole
picture, including what a delegate with a sparse directory record gets and which
surfaces fill these fields at all.

## Extension attributes

| Placeholder | Directory source |
| --- | --- |
| `{{extensionAttribute1}}` through `{{extensionAttribute15}}` | `onPremisesExtensionAttributes` |

The fifteen extension attribute slots are exposed under their raw names rather
than friendly ones such as `pronouns` or `bookingUrl`. Sigil cannot enforce a
single meaning per slot across organisations, so the meaning lives in your
template.

Two Graph behaviours are worth knowing. These attributes are only returned when
explicitly selected, which Sigil does. And they are writable for cloud-only users
but read-only for users synced from on-premises Active Directory, so populating
them may mean changing AD rather than Entra.

## User profile fields

| Placeholder | Source |
| --- | --- |
| `{{custom.<key>}}` | A field your organisation defined, filled in by the person themselves |

These are the one group here that does not come from the directory at all. An
administrator defines which fields exist, and each colleague fills in their own
values at `portal.usesigil.app/me`. Pronouns, a personal booking link and a
direct line are the usual cases: things nobody wants an administrator
maintaining on 200 people's behalf.

The `custom.` prefix is reserved, so a built-in placeholder added to Sigil later
can never collide with a key your organisation is already using, and anybody
reading your template can tell a directory value from something a colleague
typed.

They appear in the field picker in both editors under a "User profile" heading,
after the directory groups. The group is last because it is the only one whose
contents differ between two organisations looking at the same picker.

Somebody who has not filled in a field renders as empty, exactly like a sparse
directory attribute, so wrap these in a conditional section. Nothing here is
read from or written back to Entra.

See [profile fields](/admin/profile-fields/) for defining them, and
[filling in your own details](/users/your-details/) for the page people use.

## Derived helpers

| Placeholder | True when |
| --- | --- |
| `{{anyPhone}}` | The person has any phone number at all |
| `{{anyAddress}}` | The person has any address component at all |
| `{{hasPhoto}}` | The mailbox has a Microsoft 365 profile photo |
| `{{onBehalfOf}}` | Somebody is sending on the mailbox's behalf, rather than the mailbox sending for itself |

These exist for conditional sections rather than for printing. Attaching a whole
contact row to `{{#anyPhone}}` lets the entire row disappear for people with no
phone number, instead of leaving an empty label or a stray separator behind.

`hasPhoto` is resolved only when a template actually contains a Photo block,
because answering it costs a call to Microsoft Graph. A Photo block in the
[designer](/signatures/designer/) carries the condition on its own, so this is
mainly useful for hiding something that sits alongside a photo. See
[per-user images](/signatures/per-user-images/).

`onBehalfOf` is the switch behind an "on behalf of" clause. It is the only
derived helper that can be true for one person sending from a mailbox and false
for another, which is why it exists rather than leaving you to compare a name
against an address. See
[sending on behalf of a mailbox](/signatures/sending-on-behalf/).

## Conditional sections

Wrap optional content so it disappears when the underlying attribute is empty:

```html
{{#jobTitle}}{{jobTitle}}{{#department}} &middot; {{department}}{{/department}}{{/jobTitle}}
```

Here the department and its separator only appear when there is a job title to
attach them to, and the whole thing disappears for someone with neither.

Sections nest freely, and nesting is how you combine conditions. The example
above shows content that appears only when both attributes are present.

In the [designer](/signatures/designer/), the same behaviour is available on any
block through its "visible when" field.

### Sections that open on either of two fields

You may see a section written with a vertical bar in it, which opens when any one
of the fields it names has a value:

```html
{{#custom.linkedin|custom.github}}<tr>…</tr>{{/custom.linkedin|custom.github}}
```

This form is written by the [designer](/signatures/designer/) rather than by you,
and you will only meet it if you open a designer template in the HTML editor. It
exists for the one thing nesting cannot express: a container that has to
disappear when none of several independent things inside it survive, which is
what a row of social icons each hanging off a different attribute needs. Nesting
can only say "and".

The syntax stays this small on purpose. There is no negation, no grouping and no
precedence to get wrong. There is no reason to write one by hand.

A section like this counts as using every field it names, so all of them appear
in [attribute coverage](/monitoring/attribute-coverage/) and in the
[health digest](/monitoring/health-digest/).

## What the renderer guarantees

Values are HTML-escaped when they are substituted, so a directory value
containing `<` or `&` cannot break the markup or inject anything.

User profile fields get a second layer, because they are the only values here a
colleague types rather than an administrator controls. What each field accepts is
checked when it is saved rather than when it is rendered.

Part of that check applies to every field regardless of its type: a value that
looks like a link has to be an ordinary `http` or `https` one. A link target that
is entirely one placeholder cannot be checked at render time, since Sigil cannot
know the value in advance, so a text field is held to the same rule as a Link
field. See [profile fields](/admin/profile-fields/#one-check-applies-to-every-type).

Any placeholder left unresolved is stripped. A literal `{{jobTitle}}` can never
reach a recipient, even if you mistype it.

## Checking before you rely on an attribute

[Attribute coverage](/monitoring/attribute-coverage/) shows which of these are
actually populated across your organisation. Run it before designing a signature
around an attribute, particularly one of the extension attributes, where
population is entirely up to each organisation.
