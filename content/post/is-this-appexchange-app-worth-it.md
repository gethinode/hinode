---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2023-08-08T18:14:01.000Z",
  "title": "Is this AppExchange App “Worth It”?",
  "Slug": "is-this-appexchange-app-worth-it",
  "description": "The Salesforce AppExchange is full of handy tools, helpful add-ons, and creative solutions to common problems — but it can also sometimes feel like an overwhelming wall of options.",
  "tags": ["administrator", "app", "appexchange"],
  "author":
    {
      "name": Chris Stegall,
      "title": "Marketing Director",
      "jpeg": "/img/contributors/chris-stegall_352x352.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_R4oDLgcagWREGnm19rwOvA.png" },
}
---

The [Salesforce AppExchange](https://appexchange.salesforce.com/) is full of handy tools, helpful add-ons, and creative solutions to common problems — but it can also sometimes feel like an overwhelming wall of options. Free apps give you an opportunity to test drive a solution and see if it’s the cure for what ails your org. But, with the steady increase in “freemium offerings” that give you a taste for free but make you buy the meal, more and more users find themselves wondering “Do I really need to buy **\_\_**?” In today’s post we’ll run through the questions you should ask yourself, and your organization, before you pull the trigger on that paid install. Let’s get to it!

## Does it Solve an Existing Issue?

This may seem like a no-brainer, but you’d be surprised how effective the AppExchange can be at convincing you that you would absolutely be more productive, effective, and happy if only you had an app to dynamically manage queue lines with priority service for returning customers — before you remember you don’t even have queue lines. You’re an accounting firm.
Grabbing apps that solve imagined future problems or are built for a business case that doesn’t match your needs is a surefire way to clutter up your Salesforce, introduce conflicts, and reduce adoption and effectiveness.
The AppExchange does have several powerful tools that make businesses run better, the trick is to make sure you know what you need going in. Determine your needs beforehand, outline the scope of your ideal solution, and then head to the AppExchange to find it.

## How Does it Work?

{{< image src="/img/1_bCEqwb2IfsGUEKaKbnBYVw.png" title="Image" >}}

Alright, so you’ve found it. You identified your issue, scoped out your ideal solution, found a suitable match on the app store — done, right? Not quite. The next question to ask is “How does this app work?”.
You don’t need to be a coder, or a “techie”, or know the difference between SOQL, SQL, and SOL. All you need is an understanding of what the app is asking of you, what it’s asking of Salesforce, and you have to know (and believe) that how it works isn’t magic, but logic.
Take, for instance, [Mambo Merge](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000GCzIXUA1&cta=gin). What does it do?: Populates a template document with data from your Salesforce org. How does it work? Don’t panic — most of the times this info is right in the description. Check it out:
{{< image src="/img/1_p9ZPC282iaZyOPnhhJ1vlQ.png" title="Image" >}}

**Surprisingly, it took more than:**

<pre>import mambo_merge<br><br>if button_push == true:<br>     from(org) &#39;ctrl + c&#39;<br>     to(document) &#39;ctrl + v&#39;</pre>The short version is that, “Instantly [perform a secure mail merge to] generate professional Word, PowerPoint, Excel and PDF documents with data from Salesforce”. **Note: It can also generate HTML docs now.**

So now you know that when you push a button, something (Mambo Merge’s code) populates your template document with data mapped from your Salesforce fields. No magic, it’s pretty straightforward.
Also, that “Native” in the listing tells us it’s built in Salesforce (in this case as a Lightning Web Component), so your data never leaves your org.
(Also, the free version’s a complete, fully-functional app, not a freemium “test drive” so you can use it and, if the base model meets your needs, you’re all set!)
And the template documentation and Studio screenshots (the configuration screens) make it pretty clear that the field mapping is accomplished by using text like {{Account.Name}} where you want the Account name to populate!
But knowing how it works is important because it will give you a clearer understanding of the app’s operations, reasonable expectations about what it will achieve, and the ability to identify any potential conflicts or issues with your org. Most importantly, it will also help you determine if you’re paying for something you could do yourself using Salesforce’s existing functionality.
Which brings us to our next question:

## Can it be Built?

{{< image src="/img/1_Q6Ui4P7d7zxjGFl_GX00xw.png" title="Image" >}}

I know what you’re thinking — ‘Duh, of course it can be built because it exists — and no, I can’t build it myself, that’s why I’m looking on the AppExchange”. But before you sell yourself short and shell out that dough, consider this: For a 10 user organization a $10/user/month app stacks up to $1200/year. And then it’s another $1200 the next year. After 3 years, you’ll have spent $3600 of your budget, $10 at a time, for a solution that might not even do everything you want it to.
Once you know how the app works, it’s a lot easier to determine if it’s something you need to buy or something that could be built internally. Fancy dashboards and reports? Definitely buildable in Salesforce. Integration between your SF org and that sales tool with a well-documented API? Again, definitely doable. Building an LWC that will communicate a record’s field values into a recognized “merge language” populating a document in a third-party platform and then save that document to the record? Ok, that’s not something you can do easily without a pretty in-depth knowledge of Salesforce, that’s why we made the app.
The point is, don’t let fancy jargon and biz-speak trick you into paying for something that you could do yourself. Don’t be intimidated by the process. All the apps on the AppExchange are just the result of someone sitting down with a problem and figuring out a solution using logic. Most of the time, it’s coming up with the idea that’s the hard part — not process of building it.

## What Do You Wish it Could Do?

{{< image src="/img/1_kd0yTnCojmTCXZ9bd3gXBQ.png" title="Image" >}}

Understanding your problem, your potential new app, and how it works empowers you to start thinking bigger — to start imagining your dream solution. Because let’s face it, most off-the-shelf apps aren’t going to be a perfect fit. They’re wide nets cast to help the most people, but that means they’ll rarely be an exact match for your specific needs.
So ask yourself what’s missing. If the app was custom built for your org, what would it do differently? What functionality, fields, automation would you include if you were the one designing it?
Salesforce was built on the idea of customization, improvement, and the flexibility to meet the specific needs of thousands of different customers. So don’t just grab and go — get creative and ask yourself if there’s anything you wish the app had for your specific use-case.

## How Much Does it Cost?

{{< image src="/img/1_P7_5Dm1ctGNbRevvUqrwbw.png" title="Image" >}}

This is the last question we’ll want to ask, but probably the very first one you actually check. We get it. When you’re shopping and you see something you like, you check the price tag before you try it on. But when it comes to the AppExchange, it’s way more valuable to know all of the above answers first, so that when you do check the price you can gauge more than its nominal cost, you can determine its value.
Now, pricing structures can get a little bit murky on the AppExchange. Some apps are priced per user per month (or per year or per day), others provide X actions free and then charge you for each additional action. Flat rates, start-up fees, 1-time implementation charges, there’s a lot to consider and a bit of math to do in most cases before you’ll confidently be able to tell the higher-ups, “This is the solution we need and it’s going to cost us $**\_**”.
So, here are the important variables: Initial costs (set-up, implementation, integration, etc… fees), recurring costs (user/org/annual/etc… licenses), add-on costs (fees per-action/use-case, charges for exceeding your license, etc… anything that potentially adds a future charge on top of your recurring/license fees). Take those three variables and add them up, being sure to multiply the recurring costs by the appropriate number of weeks/months/years that you plan on using it.
Initial Costs + (Recurring Costs \* App Use Lifetime) + Add-On Costs = Total App Cost
It’s important to consider how long you plan on using the app because if it’s going to be a keystone of your Salesforce operation, you’ll basically be using it forever. If you just need a solution to help you handle a particularly gnarly import, or do a one-time data clean-up, you’ll be able to minimize your payments by unsubscribing once you’ve accomplished your task.
Note: On those quick jobs, be careful to check if the app has a minimal contract length, any sort of early-termination charge, or a start-up fee that would make a use-and-lose strategy like that more costly.
And once you have your cost math done, you’re ready to make an informed decision!

## Conclusion

{{< image src="/img/1_Ioce0FXEutpx_x5EIbn1OQ.png" title="Image" >}}

By running through these questions, you’ve equipped yourself to make a well-informed business decision in the AppExchange. Knowing your issue and how the solution will help you solve it lets you determine the value (time, effort, and organizational savings, or reach, engagement and revenue increases, etc…). Knowing how the app works lets you determine if it’s something worth buying (and licensing) or building in house/having built for you. And knowing the lifetime costs gives you something to weigh against your “value” determination and calculate your expected ROI to make the business case to any necessary approvers.
You may be surprised to find that a lot of the AppExchange apps could be better handled with a bespoke solution, suited specifically for your needs — and that a lot of the apps exist more for convenience than effectiveness, but in any case you’ll be armed with the tools to make those observations intelligently.
If you’re interested in a practical comparison of an AppExchange app vs. a custom solution, stay tuned! Next time we’ll take a look at one of the more popular apps on the Exchange and how it stacks up to a custom solution MK Partners built for a client in terms of cost, effectiveness, and usability.
If there’s a specific business or use case you’re curious about, [reach out to us](https://appexchange.salesforce.com/appxConsultingListingDetail?listingId=a0N30000001gF9jEAE) and we’ll be happy to help! And if there’s an app that’s caught your eye but you’re having a hard time determining its true value, mention it in the comments and we can run through it in a later post!
Until then, happy working — and we’ll see you in the cloud!
