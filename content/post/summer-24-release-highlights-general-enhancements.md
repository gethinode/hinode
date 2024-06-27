---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2024-04-26T18:32:13.000Z",
  "title": "Summer ’24 Release Highlights: General Enhancements",
  "Slug": "summer-24-release-highlights-general-enhancements",
  "description": "Updates Admins will Need to Know About.",
  "tags": ["release-highlights", "summer-24", "release"],
  "author":
    {
      "name": "Jessie Penaloza",
      "title": "Digital Marketing Coordinator",
      "jpeg": "/img/contributors/jesus-penaloza_88-88.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_T74CTWXhYfRB7fwHD47lig.png" },
}
---

We continue our coverage of the Summer ’24 Release with general enhancements coming to Partners, Customers, or Clients that can impact their Org. Slip into some flip-flops and crack open an ice-cold drink as you prepare to cool down from the summer heat and dive into these incoming updates, upgrades, or enhancements.
Let’s Dive In!

## First-Party Cookies Are Here To Stay

Third-party cookies were first introduced between 1995 and 2000 while the World Wide Web was making its debut. They intended to enhance web functionality and provide advertisers with a means to track user behavior across various touchpoints. Over time, privacy and data security concerns increased which made users uncomfortable with the extent of data collection and tracking facilitated by these cookies. Today, new regulations are being put into motion that allow browsers to block these third-party cookies as early as December 2024.
If your marketing requires the use of third-party cookies then this [enhancement](https://help.salesforce.com/s/articleView?id=release-notes.rn_general_salesforce_cookie_use_restrictions.htm&release=250&type=5) will require you to switch to first-party Cookies. This means marketing efforts for targeting purposes will need to change using a first-party approach. While some browsers may take longer than December to begin blocking third-party cookies existing marketing strategies will need to be refined.
As a first-party approach, there are more benefits than one could imagine, learn more [here](https://www.salesforce.com/blog/first-party-customer-data/).
{{< image src="/img/0_jeGkAK0_4dbILf_I.png" title="Image" >}}

Make sure to head over to the Routing and Policies section (found within Setup and searching My Domain) to check the first-party use of Salesforce cookies checkbox. This change will be required for all editions of Salesforce Lightning and Classic.

## MFA Is On By Default in Production Orgs

Since first introduced back in 2014 MFA has been in the Salesforce ecosystem for over 10+ years. However, with this [enhancement](https://help.salesforce.com/s/articleView?id=release-notes.rn_general_mfa_enabled_by_default.htm&release=250&type=5), MFA is now part of the default settings when spinning up a new production Org.
This means that every Salesforce user account will now require the use of an authenticator app, on their mobile device, to authenticate each time they log into a Salesforce user account. However, Sandbox or Trial Org accounts will not require MFA unless they get converted to a subscription. This already is in effect as of earlier this month, 4/8 to be exact, and applies to existing and new Orgs within Lighting, Classic, and Mobile versions of the platform.
{{< image src="/img/1_3weMkuX_mU5noNv1DH0TmA.png" title="Image" >}}

But worry not as Salesforce understands that users require time and notifications to adjust and transition. That‘s why there is a 30-day grace period when you first log into a new user account. This means that if you log into a new account after 25 days created, that user still has 5 days before MFA becomes a requirement.
Admins can still make exceptions for special use cases such as test accounts, process automation, community licenses plus more. Read more about the exceptions [here](https://help.salesforce.com/s/articleView?id=sf.security_mfa_exclude_exempt_users.htm&type=5).
And… in case Admins need reminders [this enhancement](https://help.salesforce.com/s/articleView?id=release-notes.rn_general_mfa_noncompliance_prompt.htm&release=250&type=5) will provide them with in-app reminders if MFA is not properly configured.

## Default No-Reply Org Wide Email Addresses

If you are a Salesforce Admin, Marketing Manager, or IT Administrator then making sure every email sent from your Org has a default email address, displays a name, is valid, and is monitored is just another day at work. These tasks are part of your email management system to streamline communication between domains, senders, and recipients.
Imagine if you start receiving emails from unknown senders, how would you feel, what would you think, and more importantly, what actions would you take? These are the pitfalls an email system must overcome each time an email is sent. That is why creating and verifying email addresses builds credibility and accountability for emails. This [enhancement](https://help.salesforce.com/s/articleView?id=release-notes.rn_general_verify_return_email_address.htm&release=250&type=5) will require a default No-Reply Address in Org-Wide emails within each Org.
{{< image src="/img/1_2O_kXiRdKgZmh7wdT3_zvg.png" title="Image" >}}

Receiving emails in your inbox is like receiving paper mail each day in your mailbox. You only care about what’s important and disregard the rest. With this update, new and increased email security standards when emails fail to be sent or lack contact information will be implemented. Therefore a default No-Reply Address will be required for each Salesforce Org that sends emails to a Lead, Contact, or Person Account.
This enhancement starts with this release but will not be enforced until the Winter ’25 which is just months away. Begin checking all emails sent to ensure they comply with this change. Once again Lightning, Classic, and Mobile versions of the platform will implement this change.

## Improved Account Interface

As an Account Manager, Sales Rep, or Customer Success Manager one of your many roles includes managing your Accounts. These roles add a subset of tasks that include but are not limited to, maintaining relationships, tracking interactions, and identifying new opportunities. Working with Admins they help establish a process to manage these Accounts by either adding custom fields to track specific data or build reports to understand the big picture.
{{< image src="/img/0_lLwYe_b_wcYDcmD6.png" title="Image" >}}

With this [enhancement](https://help.salesforce.com/s/articleView?id=release-notes.rn_general_your_account_improved_interface.htm&release=250&type=5), you’ll have access to an updated and improved Account interface to help find your Accounts, Contracts, and Invoices in one central location. Check with your Admin to be added within either one of these permissions sets: Manage Billing or Account App Admin.
This change will apply to the following Salesforce editions: Lightning Experience in Starter, Pro Suite, Professional, Enterprise, Performance, and Unlimited.

## Conclusion

Our Release Highlights continue with more coverage of the general enhancements that may impact your org. Let us know what Summer ’24 Release enhancements you anticipate deploying within your next implementation.
Until next time keep working hard, smart, and happy. And we’ll see you in the cloud!
