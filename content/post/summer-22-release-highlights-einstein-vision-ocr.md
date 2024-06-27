---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2022-05-24T08:00:00-07:00",
  "title": "Summer ’22 Release Highlights: Einstein (Vision) OCR",
  "Slug": "summer-22-release-highlights-einstein-vision-ocr",
  "description": "We’re two weekends away from Summer ’22 being live in orgs everywhere and we’re back with another round of Release Highlights — this time…",
  "tags": ["release"],
  "author":
    {
      "name": "Chris Stegall",
      "title": "Marketing Director",
      "jpeg": "/img/contributors/chris-stegall_352x352.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_HsX6Kh9UgR_5prXZdIlm1w.webp" },
}
---

We’re two weekends away from Summer ’22 being live in orgs everywhere and we’re back with another round of [Release Highlights](https://medium.com/creme-de-la-crm/tagged/release-highlights) — this time with a look at a time-saving new superpower of everyone’s favorite AI, Einstein! We’ll also be taking a look at another, somewhat cryptic, Einstein mention in the release notes that admins will want to keep their eyes on as more information rolls out.

Let’s dive in!

### Einstein OCR (Beta)

We all know that the Salesforce platform is only as powerful as its data and that anything admins can do to make data-entry easier is a boon to, not only their users, but their teammates, execs, stakeholders, heck — anyone that’s looking to make informed, strategic decisions about the state and trajectory of the organization’s efforts.

Einstein AI isn’t a new vector for data-entry-easing efforts — you may remember a few years ago when Einstein Voice was the big push in release notes, at Salesforce events, and from AEs, all aimed to make it easier for folks to update records on the fly, right from their phones by just speaking the updates, notes, etc… that needed to be added. And, while adoption for Einstein Voice may have never hit the numbers Salesforce hoped, for those that did embrace it, it’s proven a valuable tool in their arsenal of data accuracy and timeliness. And Summer ‘22’s addition to Einstein looks to be even more valuable — and so likely more widely adopted as well — [Einstein OCR](https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein_vision_ocr_custom_forms.htm&type=5&release=238)!

Optical Character Recognition isn’t exactly new in the world of tech, but when it comes to simplifying data entry on the platform, what could be easier than letting Einstein scan that intake form, invoice, contract, etc… and populate or update the record automatically!

Admins (and devs) will a essentially pass completed forms into the platform as an image and, using a [customize-able form template](https://storage.googleapis.com/sfr-ocr-apis-research/samples/82092117.json) and [two simple commands](https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein_vision_ocr_custom_forms.htm&type=5&release=238), Einstein OCR will be extract the relevant data and update the records accordingly! Gone will be the days of accountants, office managers, intake associates, etc… typing with one hand while they hold a completed application, invoice, etc… in the other! So they’ll be able to focus on their work, not on manually entering data — a win for admins and orgs everywhere!

### Einstein Data Exploration Consent

Next up is a short blurb that appears in a multitude of places in the [release notes](https://help.salesforce.com/s/articleView?id=release-notes.salesforce_release_notes.htm&type=5&release=238&language=en_US) which suggests that Salesforce is eager to spread the word but, unusually, the details in all those mentions seem pretty sparse. In fact, all it really says is:

> Allow Data Analysis with Einstein Data Exploration Consent:
> Work smarter with Einstein features when you permit Salesforce data scientists to explore and improve your data.

[This will be a checkbox](https://help.salesforce.com/s/articleView?id=release-notes.rn_allow_analysis_data_exploration_consent.htm&type=5&release=238) (by project and object) you can flip on in the Setup menu, but there’s not real indication of who or what will be analyzing your data, what criteria they’ll be using to evaluate it, or what efforts they’ll be making to “improve your data”.

And, while many orgs and admins are probably open to suggestions about data improvement, there are likely far fewer who are eager to let someone else start making changes, sight unseen. Now, given Salesforce’s commitment to trust, privacy, etc… it seems tremendously unlikely that if you consent you can expect to have a team of data scientists changing records, updating fields, etc… but until more details surface on what to expect, I imagine the opt-in rate will be fairly low. At least at first.

If I had to guess (and I don’t, but I will anyway) I’d wager we can expect something along the lines of Einstein being used on the backend to identify shared records across disparate orgs and offer to make updates based on situations where your data might be out of line with the rest. Say, for example, that years ago Coca-Cola used to be a client and you have a contact on their for their VP of Purchasing — Sally Reynolds. In the years since, Sally’s moved on and the new VP of purchasing is Nancy Duarte but, because you’re no longer servicing the account, your information is out of date. If other orgs, that do have Coke as a current client all show Nancy as the VP, perhaps Einstein will recommend the update to your org!

It would be an interesting way to embrace Salesforce’s huge market share, improve data accuracy across the board, and eat some of the lunch of the major business information database clearinghouses — all without sacrificing privacy — but again, I’m just guessing at what “data improvement” might mean as a result of “data exploration”.

In any event, admins will want to keep a weather eye out for more information to help determine of consenting is the right choice for their orgs.

And feel free to toss your best guesses as to what exactly that data exploration and improvement might mean in the comments!

Until next time, keep working hard, smart, and happy. We’ll see you in the cloud.
