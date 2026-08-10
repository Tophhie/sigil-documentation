---
title: Profile fields
description: Custom fields your colleagues fill in about themselves, how they reach a signature, and who can see what people entered.
sidebar:
  order: 5
---

Every other placeholder Sigil resolves comes from your Microsoft 365 directory.
Profile fields are the exception. They are fields you define, filled in by the
people whose signatures carry them.

Pronouns, a personal booking link, a Teams number, an office nickname,
"currently working Tuesday to Thursday". None of these are directory attributes
anybody wants an administrator maintaining on 200 people's behalf, and several
of them change faster than any offboarding runbook.

These fields are custom. Nothing here is read from Entra, and nothing here is
written back to it. If a value belongs in the directory, it belongs in the
directory.

## The two halves

You decide which fields exist, on this page. Your colleagues fill them in at
`portal.usesigil.app/me`, which is covered in
[filling in your own details](/users/your-details/).

Both halves have to be in place. A field with nobody able to edit it stays
empty, and a portal switched on with no fields in it is a link to an empty page.
The page says so when either is missing.

## Defining a field

| Property | What it does |
| --- | --- |
| Key | Becomes the placeholder `{{custom.<key>}}`. Lower-case letter first, then letters and numbers only |
| Label | What your colleagues see above the input |
| Help | Optional line under the input, where you explain what you want |
| Type | Also the validation. See below |
| Options | The permitted values for a choice field |
| Required | Advisory. Prompts on the profile page and counts towards completion |
| Maximum length | Defaults to 200 characters, and can be anything up to 500 |
| Available | Whether the field appears on the profile page and in the field picker |

The key cannot be changed after the field is created. Renaming it would silently
break every template referencing the old token, so Sigil does not offer it. If
you need a different key, delete the field and add a new one, which at least
says what it is doing.

Required does not mean enforced. A required field somebody has not filled in
renders empty rather than failing. A signature must never go missing from a
message because a colleague skipped a form, so the flag drives the prompt on the
profile page and the completion count on this one, and nothing else.

## Types, and why they are the validation

The type is not decoration. These are the first values Sigil interpolates into a
signature that an administrator did not control, so what a field accepts is what
stops a bad value reaching a recipient's inbox.

| Type | Accepts |
| --- | --- |
| Text | Anything, up to the field's maximum length |
| Choice | One of the options you listed, and nothing else |
| URL | A full web address beginning `http://` or `https://` |
| Email | An address of the usual shape |
| Phone | Digits and the punctuation phone numbers are written with |

Choice is a rejection rather than a suggestion. A value that is not on your list
is refused on save.

### One check applies to every type

Whatever the type, a value that looks like a link is restricted to ordinary
`http` and `https` addresses. Something like a `javascript:` link is refused from
a text field just as firmly as from a URL one.

That is deliberately not a rule of the URL type, because a type is a statement
about what a field is for and three ordinary things get around it. You can change
a field's type after values were stored. A stored value carries through every
later save untouched. And a design can use any placeholder as a whole link
target, including one from a text field.

A link target that is entirely one placeholder cannot be checked when the
signature is rendered, because at that point Sigil cannot know what the value
will be, so checking on the way in is the only defence there is. Applying it on
save also means the person is told at the time rather than discovering later that
their link does nothing.

The same validation applies when an administrator edits somebody else's values.
An administrator is not trusted more than the person here, because the check is
protecting the recipient rather than policing the author.

### Changing a field's type

Nothing revalidates what is already stored, so changing a field's type, or the
options on a choice field, sweeps out the values the new rules would refuse. The
portal reports how many it removed.

Removed rather than hidden. A value nobody could enter today is not one a
signature should still be able to print.

Shortening the maximum length deliberately does not sweep anything. An
over-long stored value is untidy rather than unsafe, and quietly deleting what
somebody typed is the worse of the two outcomes.

### Retiring an option

If you remove an option from a choice field while people still have it stored,
they keep it. Their profile page and the administrator's view of their values
both show what is there rather than blanking the field.

Nobody loses their answer to a change they had no part in. They pick again from
the new list the next time they save.

## Using them in a template

A profile field appears in the field picker in both the
[designer](/signatures/designer/) and the [HTML editor](/signatures/html-editor/),
under a "User profile" heading after the directory groups. It is the last group
because it is the only one whose contents differ between two organisations
looking at the same picker.

The token is `{{custom.pronouns}}`, and it behaves exactly like a sparse
directory attribute everywhere else. Wrap it in a conditional section so it
disappears for people who have not filled it in:

```html
{{#custom.pronouns}} ({{custom.pronouns}}){{/custom.pronouns}}
```

The `custom.` prefix is reserved. It means a built-in field added to Sigil later
can never collide with a key you are already using, and it tells anyone reading
your template which values came from the directory and which a colleague typed.

## Turning profile editing on

The switch is on this page and on [Settings](/admin/settings/). It is off by
default, unlike the health digest, because it changes what non-administrative
staff can do in a product nobody has told them about yet. It gets switched on
deliberately.

Turning it off later stops editing. It does not blank anything: values already
stored keep appearing in signatures, because a decision about who may edit
should not quietly remove a line from everybody's mail. An administrator who
genuinely wants the values gone deletes the field.

## Hiding a field against deleting one

These are the reversible and irreversible halves of "remove this field".

Hiding takes the field off the profile page and out of the field picker while
keeping the definition and everyone's stored values. Turn it back on and
everything is where it was.

Deleting removes the definition and sweeps that key out of every stored profile.
The values are gone rather than hidden. The portal asks first and says so.

## Seeing what people entered

The "What people entered" tab lists every mailbox with stored values, what is in
each field, when it was last updated and by whom, and how many of the available
fields that person has filled in.

You can edit somebody else's values from here. It exists for the support case,
where a colleague is on leave and their number is wrong, and for pre-filling
before you ask anyone to visit the page.

Reading or editing this tab needs the staff profile details capability, which is
a different capability from the one that defines the fields. Deciding which
fields exist is an organisation-wide choice about how you work. Reading what a
named colleague typed about themselves is reaching into a person's own data, and
the two are not the same permission.

## Who can do what

| Action | Capability | Roles |
| --- | --- | --- |
| Define, change, hide or delete fields | Settings | Admin |
| Switch profile editing on or off | Settings | Admin |
| See and edit what colleagues entered | Staff profile details | Admin |
| Fill in your own details | None | Everybody |

Staff profile details is its own capability rather than part of users and roles,
and the Billing role is the reason. That role manages who has portal access, so
it holds the users capability, and it is otherwise kept clear of anything that
changes what a colleague's mail looks like. Editing somebody's pronouns and
personal booking link does exactly that, which is why the Billing role does not
reach this tab.

In a [partner-managed](/partners/overview/) organisation, a partner Owner or
Admin holds both capabilities. A partner Technician holds this one and not
settings, so they can correct what your staff entered without having any say over
which fields you ask for. That is the support call an IT provider actually gets,
and it is the case the split was built around.

Filling in your own profile requires no role at all, and no role is consulted.
Signing in to that page grants nothing else: someone with no portal role who
opens it can reach their own details and nothing more.

See [roles and capabilities](/reference/roles-and-capabilities/).

## What is recorded

Adding, changing, hiding or deleting a field writes a
[change log](/monitoring/change-log/) entry with the key and what changed.
Switching profile editing on or off is recorded under Changed settings.

An administrator editing somebody else's values is recorded, with the mailbox
and which fields changed. The values themselves are never written to the log,
because a change log is not a place to duplicate somebody's personal details.

A person editing their own values is deliberately not recorded there. That log
is your record of what changed about your organisation's signatures, and a
hundred people updating their own mobile numbers would drown it. The profile
itself carries who last saved it and when, which is what the "What people
entered" tab shows.

## When an edit reaches a signature

The next message composed, rather than up to an hour later. A profile save
invalidates the cached signatures for your organisation, so the change is picked
up on the next compose rather than waiting out the normal cache lifetime.

The cost of that is honest: one person's edit strands every cached signature in
the organisation, and they re-render one compose at a time as people write mail.
That is the same effect publishing a template already has.

## Limits

| Limit | Value |
| --- | --- |
| Fields per organisation | 24 |
| Maximum length of a value | 500 characters, and never more than the field's own maximum |
| Default maximum length | 200 characters |
| Label | 60 characters |
| Help text | 200 characters |
| Options on a choice field | 1 to 24, each up to 100 characters |
| Whole profile | 8 KB |

Twenty-four fields is a bound rather than a target. It is more than any signature
can meaningfully use.

Saving repeatedly in quick succession is rate limited per mailbox. It is there to
stop one client looping, not to ration normal use, and nobody filling in a form
will meet it.

## What this deliberately does not do

Profile fields never write back to Entra. They are custom fields precisely
because they are not directory attributes, and a sync would make Sigil a
directory editor, which needs write permissions nobody has consented to.

Which fields exist is organisation-wide. There is no per-group field
availability, matching how the template library and the active template pointers
already work.

There is no approval queue for what people enter. Constrained types and
validation do the work, and you can see and correct anything from this page. A
review step for "Alex changed their pronouns" would be a heavier governance
mechanism than the thing it governs, and it would put an administrator between a
person and their own name.

Profile fields do not appear in [attribute coverage](/monitoring/attribute-coverage/).
That report measures how populated your Microsoft 365 directory is, and a field
that was never in the directory would show as a permanent gap in it. Completion
is reported on this page instead.

Profile field definitions and the values people entered against them are included
in the whole-organisation export. They belong there more clearly than most of it
does: they are personal data your colleagues wrote about themselves, so an export
without them would be wrong about what your organisation holds rather than merely
thinner. See
[data and privacy](/security/data-and-privacy/#getting-your-data-out).

They are not in the per-mailbox export a subject access request uses, which
carries that mailbox's signature history rather than its stored values. Ask
support if you need one person's values on their own.
