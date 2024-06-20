---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2022-11-29T08:00:00-07:00",
  "title": "Journey Builder in Marketing Cloud: The Quirks",
  "Slug": "journey-builder-in-marketing-cloud-the-quirks",
  "description": "I always celebrate Thanksgiving by watching one of my favorite movies of all-time directed by John Hughes: Planes, Trains, and Automobiles…",
  "tags": [],
  "author":
    {
      "name": "Tommy Holden",
      "title": "Content Contributor",
      "webp": "/img/tommy-holden_128-128.webp",
      "jpeg": "/img/tommy-holden_128-128.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_9TcVTwgFc3ufAeVsvwgsA.png" },
}
---

I always celebrate Thanksgiving by watching one of my favorite movies of all-time directed by John Hughes: _Planes, Trains, & Automobiles_. Some days when I work in Marketing Cloud within _Journey Builder_, and I feel like Neil Paige (Steve Martin) who is a marketer in the movie. There are some oddball quirks in _Journey Builder_ which an end-user needs to be aware of. Don’t get me wrong, it’s an _AMAZING_ product suite & very powerful for any digital marketer to use. Regardless, there are some technology inconsistencies to be aware of:

{{< image src="/img/two-men-laughing-suits.webp" >}}

1. **Copying Activities Are Straightforward:**What’s interesting is how this feature wasn’t available a few years ago where an end-user can go and copy activities within a Journey Track. It saves time and the interface is slick. Essentially, when you copy activities within a track, it’s stored in a clipboard as a “Drag & Drop” button on the left-hand command side of the Journey Track screen:

{{< image src="/img/1_9v-r8vR2Fzj1ZuPe_pG7ig.png" title="The Interface to Select Activities Within a Journey Track to Copy. To Finalize, Select the “Copy Selection” Button on the Upper Right-Hand Side of the Screen." >}}
_The Interface to Select Activities Within a Journey Track to Copy. To Finalize, Select the “Copy Selection” Button on the Upper Right-Hand Side of the Screen._

{{< image src="/img/copies-activity-clipboard-journey-builder-screenshot.png" >}}
_These Journey Activities are Stored as a “Drag & Drop” Button known as “Copied Activities Clipboard” on the Left-Hand Side of the Screen._

{{< image src="/img/value-and-drag-journey-builder-screenshot.png" >}}
_When ready, a user can take those values & drag them into the track for the desired Modifications._

This is not the same as copying an actual entire Journey, these are individual activities which a user wants duplicated. It’s relatively straightforward, but looking back, it was bit of a “Silent Release” by Salesforce & is a huge time saver.

**2. Watch Out for “Entry Events” When Copying a Journey Track:**This is a real “Gotcha” in Journey Builder. If an end-user performs multiple copies of a Journey Track, some programmed “Entry Event” values don’t pull — rather, they simply stay static to the initial criteria within the first addition. You can see an example of this scenario below, utilizing “TEST 2 — Free to Paid Addition Complete Template (PRODUCTION)” as a copy to “TEST 3 — Free to Paid Addition Complete Template (PRODUCTION)”:

{{< image src="/img/entry-source-journey-builder-screenshot.png">}}
_“Lead” & “Subscription Expiration Date” Fields are Flipped to “Is Null”_

{{< image src="/img/copy-journey-success-journey-builder.png">}}
\*This Journey is Copied to **“TEST 3 — Free to Paid Addition Complete Template (PRODUCTION)”\***

{{< image src="/img/edit-entry-source.png" >}}
***“TEST 3 — Free to Paid Addition Complete Template (PRODUCTION)” Keeps Both Fields as “Is Not Null”. Changes *Aren’t* Reflected Upon the Copy of the Journey Despite the Change of “Entry Source”.***

In addition, there have been some form of inconsistencies where changing the “Entry Event” off of a copied track _could_ stem back to the Journey Track initially used for duplication. See below for how “TEST 4 — Free to Paid Addition Complete Template (PRODUCTION)” replaces the original naming convention within the copied Journey “Free to Paid Addition Complete Template (PRODUCTION).” This is troublesome, as there isn’t any warning to know when any of these changes can occur. Furthermore, it’s bizarre how changes made to a copied Journey Track can flip back and change up the original in terms of entry settings. Bottom Line: Be careful and consider building out new Journey’s from scratch as the copying mechanism seemingly hasn’t reached prime-time just yet:

{{< image src="/img/1_ZXirujeMNkd7mD5z36MNLQ.png">}}

**3. Hit the “Save” Button Frequently:** And I mean _overly_ hit that “Save” button. Marketing Cloud is very sensitive for any changes made — which includes something as small as changing out “Filter Criteria” settings in the “Entry Event” area to copying Journey Builder Activities. You’ll always get a warning message to save the Journey if you haven’t when clicking out of the track, but it’s important that after each change you make to hit that “Save” button just in case. Individual tweaks to tracks “on the fly” will not get warning messages (EG: photo below when clicking away) if you forget to save:

{{< image src="/img/1_EUHdaI8SrNGixDFUrowyTw.png">}}
_The “Pop-Up” Warning Message an End-User Gets When Forgetting to Save & Clicking Away From a Track._

From everyone here at MK Partners, we hope you had a safe & healthy holidays — especially with regards to deploying Marketing Cloud Campaigns & most importantly, traveling to see family:

{{< image src="/img/1_aR5iD-lIP_bqVpTeGzazmg.png">}}

We’ll see you in the cloud.
