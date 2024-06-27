---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2024-05-24T21:53:07.000Z",
  "title": "Reporting Year-to-Date vs Last Year",
  "Slug": "reporting-year-to-date-vs-last-year",
  "description": "A Tale of Troubleshooting, Testing, Refactoring, and Redemption.",
  "tags": ["formulas", "q-and-a", "reports"],
  "author":
    {
      "name": Chris Stegall,
      "title": "Marketing Director",
      "jpeg": "/img/contributors/chris-stegall_352x352.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_hDOtbNfSG9ufu0tK7cx_Dw.png" },
}
---

This week’s episode of Q&amp;A with Matt K turned in to a two-parter thanks to some too-big-for-their-britches refactoring, courtesy of me :), and a last-second save from Matt — but the end result is a solution that not only addressed the question, but has already been implemented in our own org to solve a long-standing request as well! Let’s dive in!

## Reporting (and charting) YTD vs the Same Period Last Year

This round’s question came via the Trailblazer Community where Tracy asked for help filtering a report:
**“I would like to produce a report that shows archaic data from 2023 that runs alongside the same report but that one shows the same data for 2024.**
**The 2024 report will only show months Jan-May, is it possible that i can add a filter to the 2023 report to only show the month we are in and the previous months of 2023?**
**This way i will have two bar graphs showing the same data side by side. One showing 2023 and the other 2024.”**

## Watch us Work Through the Problem

You can watch us excitedly work through the problem [right here](https://www.youtube.com/watch?v=qucz1rxTo3w), if you’d like to see how we approach something like this (and how excited we get when we realize this is something we need in our org as well)! You’ll also get to see what it looks like when I think I’ve beaten Matt to a more elegant solution (fewer lines, fewer characters, way more bragging rights).

<iframe src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2Fqucz1rxTo3w%3Ffeature%3Doembed&amp;display_name=YouTube&amp;url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dqucz1rxTo3w&amp;image=https%3A%2F%2Fi.ytimg.com%2Fvi%2Fqucz1rxTo3w%2Fhqdefault.jpg&amp;key=a19fcc184b9711e1b4764040d3dc5c07&amp;type=text%2Fhtml&amp;schema=youtube" width="854" height="480" frameborder="0" scrolling="no">[https://medium.com/media/662f48da25fcaff86c8fb7c3683773b4/href](https://medium.com/media/662f48da25fcaff86c8fb7c3683773b4/href)</iframe>
## Watch us Realize Our Mistake

In the, [much shorter, part 2 ](https://www.youtube.com/watch?v=Tqq1Ah5jqRw)— you’ll see us intuit that we’ve made an error, confirm that via testing, and then resolve the issue. It is worth noting that Matt’s initial solution worked correctly the first time (consider me knocked down a peg).

<iframe src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FTqq1Ah5jqRw%3Ffeature%3Doembed&amp;display_name=YouTube&amp;url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DTqq1Ah5jqRw&amp;image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FTqq1Ah5jqRw%2Fhqdefault.jpg&amp;key=a19fcc184b9711e1b4764040d3dc5c07&amp;type=text%2Fhtml&amp;schema=youtube" width="854" height="480" frameborder="0" scrolling="no">[https://medium.com/media/29dbc0c4dff6f7accb2127beb0b5cfee/href](https://medium.com/media/29dbc0c4dff6f7accb2127beb0b5cfee/href)</iframe>
## The Solution

And, if you’re not the watching type, here’s a textual breakdown of what we ultimately did to produce the desired report and graph!
We:

<ul><li>added a formula checkbox field to the object (we did it on Opportunities for our example)</li><li>the checkbox is checked if the Opportunity close date (or whatever the relevant date/field will be) is in the “relevant period” of the preceding year.</li><li>To do that the formula looked like this:</li></ul><pre>AND(<br>CloseDate &lt;= TODAY(),<br>TODAY() &gt;= DATE( YEAR(TODAY()), MONTH(CloseDate), DAY(CloseDate) )<br>)</pre>[Replace “CloseDate” with your relevant date field]
This compares the record’s relevant field date with today’s date and month and makes sure the date is less than or equal to that.
Then, simply filter your report by:
<ul><li>Close Date &gt; (after) 1/1/23 (or whichever years for which you’d like to include the relevant period)</li><li>Created checkbox field is checked</li></ul>That will show the relevant months in bar chart and, if you group by year, it will show the two periods side by side. [Here’s the chart demo portion of the first video, if you’d like a visual example.](https://www.youtube.com/watch?v=qucz1rxTo3w&amp;t=2265s)
{{< image src="/img/1_Z00XmnBsU4Yy3u_FMLc22w.png" title="Image" >}}

## Conclusion

Aaand it works! And it’s already live in our org! (But it’s used for confidential numbers so I can’t show you the cool final chart we see in our monthly meetings now).
As always, if you have any questions of your own you’d like to see Matt answer in the hotseat, leave them here in the comments or drop them into the form at [www.go.mkp.dev/Q&amp;A](http://www.go.mkp.dev/Q&A) !
And, until next time, keep working hard, smart, and happy. And we’ll see you in the cloud.
