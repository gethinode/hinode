---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2021-08-11T23:59:31.000Z",
  "title": "Avoiding Inbox Overload in Pardot",
  "Slug": "avoiding-inbox-overload-in-pardot",
  "description": "Let’s face it, no one’s a fan of too-frequent communication.",
  "tags": ["pardot", "how-to", "marketing"],
  "author":
    {
      "name": "Chris Stegall",
      "title": "Marketing Director",
      "jpeg": "/img/contributors/chris-stegall_352x352.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_6M4s2YiYODTGo8917K4aDw.jpg" },
}
---

Whether it’s family, friends, your favorite musical act, or organizations you’ve once done business with, we all have a personal limit where “trying to stay top of mind” suddenly starts to feel like spam. And when it comes to your marketing efforts, avoiding the dreaded “mark as spam” is one of the keys to your continued success.
Besides just not showing up in your prospects’ main inbox anymore, every one of those “spam” labels affect your domain’s sender-reputation, meaning if you bug enough people — nobody might see your newsletter/offers/updates in the future. Bad news for sure.
So how do you make sure, with all your separate segmentation lists, campaigns, and prospect journeys that you won’t be clogging up your contacts’ inbox in a way that ruffles their feathers? Today we’ll run through 2 simple tricks to help you keep your frequency-of-contact in the sweet spot.

## Stagger Your Public List Sends

First and foremost, you can trust that your public-facing lists (the ones that show up in your [email preferences center](https://help.salesforce.com/s/articleView?id=sf.pardot_emails_preference_center_considerations.htm&language=en_US&release=232.17.0&type=5)) are important to your clients and prospects, since they’ve opted in to receiving information from you on those topics specifically. And, because you’d like to keep it that way, it’s important to stagger your sends to those public segmentation lists.
The frequency is really up to you and the relationship you have with your clients and prospects — for retail shops with seg. lists for “new releases”, “flash sales”, and “last calls”, the time between sends will probably be pretty short, but for banks with seg. lists for “mortgage holders”, “business accounts”, etc… the pace will probably be a bit slower.
Whatever your audience, unless it’s breaking news that simply can’t wait, it’s a good idea to imagine a hypothetical prospect who’s on all of those lists, and stagger your sends so that they won’t feel overwhelmed or spammed checking their inbox.

## Set Up a Frequency Suppression List

For your non-public lists and, let’s face it, you’ve probably got several of them — staggering your sends isn’t always so simple, especially if there are a lot of chefs in the marketing kitchen with different campaigns to manage.
Instead of stressing over coordination, one of the simplest ways to automate send-frequency protection is with dynamic suppression lists.
All you have to do is create a dynamic list whose inclusion rule is based on the individual prospect’s recent email load.
{{< image src="/img/1_r_qzE9WfzMeTCyDKHztWsA.png" title="Image" >}}

So, in this example, we can say “add this prospect to the suppression list if they’ve received 1 email from us in the last week”:
{{< image src="/img/1_6g0rwSLmSihhyMnJqDlXSQ.png" title="Image" >}}

Then, all you have to do is include that as a suppression list on your sends and, even if the prospect is on your send-list, if they’ve received an email within the last week, they’ll be suppressed! Automatically.
And you can adjust the rules to meet your business’ unique needs — 3 emails in the last month, 4 emails in the last quarter, etc…
Put those two tips together and you’re doing a lot more to protect yourself and your organization from being forced to don the dreaded Scarlet “S” (spam).
As always, if you need more personalized help getting your marketing efforts in line with best practices, redesigning your campaigns from the ground up, or finding alignment between your vision and your tech — [drop us a line](https://appexchange.salesforce.com/appxConsultingListingDetail?listingId=a0N30000001gF9jEAE)! We’re always happy to help.
Good luck, happy sending and, until next time, keep working hard, smart, and happy. We’ll see you in the cloud.
