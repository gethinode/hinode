---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2024-05-14T22:46:32.000Z",
  "title": "Summer ’24 Release Highlights: Enforced Updates",
  "Slug": "summer-24-release-highlights-enforced-updates",
  "description": "Better prep, because you don’t have a choice with these..",
  "tags": ["release", "administrator", "summer-24"],
  "author":
    {
      "name": "Jessie Penaloza",
      "title": "Digital Marketing Coordinator",
      "jpeg": "/img/contributors/jesus-penaloza_88-88.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1__7Vy1_d6eFWwzX_B2ab7aA.png" },
}
---

Summer ’24 is Salesforce’s last “2024” release (because even though we’ll get the Winter release in September/October of this year, it’ll be branded “Winter ‘25”)! Which means **technically** this is also 2024’s last batch of release notes! That being said, let’s take a look at some of the enforced updates that will apply to each org when this release comes full circle.
Let’s Begin!

## Migrate to a Multiple-Configuration SAML Framework

This [update](https://help.salesforce.com/s/articleView?id=release-notes.rn_security_saml_release_update.htm&release=250&type=5) was first introduced and made available in the Spring ’24 Release and will now require Salesforce administrators, who have configured SAML (Security Assertion Markup Language) settings according to their organization’s requirements adjust them accordingly.
After this release, all SAML SSO single-configurations will stop working and be required to migrate to a multiple-configuration SAML framework. This change will open up the ability to tailor SAML configurations based on use cases, requirements, security needs, and much more. A one-size-fits-all configuration will no longer be the best approach to integrating complex configurations. That is why Salesforce is making some adjustments to its SAML protocols.
This change will apply to Enterprise, Unlimited, and Developer on both Lightning and Classic editions.

## Allow Only Trusted Cross-Org Redirections

This next [update](https://help.salesforce.com/s/articleView?id=release-notes.rn_security_other_crossorg_redirections_ru.htm&release=250&type=5) was first introduced and made available back in the Winter ’24 Release and was enabled by default. However, if you need to identify what impacts it may have within your org head over to the [Trust Redirections to your other Salesforce Orgs](https://help.salesforce.com/s/articleView?id=sf.security_trusted_urls_external_redirections_orgs.htm&language=en_US&type=5) for more information.
Administrators configure remote site settings for external domains using Trusted Cross-Org Redirects. This ensures custom authentication logic is in place to validate that data leaving from one org and entering another is coming from a trusted source. This protects your organization’s data and maintains compliance with new security standards.
This enforced update will apply to all Lightning and Classic editions of Salesforce. Once the update hits your org head over to Setup, search and select <strong>Release Updates</strong>, and follow the steps to get you started.

## Enable ICU Locale Formats

This last [update](https://help.salesforce.com/s/articleView?id=release-notes.rn_customization_globalization_enable_icu_locale_formats_release_update.htm&release=250&type=5) was first introduced and made available back in Winter ’20 and continues to be rolled out and enforced as of Spring ’24. This consists of adopting the ICU (International Components of Unicode) library for handling locale-specific data values. This protocol helps define the format used for dates, times, currencies, addresses, names, and numeric values.
Prior to this update, Salesforce used JDK (Java Development Kit) locale which is limited in functionality and how it handles international data formats. With ICU a more comprehensive and robust support for handling complex locale tasks is unlocked. While a typical user may not notice this on the front end, developers will gain access to more features and functionality support, in the back end, to meet their international locale requirements with ease.
To enable this change and unlock these capabilities simply search and select <strong>Release Updates</strong> within Setup. This change will apply to all editions of Salesforce except Database.com.
Until next time keep working hard, smart, and happy. And we’ll see you in the cloud!
