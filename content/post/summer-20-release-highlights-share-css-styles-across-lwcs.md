---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2020-07-14T09:13:08-07:00",
  "title": "Summer ’20 Release Highlights: Share CSS Styles across LWCs!",
  "Slug": "summer-20-release-highlights-share-css-styles-across-lwcs",
  "description": "The Salesforce Summer ’20 Release will be live for everyone this weekend and it’s packed with improvements, updates, and features sure to...",
  "tags": [],
  "author":
    {
      "name": "Chris Stegall",
      "title": "Digital Marketing Coordinator",
      "webp": "/img/chris-stegall_128-128.webp",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/imac-markers.jpg" },
}
---

The [Salesforce Summer '20 Release](https://releasenotes.docs.salesforce.com/en-us/summer20/release-notes/salesforce_release_notes.htm) will be live for everyone this weekend and it's packed with improvements, updates, and features sure to make admins (and users) smile. In this round of our [Release Highlights Series](https://medium.com/tag/release-highlights/archive) we'll take a look at one of our favorite new timesavers, shared CSS styles!

Let's take a look!

## Shared CSS Styles with Lightning Web Components

Whether it's about branding, UX, or simply personal principle, having a consistent look and feel across your org drives adoption, understanding, and use-ability. And achieving that cross-component synchronicity is getting even easier (and faster!) , thanks to Summer '20's [tweaks to CSS styling and LWCs](https://releasenotes.docs.salesforce.com/en-us/summer20/release-notes/rn_lwc_css_share.htm).

Now, you'll be able to define styles in the CSS module, and import the module into all the components that you'd like to share those styles. Set it once, and apply it everywhere --- a huge time saver for both admins and graphic teams!

## How Does it Work?

Instead of setting the CSS styling individually for each LWC, all you'll need to do post-Summer '20 is create a component that contains a CSS file and a configuration file --- these will compose your CSS module.

In that CSS file, you'll need to define the style rules to share across components and add some tags to delineate it as a CSS module that can be shared to other LWCs.

Lastly, in the components you'd like to have apply the styling, simply import the CSS module (or multiple CSS modules)! Imported style rules are applied to the template just like non-imported style rules.

For an example of that in action, check out the sample in the release notes [right here](https://releasenotes.docs.salesforce.com/en-us/summer20/release-notes/rn_lwc_css_share.htm) --- and then take it for a spin yourself in the code playground at [lwc.dev/guide/css](https://lwc.dev/guide/css)!

{{< image src="/img/share-css.png" >}}

Simple, straightforward, and a whole lot less time and effort than keeping your CSS branding guides elsewhere and manually applying them to each new component you build out!

And, if you need a hand migrating your branded styling to the new CSS functionality, need help building LWCs to streamline your business processes, or even need more comprehensive support bringing your org inline with industry best practices, [drop us a line](https://www.mkpartners.com/contact/)! We're always happy to help.

Stay tuned here for the rest of our favorite new features arriving in Summer '20 and, as always, keep working hard, smart, and happy.

We'll see you in the cloud.
