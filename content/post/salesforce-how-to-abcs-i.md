---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2022-02-24T21:35:39-07:00",
  "title": "Salesforce “How To” Abcs: I",
  "Slug": "salesforce-“how-to”-abcs:-i",
  "description": "How to Index a Field",
  "tags": ["database", "how-to"],
  "author":
    {
      "name": "Chris Stegall",
      "title": "Digital Marketing Coordinator",
      "webp": "/img/chris-stegall_128-128.webp",
      "jpeg": "/img/chris-stegall_128-128.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_hLZQ1hqLR3vAXvsAF78oFg.png" },
}
---

As another February’s fleeting existence falls victim to non-quadrennial foreshortening and another March presses over the horizon with promises of Spring — admins everywhere are getting up to speed on the [new release](https://medium.com/creme-de-la-crm/release-highlights-salesforce-spring-22-release-9ad5c23d41eb) and, with all the new information, may find themselves googling things they “swore they knew how to do, even just last year”. And that makes it the perfect time for another installment of our [Salesforce “How to” ABCs](https://medium.com/tag/salesforce-how-to-abcs/archive)! The series where we tackle the most commonly Googled Salesforce questions, letter by letter, to help admins find the answers they’re looking for fast!

Today’s letter is “I” as in, “How to Index Fields”. Let’s dive in!

{{< image src="/img/1_z59PJmz7EBjZzqsxoX_dng.png">}}

Luckily, this answer’s relatively simple, while sort of two-pronged — because Salesforce does all the heavy lifting on several standard fields. So, if you’re looking to index a standard field on, say, Accounts, Leads, Contacts, or even a custom object etc… the platform already maintains indexes on the following:

- RecordTypeId
- Division
- CreatedDate
- Systemmodstamp (LastModifiedDate)
- Name
- Email (for contacts and leads)
- Foreign key relationships (lookups and master-detail)
- The unique Salesforce record ID, which is the primary key for each object

But, if you’re looking to index a custom field or different type of field (than listed above) on a standard object, you have a couple options.

For custom fields, simply edit the field and check the box for “External ID: Set this field as the unique record identifier from an external system”.

{{< image src="/img/1_LD_ECYmD9YOw_41xNLz3KQ.png">}}

Then give it a minute (or several). Depending on the number of records, it can take a while for Salesforce to index everything but, once complete, you’re ready to enjoy those speedier queries. Now, this will only work for the following field types:

- Auto Number
- Email
- Number
- Text

But the good news is, it’s actually possible to index an even wider variety, you just need to enlist the help of Salesforce support. For both standard and custom objects, Salesforce support is usually pretty speedy at implementing your requested index, and can even handle some tricky request-cases, like including null rows in your index. Simply open a ticket, outline your desired field to be indexed, and let them handle the heavy lifting behind the scenes! Just be sure to thank your support agent when it’s all done.

Of course, if you still need a hand getting those queries built and running to spec, or just getting more out of your org in general, [drop us a line](https://appexchange.salesforce.com/appxConsultingListingDetail?listingId=a0N30000001gF9jEAE)! We’re always happy to help.

Until next time, keep working hard, smart, and happy. And we’ll see you in the cloud.
