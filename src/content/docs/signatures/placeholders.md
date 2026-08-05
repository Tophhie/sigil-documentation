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

## Derived helpers

| Placeholder | True when |
| --- | --- |
| `{{anyPhone}}` | The person has any phone number at all |
| `{{anyAddress}}` | The person has any address component at all |
| `{{hasPhoto}}` | The mailbox has a Microsoft 365 profile photo |

These exist for conditional sections rather than for printing. Attaching a whole
contact row to `{{#anyPhone}}` lets the entire row disappear for people with no
phone number, instead of leaving an empty label or a stray separator behind.

`hasPhoto` is resolved only when a template actually contains a Photo block,
because answering it costs a call to Microsoft Graph. A Photo block in the
[designer](/signatures/designer/) carries the condition on its own, so this is
mainly useful for hiding something that sits alongside a photo. See
[per-user images](/signatures/per-user-images/).

## Conditional sections

Wrap optional content so it disappears when the underlying attribute is empty:

```html
{{#jobTitle}}{{jobTitle}}{{#department}} &middot; {{department}}{{/department}}{{/jobTitle}}
```

Here the department and its separator only appear when there is a job title to
attach them to, and the whole thing disappears for someone with neither.

Sections nest freely. In the [designer](/signatures/designer/), the same
behaviour is available on any block through its "visible when" field.

## What the renderer guarantees

Values are HTML-escaped when they are substituted, so a directory value
containing `<` or `&` cannot break the markup or inject anything.

Any placeholder left unresolved is stripped. A literal `{{jobTitle}}` can never
reach a recipient, even if you mistype it.

## Checking before you rely on an attribute

[Attribute coverage](/monitoring/attribute-coverage/) shows which of these are
actually populated across your organisation. Run it before designing a signature
around an attribute, particularly one of the extension attributes, where
population is entirely up to each organisation.
