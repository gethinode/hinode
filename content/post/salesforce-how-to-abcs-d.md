---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2029-02-28T13:01:01.000Z",
  "title": "Salesforce “How To” ABCs: D",
  "Slug": "salesforce-how-to-abcs-d",
  "description": "How to Delete a User.",
  "tags":
    [
      "how-to",
      "salesforce-how-to-abcs",
      "administrator",
      "salesforce-users",
      "salesforce",
    ],
  "author":
    {
      "name": "Chris Stegall",
      "title": "Marketing Director",
      "jpeg": "/img/contributors/chris-stegall_352x352.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_2qzXta0lmRJ0mnefgcAhdQ.jpg" },
}
---

Like the Library of Alexandria, the Salesforce ecosystem contains an [unmatched collection](https://www.salesforce.com/services/learn/overview/) of knowledge, insight, and history. And, like the ill-fated library, it can sometimes feel like all of the handy, practical knowledge that you’ve acquired over the years has disappeared. Gone in a puff of smoke.
But you have something the ancient Alexandrians didn’t — Google!
When the never-ending supply of new, helpful [Salesforce tips and tricks](https://trailhead.salesforce.com/?sfdc_modal=trailhead-welcome&utm_source=sfdc&utm_medium=web-landing-page&utm_campaign=trailhead_corp&d=7010M000000NvUW) pushes something more basic out of your brain you can turn to the web and refresh your memory.
Today, we’ll continue our journey through the most commonly forgotten (and then searched) tasks with another installment of the [Salesforce “How To” ABCs](https://medium.com/tag/salesforce-how-to-abcs/latest)! This time it’s ‘D’ as in “How to Delete a User”.
Let’s get started!
{{< image src="/img/1_8KwaKw2dx5FB_3ZTnjijpQ.jpg" title="Image" >}}

Spoiler alert, this one actually has a little twist: technically, you can’t delete a user. Instead what we’ll have to do is deactivate them.
That’s because Salesforce thinks that our users, like former loves, can’t (and shouldn’t be) be erased or forgotten, but only temporarily removed from the active forefront of our internal orgs. Not really — it’s actually because those users might still own records (contacts, accounts, leads, etc…) and deleting them could create issues and would also affect the audit trail (so when you look back to see who made what changes you won’t just see a bunch of “[deleted user]”s). Luckily, deactivating users will accomplish everything we’d want out of a deletion, with the added benefit of preserving our data. Here’s how we do it.
First, navigate to Setup by clicking the cog in the top right corner of your org.
{{< image src="/img/1_XxPJbfWjj64_KFCagPm9mw.jpg" title="Image" >}}

Then select “Setup” from the menu that drops down.
{{< image src="/img/1_ITCPyDu7byN0r0zsUmoXCA.jpg" title="Image" >}}

Once in Setup, select Users from the menu bar on the left side.
{{< image src="/img/1_owT_XcZMoNqx287qfW0Q3g.jpg" title="Image" >}}

Or, instead of scrolling through all the options, enter “users” in the Quick Find box and select it from there.
{{< image src="/img/1_xMhs3hHIO_tuzVIJYzCB8A.jpg" title="Image" >}}

Now, you’ll be on your Users page and see a list of all your org’s users. Click “Edit” next to the user you’d like to deactivate.
{{< image src="/img/1_qLEMY3euc84JMUrxJnjNjA.jpg" title="Image" >}}

Almost there! On your User Edit page locate the ‘Active’ checkbox and click it once to de-select it (un-check it).
{{< image src="/img/1_YXUrekQtMydm7SLxzbyf2Q.jpg" title="Image" >}}

That’ll trigger a pop-up dialogue box warning you what will happen when you deactivate the user — removing them from all delegated groups and sharing privileges, etc… It also helpfully lets you know that you’ll still be able to transfer the deactivated users records to an active user and that they’ll still show up under “Managed Users”.
{{< image src="/img/1_gECFVIp90YT-kl0ew__VIw.jpg" title="Image" >}}

Click ‘OK” when you’re ready to continue.
{{< image src="/img/1_MYUj5fbTVItW5B3ld3B72Q.jpg" title="Image" >}}

Lastly, click “Save” on the User Edit page to finalize the deactivation.
{{< image src="/img/1_-WaKTPmcVnCqqPSErnop0g.jpg" title="Image" >}}

And you’re all set! You’ll still the user on your list of users, but you’ll notice they’re no longer listed as “Active”!
{{< image src="/img/1_ilPTipILIBJzwgiS-4lFGg.jpg" title="Image" >}}

Congratulations your user’s been deactivated!
Just a heads up, while that user will no longer count toward’s your org’s available licenses, if you’re not adding a new user and want to instead reduce your license count you’ll still need to reach out to your Salesforce rep — removing users won’t automatically reduce your bill accordingly. And here’s a [helpful list](https://help.salesforce.com/articleView?id=users_deactivate_considerations.htm&type=5) with a few other things to consider when deactivating accounts.
If you still have questions, would like help managing your org, or want to learn more about best-practices regarding user-management, [drop us a line](https://www.mkpartners.com/article/contact/contact) — we’re happy to help!
As always, follow us here for more Salesforce tips, tricks, and “How to” ABCs! And in the meantime, keep working hard smart and happy. We’ll see you in the cloud!
