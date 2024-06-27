---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2023-01-12T08:00:00-07:00",
  "title": "Spring ’23 Release Highlights: Picklist Improvements (and a “Heads Up!”)",
  "Slug": "spring-23-release-highlights-picklist-improvements-and-a-heads-up",
  "description": "As we continue our countdown to the Salesforce Spring ’23 release, we’re once again peppering the lead-up to launch with our picks for the…",
  "tags": ["release"],
  "author":
    {
      "name": "Chris Stegall",
      "title": "Marketing Director",
      "jpeg": "/img/contributors/chris-stegall_352x352.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_vnLx_XwGbzkxUNyj4AjPHg.png" },
}
---

As we continue our [countdown to the Salesforce Spring ’23 release](https://medium.com/creme-de-la-crm/salesforce-spring-23-release-timeline-45f1c9cc11ed), we’re once again peppering the lead-up to launch with our picks for the most exciting updates, upgrades, and improvements heading to orgs everywhere! That’s right, it’s another round of [Release Highlights](https://medium.com/tag/release-highlights) — and this time we’re taking a look at some changes to Picklists that will have admins cheering (and one that might be a bit of a headache if you’ve been avoiding best practices).

Let’s dive in!

### Bulk Manage Picklist Values

First up is a real potential time saver, [the ability to delete, activate, deactivate, or replace multiple custom picklist field values at once](https://help.salesforce.com/s/articleView?id=release-notes.rn_fields_bulk_manage_picklist_values_ga.htm&type=5&release=242). Previously, you modified them one at a time (and that means lots of scrolling, scanning, clicking, saving, and repeating). For internal admins, this’ll mean easier configuration and customization, shorter turnaround on org projects and less institutional inertia to overcome when deciding how much effort it’ll take to make meaningful improvements!

And, for those with partners or firms doing the admin work in Salesforce, that’ll mean a reduction in invoiced hours to accomplish those goals. So a time savings or a $$$ savings, or both depending on how hands-on your Salesforce staff is!

This was [previously a Beta feature](https://help.salesforce.com/s/articleView?id=sf.fields_picklist_bulk_manage_picklist_values.htm&type=5), but it’s going wide with the release (aka, “Generally Available”) and to access it, all you have to do is:

1. Go to the custom field definition page for the picklist field.
2. In the Values and Inactive Values sections, there's a checkbox next to each picklist value.
3. You can select multiple values and use one of the new buttons: **Delete Selected**, **Deactivate Selected**, **Replace Selected**, or **Activate Selected**.

And you’ll be saving time in no time!

### Clean Up Inactive Picklist Values

This is another [former Beta feature](https://help.salesforce.com/s/articleView?id=sf.fields_picklist_delete_inactive_values.htm&type=5), going to general availability in Spring ’23 — the [ability to bulk delete inactive unused picklist values, manage inactive picklist values, and enforce limits on inactive values for custom picklists](https://help.salesforce.com/s/articleView?id=release-notes.rn_fields_picklist_delete_inactive_values_ga.htm&type=5&release=242) (the goal being to make it easier for admins to improve system performance and overall health). Not to mention save their sanity and clicks, by turning all those one-off efforts into a more manageable bulk process!

All admins will need to do is:

1. Head to the Inactive Values section of the picklist field, and click Delete Unused Values.
2. After you delete unused values, if a picklist is unbound and the total number of inactive values falls below the limit, the picklist is set to bound!

Easy peasy.

### Heads Up! Inactive Picklist Values are Getting a Limit

Last, but not least, less of an exciting feature and more of a wake-up call to admins who might’ve been a little cavalier about cleaning up those inactive picklist values. Announced in Spring ’23, and enforced in Summer ’23, we’re losing the ability to have unlimited inactive picklist values.

And sure, every admin’s going to agree that having infinite inactive picklist values is unnecessary, and out of line in terms of best-practices — but I’d still bet there’s an org somewhere that’s reading this news with some sweat forming on their brow.

For now, we’ll see a toggle in the picklist settings that allows us to remove the upper limit on the number of inactive values:

{{< image src="/img/1_wFoGjK9-SfCvtrqYpQTSnw.png">}}

…but starting in Summer ’23 that option will disappear and we’ll all be limited to 4,000 such values.

So, if that’s going to affect your org, now’s the time to start cracking down and cleaning up! (And I’ll bet you’re really glad about that newfound ability to mass cleanup those inactive values we mentioned earlier).

Tomorrow’s the very first day org’s will start seeing Spring ’23, but for most of us, we’re [still a couple weeks away](https://medium.com/creme-de-la-crm/salesforce-spring-23-release-timeline-45f1c9cc11ed) so, as always, stay tuned here for more [Release Highlights](https://medium.com/tag/release-highlights) as well as your standard Salesforce news, tips, and tricks — and feel free to drop your favorite Spring ’23 features in the comments!

Until next time, keep working hard, smart, and happy. And we’ll see you in the cloud!
