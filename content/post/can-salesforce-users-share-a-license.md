---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2023-06-16T08:00:00-07:00",
  "title": "Can Salesforce Users Share a License?",
  "Slug": "can-salesforce-users-share-a-license",
  "description": "When it comes to cloud-based applications like Salesforce, typical pricing models are based on a per-user-license…",
  "tags": [],
  "author":
    {
      "name": "Chris Stegall",
      "title": "Marketing Director",
      "webp": "/img/chris-stegall_128-128.webp",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/0__cc9oxngc8Cv8Oov.jpg" },
}
---

When it comes to cloud-based applications like [Salesforce](https://www.salesforce.com/products/), typical pricing models are based on a per-user-license. Unfortunately that can result in some pretty hefty invoices if you’re an organization with a lot of employees or had hoped to use Salesforce for a high-count, low-frequency business task.

Search the web for “shared Salesforce user licenses” and you’ll quickly discover that sharing user credentials is not only a terrible practice in terms of security, documentation, and tracking — but it’ll also violate your terms of service and could expose your to the wrath of the legal department.

{{< image src="/img/0_ZS6v_V7s4-DE9qcd.jpg" >}}

But there’s good news! While you can’t license Salesforce based on concurrent users (ie. We never have more than 3 people in the system at the same time, so we only need 3 user licenses) — you’re absolutely allowed to deactivate users and thus “free up” their license to be applied to another employee! In fact, that’s precisely what Salesforce encourages you to do if you start to find yourself hitting your user limit because some low-frequency tasks are tying up your licenses.

Coupling that ability, to activate and deactivate users, with the power and flexibility of the platform’s Apex programming language allows us to build an automated license management engine — meaning you can “pool” your licenses across your organization, and only have the necessary users active at any given moment!

Imagine it like a restaurant with 10 tables. While you can only serve 10 parties at a time, once one party has finished their meal you can clear the table and seat your next group of guests.

{{< image src="/img/0__cc9oxngc8Cv8Oov.jpg" >}}

While the actual nuts and bolts execution will vary based on business case, sign-on set-up, and the like — the basic framework is quite simple, and something we’ve accomplished for several of our clients.

For example, imagine you’re an organization with 100 employees and each of them are required to log into Salesforce once in a while to update their emergency contact information for HR. Buying 100 user licenses would be pretty pricey, especially if Salesforce is primarily only being used by your 20 person sales department (outside of those occasional contact info updates). Instead of adding 80 more licenses and bumping your invoice up by 400%, you can add 5 users and it’ll only bump your contract 25%.

Then, when it’s time for one of your non-regular users to update their emergency contact information, they pop over to a custom webpage, enter their email address, and click a button. In the background, the license management engine checks to see if there are any available license it can assign to the user. If there aren’t, the engine can then check active licenses and look for a user who hasn’t logged in to the system in X days, deactivate that user’s account, and apply the now open license to the user who made the webpage request! Now our new user gets prompted to input their password and they’re logged in to update their contact info, all without anyone else having to get involved! And best of all, the engine, the credential management web page, and all the rest of the magic can be built right in platform itself.

It’s like an automated maître d’ for our metaphorical restaurant!

{{< image src="/img/0_ZMvflz1NaZQOcGG-.jpg" >}}

Now, if you’ve got all 100 employees trying to update their info on the same day, the engine won’t be able to find any active licenses that meet the “haven’t logged in in X days” requirement, and your employee will be prompted to “try again later” — so you’ll want to couple the new functionality with a work process that eliminates bottle necks or situations where you want all 100 employees in the system at the same time. Luckily, because the system can be customized for your specific needs, business case, and workflows — it’s not difficult to find a way to make managing your licenses simple, efficient, and nearly touch-free!

So, while there’s may not be a concurrent licensing model offered, thanks to this technique you can replicate the effect of such a system right on top of the existing Salesforce per-user licensing model!

{{< image src="/img/0_9msjO3ez4iKz4efc.jpg" >}}

If you’d like to learn more about how your organization could roll out something similar, [reach out](https://appexchange.salesforce.com/appxConsultingListingDetail?listingId=a0N30000001gF9jEAE) and we’ll be happy to help!

Until then, happy working! And we’ll see you in the cloud.
