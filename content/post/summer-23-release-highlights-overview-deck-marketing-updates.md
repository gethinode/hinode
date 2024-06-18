---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2023-05-25T08:00:00-07:00",
  "title": "Summer ’23 Release Highlights: Overview Deck Marketing Updates",
  "Slug": "summer-23-release-highlights-overview-deck-marketing-updates",
  "description": "Marketing Cloud and Account Engagement",
  "tags": [],
  "author":
    {
      "name": "Jessie Penaloza",
      "title": "Content Contributor",
      "webp": "/img/jesus-penaloza_88-88.webp",
      "jpeg": "/img/jesus-penaloza_88-88.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_KK4SIEKibyDpQMl1S6uELQ.png" },
}
---

With a bit under 2 weeks before the last orgs are live on Summer ’23, if you haven’t started prepping your users on what to expect, you’ll want to get started ASAP! Luckily, the Summer ’23 Overview Deck is designed to help you do just that!

The [deck](https://docs.google.com/presentation/d/1aPVu_zVBxdVRE45-E9FZhiGkdWMyHqvBuxVD-GJxQPQ/) which was released about a week ago comes jammed-packed with 300+ slides that help you guide your users on the [Summer ’23 Release Notes](https://help.salesforce.com/s/articleView?id=release-notes.salesforce_release_notes.htm&release=244&type=5). Providing a high-level overview of the latest changes and updates to the products and services that Salesforce has to offer such as — Flow, Sales, Revenue, Service, Experience, Commerce, Non-Profit, Marketing, Financial Services, Education, Automotive, and more to name a few.

Meanwhile, to continue our run of [Release Highlights](https://medium.com/creme-de-la-crm/releasehighlights/home), today we’re taking a look at some of the new features added in Marketing Cloud — let’s dive in.

## Data Cloud Integration

Integrate Data Cloud into Account Engagement and harness the combined resources of both products at once. Establish data streams and generate segments within Data Cloud, while linking these segments to marketing lists or automations from Account Engagement. Import more Salesforce and third-party data to build engagement strategies that directly target key audiences when implementing new marketing efforts.

{{< image src="/img/0_ohO-mNDBLOsji0Et.png">}}

## Email Sending Domain Validation Key

When installing Account Engagement (Pardot) within Salesforce, it is necessary to set up and configure Email and Tracker Domains. While this process may sometimes feel tedious, it is important to stay relevant to updates and minimize the time spent working with the client, their IT team, and potentially Salesforce support to complete a configuration. The initial announcement about this update was made in the Spring ’23 Release Notes, and it is now expected to become official starting in Summer ’23. As part of the required DNS entries, you will now find a new Validation Key (TXT) entry that needs to be added to your client’s DNS host portal. This step validates domain ownership and ensures that emails are sent from domains with proven ownership.

{{< image src="/img/0_Y-wae3Lbuzyj5E7v.png">}}

If you already have a sending domain configured it may appear as “legacy verified,” which means that it is not DKIM verified. A new validation key will be provided to verify and update these domains accordingly. It is important to consult with your Admin to ensure that this change does not affect your sending capabilities, as it could potentially hinder or confuse your customers if emails are sent without being able to validate the domain.

If there’s something in the [Release Notes](https://help.salesforce.com/s/articleView?id=release-notes.salesforce_release_notes.htm&release=244&type=5), [Release Highlights Module](https://trailhead.salesforce.com/content/learn/modules/summer-23-release-highlights), [Overview Deck](https://docs.google.com/presentation/d/1aPVu_zVBxdVRE45-E9FZhiGkdWMyHqvBuxVD-GJxQPQ/edit), or [Feature Matrix](https://trailhead.salesforce.com/trailblazer-community/feed/0D54S00000Plvm5SAB) that caught your attention and you’d like us to cover, feel free to drop it in the comments below!

Until next time, we thank you for stopping by and we’ll see you in the cloud!
