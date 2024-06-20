---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2022-09-30T08:00:00-07:00",
  "title": "Salesforce Marketing Cloud: A/B Test Best Practices, Testing, and “Gotcha’s”",
  "Slug": "salesforce-marketing-cloud-a-b-test-best-practices-testing-and-gotchas",
  "description": "First off, I’m extremely excited to attend The Doobie Brothers 50th Anniversary Concert in Inglewood, CA at the YouTube theater this…",
  "tags": [],
  "author":
    {
      "name": "Tommy Holden",
      "title": "Content Contributor",
      "webp": "/img/tommy-holden_128-128.webp",
      "jpeg": "/img/tommy-holden_128-128.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_hmNsTt2D71Zdk7hnM5J4BQ.jpg" },
}
---

First off, I’m extremely excited to attend _The Doobie Brothers_ 50th Anniversary Concert in Inglewood, CA at the YouTube theater this upcoming Sunday on October 2nd with their original lineup (and you should too!) Somewhat related, A/B Testing is sort of like comparing two songs off their 1973 album _The Captain & Me_ — as in which song better engages an audience, _China Grove_ or *Long Train Running ?*That’s a _REAL_ tough one to decipher, but thankfully Marketing Cloud has the background to investigate such capabilities when it comes to A/B Testing for general email use!

Common Question: “How Can a User Perform A/B Testing Within an Email? The Best Practices from Salesforce are below as to how & design a proper A/B Test = OVERALL SETUP:

{{< image src="/img/1_kVp5mfNd-jHazNF0aPBEUA.png">}}

NAVIGATION BEST PRACTICES: (ABOVE): In the Email Studio Suite, navigate to the “A/B Testing” tab. Click into it and then hit the “Create A/B Test” button in the upper right-hand corner of the page.

Upon clicking the button, a user will be redirected to the “Test Management” interface. Recall to use the “TEST TYPE” tools to A/B what a user would like to send. Subject line A/B testing is displayed below (BELOW):

{{< image src="/img/1_lw5NQpRFEPKFzHOJ_SmoRQ.png">}}

NEXT: Select Lists, Groups, or Subscribers to launch the A/B Test. A sample of items selected is (BELOW):

{{< image src="/img/1_TGXRN6SKF5VcEaqMWRU-bQ.png">}}

NEXT: Define a test audience in terms of percentage of how a user would ideally like to schedule an outbound A/B test email send. The example has a test audience measured at 65% between the two subject lines. However, this asset can also be altered based on the conditions of the audience (BELOW):

{{< image src="/img/1_OC-_xFxmq761cYOULCewNQ.png">}}

NEXT: Determine how the winning audience should be determined via the “Higher Unique Open Rate” or “Higher Unique Click-Through rate (CTR).” An “Evaluation Period” will also need to be thorough. As a Best Practice, it’s recommended that it should be in terms of “Days” to be calculated with regards to the full audience involved. Selecting the “FINISH” button will properly power this program (BELOW):

{{< image src="/img/1_r6KGdKX9DHZKBUDiEVE0EQ.png">}}

{{< image src="/img/1_Ie0U9TG9eKPL8HBrWBE2sg.png">}}

FURTHER CONSIDERATIONS & “GOTCHA’S”: During the setup process, it’s important to define the right email templates to test, test size by percentage, Contacts to send to, & the “From & Send Options”. Additionally, it should be properly decided as to whether the A/B Test should be deployed immediately, or at a particular date & time. Think of the process as a user would be sending out a regular Marketing Cloud email to a subscriber, but in the A/B Test process, its dual emails to manage upon a send.

I hope this is helpful (and also hope to see you with the Doobie’s in Los Angeles, CA this Sunday)!

And, as always, if you need more personalized help getting Marketing Cloud set up — [drop us a line](https://appexchange.salesforce.com/appxConsultingListingDetail?listingId=a0N30000001gF9jEAE)! We’re always happy to help!
