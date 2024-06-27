---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2021-08-18T21:17:44.000Z",
  "title": "Salesforce How To’s: Transform ‘Location’ to ‘Text’ in a Formula Field",
  "Slug": "salesforce-how-tos-transform-location-to-text-in-a-formula-field",
  "description": "Today’s Salesforce admin tip comes straight from the trenches! There are a lot of neat tricks you can do with formula fields and they’re sometimes an admin’s best tool for creatively manipulating data across objects and records, especially if you’re already near your lookup limit. But, while formula fields have no issues with complex calculations, currencies, or most data types, one thing they don’t account for is location data as stored in Salesforce..",
  "tags": ["how-to", "administrator", "formulas"],
  "author":
    {
      "name": "Chris Stegall",
      "title": "Marketing Director",
      "jpeg": "/img/contributors/chris-stegall_352x352.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_YIFkcQEcYDgduZ2aGF3PIg.jpg" },
}
---

Today’s Salesforce admin tip comes straight from the trenches! There are a lot of neat tricks you can do with formula fields and they’re sometimes an admin’s best tool for creatively manipulating data across objects and records, especially if you’re already near your lookup limit. But, while formula fields have no issues with complex calculations, currencies, or most data types, one thing they don’t account for is location data as stored in Salesforce.
So what do you do if, for example, you want to add location data to a record in a formula field? There’s no checkbox for the location data type when you’re creating a formula field and, if you select “text” and then make a really simple formula like: “Account.BillingAddress”, you get the following syntax error:
{{< image src="/img/1_FDorbhK_RBrK0VFwpS5jbg.png" title="Image" >}}

Unfortunately, the “Text()” function doesn’t work on location data types either, so the solution isn’t quite as simple as wrapping the address with it.
But, what you can do is a bit of creative formula drafting to to combine all the separate text-based components of the address into one appropriately formatted field! Instead of grabbing the whole address at once, we’ll instead grab the street address, city, state, zip code, and country and use our formula field to add the necessary formatting.
What you end up with is a formula that looks something like this:
{{< image src="/img/1_BiE_Zb27GdJK9jMX5zE_NQ.png" title="Image" >}}

and we pass our syntax check with flying colors!
Heres a more copy-paste-able version of that formula in case you’re in-org right now:
Account.BillingStreet + BR() + <br> Account.BillingCity + “, “+ <br> Account.BillingState +” “ + <br> Account.BillingPostalCode + BR() + <br> Account.BillingCountry
And, now on the record we have a perfectly-crafted address field!
{{< image src="/img/1_7GNxyDZzrdrhP0Dt3Br16Q.png" title="Image" >}}

Congratulations! You’ve overcome the dreaded syntax block and have your data appearing exactly the way you want it!
As always, if you need a little more help getting your data and page layouts better aligned with your business processes, want to build a brand new business app, or just need a Salesforce health check to make sure everything’s up to best-practice-spec, [drop us a line](https://appexchange.salesforce.com/appxConsultingListingDetail?listingId=a0N30000001gF9jEAE)! We’re always happy to help.
And, until next time, keep working hard, smart, and happy. We’ll see you in the cloud.
