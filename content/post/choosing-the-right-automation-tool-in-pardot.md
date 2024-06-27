---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2021-11-05T22:15:26.000Z",
  "title": "Choosing the Right Automation Tool in Pardot",
  "Slug": "choosing-the-right-automation-tool-in-pardot",
  "description": "Choosing the right tool for the task is the first step of any successful endeavor.",
  "tags": ["administrator", "automation", "pardot", "marketing"],
  "author":
    {
      "name": "Jessie Penaloza",
      "title": "Digital Marketing Coordinator",
      "jpeg": "/img/contributors/jesus-penaloza_88-88.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_eULMBm6Y4oheMKzZ9h1iVA.png" },
}
---

But, with a platform as flexible and feature-rich as Pardot, where there are so many automation tools and multiple solutions to any one use-case, how can you be sure you choose correctly?
In today’s post, we’ll take a look at the various click-saving tools and techniques available in Pardot, and how you can determine which one’s the right fit for any individual scenario!
A great place to start, and this is true with most Salesforce offerings, is Trailhead! The “[Choose the Right Automation Tool](https://trailhead.salesforce.com/en/content/learn/modules/pardot-process-automation/choose-the-right-automation-tool?trail_id=increase-engagement-and-nurture-leads-with-pardot&trailmix_creator_id=strailhead&trailmix_slug=get-started-with-pardot)” module visually explains the various tools and their applicability with a flowchart.
{{< image src="/img/1_dEus_C06Vhg3Oz2ly0Jg_g.jpg" title="Image" >}}

If you’re in a crunch, and need to get straight to work — use that flow chart to tell you what will be the best fit, and jump straight to the relevant section of this post! Or, if you’re like me, and like to have a full understanding of the “how’s” and “why’s” of all the options before you commit, keep reading!
To really understand that chart, we need some understanding of the Pardot fundamentals. Becoming part of the Salesforce ecosystem has been an amazing journey so far, and taking a deep dive from a new user perspective is a great way to build understanding. Let us start by identifying some terms and then run through sample use cases and scenarios.

## Relevant Terms

> <strong>Visitor: </strong>Someone who has visited a page with your Pardot tracking code on it, but hasn’t converted to a prospect yet.

> <strong>Prospect:</strong> A Visitor, identified and converted within Pardot, or a marketing target imported into the platform. Prospects will always be associated with an email address.

> <strong>Field:</strong> Information on a prospect. Think of these as the prospect’s details (name, phone, email, etc….). Both default fields and custom fields are available on Prospects.

> <strong>Criteria:</strong> Conditions used to evaluate prospects, activities, etc…. Criteria can include everything from field values to engagement history (ie. name, email, phone, etc…, date of prospect creation, Salesforce Campaign status, e-mailability, whether they’ve opened any emails in a given timeframe, etc…)

> <strong>Action:</strong> An update or change to a prospect, most often based on, or triggered by, criteria. Available actions include: adding or removing tags, adding or removing prospects from a list, adjusting prospect score, notifying users, assigning prospects to users, adding prospects to a Salesforce Campaign, sending an auto-responder email, etc…

> <strong>Segmentation List:</strong> A compiled set of prospects, most typically for emailing.

> <strong>Campaign:</strong> In Pardot, Campaign reflects a prospect’s first touchpoint — how they were “brought into” the platform — a lot like Lead Source on the Salesforce side. A Prospect can only ever be a part of 1 Pardot campaign. In Salesforce, Campaigns are more a measure of individual marketing efforts, so there Leads and Contacts can be members of multiple Campaigns.
> Great, now that we have some of the vocab out of the way, let’s look at the individual automation tools and they’re use cases!

## Completion Actions

Completion Actions are a one-time action applied after a prospect interacts with your Pardot content (opening a list email, filling out a form, clicking on a custom redirect etc…) These are used to take action after the prospect engages with content in some way.
<strong>**Use Case Example**</strong>
When a prospect completes our webinar sign-up form, I want them to:

<ul><li>Receive a confirmation email with the webinar details and calendar information</li><li>Be added to a Segmentation List called “Webinar — Registered” (so I can email them a reminder the week-of)</li><li>Add them to the “Product — Webinar” Campaign in Salesforce with the status “Registered”</li><li>Adjust the prospect score by “+10”</li></ul>To do all that, we’ll simply add them all as Completion Actions on our form!

## Segmentation Rules

Segmentation Rules are criteria-based rules that, based on prospects’ fields matching any or all of the established criteria, allows the following actions to be taken on the matching prospects:

<ul><li>Add or remove them from a Segmentation List</li><li>Add or Remove tags from the prospects</li><li>Add the prospects to a Salesforce Campaign and update their Member Status</li></ul>Segmentation Rules will only be executed once, at the moment they are run.
<strong>**Use Case Example**</strong>
We’ve recently re-imagined our monthly newsletter and we want to make sure our long-term subscribers still value hearing from us, especially those that haven’t engaged in a while. We create a Segmentation Rule that looks for prospects that are:
<ul><li>Currently on our “Newsletter Subscribed” Segmentation List</li><li>Were created more than 6 Months ago</li><li>Haven’t opened an email in 6 months</li></ul>And I set the action for all prospects that match those criteria to be added to our Segmentation List called “Newsletter Check-In”. I can now email that list a gentle nudge to stay opted-in to our newsletter or be removed from the subscriber list.

## Automation Rules

One of the most comprehensive automation tools within Pardot, Automation Rules, are criteria-based rules that trigger actions, whenever a prospect matches the criteria. Once set, anytime a prospect meets the criteria, the rule will be applied.
<strong>**Use Case Example**</strong>
We use Completion Actions on various emails and custom redirects to adjust a prospect score by +10 when they engage with our content. Anytime a prospect score reaches “100” we want to notify their assigned Sales rep that they’re a warm lead and should be sent a personal email or reached out to by phone. So, we establish an Automation rule that says “Anytime a prospect score reaches or exceeds 100”:

<ul><li>Notify their assigned user</li><li>Update their Salesforce Campaign Status to reflect their warmth and readiness for a Sales Engagement</li><li>Add a tag “Marketing warmed”</li></ul>
## Dynamic Lists

Dynamic Lists are “smart” lists that prospects get automatically assigned to (and removed from) via predefined rules. Prospects cannot be added or removed manually from these lists so they serve as a great tools when frequent changes happen or when you know list inclusion will always be dependent on fields in your Pardot instance. Dynamic lists will be automatically updated routinely throughout the day so, as data changes, prospects will be automatically added and removed from the lists.
<strong>**Use Case Example**</strong>
We occasionally do geographic-offers for our existing clients, based on the products they use. We want a Segmentation List that’s always up to date called “Product A — New York Offers” and only includes:

<ul><li>Current clients</li><li>Who use Product A</li><li>And are headquartered in New York</li></ul>To accomplish that, we create our Segmentation List (“Product A — New York Offers”) as a Dynamic List who’s rules match the criteria listed above. Now, anytime we want to send one of those targeted offers, we simply select our Dynamic List and will know its members are always up to date, and always match our three rules!

## Summary

Now that you understand how all the pieces fit together, rules, actions, and the various automation tools — you’re all set to start saving yourself (and your users) some clicks!
Take another look at the flow chart from the top of this post and you’ll likely have a much more confident understanding of how, why, and when each of the automation tools in Pardot is an appropriate fit for what you’re trying to accomplish.
{{< image src="/img/1_dEus_C06Vhg3Oz2ly0Jg_g.jpg" title="Image" >}}

Of course, if you need a hand getting some of your more complex ideas implemented, want a better understanding as it relates to a very specific use case you have, or just need a hand in general getting your org up to speed — [drop us a line](https://appexchange.salesforce.com/appxConsultingListingDetail?listingId=a0N30000001gF9jEAE)! We’re always happy to help.
And we’ll see you in the cloud.
