---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2028-11-26T13:01:01.000Z",
  "title": "Salesforce (not so) Secrets: How to Enable Sharing on Cases",
  "Slug": "salesforce-not-so-secrets-how-to-enable-sharing-on-cases",
  "description": "Customer Experience is more important than ever.",
  "tags": ["how-to", "customer-experience", "customer-service", "productivity"],
  "author":
    {
      "name": "Chris Stegall",
      "title": "Marketing Director",
      "jpeg": "/img/contributors/chris-stegall_352x352.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_9XLbWI3kCElO-W3d33e98A.jpg" },
}
---

Customer Experience is more important than ever. [Effective CX ](https://www.salesforce.com/hub/service/everything-about-customer-experience-management/)bolsters customer satisfaction, retention, and drives future revenue growth. Ineffective CX is the fastest way to turn your customers into evangelists for the competition.
And, as businesses adapt to the changing landscape of customer expectations, your audience’s tolerance for mediocre support is disappearing. Today’s customers expect (and deserve) responsive, personal, and engaging contact.
Two of the most important variables when it comes to your customers’ experience are velocity and consistency. Today’s audience expects responses in minutes, not days — across a variety of mediums. And repeating their account number, address, and issue to each new point of contact is frustrating and a surefire way to encourage them to start looking elsewhere.
You know all this. You implemented [Salesforce](https://www.salesforce.com/hub/service/customer-experience/) to help you manage your cases, data, and details. You’ve got reps auto-assigned to cases to maximize 1:1 contact and give your customers the personal experience they deserve. But what do you do when you have more cases than your reps have time? Or when a customer’s issue rolls into the next shift? In 2019, making them wait is out of the question — so let’s talk about Sharing Cases!
In today’s post we’ll walk through setting up Shared Case rules, so your CX reps can seamlessly hand-off customers, help each other pick up the slack during the busy season, or step up after a colleague’s surprise departure. With all of your customer’s information, conversations, and previous engagement intact, that transition can be seamless, consistent, and most importantly, immediate.

## Let’s get started!

To begin, head to “Setup” by clicking on the gear wheel in the top right of your Salesforce instance.
{{< image src="/img/1_a96nd-WDiTSosfGHHHO8NA.jpg" title="Image" >}}

And then select “Setup” from the dropdown menu.
{{< image src="/img/1_n7-YAkUkQo1VE_6JLmO_nw.jpg" title="Image" >}}

And that’ll take you to the Setup!
{{< image src="/img/1_ZX7WEAqrlKespX2LkacQKw.jpg" title="Image" >}}

Now, look to the Setup Menu on the left hand side of your screen. Scroll down to Security and click the ‘&gt;’ to expand it.
{{< image src="/img/1_UJHcsm_3CLHOcEfezbzfCQ.jpg" title="Image" >}}

Scroll down and select ‘Sharing Settings’
{{< image src="/img/1_mJajvcL2l0mWB5NXghV8Jw.jpg" title="Image" >}}

Note: In the future, you can save yourself the clicks by typing “Sharing Settings” directly into the search bar at the top of the Setup Menu. In fact, you’ll probably only need to type the first few letters.
{{< image src="/img/1_-_Ds6olWqIR_VEIY8tuGjw.jpg" title="Image" >}}

Perfect! You should now find yourself on the Sharing Settings page.
{{< image src="/img/1_ImO3eKWLsfSdbTZK3kF9TA.jpg" title="Image" >}}

Find the ‘Organization-Wide Defaults’ section (usually front and center) and click the ‘Edit’ button at the top.
{{< image src="/img/1_WLQux6hGkFrlessQd33N6Q.jpg" title="Image" >}}

Navigate down to “Case” and use the dropdown menu to change its default to “Public Read Only”.
{{< image src="/img/1_Aa8w7FTSZtmGT1LtCMkQGg.jpg" title="Image" >}}

**Note: After this next step you’ll likely get a pop-up notification from Salesforce. Don’t reflexively dismiss it. Do your best to fight that internet auto-pilot.**
Click ‘Save’.
{{< image src="/img/1_JUKJaKb57m_T004E6gsvZg.jpg" title="Image" >}}

Ok, there’s that semi-spooky pop-up notification that you didn’t immediately dismiss (way to go!).
{{< image src="/img/1_LCp3r0s8bB1eZycfVeFQ1g.jpg" title="Image" >}}

It actually only looks scary, it’s just letting you know that Salesforce is going to take some time recalculating things based on our change. Once the process is complete you’ll receive a notification email that you’re clear to keep working.
Click “Ok” to dismiss the pop-up.
{{< image src="/img/1_ykT5Ago3uBcJ2j5FLPF8GQ.jpg" title="Image" >}}

You’ll now see a yellow alert bar at the top of the page (and a few atop the lower sections) letting you know that Salesforce is processing the changes.
{{< image src="/img/1_ChJh3c0b2BfpYCpGfKFCyA.jpg" title="Image" >}}

All you have to do is wait for your email notification that it’s finished.
{{< image src="/img/1_BY_SpaAHOpjj-7dqli18dQ.jpg" title="Image" >}}

**Note: In my sandbox environment the changes took about a minute.**
And now you’re ready to get back to work! Scroll down the “Sharing Settings” page until you see ‘Case Sharing Rules’ and click ‘New’.
{{< image src="/img/1_za8xE7-7JwTsfcePhOxASg.jpg" title="Image" >}}

Almost there! Now you’ll see the available fields for your new case sharing rule with required fields highlighted by a red bar.
{{< image src="/img/1_hvNVtrag5yVVVV-v7yWzjA.jpg" title="Image" >}}

Begin by giving your sharing rule a label (this will be the name you see later when selecting which rules to apply).
{{< image src="/img/1_UkqNj-o0pI4odCx076WwZg.jpg" title="Image" >}}

Hit ‘enter’, ‘tab’, or click into the ‘Rule Name’ field and Salesforce will auto-populate it for you.
{{< image src="/img/1_2-kPwF7yQzAxuuDktmYL7Q.jpg" title="Image" >}}

Adding a Description is optional, but it’s a good habit to get into. Your future-self will thank you if you ever come back to make additional changes.
Now, pop down to ‘Step 3’ and use the dropdown on the right set ‘Public Groups’ to “All Internal Users”.
{{< image src="/img/1_gwbZ5Ye3wzVyDVVQLRZkHg.jpg" title="Image" >}}

Then do the same for ‘Public Groups’ in ‘Step 4’.
{{< image src="/img/1_MdHy_y4sV_WQCHxGbjQqvw.jpg" title="Image" >}}

In ‘Step 5’ use the dropdown to change ‘Case Access’ to “Read/Write”.
{{< image src="/img/1_gHGfa0xima-MLOSfo3kQfw.jpg" title="Image" >}}

And then click “Save” at the bottom!
{{< image src="/img/1_tKOJrnX8inS10kWmi-PVIQ.jpg" title="Image" >}}

But wait, there’a another pop-up! That’s ok, it’s just Salesforce letting you know that it’s going to take a second to get everything recalculated.
{{< image src="/img/1_xYMkKs2HedNuskxVgRF5Ug.jpg" title="Image" >}}

Click “OK” to dismiss the pop-up.
{{< image src="/img/1_Nor-ScXweBqp1z4L0xOJCQ.jpg" title="Image" >}}

And then wait for one of those confirmation emails to let you know everything’s been processed.
{{< image src="/img/1_97BR40A3qfXaCI43xpyQ1Q.jpg" title="Image" >}}

And that’s it!
You’ve successfully set up case sharing for your users! Now they’ll be able to help each other keep your customers smiling, even when a case’s primary rep isn’t available.
{{< image src="/img/1_WeReEVJF_Hnr4kBprj-clQ.jpg" title="Image" >}}

Congratulations! You’ve just taken a big step toward improving your Customer Experience.
If you’re interested in more not-so secret Salesforce tips, tricks, and tweaks — stay tuned!
And if you’d like to learn more specifically how your brand could optimize Salesforce to get the most ROI out of your CRM, [reach out](https://www.mkpartners.com/article/contact/contact) — we’re happy to help!
Until then, happy working!
