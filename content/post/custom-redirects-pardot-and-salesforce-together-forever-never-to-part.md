---
{
  "priority":"0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2022-11-16T23:42:09.000Z",
  "title": "Custom Redirects, Pardot, and Salesforce: “Together Forever & Never to Part!”",
  "Slug": "custom-redirects-pardot-and-salesforce-together-forever-never-to-part",
  "description": "Rick Astley was absolutely on-point back in 1987 (&amp; also a potential Marketing Genius at that) within making the album<em> </em><strong><em>Whenever You Need Somebody.</em></strong> As goes the reliability within the Salesforce system with using “Custom Redirects”..",
  "tags": ["pardot","marketing","marketing-cloud","salesforce","custom-redirect"],
  "author": {
    "name": Tommy Holden,
    "title": undefined,
    "jpeg": undefined
  },
  "layout": "single",
  "thumbnail": {
    "url": "/img/1_wy71GmWnULaawg_kwnl7_w.png"
  }
}
---
Rick Astley was absolutely on-point back in 1987 (&amp; also a potential Marketing Genius at that) within making the album** **<strong>**Whenever You Need Somebody.**</strong> As goes the reliability within the Salesforce system with using “Custom Redirects”.
The Pardot Custom Redirect system works. Still, It’s Dependent on, as Rick Astley put it, “A Full Commitment is What I’m Thinking Of…”<strong> </strong>A custom redirect is a link generated in Pardot <strong>(</strong>now known as **Marketing Cloud Account Engagement**<strong>)</strong> which is trackable and can “redirect” clickers to any desired destination URL. The main advantage is Completion Actions can be added (so that Pardot takes an automated action when a cookied prospect clicks the link).
And remember, unlike the 1987 album by Rick Astley, <strong>**Whenever You Need Somebody**</strong> which will always be the same, Pardot will not (at least in name as it moves under the Marketing Cloud umbrella).
{{< image src="/img/0_oIkp9idh9MaHldz4" title="Image" >}}

A <strong>custom redirect report</strong> will show you two figures: The number of total clicks (a combination of known prospects and anonymous visitors) &amp; number of cookied prospects.
{{< image src="/img/1_Bl9P0oIc3Y55wELEugMzvg.png" title="Image" >}}

A user will see that the custom redirect page is made up of three key parts: EG = <strong>Tracked URL</strong>: Meaning the link you want to use and where the user directly responds prospect to. When creating the custom redirect, Pardot will convert this URL to be trackable, generating a new URL as a result. Other actions are as follows:
<ul><li><strong>Completion Actions</strong>: The automated action/s you want Pardot to make when a prospect clicks the link. <strong>Note: </strong>These actions will only be applied to prospects who have been <strong>cookied</strong> and using the same browser/device that they were <strong>cookied </strong>using that respective browser setting(s).</li><li><strong>Prospects</strong>: Where the known <strong>cookied</strong> prospects who clicked the link will be recorded (anonymous visitors and known prospects will be reflected in the ‘unique clicks’/’total clicks’ fields.</li></ul><strong>Social Media Clicks-Based Posts= “I Just Want to Tell You How I’m Feeling!”</strong>
{{< image src="/img/1_p_OjhrypksrKkjm9dEB2sA.png" title="Image" >}}

Use the custom redirect system to track clicks from social posts. Pardot does have [social media connectors](https://help.salesforce.com/articleView?id=pardot_connectors_social_posting_parent.htm) (LinkedIn, Twitter, Facebook) that will do this for you but there are functionality gaps that custom redirects fill:
<ul><li>For other social media channels eg. Instagram, YouTube.</li><li>For social posts that were not published using [Pardot’s social posting tool](https://help.salesforce.com/articleView?id=pardot_connectors_create_social_post.htm&amp;type=5), eg. through another tool like Hootsuite, or colleagues posting individually.</li><li>Using custom redirects gives you more flexibility for social media link tracking. Just remember the limitations with cross-device tracking, as the prospect won’t be cookied if they switch devices/browsers, therefore the ‘social click’ activity won’t appear on their prospect activity.</li></ul><strong>Banner Advertisements — “We’ve Known Each Other For So Long…”</strong>
{{< image src="/img/1_yx8ANfDXQfpW6BBk1KGj1Q.png" title="Image" >}}

Placing banner adverts on third-party websites means that you lose some overall game into the traffic directed prospect with regards to their respective website/landing pages. The website analytics tools you would use, namely Google Analytics, won’t reach to third-party websites.
While using [UTM parameters](https://support.google.com/analytics/answer/1033863?hl=en) on banner ad links will give you an idea of inbound traffic sources in Google Analytics (and from form submissions) — and is the most reliable for uncookied prospects — in conjunction with custom redirects, you will be able to:
<ul><li>Have a quick way to reference total clicks from third-party websites, in Pardot, display which cookied<strong> </strong>prospects clicked on the third-party website banner. Remember that Google Analytics metrics keep visitors anonymous (whereas custom redirect reports pinpoint which prospect records).Scores result in three categories: Detractors (0–6), Passives (7–8), and Promoters (9–10).</li></ul>You can run a simple NPS survey in Pardot using custom redirects. <strong>Note: </strong>This solution will no longer give you 100% accurate data; sure, you will be able to see the number of clicks across all numbers (indicating general consensus about your brand), however, only <strong>cookied prospects</strong> using the same browser/device that they were cookied using will have their prospect record updated.
To continue with this easy approach, all you need would be = <strong>Custom number field</strong> called ‘NPS Score’ (“or similar,” like any rental car agency would say) as well as up to <strong>10 custom redirects</strong>. Each custom redirect has a completion action to ‘change prospect custom field value’ by a specific number; for example, the custom redirect named “NPS_10’ will change the ‘NPS Score’ field to 10.”
{{< image src="/img/0_8edGo50TQ9Ih_6wE" title="Image" >}}

Images in the email are hyperlinked with each of the 10 custom redirects. These act like buttons that a prospect can click. Of course, there are further steps and considerations to the full NPS setup but this gives you the essential overview.
<strong>Tracking Files &amp; Direct Mail Campaigns — “You Know The Rules &amp; So Do I”</strong>
Files, such as PDFs or images, that you use to market, may not actually be stored in Pardot. You could:
<ul><li>Already be using a DAM (digital asset management) or sales enablement platform, and are wondering how you can ensure Pardot tracking is “hooked up” to these assets, or,</li><li>You feel restricted by the file storage available (both in Pardot and in Salesforce. The *AMAZING* news is that you can use custom redirects to alleviate these pain points and track the number of people that access that file (even on external websites or portals). Direct mail has been experiencing somewhat of a comeback. Many marketers thought physical mail could be the antidote for digital overload and inbox saturation. The best tactic to bring direct mail campaigns to meet with digital tracking could be to ask the recipient to claim the offer or prize by visiting a link. Little do they know, that the URL printed on paper is a custom redirect. You have the freedom to set the URL ending as something user-friendly, for example: go.thedrip.com/redeem-offer</li></ul><strong>Note</strong>: this relies on the prospect being known (cookied) in Pardot. Otherwise, you will need to include a form to ensure prospect activity tracking is in place for that individual.
<strong>Also, Remember to Identify Email Bot Clicks — “We’ve Known Each Other For So Long…”</strong>
{{< image src="/img/1_OaqcDHhdtGbYs_XS6SWQdQ.png" title="Image" >}}

By placing a hidden custom redirect in the header, body, or footer of an email (not visible to a prospect viewing the email), it can say that the link has been clicked, that click certainly wasn’t a prospect.
There’s no doubt that custom redirects are a key Pardot feature, capturing link clicks that would have otherwise been left untapped. Completion actions on custom redirects will only update the records of cookied prospects using the same browser/device that they were cookied:
{{< image src="/img/1_QGLpxAylvtkQq8pCTotLiQ.png" title="Image" >}}

Need a hand figuring out where and when to deploy custom redirects in your marketing efforts (or implementing/imporiving the PArdot platform in general) — [drop us a line](https://appexchange.salesforce.com/appxConsultingListingDetail?listingId=a0N30000001gF9jEAE)! We’re here to help (and we’ll never give you up or let you down).
Happy marketing — and we’ll see you in the cloud.
