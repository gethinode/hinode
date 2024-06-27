---
{
  "priority": "0.5",
  "date": "2020-01-09T08:30:55-07:00",
  "title": "Spring '20 Release Highlights: SameSite Cookies, Integrations, and Preparing for Google Chrome 80",
  "Slug": "spring-20-release-highlights-samesite-cookies-integrations-and-preparing-for-google-chrome-80",
  "description": "The calendar may claim that Winter’s only just begun, but the telltale signs of Spring are starting to pop up everywhere. From sweater-free lunch-strolls...",
  "tags":
    ["spring-20", "release", "cookies", "integration", "chrome", "google"],
  "author":
    {
      "name": "Chris Stegall",
      "title": "Digital Marketing Coordinator",
      "jpeg": "/img/chris-stegall_128-128.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/laptop-wood-flowers.jpg" },
}
---

The calendar may claim that Winter’s only just begun, but the telltale signs of Spring are starting to pop up everywhere. From sweater-free lunch-strolls, to slightly more sunlit evening commutes, the coming season is already sneaking its way into our lives and that can only mean one thing — the [Spring ’20 Salesforce release](https://www.salesforce.com/blog/2020/01/spring-20-release-preview.html) is right around the corner!

As always, we’ve pored through the [release notes](https://releasenotes.docs.salesforce.com/en-us/spring20/release-notes/salesforce_release_notes.htm) and played around in our [preview orgs](https://medium.com/creme-de-la-crm/new-release-test-drive-spring-20-sandbox-preview-ebc7801ee6bf) to find the most-impactful features, updates, and upgrades headed for orgs everywhere. And, while most of these articles center around what to expect from changes on Salesforce’s side of things, this time it’s actually an update from Google Chrome that admins may have to act on. In today’s post we’ll be taking a look at changes coming to SameSite cookies, Google Chrome 80, and how they might affect your Salesforce integrations.

Let’s dive in!

### What’s Changing?

The Google Chrome 80 (yes, 80!) release is currently in beta and is slated to become the stable release in early February of this year and, with it, come some big changes to the default cross-domain behavior of cookies. Currently, the ‘SameSite’ attribute on cookies defaults to “None” which can potentially leave developers vulnerable to some classes of cross-site request forgeries where malicious actors might try to spoof their ID via cross-domain cookies. The SameSite attribute was developed to serve as a defense against those kinds of attacks, so switching the default from “None” to “Lax” will serve to ensure that unaware devs won’t accidentally miss out on the security improvements.

And, while that’s an awesome improvement in terms of general online safety, there are two significant potential impacts to Salesforce orgs:

- Cookies won’t work for non-secure (HTTP) browser access.
- Some custom integrations that rely on cookies will no longer work in Google Chrome.

Now, let’s take a look at what that’ll mean for our orgs, and how to make sure you’re prepared for the transition.

### HTTP is Out

That first bullet is fairly simple to address, all you’ll need to do is require HTTPS access in your org. HTTP has been on the way out in favor of the more-secure HTTPS for a while now (Google first recommended making the switch 6 years ago in 2014). HTTPS is essentially just HTTP but with more security thanks to creating an encrypted connection that’s not vulnerable to man-in-the-middle attacks (someone snagging your information as it’s sent back and forth between your browser and the server).

But, if you haven’t made the switch to requiring HTTPS access in your org yet, you’ll want to do it now. Simply head over to “Session Settings” in Setup and ensure that “Require secure connections (HTTPS)” and “Require secure connections (HTTPS) for all third-party domains” are both enabled.

{{< image src="/img/require-secure-connections.jpg" title="Require secure connections" >}}

They default to “enabled” at this point, but it’s worth checking now just to ensure you’re not hit with a bunch of calls from your Chrome users come February.

### Test Your Cookie-Reliant Salesforce Integrations

Before Chrome 80 gets widely-released, you’ll want to test any of your custom integrations that rely on cookies owned and set by that integration. Luckily for us, [Salesforce](https://releasenotes.docs.salesforce.com/en-us/spring20/release-notes/rn_general_chrome_samesite.htm) and [Chromium](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html) outline exactly how to run those checks.

Using the latest version of Chrome and a Spring ’20 Sandbox you’ll want to navigate to chrome://flagsand enable the “SameSite by default cookies” and “Cookies without SameSite must be secure” experiments.

{{< image src="/img/chrome-flags.jpg" title="Chrome flags settings" >}}

Then simply test your integrations and, if you catch any regressions, update the ‘SameSite’ attribute on cookies used for cross-domain communication to:

`SameSite=None; Secure`

Test again, and they should all be back up and running! Salesforce does note (and it’s a good note) that while you test your cookies, consider what’s the most secure SameSite value that works for each cookie. If a cookie is intended to be accessed only in a first-party context, you can apply SameSite=Lax or SameSite=Strict to prevent external access. Explicitly setting SameSite=Lax means that you’re not relying on default browser behavior.

And now your org and integrations should be all set for the Chrome 80 release!

As always, if you need a hand ensuring that your org is ready and up-to-date, want some help building secure integrations, or anything else Salesforce-related, [drop us a line](/contact) — MK Partners is here to help!

Stay tuned here on the blog for more Spring ’20 release highlights and, until next time, keep working hard, smart, and happy!

We’ll see you in the cloud.
