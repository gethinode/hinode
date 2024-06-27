---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2029-01-25T13:01:01.000Z",
  "title": "Salesforce “How To” ABCs: B",
  "Slug": "salesforce-how-to-abcs-b",
  "description": "How to Build a Report.",
  "tags": ["how-to", "reports"],
  "author":
    {
      "name": "Chris Stegall",
      "title": "Marketing Director",
      "jpeg": "/img/contributors/chris-stegall_352x352.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_j3a6nhGfCBQFeoa79A2Q8Q.jpg" },
}
---

We know how it is. You can do so much with Salesforce that sometimes all the awesome new tips and tricks you’re picking up push something else right back out of your brain. You flip through your implementation and training notes, double check the documentation, try to track down that trailhead you remember doing — and then ultimately turn to Google.
In the **Salesforce “how to” ABCs** series, we run through the most-commonly searched questions to help you (and the rest of us) find those answers fast. Today we’ll tackle the letter ‘B’: How to Build a Report!
Let’s get started!
{{< image src="/img/1_l2n9pKGjrhcUuZ9gqxR9Ng.jpg" title="Image" >}}

Today, we’ll be walking through building an opportunity report, but the technique will be the same whether you need to report on leads, accounts, activities, or anything else!
We’ll also assume that you already have the [necessary permissions](https://help.salesforce.com/articleView?id=reports_custom.htm&type=5) to create custom reports. If not, just reach out to your admin and let them know you’d like to get started diving into the data for yourself!

## Building a Report

First up, navigate to the Reports tab.
{{< image src="/img/1_pVs7Mm8JWR6g_X_0Ovlo0A.jpg" title="Image" >}}

If you don’t have a Reports tab, you can find Reports in the App Launcher by clicking the launcher’s 3x3 tile in the top left, and then scrolling down to “Reports” (or typing it into the search bar).
{{< image src="/img/1_3zcPAJpcL0fp4zlqVfAPOg.jpg" title="Image" >}}

{{< image src="/img/1_s7Vj5oS6gKg90I3uiXMczA.jpg" title="Image" >}}

That’ll land you on your reports page. Now, click “New Report” in the top right.
{{< image src="/img/1_s_PB8ZniIk0ii0vJQTiW_Q.jpg" title="Image" >}}

That will pop open the “Choose Report Type” window. Simply enter your desired report type in the search bar and select it — in this case we’ll search and select “Opportunities”.
{{< image src="/img/1_geIT147Onteuw3caU5LOZg.jpg" title="Image" >}}

Once your desired report type is highlighted, click “Continue” at the bottom of the window.
{{< image src="/img/1_SrBpBZHlsVMbOW5B10fyTA.jpg" title="Image" >}}

That will open up your report editing page, and you’re ready to start building!
{{< image src="/img/1_H220cpk2KT_OTf7qIAUI9A.jpg" title="Image" >}}

To begin, let’s run through a few of the key components on this page. Front and center you’ll see a preview of your report.
{{< image src="/img/1_OVt2S9eM7wBb7_f7992nPw.jpg" title="Image" >}}

The preview won’t run through all of your data, so if you’re just looking for a quick summary or something, don’t stop here. The preview pane exists so you can be sure the final report will look and behave as desired, but you’ll need to actually run the report to get the full picture. Don’t worry, we’ll get there.
Along the top of the preview pane you’ll see your report’s columns and you’ll notice they correspond to the list of “Columns” on the left hand side of the page.
{{< image src="/img/1__1QyVA_mW1og14uTm5bjwg.jpg" title="Image" >}}

Above your columns on the left, you’ll see your “Groups” listed. This is where we’ll be able to add specific groupings and summaries to our report.
{{< image src="/img/1_wWDJl0slWqS489H8VlVC_g.jpg" title="Image" >}}

Lastly, above “Groups” you’ll see the tabs to switch between the Outline view (where we are currently), and the Filter view (where you’ll be able to limit which data is pulled into the report).
{{< image src="/img/1_XTDDccLXQJPUSQfNPK3igw.jpg" title="Image" >}}

## Filters

And by now you’ve likely noticed that our preview pane is pretty empty.
Luckily, Salesforce makes it clear why:

<pre>No records returned. Try changing report filters:</pre><pre> - Set the Close Date filter to All Time.<br> - Edit other filters in the filter panel.</pre>{{< image src="/img/1_maUUu2_DUO7HQym1CsWZmA.jpg" title="Image" >}}

There’s a filter limiting the data our report is pulling in. To eliminate the filter, either click “All Time”…
{{< image src="/img/1_x2qSCx4kctdfCYEv_32jag.jpg" title="Image" >}}

… or click on the “Filters” tab.
{{< image src="/img/1_OksCtVTsUUGuSWYPpqCaFA.jpg" title="Image" >}}

Then change the “Close Date” filter from “Current FQ” to “All Time”.
{{< image src="/img/1_Zom6hZbS8IMVi54j1cHVRA.jpg" title="Image" >}}

{{< image src="/img/1_KaPSFzMChr94A6adFaMS6w.jpg" title="Image" >}}

Then click “Apply”.
{{< image src="/img/1_8HhNXRGgT2S9sD3fVlgEFg.jpg" title="Image" >}}

And now our report preview is showing us data!
{{< image src="/img/1_XrHTZmlw4XFpBnuQ1yMFwQ.jpg" title="Image" >}}

If you’d like to add a filter, simply type the field you’d like to filter by in the search box, enter the criteria (like we just did for “Close Date” above) and apply it.
{{< image src="/img/1_MKDwsDpP1SCNGyGn4vEMYg.jpg" title="Image" >}}

With your filters in place, let’s get back to configuring the report.
Navigate back to the Outline tab by clicking “Outline” in the top left.
{{< image src="/img/1_cxzSj1yeUCM9KO74tqzCeg.jpg" title="Image" >}}

{{< image src="/img/1_Qgc29dJq86UPpBKJR8kGVQ.png" title="Image" >}}

## Columns

Adding, removing, and reorganizing your report’s columns is simple, thanks to the Columns panel on the left of the preview pane.
To add a column, simply click into the “Add Column” text field, and type away!
{{< image src="/img/1_kk51kDrJ562xwRqZmXt2vA.jpg" title="Image" >}}

For this example, let’s add a column for Stage so we can see how far along the sales process each of these Opportunities is.
Type “Stage” into the text field and select it from the list that pops down.
{{< image src="/img/1_skw3HKCR6Lbww88WrieDJQ.jpg" title="Image" >}}

And now you’ll see Stage added both to the Columns list on the left, and at the far right of your report preview!
{{< image src="/img/1_7lAa29GADiJVky3C3Hvefg.jpg" title="Image" >}}

To rearrange your columns, just click and drag them up or down the list on the left.
We’ll drag “Stage” up so it appears just below Opportunity Name, and you’ll notice it adjusts in the preview pane accordingly!
{{< image src="/img/1__VStkMf6BcNpts5OU_o4Wg.jpg" title="Image" >}}

And if you’d like to remove columns, simply click the ‘x’ next to the field’s name in the list.
{{< image src="/img/1_Z1_js2EwCeZYapESBrfVdQ.jpg" title="Image" >}}

Let’s remove “Created Date” for this example, so click the “x” next to “Created Date”.
{{< image src="/img/1_ejHCSJPEG6PAmvl6bIfWTg.jpg" title="Image" >}}

Aaaaand it’s gone!
{{< image src="/img/1_VqJHl1XNzSd6Du57MsUqTQ.png" title="Image" >}}

Add, remove, and rearrange your fields until you’re satisfied and we’ll move on to grouping!

## Groups

Groups work similarly to columns, but they’ll help dictate the order of your rows and give you summaries of the number of records in each grouping.
To add a group, just like with the columns, click into the “Add Group” text field, and type away!
{{< image src="/img/1_H6IHqO9PcAowb5V1yfZQmw.jpg" title="Image" >}}

Let’s say we want to group these opportunities by the accounts they belong to, so we type and select “Account Name” in the groups’ text box.
{{< image src="/img/1_EjS2BYMLhoozqW_tuf5Sfw.jpg" title="Image" >}}

And now your report preview will show the opportunities, grouped by their accounts!
{{< image src="/img/1_a53JcJJS_vrQgjUJjPT3zw.jpg" title="Image" >}}

You can add additional groups to further organize your data and, if you decide one of your columns would make a better group, you can simply drag it up from the columns list to the groups list!
We’ll drag “Stage” up from columns to groups so we can organize our opportunities both by account, and by their stage of the sales process.
{{< image src="/img/1_RcUsMGi4dFkOg5iL0d8oSg.jpg" title="Image" >}}

You’ll now see the data grouped by account, then opportunity stage!
And if you’d rather see it grouped by stage, and **then** account, rearranging groups is the same as rearranging columns. Just drag the fields on the left up and down until you’ve got everything in the order you’d like.
If we swap Stage and Account Name, you’ll see the preview pane update accordingly.
{{< image src="/img/1_i4BqNCJFTUN8h3JkRqgqRQ.jpg" title="Image" >}}

Removing groupings works identically to columns as well. Simply click the “x” next to the group you’d like to eliminate (or drag it back down to columns if you’d still like it somewhere in the report).
{{< image src="/img/1__m9Z1jwL72jEkfezFcJGUw.jpg" title="Image" >}}

{{< image src="/img/1_ef1303TfrSvINlUZSTNQGg.png" title="Image" >}}

And once you’ve got your columns, groups, and filters set — it’s time to run the report!

## Running (and Saving) Your Report

We’re in the home stretch!
In the top right, above the preview pane, click “Save and “Run”. (Or if this is a one-off report and you’d rather not save, instead click the button that just says “Run” on the far right.)
{{< image src="/img/1_Qwc8zPSk1lyO6iMXJ7ZL3w.jpg" title="Image" >}}

Clicking “Save and Run” will open the “Save Report” pop-out. Give your new report an appropriate name.
{{< image src="/img/1_r9fXbIMCY8YXKs5X0MeTLg.jpg" title="Image" >}}

{{< image src="/img/1_rRW1puzc2UrRR2VPmQ0cAw.jpg" title="Image" >}}

Then “tab” or click down to the “Report Unique Name” field. It’ll auto-populate, but feel free to tweak it to something easy to reference.
{{< image src="/img/1_MbEpOPuxVcjRXDRnOLuaxA.jpg" title="Image" >}}

Add a little description of your report if you’d like to help make it easier on yourself in the future.
Choose the folder you’d like to save your report in (it will default to your Private Reports folder).
And then click “Save”.
{{< image src="/img/1_pJCUkJWlKlpBWj6i8i98OQ.jpg" title="Image" >}}

Voila! You’ll now see your report, populated by all of your data, and configured just the way you want it!
{{< image src="/img/1_iZX6nmNDkAE1CvyyEXygTw.jpg" title="Image" >}}

Congratulations! Now you’re reporting like a pro!
You can use the same process to create reports about anything you’d like (and have permissions to access). Accounts, Leads, Campaigns — the world, and your data, is your oyster!
Thanks for following along and if you have any questions or comments, drop them in the responses below. And if you need more help getting your org set-up, or want some guidance crafting your overall Salesforce strategy, [give us a call](https://www.mkpartners.com/article/contact/contact) — we’re always happy to help!
In our next look at the Salesforce “How To” ABCs, we’ll tackle the letter ‘C’.
Until then, work smart, hard, and happy! And we’ll see you in the cloud.
