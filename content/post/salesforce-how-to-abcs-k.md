---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2022-09-08T08:00:00-07:00",
  "title": "Salesforce “How To” ABCs: K",
  "Slug": "salesforce-how-to-abcs-k",
  "description": "How to Know Which Page Layout is Used",
  "tags": [],
  "author":
    {
      "name": "Jessie Penaloza",
      "title": "Content Contributor",
      "webp": "/img/jesus-penaloza_88-88.webp",
      "jpeg": "/img/jesus-penaloza_88-88.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_exp-4vf61bkxbR-rqEGxAA.png" },
}
---

With less than two weeks to go, Trailblazers everywhere are getting ready for Dreamforce ’22! And, after all those sessions, keynotes, and feature reveals, when they get back to work on Monday many will find themselves googling things they “swore they knew how to do, even just three months ago”. That makes this the perfect time for another installment of our [Salesforce “How to” ABCs](https://medium.com/creme-de-la-crm/tagged/salesforce-how-to-abcs)! The series where we tackle the most commonly Googled Salesforce questions, letter by letter, to help trailblazers find the answers they’re looking for fast!

Today’s letter is “K” as in, “How to Know Which Page Layout is Used”. Let’s dive in!

{{< image src="/img/1_Uouc45Kyv_z992ir9hryUw.png">}}

Starting with Classic for those who may still have an org instance somewhere in the cloud far far away... The straightforward method to access a page layout is right from the record page. In our example we take a look at the opportunity object and traverse down to a specific record page.

{{< image src="/img/1_rSjwVVIyCu11k_fwXFLTOg.png">}}

Within the record page we select “Edit Layout” to quickly pull up they layout properties.

{{< image src="/img/1_8IdJxKnjK-WLr51zGSsQqw.png">}}

The current layout in use is displayed with the ability to configure and make property changes as needed.

{{< image src="/img/1_w1E-tsfwDqcJ4RWBbAGoSA.png">}}

Turning the tables Lighting requires us look elsewhere to find this information. Nothing too complex but maybe just a few different steps to yield the same result.

Within an object page you would do the same as classic and traverse to a record page. Select the setup gear at the top right and choose “Edit Page” within the dropdown menu.

{{< image src="/img/1__YRsyFewCbDOdWvelqNZAA.png">}}

Next, you would select a component and scroll down until the “Assign Page Layout” section appears. From here, you will notice a (previewed) label placed under the current layout applied for this component. At the same time you can select the current layout to make changes or click on the “View all layouts” available for this object. Lastly you can quickly jump to the page layout assignments for opportunities using he “Assign Page Layout” link.

{{< image src="/img/1_QfvYVI0B1CVVVpgiwvbfOQ.png">}}

Of course, if you still need a hand getting started or just getting more out of your org in general, [drop us a line](https://appexchange.salesforce.com/appxConsultingListingDetail?listingId=a0N30000001gF9jEAE)! We’re always happy to help.

Until next time, keep working hard, smart, and happy. And we’ll see you in the cloud.
