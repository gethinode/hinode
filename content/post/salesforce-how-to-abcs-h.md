---
{
  "priority": "0.5",
  "date": "2020-02-12T10:26:39-07:00",
  "title": 'Salesforce "How To" ABCs: H',
  "Slug": "salesforce-how-to-abcs-h",
  "description": "How to Hide Fields in Salesforce...",
  "tags":
    [
      "salesforce",
      "hidden",
      "hide",
      "fields",
      "administrator",
      "tutorial",
      "page-layout",
    ],
  "author":
    {
      "name": "Chris Stegall",
      "title": "Digital Marketing Coordinator",
      "webp": "/img/chris-stegall_128-128.webp",
      "jpeg": "/img/chris-stegall_128-128.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/laptop-with-coffee-and-plant.jpg" },
}
---

As we drift gently into another Spring, our spirits buoyed by the daily-increase in our allotted daylight, our rekindled ambitions reflected in the colorful buds of future flowers bursting against the bleary backdrop that too-long blanketed our Wintery world, admins everywhere find themselves shaking off the holiday haze and googling those things that “they definitely, definitely knew how to do just a few months ago”.

And that makes it the perfect time for another installment of our Salesforce “How to” ABCs! The series where we tackle the most commonly Googled Salesforce questions, letter by letter, to help admins find the answers they’re looking for fast!

Today’s letter is “H” as in, “How to Hide Fields”. Let’s dive in!

{{< image src="/img/googling-salesforce-how-to.png" title="Searching Salesforce How To" >}}

### Getting Started

This question actually has a few answers depending on what you mean exactly by “hiding” fields, so we’ll run through all the possibilities. But all of the solutions start in the Object Manager, so navigate there first by clicking the cog in the upper right corner of your org and selecting “Set Up” from the drop down menu.

{{< image src="/img/clicking-setup.jpg" title="Clicking the setup link" >}}

On the Set Up screen, type Object Manager into the “Quick Find” box and select it.

{{< image src="/img/clicking-object-manager.jpg" title="Clicking object manager" >}}

And, once on the Object Manager page, simply select the object you’d like the hide the field/s on!

{{< image src="/img/clicking-on-object.jpg" title="Clicking on image" >}}

Now we’re ready to run through the possibilities!

Feel free to skip ahead here, looking for the heading that best fits what you mean by “hide”.

### “Deleting” Fields

First, if it’s a custom field and you’re just trying to get rid of it, select “Fields & Relationships” from the left-hand column.

{{< image src="/img/clicking-on-fields-and-relationships.jpg" title="Clicking on fields and relationships" >}}

Then, find the field you’d like to delete and click the menu arrow on the right-side of its row.

{{< image src="/img/deleting-a-field.jpg" title="Deleting a field" >}}

Then select “Delete” from the drop-down menu.

{{< image src="/img/clicking-delete-field.jpg" title="Clicking the delete button" >}}

You’ll see a very serious pop-up letting you know that this action will also delete all dependent info for any dependent or controlling fields and affect Assignment and Escalation Rules that rely on the field’s data. It’ll also move the field to “Deleted components” for 15 days, so you have 2 weeks to change your mind if you need to resurrect the field and its data. See:

{{< image src="/img/delete-field-message.jpg" title="Message when deleting a field" >}}

Once you’re sure you’re going to be ok, click Delete.

{{< image src="/img/clicking-the-delete-button.jpg" title="Clicking the delete button" >}}

TaDa! The field is gone and won’t clutter up your org any longer!

### “Removing” Fields (from the Page Layout)

Ok, but let’s say you have a field that contains data you need (maybe you report on it, or it’s relevant to a third-party system, etc…, but your users never need to update it and they don’t need to see it on their screens in their day-to-day). In that case, to “hide” the field, we’ll just need to remove it from the Page Layout!

So begin by selecting “Page Layouts” from the left hand column.

{{< image src="/img/navigate-to-page-layouts.jpg" title="Navigating to page layouts" >}}

Then select the layout you’d like to edit (the one where you want to hide the field).

{{< image src="/img/clicking-your-page-layout.jpg" title="Clicking on the page layout" >}}

All you have to do now is find the field you’d like to hide and click, hold, and drag it up to the box of fields at the top of the page (so that you see the green ✅ appear), then release.

{{< image src="/img/finding-field-on-page-layout.jpg" title="Finding the field on the page layout" >}}

{{< image src="/img/dragging-field-on-page-layout.jpg" title="Dragging field on page layout" >}}

Now click “Save”

{{< image src="/img/saving-page-layout.jpg" title="Saving page layout" >}}

And you’re all set, the field is now hidden from the page layout!

\*(Note: You can’t remove “required” fields, they’ll always have to be displayed on edit and create).

### “Hiding” Fields from Users or Profiles

Alright, next up — hiding fields from individual users or profiles!

This time, from the Object Manager, click on “Fields & Relationships”.

{{< image src="/img/clicking-on-fields-and-relationships.jpg" title="Clicking on fields and relationships" >}}

Select the field you’re looking to modify.

{{< image src="/img/selecting-a-field-from-object-manager.jpg" title="Selecting a field from the object manager" >}}

Then, select “View Field Accessibility”.

{{< image src="/img/view-field-accessibility-button.jpg" title="Arrow pointing to the view field accessibility button" >}}

From the drop down, select the field you’re interested in hiding.

{{< image src="/img/profiles-dropdown.jpg" title="Dropdown of all the profiles" >}}

That will reveal a list of all your Profiles and their current access level. Hovering over their access status will reveal a brief explanation.

{{< image src="/img/list-of-profile-statuses.jpg" title="List of profile statuses" >}}

To change that profiles field visibility, simply click on their current status.

{{< image src="/img/arrow-field-level-security.jpg" title="Arrow pointing at field level security" >}}

That’ll land you on the page displays that profile’s current field-level security (and below that page layout, but ignore the page layout section here).

{{< image src="/img/field-level-security-section.jpg" title="Field level security section highlighted" >}}

Uncheck “Visible” on the field you’re trying to hide.

{{< image src="/img/checking-the-visible-box.jpg" title="Checking the visible box" >}}

Click "Save"

{{< image src="/img/arrow-pointing-to-save-button.jpg" title="Arrow pointing to the save button" >}}

And you’re all set! Any users assigned to that profile will no longer see the field when they access a record on that object!

_(Note: If you’re trying to hide several fields at once, there is a more convenient method using the Enhanced Profile User Interface that we’ll tackle in an upcoming post)._

### Use Record Types to Hide an Irrelevant Field

Finally, one last way to hide a field is via Record Types!

This is a good solution if you have multiple types of the same object that require different fields (for instance, if you manage residential and commercial properties and use a Property object, you might want to keep a record of “pets” or the like on your residential records, but that field would be unnecessary on the commercial records).

To begin, we’ll need to create an alternative Page Layout (missing the relevant field) so we’ll be able to assign it to the new Record Type we’re going to create.

From the Object Manager, select “Page Layouts”.

{{< image src="/img/navigate-to-page-layouts.jpg" title="Navigating to page layouts" >}}

Then click “New” in the top right.

{{< image src="/img/clicking-new-page-layout.jpg" title="Clicking new page layout" >}}

From here you’ll be able to choose to clone your existing layout (and then tweak it), or start from scratch. Either way make sure to give your new page layout a name and then click “Save”.

{{< image src="/img/saving-new-page-layout.jpg" title="Saving a new page layout" >}}

With the new layout saved, make the relevant changes by finding the field you’d like to hide and click, hold, and drag it up to the box of fields at the top of the page (so that you see the green ✅ appear), then release.

{{< image src="/img/remove-field-from-new-page-layout.jpg" title="Removing a page from new page layout" >}}

{{< image src="/img/saving-page-layout.jpg" title="Saving new page layout" >}}
