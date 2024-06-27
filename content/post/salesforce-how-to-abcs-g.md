---
{
  "priority": "0.5",
  "date": "2029-11-08T14:29:39-07:00",
  "title": 'Salesforce "How To" ABCs: G',
  "Slug": "salesforce-how-to-abcs-g",
  "description": "With the time change behind us, there’s a good chance you’re reading this basked in the light of your computer screen as the inky blackness of early-afternoon seeps between your curtains...",
  "tags": ["security", "token", "whitelist", "administrator", "how to"],
  "author":
    {
      "name": "Chris Stegall",
      "title": "Digital Marketing Coordinator",
      "webp": "/img/chris-stegall_128-128.webp",
      "jpeg": "/img/chris-stegall_128-128.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/laptop-with-glasses-and-plant.jpg" },
}
---

With the time change behind us, there’s a good chance you’re reading this basked in the light of your computer screen as the inky blackness of early-afternoon seeps between your curtains. But while we watch, helplessly, our days dragged deeper into the ever-expanding realm of night, the most common [Salesforce](https://www.salesforce.com/products/) queries know no rest. Fields still need to be created, users activated, passwords reset, and so we’re back with another (softly-lit) installment of our Salesforce “How to” ABCs! The series where we scour google for the most-commonly searched Salesforce help requests, letter by letter, to help make our fellow-users’ days a little bit easier.

This time, we’re on the letter “G” as in, “how to get your security token”! Let’s dive in!

{{< image src="/img/googling-salesforce-how-to.png" title="Googling Salesfoce how to" >}}

### What is a Salesforce Security Token?

If you’ve wound up here, you probably already know — but in case you stumbled into this post to prep for an admin interview, a cert exam, or out of a general but all-consuming Salesforce curiosity, let’s set the stage.

Your Salesforce security token is what you use (in conjunction with your username and password) when you want to access your org from a desktop client outside your company’s whitelisted IP-range, or the API. Pretty straight forward.

### What Do You Mean by “Get”?

Now, when you say you want to “get” your security token, do you mean “create” one? Or find an existing one?

This might seem like semantics, but it’s actually super important. Your security token has to be generated, there’s no default security token because that would be less secure than creating them on demand.

Most of the Salesforce documentation centers around the first instance — generating or resetting your token. That’s super helpful if it’s your first time but, if you’ve done that previously and built an integration using it to connect with the Salesforce API, generating a new token will void the previous one and break that connection (yikes). It’s no fun scrambling to find all the broken connections to (re)update your security token, so it’s a question worth asking yourself before you click “reset”.

Given that, if you want to create or reset your security token, read on! If you’ve used your security token in the past and just want to find it for reference, use it in another application, etc… skip straight to the “Finding an Existing Security Token” section!

### Creating a Security Token

Creating or resetting your security token is as simple as a few clicks.

First, navigate to your personal settings by clicking on your profile icon in the top right corner of your org.

{{< image src="/img/clicking-user-avatar.jpg" title="Arrow pointing to user avatar" >}}

And select “Settings” from the menu that drops down.

{{< image src="/img/arrow-pointing-to-user-settings.jpg" title="Arrow pointing to user settings" >}}

That’ll land you on your personal information page. Now click “Reset My Security Token” on the left hand side of the screen (or enter “Reset” in the Quick find box and then select it).

{{< image src="/img/reset-my-security-token.jpg" title="Arrow pointing to reset my security token" >}}

And once you’re on your Reset Security Token Page, simply click “Reset Security Token”.

{{< image src="/img/reset-security-token-button.jpg" title="Arrow pointing to reset security token button" >}}

==!! REMEMBER: This will render any existing uses of your previous security token void/obsolete, so be careful if you think you have any existing connections you might break. !!==

And once you’ve clicked it, you’re almost there! You’ll see the notification that a new security token has been emailed to you — just head over to your inbox and look for the email from Salesforce!

{{< image src="/img/check-your-email.jpg" title="Check your email" >}}

{{< image src="/img/email-security-token.jpg" title="Email of security token" >}}

`I've already reset mine again, so please don't try to use this security token to hack your way into my super-secret trailhead playground please. Thank you.`

And now you’re all set! Congrats on your new security token!

Be sure to either record that token somewhere secure in case you need to reference it in the future, or don’t delete the email (assuming your good about inbox security).

### Finding an Existing Security Token

If you jumped straight to this section to find your existing security token, welcome! If you’re continuing from the “create/reset” section, you can probably guess what I’m about to tell you — your existing security token can be found in your inbox!

Existing security tokens aren’t saved anywhere “in-org” so you’ll need to find the email you were sent when you created it the first time. The easiest way to do that is to search “Salesforce Developers security token”.

{{< image src="/img/email-search-security-token.jpg" title="Searching for security token in email" >}}

Click into the most recent email and there you have it!

{{< image src="/img/email-security-token.jpg" title="Email of security token" >}}

`I've already reset mine again, so please don't try to use this security token to hack your way into my super-secret trailhead playground please. Thank you.`

If you can’t find the email, your next best bet will be too look at your previous uses. Find the API/desktop client connection you were afraid of breaking and dig back into the code. Your security token will be the alphanumeric string following your password in the code, so all you’re looking for something like:

```cmd
username = myusername
password = mypasswordXXXXXXXXXXXXXXXXXX
```

Copy and paste the “XXXXXXXXXXXXXX” and voila!

Given our previous example, we’d expect to see something like:

```cmd
username = myusername
password = mypasswordbEm3dmXFLkPJ27oXViSQtnXe
```

So we’d know the security token is `bEm3dmXFLkPJ27oXViSQtnXe`!

Obviously, it’ll vary a little bit depending on if you’re looking at a from-scratch connection or something like Outlook, Connect, etc… but the principles are the same. If you’ve used it in a desktop client, it may be in a separate field, so check your profile/settings for something like:

```cmd
Username: myusername
Password: mypassword
Security Token: XXXXXXXXXXXXXXXXXX
```

And now you’re all set! You can use that security token in whatever new situation you have planned and you won’t break any of your existing connections!

If you still need a hand getting your security token sorted out, want some help building the integration that would make your job easier, or just need some oversight to ensure your org’s in line with best practices — [drop us a line](/contact)! [We’re here to help](https://appexchange.salesforce.com/appxConsultingListingDetail?listingId=a0N30000001gF9jEAE&fbclid=IwAR38kpRGAPJb5T-T-IwqQIkE55Lb7xqArR9qnRFBQffZbgxay0k8gTrzkgE).

In the meantime, keep working hard, smart, and happy. And we’ll see you in the cloud.
