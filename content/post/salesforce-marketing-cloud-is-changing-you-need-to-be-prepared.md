---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2022-05-10T08:00:00-07:00",
  "title": "Salesforce Marketing Cloud is Changing | You Need to be Prepared",
  "Slug": "salesforce-marketing-cloud-is-changing-you-need-to-be-prepared",
  "description": "As Bruce Hornsby & the Range Once Said in 1986: “That’s Just the Way It Is”",
  "tags": [],
  "author":
    {
      "name": "Tommy Holden",
      "title": "Content Contributor",
      "jpeg": "/img/tommy-holden_128-128.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_6xCDeRpfr6fGTJK7CLSoSw.png" },
}
---

Los Angeles, CA — May 9th, 2022: [Salesforce](http://salesforce.com) has finally decided to rename the acquisitions which have been pieced into its Marketing-based functionality over the years. Overall, the new naming conventions make sense, but it will take some time getting used to as a user. It’s all part of a program called “MC Easy” recently revealed/announced at the Salesforce World Tour in Sydney, Australia.

## OVERALL HISTORY

Salesforce purchased the former “Exact Target”, based in Indianapolis, Indiana around 2013. That platform became what we now know\**as *Email Studio\* within the Salesforce Marketing Cloud Ecosystem. Frankly, it hasn’t changed all that much since its initial integration — and is still using legacy features such as “Data Extensions,” “Guided Sends”, and various UX / UI properties from the old days.

{{< image src="/img/0_lHK6hZK4SnZQ8iiC.png">}}
**_Example of Uploading into a Data Extension (2018)_**

“Exact Target” was acquired by Salesforce for mostly B2C Marketing purposes. It was also purchased, somewhat in tandem, with Pardot which served as a B2B marketing-based acquisition product back in 2012 based in Atlanta, Georgia. That said, Marketing Cloud has always been the heavy hitter from an implementation perspective as a consultant. Yet, there has also been some backtracking in terms of use cases in using both systems within the last several years regarding best practices.

## IMPLEMENTATION HISTORY

Previously, some clients clearly didn’t need all the functionality in the Marketing Cloud universe & rested easy with Pardot instead (mostly B2B companies). Larger B2C clients were more than likely going to be geared toward using Marketing Cloud as they tended to have extremely huge databases and required critical use of suites such as _Automation Studio, Social Studio, Audience Builder, Contact Builder,_ _Journey Builder,_ and the use of SQL servers.

Surprisingly, some larger B2C clients have been recently utilizing Pardot, as it has become a more mature platform within the overall Salesforce product line. Marketing Cloud also has a significantly higher sticker price over Pardot as well
As mentioned, recently I’ve seen more B2C interest in Pardot, and for good reason. For instance, Pardot’s _Engagement Studio_ functionality has always been extremely underrated and I watched its “Silent” rollout as a consultant back in Summer 2016. I was floored by the release, and have always tried to promote it heavily to clients. It was a huge improvement from the former “Drip Campaign Editor” functionality and it has also gained additional curiosity & popularity amongst clients. This could be why some larger B2C clients have migrated over to Pardot instead of using Marketing Cloud as there is just a general ease of use.

{{< image src="/img/1_Dp_-ROU_cMDkVYiyYPEo4A.png">}}
**_Example of a Pardot Drip Campaign Workflow (2015)_**

Wow! This was now 7 years-ago? Talk about taking a stroll down memory lane! It’s worth noting that despite the surprise release of _Engagement Studio_ in Pardot in Summer 2016; the former drip editor was still an available option for a user to facilitate campaigns for at least a few years after the release.

Here are modern flow examples from both *Engagement Studio*and _Journey Builder_:

{{< image src="/img/1_3NrndT227lHdZb0ww-0JRA.png">}}
**_Example of a Pardot Engagement Studio Workflow (2022)_**

{{< image src="/img/0_xOE-lEbrsm_-ACs9.png">}}
***Example of a Marketing Cloud *Journey Builder* Workflow (2018)***

*Journey Builder*upgrades since the initial rollout in 2014–2015 have largely been concentrated within the SMS space & integrating other platforms within its own world (EG: CloudPages). _Engagement Studio_ has added on some creative new features as well: such as the ability to select, copy, and paste multiple steps from one track to another.

{{< image src="/img/0_qFbcj0jeOdJe8NcY.png">}}
_Engagement Studio: Select, Copy, & Paste Functionality (2022)_

## CURRENT BEST PRACTICES

It’s better to evaluate whether to implement Marketing Cloud or Pardot on a case-by-case basis, regardless of a customer being B2B or B2C. This is largely dependent on the specific marketing verticals and overall cost structure of the organization.

Recently, Pardot has been heavily pushed for clients to have it hosted within Sales Cloud’s “Lightning” platform. This has been primarily for the benefit of Sales & Account-based marketing groups (especially with regards to the release of the “Pardot Engage” program). The former Pardot “Classic” mode is slated to be fully retired by October 2022. Native login areas for Pardot have also been mostly phased out. Yet, Marketing Cloud has stayed independent as its own primary “stand alone” B2C Marketing Salesforce-based platform retaining direct login areas.

Functionality with regards to legacy Pardot “Campaigns,” “Custom Fields,” & “Users” have all been heavily integrated with Sales Cloud as well. Think of when you’re setting up both Sales Cloud and Pardot, both platforms need to be configured at the same time. This is regardless of the legacy connector settings between Salesforce & Pardot.

During setup, a dual structure approach between both systems needs to occur in terms of configuration. This also includes more cross-checking to ensure data, security, and overall functionality migrates properly between both systems after setup. For instance, Pardot Campaigns now need to now be hooked up alongside Salesforce campaigns — whereas they previously stood independent as internal naming conventions within their own system. New “drag and drop” functionality for editing both Email Templates and Landing Pages are also now available in Pardot — none of which existed until late last year.

Recently, some features have been stripped entirely from “Classic” mode and/or not available at all until there is a desired upgrade to “Lightning” mode including:

- [Salesforce Campaigns](https://help.salesforce.com/s/articleView?id=pardot_campaigns_salesforce_campaigns.htm&type=0&language=en_US)

- [Snippets](https://help.salesforce.com/s/articleView?id=sf.pardot_snippets_create.htm&type=5&language=en_US)

- [Pardot Business Units](https://help.salesforce.com/s/articleView?id=sf.pardot_sf_connector_pbus_parent.htm&type=5&language=en_US)

- [Engagement History Dashboards](https://help.salesforce.com/s/articleView?id=sf.pardot_engagement_history_embedded_dashboard_parent.htm&type=5&language=en_US)

- [Pardot Einstein](https://help.salesforce.com/s/articleView?id=pardot_einstein_parent.htm&type=0&language=en_US)

- [Pardot Email in Lightning Experience](https://resources.docs.salesforce.com/232/latest/en-us/sfdc/pdf/pardot_email_experience_implementation_guide.pdf)

- [Einstein Send Time Optimization](https://help.salesforce.com/s/articleView?id=mc_anb_einstein_sto_app.htm&type=0&language=en_US)

- [Marketing Data Sharing Rules](https://help.salesforce.com/s/articleView?id=sf.pardot_sf_connector_setup_selective_sync_config.htm&type=5&language=en_US)

- **More Information Directly From Salesforce on This Pardot Transition can be [Found Here (and it’s _Extremely_ Helpful)](https://help.salesforce.com/s/articleView?id=000359186&type=1):**

- **Salesforce also Released a new Implementation Guide for Pardot [Just as of March 2022](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/pardot_lightning_app_implementation_guide.pdf):**

**MAJOR UPCOMING NAMING CONVENTION CHANGES:**So, let’s get to the name changes! As of April 2022, Salesforce has completely renamed the features within Marketing Cloud and has even tied Pardot within it. Here are the new naming convention(s) which have been decided upon by Salesforce:

- **_“Messaging & Journeys”_** BECOMES: “Marketing Cloud **Engagement”**

- **_“Interaction Studio”_** BECOMES: “Marketing Cloud **Personalization”**

- **_“Datorama”_** BECOMES: “Marketing Cloud **Intelligence”**

- **_“Salesforce CDP”_** BECOMES: “Marketing Cloud **Customer Data Platform”**

- **_“Advertising Studio”_**BECOMES: “Marketing Cloud **Advertising”**

- **_“Pardot” _**BECOMES: “[Marketing Cloud \*\*Account Engagement](https://www.salesforceben.com/the-drip/pardot-renamed-marketing-cloud-account-engagement/)”\*\*

- **_“Social Studio”_** BECOMES: **RETIRED.**

Let’s just say, these changes are not going to occur overnight. It’s probably too early to tell exactly how and where Pardot is going to reside within the Marketing Cloud universe long-term. A best guess would be the new *Marketing Cloud Account Management*would sit on its own — sort of how say _Advertising Studio_ is currently. It also seems that Marketing Cloud will be the designated primary hub for all of Salesforce’s Marketing-related functionality going forward.

Regardless, it will be interesting to see how both _Engagement Studio_ and _Journey Builder_ programs play out in the new “MC Easy” platform, because they essentially perform the same duties. Recall, Pardot & Marketing Cloud as Salesforce platforms have always remained independent of each other until now.

## MARKETING CLOUD AS A MAJOR HUB

One can actually see this when logging into account within the Salesforce customer support portal. For instance, to login there are only two options to do so at this point. You can only use either your “Trailhead” _OR_ “Marketing Cloud” credentials. It’s actually only been this way for a little while and I’ve always been curious about it. There is nothing wrong with this approach, but it seems like legacy Pardot customer support might already be phased out entirely.

{{< image src="/img/0_bO_eBFjeTCgajHdK.png">}}
_Default Login Options on the Salesforce.com Help Page_

## KEY TAKEAWAYS

What’s shocking is how Pardot will eventually be sitting within the Marketing Cloud ecosystem. It’s been fully independent of Marketing Cloud for around a decade post acquisition, and is now finally being integrated within the Marketing Cloud universe.

Another huge change is that _Social Studio_ is being completely retired. It’s a little odd, as I recall within some pre-sales processes over the last few years where *Social Studio*was scoped out as a popular request by clients. It’s more than likely that some of the _Social Studio_ features are going to be rolled up into one of the other parts of the Marketing Cloud system overall. That said, it’s difficult to tell where those specific features will reside.

## FINAL THOUGHTS

Whether a marketing client is either B2B or B2C based,\*\*\*\*this is a major transition between Pardot & Marketing Cloud product lines within the[Salesforce.com](http://salesforce.com) universe. It’s almost like several airlines fully combining business operations after years of procrastination during a merger. It’s also anticipated that it will take time for many clients to fully migrate off of Pardot “Classic” mode by the end of 2022 & ensure all new features are installed & properly configured.

I do believe all of the changes look promising. I’m sure it will be for the best, and I’m looking forward to see what occurs next. Now we just need to find out if our Pardot certifications will be renamed as well…
