---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2023-09-07T23:01:27.000Z",
  "title": "Salesforce “How To” ABCs: S",
  "Slug": "salesforce-how-to-abcs-s",
  "description": "How to Share Reports and Dashboards.",
  "tags": ["reports", "how-to", "administrator"],
  "author":
    {
      "name": "Jessie Penaloza",
      "title": "Digital Marketing Coordinator",
      "jpeg": "/img/contributors/jesus-penaloza_88-88.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_yRaUfrdKYlXHrkCjp4Wl8A.png" },
}
---

As September marks the beginning of Summer’s fade into Autumn, leaves will begin to “Fall” from the trees, temperatures will gradually decrease, and we’ll all get to look forward to some of the best foods and holidays on the horizon. At the same time, a new school year is in full force and students have begun another year in their academic careers.
And all of that makes this the perfect time for another installment of our Salesforce “How to” ABCs! The series where we tackle the most commonly Googled Salesforce questions, letter by letter, to help Trailblazers find the answers they’re looking for fast!
Today’s letter is “S” as in, “How to Share Reports and Dashboards”. Let’s dive in!
Trailblazers, admins, users, and execs all use Reports and Dashboards to gain insights into “The Big Picture” aspects of an organization, allowing them to make decisions based on relevant data. While Reports offer real-time snapshots of data sets, Dashboards present data through visual elements like charts, graphics, and tables. Both resources are accessible to any Salesforce user, but sharing them can uphold a uniform understanding among different users, roles, and groups.

> It&#39;s important to note that sharing reports can only be achieved by sharing the folder to which that report belongs. So, you want to make sure you create a Shared folder or some preferred name based on group, role, or user to ensure all reports or dashboards found within that folder are shared to the corresponding users.
> To get started head over to your org and click on either the <strong>Reports </strong>or <strong>Dashboard</strong> tab followed by selecting the <strong>All Folders</strong> option from the navigation on the left-hand side.
> {{< image src="/img/1_mbeAGrGFew6nVllEAc34SA.png" title="Image" >}}

Within **All Folders**, locate the folder that contains the report you wish to share. Click on its <strong>down arrow</strong> and select <strong>Share</strong> from the dropdown.

> Reports and Dashboards follow similar steps afterwards with the only difference being in one screen versus the other. For the remainder of the steps will be using the Reports tab during each screenshot.
> Next, assign access based on which type of users you want to share. Within the <strong>Share With</strong> dropdown, you will have the option to choose between <strong>Users</strong>, <strong>Roles</strong>, <strong>Roles and Subordinates</strong>, or <strong>Public Groups</strong>.
> Whether you seek to share with specific users, users based on Role, or manually defined groups, you’ll simply want to select the relevant option. Choose one to proceed (and you can always create more assignments if you need to define different permissions types down the road). In our example will proceed with <strong>Public Group</strong>.
> {{< image src="/img/1_HtIXneEyeSaCget97_csjQ.png" title="Image" >}}

Now choose within the <strong>Names</strong> search box the user, roles, or groups you want to include with this sharing permission. For this example we’ll proceed with sharing this with the Public Group called <strong>All Internal Users</strong>.

> Had you chosen a Role or User then the Name box will populate different results to choose from.
> {{< image src="/img/1_QYGalwuGVCxQgjfTi_0lgA.png" title="Image" >}}

Define the access rights of this group by selecting from one of the following options within the <strong>Access</strong> dropdown. <strong>View </strong>allows access to viewing the reports and dashboards only, while <strong>Edit</strong> allows the option to both read and write (but not the ability to delete). <strong>Manage</strong> provides the ability to do all of the above plus update and delete!
Once you have defined your access type, proceed by clicking on the <strong>Share</strong> button.
{{< image src="/img/1_sQKBIO_e6ib0tgL9iyj9WA.png" title="Image" >}}

Within the <strong>Who Can Access</strong> section a new entry will be displayed with the defined shared permissions granted.

> Create more entries if you want to define different permissions for different users, roles or groups. You can always come back and make adjustments to each entry as needed.
> When ready click <strong>Done </strong>to save.
> {{< image src="/img/1_deNQOTzoMJM3cg7vSAJT3w.png" title="Image" >}}

Now within the <strong>Shared with Me</strong> folder, you will have access to all the shared Reports and Dashboards in one central location.
{{< image src="/img/1_h99xl0p5c4Q8t1XUpdR1Tw.png" title="Image" >}}

And now you’re all set to start sharing reports and dashboards among your org and users!
Thanks for stopping by and, until next time, keep working hard, smart, and happy. We’ll see you in the cloud!
