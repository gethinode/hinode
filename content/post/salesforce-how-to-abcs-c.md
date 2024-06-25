---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2029-02-20T13:01:02.000Z",
  "title": "Salesforce “How To” ABCs: C",
  "Slug": "salesforce-how-to-abcs-c",
  "description": "How to Create a Dashboard.",
  "tags":
    [
      "dashboard",
      "how-to",
      "salesforce-dashboard",
      "salesforce",
      "salesforce-how-to-abcs",
    ],
  "author":
    {
      "name": "Chris Stegall",
      "title": "Marketing Director",
      "jpeg": "/img/contributors/chris-stegall_352x352.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_jeAOzGrWZnhntQ8OGUIYrA.jpg" },
}
---

[Salesforce](https://www.salesforce.com/) can seem huge. It’s powerful, flexible, and always growing, always improving. With so many [products](https://www.salesforce.com/products/), features, [releases](https://medium.com/creme-de-la-crm/spring-19-release-the-final-countdown-1f7b24a1dc1), and updates, it’s easy to forget how to do some of the things that seemed so simple in the first weeks of your implementation.
In today’s post, we’ll continue our trek through the most common (and most commonly forgotten) Salesforce tasks — it’s another installment of the [Salesforce “How to” ABCs](https://medium.com/tag/salesforce-how-to-abcs/latest)!
For the letter “C” we’ll be covering how to create a dashboard, so you can keep an eye on all of your important metrics at-a-glance. Let’s jump in!
{{< image src="/img/1_Wa_kzI6HuMMIHRuP8QTX4A.jpg" title="Image" >}}

To begin, we’ll need to navigate to Dashboards, so click the appropriate tab at the top of your org.
{{< image src="/img/1_JQbNiWFoO9_UTFfrP41IkA.jpg" title="Image" >}}

Or, open the App Launcher, and search/select “Dashboards” from there.
{{< image src="/img/1_a80S4150LytbrrU8uXAOCg.jpg" title="Image" >}}

{{< image src="/img/1_4kidYjF-bxL4FLT2BQH2aQ.jpg" title="Image" >}}

Both methods will land you on your Dashboards page. To create a new dashboard, click the “New Dashboard” button in the upper right corner.
{{< image src="/img/1_IVd69JG2HHvNrWrbCQGCyw.jpg" title="Image" >}}

That’ll open the new dashboard dialogue, so begin by giving your new board a name.
{{< image src="/img/1_5TXjPpISQNZraeH1OBz4Ag.jpg" title="Image" >}}

{{< image src="/img/1_rumk3mcGz-nGNloqLyECFQ.jpg" title="Image" >}}

A brief description.
{{< image src="/img/1_GmWMTy62-0sTwyYT2RrHJA.jpg" title="Image" >}}

And then click “Create” at the bottom.
{{< image src="/img/1_TxJn3K7nLUg0tu7H1tF9nQ.jpg" title="Image" >}}

And now you’ll see your (currently blank) dashboard. Look at all that real estate for graphs, charts, and figures!
{{< image src="/img/1_SohTfBbzH3cMT0LhC6ObIg.gif" title="Image" >}}

To begin adding assets to this dashboard you’ll need to know which reports you want to summarize and, if you don’t have them yet, you’ll need to create them! (If you need a refresher, pop back to our guide on “[building a report](https://medium.com/creme-de-la-crm/salesforce-how-to-abcs-b-1d98b176ed8d)”).
Once you know what data you’ll want represented, click the “+ Component” button in the top right corner.
{{< image src="/img/1_mFXw_vGLg3WimBuVr_LELA.jpg" title="Image" >}}

That will pop open the report selection dialogue. Select the first report you’d like to add. For this example, we’ll add the “Opportunities by Stage” report we created in [that previous post](https://medium.com/creme-de-la-crm/salesforce-how-to-abcs-b-1d98b176ed8d). Click to highlight your desired report, and then click “Select” at the bottom.
{{< image src="/img/1_oG5uCzCaTuZZLBLi7z8voQ.jpg" title="Image" >}}

Now you’ll see the Add Component dialogue which will give you all of your options as far as graphs/charts, which data you want on which axis, display units, etc… and a preview of the final product on the righthand side.
{{< image src="/img/1_Kkhbsak5OzFHjCZSSH9tkA.jpg" title="Image" >}}

To summarize our report as a vertical bar graph, click the appropriate button under “Display As”.
{{< image src="/img/1_pzCfa_BvKN2kwzYpwoQzNA.jpg" title="Image" >}}

{{< image src="/img/1_SbmFAgDqj9jrhT3ox4PTWw.jpg" title="Image" >}}

Make any of the adjustments you’d like and, once you’re satisfied with your summary, click “Add”.
{{< image src="/img/1_9-8BMq_6xuWRHgURjr_cCg.jpg" title="Image" >}}

And you’ll see your new report/summary widget added to the dashboard!
{{< image src="/img/1_ONmFOLvKvRtXIG0avEzi3w.jpg" title="Image" >}}

All you need to finalize the dashboard is to click “Save” in the upper right!
{{< image src="/img/1_Q97oUx0oz7MRTLJg4TVjJA.jpg" title="Image" >}}

Congratulations! Your dashboard (although a bit sparse) is ready for deployment!
{{< image src="/img/1_JHQEYTxZKuPgHFW8HUGprg.jpg" title="Image" >}}

Now, let’s cover making some changes and additions — pretty common once your team starts getting used to seeing their data summarized and gets a feel for the info that would help them be more productive
To begin changing an existing dashboard, click “Edit” in the upper right corner.
{{< image src="/img/1_VNKMmrH_-QCEBhsrh5Tq9g.jpg" title="Image" >}}

Let’s say your team requested that the stages (x-axis) on that initial report be flipped, so the value’s increase from left to right instead of right to left. To do that, we’ll click the pencil icon above the graph/chart to edit it.
{{< image src="/img/1_fwZ76kRjoXDlDbH7l0WJMQ.jpg" title="Image" >}}

Scroll down the Edit Component dialogue until you see “Sort Rows By”, and change “Value Descending” to “Value Ascending”.
{{< image src="/img/1_q9R1D9MRo1GjAhCsTls_RA.jpg" title="Image" >}}

{{< image src="/img/1_3hd8y9HVK_UMAocR8uImQA.jpg" title="Image" >}}

And that’ll flip your graph around! And if you’d prefer to see the fields sorted by their stage in the sales process as opposed to numeric value, choose “Label Ascending” instead!
{{< image src="/img/1_Ts6R_azB9mz0LnUQg2OvMA.png" title="Image" >}}

{{< image src="/img/1_r52YBQZ1mC_scwsWs6fIaA.png" title="Image" >}}

Now you’ve got a nice high-level look at your sales pipeline and how full the funnel is at every stage! Once you’re satisfied with your tweaks, click “Update”.
{{< image src="/img/1_b8MtQDzoTwc7fajvEVBOpw.jpg" title="Image" >}}

To add some more graphs and charts, click “+ Component” again.
{{< image src="/img/1_dqT97xI60gPCjGeheANWNw.jpg" title="Image" >}}

That will, again, open the select report dialogue. Simply highlight and select your additional reports, finalize their graph/chart settings, and click “Add” again.
{{< image src="/img/1_pIncbzGiIod3eO5jSILLMA.jpg" title="Image" >}}

{{< image src="/img/1_NiI3H_1MPqXenAH2SwuB-w.jpg" title="Image" >}}

{{< image src="/img/1_9NKp-hSa3O0Sjt9_TcT-uw.jpg" title="Image" >}}

If, like on this Opportunity History Report chart, you’re seeing some of your data cut off by the chart’s edges you can resize it. Click once on the chart to select it. (You’ll know it’s selected when you see the bounding box and anchors appear in the corners and along the edges).
{{< image src="/img/1_dNy2KoH8WnaPceQptNjELA.jpg" title="Image" >}}

Then, simply click and hold the bounding box anchor you’d like to adjust and drag the chart out to the desired dimensions!
{{< image src="/img/1_0DTSJ-1c70c-wivL_wXWYQ.jpg" title="Image" >}}

Now, repeat those steps to add all the components you’d like and we’ll walk through rearranging them on the dashboard!
{{< image src="/img/1_nLRwnAckvWirid0PENZbXg.jpg" title="Image" >}}

Once you have all your components added, rearranging them is as easy as clicking and dragging. Hover your mouse over the component you’d like to move then click, hold, and drag it to the spot you’d like it. The other charts will jump around and get out of the way automatically.
{{< image src="/img/1_KnSJE_XmAZAEAP6B8Iu6AQ.jpg" title="Image" >}}

{{< image src="/img/1_5r30txaAQI0L_1jLnz8lEw.jpg" title="Image" >}}

And once again, hit “Save” in the top right when you’re finished.
{{< image src="/img/1_NsvPEfSxfaFaNC4M2AbGzQ.jpg" title="Image" >}}

And you’re all set! Your new dashboard is ready to to roll out!
{{< image src="/img/1_oakGKlUbKvdV5k72SXjF8Q.jpg" title="Image" >}}

Congratulations! Dashboards are a great real-time tool for meetings and presentations, aligning goals across teams, tracking individual progress, and more!
If you need help determining which of your reports will provide the most meaningful insights, configuring your own dashboards, or diving deeper into your org’s data — [drop us a line](https://www.mkpartners.com/article/contact/contact), we’re always happy to help!
And stay tuned right here for more installments of the [Salesforce “How to” ABCs](https://medium.com/tag/salesforce-how-to-abcs/latest)! Until then, keep working hard, smart, and happy! We’ll see you in the cloud.
