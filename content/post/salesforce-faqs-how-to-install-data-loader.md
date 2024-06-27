---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2029-04-24T12:01:01.000Z",
  "title": "Salesforce FAQs: How to Install Data Loader",
  "Slug": "salesforce-faqs-how-to-install-data-loader",
  "description": "Last week I began writing another installment of our Salesforce “How to” ABCs, this time on exporting data, when I realized I hadn’t yet installed Data Loader on my new computer.",
  "tags": ["dataloader", "how-to", "faqs"],
  "author":
    {
      "name": "Chris Stegall",
      "title": "Marketing Director",
      "jpeg": "/img/contributors/chris-stegall_352x352.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_YrtPx5UH7u9GbPQvrzbwWQ.jpg" },
}
---

Last week I began writing another installment of our [Salesforce “How to” ABCs](https://medium.com/tag/salesforce-how-to-abcs/archive), this time on exporting data, when I realized I hadn’t yet installed [Data Loader](https://help.salesforce.com/articleView?id=data_loader.htm&type=0) on my new computer.
**Then** I realized the [Data Loader](https://help.salesforce.com/articleView?id=data_loader.htm&type=0) install process itself has changed a bit recently. Rather than stuff the whole updated install process into that post, and make you dig through all the extra hemming and hawing just to get to the part you care about (this isn’t a recipe site after all), I figured we’d break them out into separate posts so that you can find the info you need fast!
So here it is, the speedy guide to installing Data Loader on your PC or Mac — let’s jump in!
**NOTE: Most of the screenshots included will show a Mac install, but we’ll include the PC-equivalent instructions as well so you can follow along with whatever hardware’s in front of you.**
The first thing we’ll need to do is install Zulu OpenJDK version 11. (This is the part that’s brand new since my last install).
Begin by navigating to the [Zulu download page](https://www.azul.com/downloads/zulu).
{{< image src="/img/1_5qrwh78_wUcr3zhYnCzfww.png" title="Image" >}}

Scroll down and click on ‘11’ under the “Select a Version of Java” prompt.
{{< image src="/img/1_rr8nVSRELacfKVL59aiQhA.jpg" title="Image" >}}

And then click ‘Get Started’ under the appropriate operating system (macOS for Mac, Windows for PC).
{{< image src="/img/1_8QN10GbN_Jc_TatJXke4Ag.jpg" title="Image" >}}

That will auto-scroll the page down to the appropriate links.
On your Mac, select the ‘.dmg’ download.
{{< image src="/img/1_YfiXPBFUtBQY_ILtcLs1Tg.jpg" title="Image" >}}

On your PC, select the ‘.msi’ download.
{{< image src="/img/1_S8muvT5HG1EdsXUOUSq2JA.jpg" title="Image" >}}

Once downloaded, open the .dmg/.msi and follow the prompts to install Zulu OpenJDK 11.
{{< image src="/img/1_ooA9LxrzPcl7hRAq7uHlcA.jpg" title="Image" >}}

Great! With Zulu installed we’re now ready for Data Loader! First, navigate to your org’s Setup page by clicking the cog in the top right corner, and then selecting ‘Setup’ from the menu.
{{< image src="/img/1_QJ45LQxFvO1_TbiczSC4Gg.jpg" title="Image" >}}

On the Setup page, type “Data Loader” into the quick find menu and then select ‘Data Loader’ (under ‘Integrations’).
{{< image src="/img/1_51aqJRslrep5ltZPETyAOg.jpg" title="Image" >}}

That will land us on the Data Loader install page where you’ll see a brief description of the app, the Zulu/Java requirement (done!), and links for the installation download.
{{< image src="/img/1_LaTXHPrnV19_l8SXO7Jkxw.jpg" title="Image" >}}

Click the link that matches your hardware, Mac or Windows.
{{< image src="/img/1_LCENAfxN_px2XUjPI3R_Xg.jpg" title="Image" >}}

That click will download the relevant zip file. Locate it on your computer and extract the files (double-click on the .zip).
{{< image src="/img/1_f7M2m1lyUNB5QefNciOAqg.jpg" title="Image" >}}

Once expanded, click into the folder.
{{< image src="/img/1_kHkjJXOEY3TryqjC_EVl5g.jpg" title="Image" >}}

And then double-click the ‘install.command’ file (on PC, it’s the ‘install.bat’ file).
{{< image src="/img/1_QnmHRZ7C2k5IRhstHNIYQA.jpg" title="Image" >}}

If you see an error like the one below about the file being from an unidentified developer, click ‘Ok’.
{{< image src="/img/1_NT8sLRrsKk1Lpqt9mWmnEg.jpg" title="Image" >}}

Then hold ‘Ctrl’, click the ‘install.command’ file again, and select ‘Open’.
{{< image src="/img/1_h4AEO5cwc3m907_uow78Gg.jpg" title="Image" >}}

When asked if “you’re sure you want to open it?”, click ‘Open’ to launch Data Loader.
{{< image src="/img/1_M49AubKQM6T1mssMK5zFuw.jpg" title="Image" >}}

And we’ve done it! You’ll see Data Loader launched in the terminal/console.
{{< image src="/img/1_U859IZXS6G2FfWc5J__b3g.jpg" title="Image" >}}

And the Data Loader UX open in its own window!
{{< image src="/img/1_SSjXMk7qq84aw8cft_XJvQ.jpg" title="Image" >}}

Congratulations! Now we’re all set for our next post where we’ll walk through using it and exporting data from Salesforce.
Until then, keep working hard, smart, and happy — and we’ll see you in the cloud!
