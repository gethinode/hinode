---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2024-06-11T22:10:05.000Z",
  "title": "Salesforce “How To” ABCs: V",
  "Slug": "salesforce-how-to-abcs-v",
  "description": "How to View Field-Level History.",
  "tags": ["trust", "administrator", "how-to"],
  "author":
    {
      "name": "Jessie Penaloza",
      "title": "Digital Marketing Coordinator",
      "jpeg": "/img/contributors/jesus-penaloza_88-88.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_sCrmvdxweL_AS6npySRQEg.png" },
}
---

The days of Spring are streeeetching into hot Summer days and the AC is already straining to keep up! Dreamforce tickets are officially for sale today, Dreamin’ in Color is next week, and the Salesforce community calendar just keeps adding events!
With so many activities to hit, it’s not surprising for busy admins to have to Google things they “swear they knew how to do a few motnhs ago” — which makes this the perfect time for our next installment of the Salesforce “How to ABCs”! The series where we tackle the most commonly Googled Salesforce questions, letter by letter, to help Trailblazers find the answers they’re looking for fast!
Today’s letter is “V” as in, “Salesforce How to View Field History”.
{{< image src="/img/1_vr3bXaCVvkHKXRQxlKVeHw.jpg" title="Image" >}}

Let’s Begin!

## Why Do Changes Need To Be Tracked?

Within Salesforce viewing and displaying changes made to an org are crucial to its maintenance. From audit trails, decision-making, misunderstandings, building trust, and meeting compliance protocols having a history of changes helps you go back and identify what was changed, by whom, and when.
Let’s break down the steps necessary to set, view, and display a history for Salesforce fields.

## Locate The Object You Need to Track Fields

First, you’ll need to head over to <strong>Object Manager</strong> and locate the Object for which you plan to set, view, or display field history.
{{< image src="/img/1_taihIfC_j10mPhkbTTSnsA.png" title="Image" >}}

## Enable History Tracking

Next, within the Object, select <strong>Field and Relationships</strong> and locate and click the “Set History Tracking” button on the top-right-hand corner of the screen.
{{< image src="/img/1_Mpo6bPp7BCLF45Sr04II3A.png" title="Image" >}}

## Choose What Fields To Track

Click the <strong>Enable Opportunity Field History</strong> checkbox and select the fields you want to track. Once ready, click on <strong>Save</strong> to apply.
{{< image src="/img/1_QJYy_WPNlzQPlX2c8Kz7Kw.png" title="Image" >}}

## Enable Field History Within A Page Layout

Make sure your <strong>Object Field History</strong> is included within a Page Layout. If not, head over to <strong>Page Layouts </strong>within the Object Manager, add the related list, and click <strong>Save</strong> to proceed.
{{< image src="/img/1_hrth6mvGpZ2kMdeAn15EVw.png" title="Image" >}}

## View Field History

To verify, head over to the Object’s record page and locate the Field History related list. From here, you can now view changes to the fields enabled on our previous step.

> In the event you cannot see the changes within the field history make sure to check your user account has the necessary field-level permissions to view changes.
> <strong>Pro Tip</strong> — Admins can help by checking and verifying within your org.
> {{< image src="/img/1_1k_tw4kcQpk7HN2MR_wq4Q.png" title="Image" >}}

## Ensure Data Tranperance and Evolution

By giving authorized users access to historical data the collaboration between peers improves, misunderstandings are reduced and trust continues to build within a company.
Overall, field-level history promotes data quality with the ability to enable data-driven decision-making.
Until next time keep working hard, smart, and happy. And we’ll see you in the cloud!
