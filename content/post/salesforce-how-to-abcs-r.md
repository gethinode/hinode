---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2023-08-29T21:30:00.000Z",
  "title": "Salesforce “How To” ABCs: R",
  "Slug": "salesforce-how-to-abcs-r",
  "description": "How to reset a security token.",
  "tags": ["administrator", "how-to", "security"],
  "author":
    {
      "name": "Jessie Penaloza",
      "title": "Digital Marketing Coordinator",
      "jpeg": "/img/contributors/jesus-penaloza_88-88.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_1MqR8r2qdU3mIXiWKb02DA.png" },
}
---

With less than one month to go before [Dreamforce](https://www.salesforce.com/dreamforce/), the coverage is pouring in about the proffered sessions, speakers, schedule, and the big concert over at Chase Center (new venue this year) in San Fransisco! This year the Foo Fighters will make their appearance at Dreamfest once again and we’ll prepare to meet thousands of Trailblazers from all over the world in ‘the City’. And, as all that news and planning and preparation and excitement starts to fill our brains to the brim, that makes it the perfect time for another installment of our [Salesforce “How to” ABCs](https://medium.com/tag/salesforce-how-to-abcs)! The series where we tackle the most commonly Googled Salesforce questions, letter by letter, to help trailblazers find the answers they’re looking for fast!
Today’s letter is “R” as in, “How to reset a security token”. Let’s dive in!
Security tokens consist of unique alphanumeric codes that create an additional layer of security (such as multi-factor authentication MFA) to your existing Salesforce login credentials. Whether it&#39;s a company, client, or partner org, each set of login credentials is assigned a security token which is automatically generated when a password is reset.
{{< image src="/img/1_g7_5OklMNsyC_jAI_3Znfg.png" title="Image" >}}

Consider resetting your security token if any of the following apply. First and foremost if you are using your login credentials in an untrusted network or outside your company’s trusted IP range and can’t remember your authenticator app code to identify your identity. At times you may need to scan a QR code to reconfigure your new security token with the authenticator app or type it in directly.
Any time you need to reset your password your token will automatically be reset, so based on the frequency your company requires you to reset your password your token will also be reset. In case you feel there has been a breach or unauthorized access using your login credentials a token reset will halt the connection and stop unauthorized use until the problem can be resolved.
IT teams will need to reset tokens when company systems integrate with each other. During these times you may not even see an impact on your login credentials unless notifications are sent asking you to go ahead and follow some steps to reset your password.
Let’s show you the steps to get you started.
First, you’ll need to head over to your org and select the personal setup avatar icon then select <strong>Settings</strong> from the drop down.
{{< image src="/img/1_XKQOBYUabqRI6K_qnOCnhg.png" title="Image" >}}

This will take you over to Setup. In the left-hand navigation menu, <strong>under My Personal Information</strong> click on <strong>Reset My Security Token</strong>.
{{< image src="/img/1_ITXEFkuvAcupqREwRaII3w.png" title="Image" >}}

Make sure to read the <strong>warning notice</strong> in case you have any API applications linked to your current credentials that will automatically stop working when the old token is reset to a new one. Always check with your IT team if you are not sure.
Once ready, proceed by clicking on <strong>Reset Security Token</strong>. Once pressed, a confirmation message will be sent to the email address linked to your credentials.
{{< image src="/img/1__ZLI_EROT4KwUgQXHDzSLQ.png" title="Image" >}}

The confirmation email will include your new security token that will be required in order to update your authenticator code-generated app. Password resets typically take care of this step on the back end but manual resets may need to reconfigure your authenticator app.
{{< image src="/img/1_tVjFZkYnIzd6PkUOwH9VqA.png" title="Image" >}}

And now you’re all set!
Thanks again for stopping by, and stay tuned here for more of the [Salesforce How to ABCs](https://medium.com/tag/salesforce-how-to-abcs) as we continue our countdown to Dreamforce!
We’ll see you in the cloud.
