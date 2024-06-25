---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2023-01-20T08:00:00-07:00",
  "title": "Spring ’23 Release Highlights: Marketing Cloud Account Engagement (Pardot)— General Enhancements",
  "Slug": "spring-23-release-highlights-marketing-cloud-account-engagement-pardot-general-enhancements",
  "description": "Well, the time has finally come. Salesforce has officially posted release notes for the official Spring ‘23 debut of Marketing Cloud…",
  "tags": ["release"],
  "author":
    {
      "name": "Tommy Holden",
      "title": "Content Contributor",
      "webp": "/img/tommy-holden_128-128.webp",
      "jpeg": "/img/tommy-holden_128-128.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/0_IPa0hHSJ0NsTGPZ_.webp" },
}
---

Well, the time has finally come. Salesforce has officially posted release notes for the official Spring ‘23 debut of _Marketing Cloud Account Engagement_(AKA: Ex-Pardot).\*\*It’s worth noting that prior release information for this new product suite was more or less quite vague until now. Via newly recently released official published information, we’re starting to see where this new platform is headed known as “General Enhancements” within the Spring ’23 Release Notes.

1. **Account Engagement Optimizer (Beta Release Only):**

{{< image src="/img/1_p-16eEL7f-tKEe1VV0oVIg.png">}}

Now an end-user can receive automated & actionable recommendations to improve efficiency & stay ahead of issues within a desired business unit. The recommendations that the Optimizer settings provides can improve email sending deployments, enhanced visitor tracking, & an overall status for your business unit to know know if anything critical needs immediate attention. There’s also an _Optimizer Table Action Manager_ to pause and prioritize actions.

**_Please Note_**This feature is a Beta Service Release at this time. Any use of the Beta Service is subject to the applicable Beta Services Terms provided at [Agreements and Terms](https://www.salesforce.com/company/legal/agreements/).

**So, How Do You Access This Exciting Beta Release Exactly?**Opting into the beta from your business unit dashboard or by navigating to the Optimizer page can be completed within an end-user’s Account Engagement Settings. When applicable, recommendations include a direct link to the area of the app to which the recommendation settings focuses on.

**2. Domain Validation Is Being Changed Up: _This is important_**Sending domain validation now requires **_Proof of Ownership._**For each of your sending domains, Account Engagement generates a unique validation key that you copy and paste into your DNS record. When you validate your domain, the system checks your DNS record to confirm that the TXT entry matches the validation key in your business unit. That said, Domains that you validated previously with DKIM **_still_** remain validated. However, existing domains that weren’t validated previously now require the new validation method. It’s also worth nothing that the DomainKey Policy column is being removed from the Domain Management page. Although, the DomainKey column is still present. While we recommend adding a DomainKey entry to your DNS records, it’s not a mandatory requirement.

**Where & How:**All of the above\*\*\*\*changes apply to all Account Engagement editions. From the Domain Management page in Account Engagement, copy the validation key for your sending domain and add it to your DNS as a TXT entry. After the key is added, verify the domain in Account Engagement by checking the DNS entries.

**_Also_** — **New Account Engagement Business Units Have New Settings set on by default to Protect Prospect Privacy Including:** _First-Party Tracking_, _Force HTTPS_, _Honor Do Not Track_, and _Request Opt-In_ from all visitors. The Max Tracking Cookie Duration setting now defaults to 365 days. An Account Engagement administrator can edit the default settings at any time. These changes affect only customers who are new after Spring ’23 release and don’t override existing settings in your business unit.

**3. _Also VERY Important_ Options to Run Automation Rules in Real-Time Is Officially Being Retired = This is a legacy Pardot setting which is being scrapped and is effective in all Account Engagement editions as of June 2023.**Post retirement, existing automation rules that use this setting continue to run but don’t run in real-time. When you create a new rule or edit an existing rule, the option to run in real time is no longer available.

**4. New Feature: External Action Error Table — Keep Your Automations Running Reliably Within a Consolidated Setting:**

{{< image src="/img/1_YKwQvcEj1c5lVOoAVLl4Kw.png">}}

Review third-party app integration error root causes & deep dive into which automations, steps, & actions are affected. Looking at the above graphic, an end-user can identify, diagnose, & fix errors preventing automations from running as expected. This change occurs to the Account Engagement Lightning App in Plus, Advanced, and Premium editions. In addition, a consolidated third-party app usage table is available in one setting within the Usage and Limits tab:

{{< image src="/img/1_e3kKsT6yYOhfSuupkTrsbQ.png">}}

**5. API & Integration Alterations & Removal(s):** Also note, there will be some upcoming changes to the existing offerings with 3rd party connectors which legacy Pardot users have been known to use. There will be official retirements this year for *Webex, (April 1st, 2023) & Slack Beta (February 13th, 2023)*platforms. The *ReadyTalk *connector was retired as of November 2022*.*However, a Version 5 API Beta platform will be available for expanded support on 28 objects. This includes multi-select table actions for bulk processing of records.

**This is a Lot to Process, But We’re Always Here to Help You Out:** There’s no question that the official transition from the legacy Pardot B2B Specality Marketing Suite into Marketing Cloud as the new Account Engagement suite will take some time to get acclimated with. At MK Partners, we’re committed to staying on top of all of the new changes to this product transition. [Reach out to us](https://appexchange.salesforce.com/appxConsultingListingDetail?listingId=a0N30000001gF9jEAE) with additional questions or for any guidance you might have. And, of course, we’ll see you in the cloud!
