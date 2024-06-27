---
{
  "priority": "0.5",
  "haveTwitter": true,
  "date": "2020-01-29T09:20:07-07:00",
  "title": "Spring '20 Release Highlights: URL Hacks are Back!",
  "Slug": "spring-20-release-highlights-url-hacks-are-back",
  "description": "Spring is the season of rebirth. The barren wastes of Winter begin to be punctuated by stalks of new growth, the monochrome horizon broken by flashes of color and life as the world warms",
  "tags": ["spring-20", "hack", "classic"],
  "author":
    {
      "name": "Chris Stegall",
      "title": "Digital Marketing Coordinator",
      "webp": "/img/chris-stegall_128-128.webp",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/laptop-with-cauldron.jpg" },
}
---

Spring is the season of rebirth. The barren wastes of Winter begin to be punctuated by stalks of new growth, the monochrome horizon broken by flashes of color and life as the world warms and returns to a more comfortable axial orientation.

And that seasonal rejuvenation isn’t limited to cuddly critters and colorful blooms, it also affects our Salesforce orgs. That’s right, the [Spring ’20 release](https://releasenotes.docs.salesforce.com/en-us/spring20/release-notes/salesforce_release_notes.htm) is almost thawed out and ready for production!

In today’s post we’ll continue our stroll through the release notes with a look at a much-missed feature making its triumphant return from hibernation — URL hacks are back!

Let’s take a look.

### Buttons, Data, and Delivering Seamless User Experiences — a Brief History

A long time ago, in the days before Lightning Experience, before Classic was called “Classic”, adventurous admins practiced a now-almost-forgotten art. Evidence of these ancient magicks can still be found on the web. In the trailblazer community you’ll find old posts packed with potent phrases like “custom buttons” and “url hacks”, abandoned blogs still tell tales of saving users hours of data-entry time with “one simple trick”, and any gathering of well-worn admins will usually involve at least one wistful round of “remember the days when…?”.

But, eventually, new releases rendered the old ways ineffective. As the platform modernized, the Lightning Experience, and Flows, and Process Builder replaced the need for custom buttons and url hacks. And while, in many ways, that was an improvement — there were still those who looked longingly at their, now unused, custom buttons and remembered a time when they had wielded the power of gods.

The good news for them is, those times are coming back!

### What is a URL Hack?

The short and sweet version is that Salesforce (pre-Lightning) used to keep a bit more of the “behind the scenes” action visible in the URL bar.

{{< image src="/img/url-hack-in-classic.jpg" title="Example of a URL hack in classic" >}}

See all that stuff at the end of the URL after the “&”? That’s URL magic passing extra information to Salesforce about what to do once it lands on the page. And, because of that, if you knew how Salesforce responded to specific URL additions, you could do some pretty special things, like pre-populate records with information when you created them!

Basically, instead of asking users to click the standard “Create New” button to produce a blank new record they’d need to fill in from scratch, you could use a custom button to simultaneously create a new record and also pass in information like the Account Name, number of employees, Owner ID, etc… to save your users some keyboard time! All you had to do was point the custom button to the URL you made with all that extra information baked in.

### And Now They’re Back!

The Spring ’20 release notes even have the [new tricks mapped out for you](https://releasenotes.docs.salesforce.com/en-us/spring20/release-notes/rn_general_lex_navigate_to_record_dfv.htm), so there’s no more need for admins to guess, check, and decode the URLs to find the secret sauce. Simply construct a custom button or a link that launches a new record and use the sample formula to prep-populate your field values!

```url
/lightning/o/Account/new?defaultFieldValues=
    Name={!URLENCODE(Account.Name)},
    OwnerId={!Account.OwnerId},
    AccountNumber={!Account.AccountNumber},
    NumberOfEmployees=35000,
    CustomCheckbox__c={!IF(Account.SomeCheckbox__c, true, false)}
```

We weren’t the only ones excited either.

All that’s left to do is decide how you’ll use your newfound power!

As always, if you need a hand figuring out where URL hacks can help your org, getting your Salesforce firing on all cylinders, or anything else platform-related — [drop us a line](/contact), we’re always happy to help!

And stay tuned (and [subscribe](https://pardot.mkpartners.com/Subscribe)) to the blog here for even more [Spring ’20 Release highlights](https://medium.com/tag/release-highlights/archive) over the
coming weeks as we countdown to the launch in February!

Until then, keep working hard, smart, and happy! And we’ll see you in the cloud.
