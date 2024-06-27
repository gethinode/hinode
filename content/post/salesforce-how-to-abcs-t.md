---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2023-09-25T20:31:19.000Z",
  "title": "Salesforce “How To” ABCs: T",
  "Slug": "salesforce-how-to-abcs-t",
  "description": "How to turn off Multi-Factor Authentication (MFA).",
  "tags": ["trailblazer", "administrator", "how-to"],
  "author":
    {
      "name": "Jessie Penaloza",
      "title": "Digital Marketing Coordinator",
      "jpeg": "/img/contributors/jesus-penaloza_88-88.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_nFipWKKNX0_TbWq8REYRfQ.png" },
}
---

Another Dreamforce is in the books, a new release is on the horizon, and admins everywhere may find themselves with so much new Salesforce info in their heads that they’re googling things they “swore they knew how to do, just last month”!
That makes this the perfect time for another installment of our [Salesforce “How to” ABCs](https://medium.com/tag/salesforce-how-to-abcs)! The series where we tackle the most commonly Googled Salesforce questions, letter by letter, to help trailblazers find the answers they’re looking for fast!
Today’s letter is “T” as in, “How to turn off Multi-Factor Authentication”. Let’s dive in!
Why would anyone want to turn off MFA and remove their security protocols? Well… sometimes you may be working on a project that requires you to log in from multiple devices and those one-time password (OTP) requests start firing away as the MFA protocols kick in. It becomes more of a necessity to turn them off instead of having to enter those OTPs each and every time.
The process is simpler than you think but can only be implemented if you have full access to the org. Let us proceed.

> Make sure to contact your Admin to provide work arounds on customer orgs as this is mostly recommended for orgs you have full access.
> Start by heading to <strong>Setup</strong> by heading over to the <strong>Gear</strong> icon on the homepage.
> {{< image src="/img/1_Yg0Un0VkjCOZS1ZYKjHDhg.png" title="Image" >}}

Use the <strong>Home</strong> search bar and type in **Identity**, locate the <strong>Identity Verification</strong>, and click on it.
{{< image src="/img/1_5fganuROZKJc8Fjct3cLZA.png" title="Image" >}}

Within the <strong>Identify Verification</strong> screen start by locating the <strong>MFA section</strong> and <strong>deselect</strong> the following checkboxes.

> -Require multi-factor authentication (MFA) for all direct UI logins to your Salesforoce org  
> -Require identity verification during multi-factor authentication (MFA) registration
> {{< image src="/img/1__9qhgZ38knFpfg8LsDCsmw.png" title="Image" >}}

Next, scroll over to the <strong>General</strong> section and deselect the following checkboxes.

> -Require security tokens for API logins from callouts (API version 31.0 or earlier)
> {{< image src="/img/1_8Hu8pNVj1IZnua67Klf3CQ.png" title="Image" >}}

Lastly, scroll down to the <strong>Session Security Level Policies</strong> and change the dropdown options from** Raise session to high assurance** to <strong>None</strong> for the following.

> -Manage Multi-Factor Authentication in API  
> -Manage Multi-Factor Authentication in User Interface
> {{< image src="/img/1_oA0fkJWaaXs5kxIpCjqctw.png" title="Image" >}}

Scroll the to end and click on <strong>Save</strong> to apply the changes.
{{< image src="/img/1_UgnPpKH_05OWRXnJ_CW7NQ.png" title="Image" >}}

A pop-up will appear once the changes are successfully applied. Now verify that MFA has been disabled by attempting to log in from various devices without experiencing those constant OTP prompts.
And you’re all set! (Just don’t forget to turn MFA back on when you’re ready.)
Until next time, keep working hard, smart, and happy. And we’ll see you in the cloud!
