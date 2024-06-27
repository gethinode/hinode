---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2023-08-22T21:59:52.000Z",
  "title": "Salesforce “How To” ABCs: Q",
  "Slug": "salesforce-how-to-abcs-q",
  "description": "How to query deleted records.",
  "tags":
    ["administrator", "salesforce-how-to-abcs", "salesforce", "soql", "how-to"],
  "author":
    {
      "name": "Jessie Penaloza",
      "title": "Digital Marketing Coordinator",
      "jpeg": "/img/contributors/jesus-penaloza_88-88.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_ngoFjBwBumy0QzD6j__3gA.png" },
}
---

Community conferences like [Midwest](https://www.midwestdreamin.com/) and [Mile High](https://www.milehighdreamin.com/) are in full swing, Dreamforce is on the horizon and, with all the traveling to and fro, hither and yon, admins and devs everywhere might find themselves googling things they swear they “knew how to do, just last month” and that makes it the perfect time for the next installment of our [Salesforce “How to” ABCs](https://medium.com/creme-de-la-crm/salesforcehowtoabcs/home)! The series where we tackle the most commonly Googled Salesforce questions, letter by letter, to help Trailblazers find the answers they’re looking for fast!
Today’s letter is “Q” as in, “How to query deleted records”. Let’s dive in!
Today&#39;s topic sees us diving into [SOQL](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm), Salesforce Object Query Language, used to read information stored in your org’s database. There are many use-cases for SOQL and it can help make our lives a bit easier, but it also may feel overwhelming and difficult to understand. Worry not as many resources available today can help simplify the ease of use to extract all sorts of information within a Salesforce org.
We seek to create a query that retrieves all deleted records within an object of an org. Simple enough right? Well, Yes and No. First up you would think an Admin could whip this up real quickly, right? What if that Admin was a Jr staff member that just got hired and is new to Salesforce? They understand the problem but don’t know where to start or how to about doing this. Don’t worry, these options may provide some assistance.
We will present two methods to achieve this which allow you to choose based on your preference. Both provide a different perspective and are simple enough to deploy yourself. Let’s begin.

## Using Workbench

The first one consists of using a legit and preferred Admin/Dev resource called Workbench. This essential and user-friendly tool helps users interact with data, metadata, and jammed pack with various features to manage your Salesforce org.
Select the org environment which is either (<strong>Production</strong> or <strong>Sandbox</strong>) then select the API Version (as of today is at 58.0). Then make sure to <strong>agree to the terms of service</strong>. From here just click on the <strong>Login with Salesforce</strong> button on the bottom right-hand corner to begin.
You may be prompted to enter your login credentials but if you already logged it will take you straight to their homepage.
{{< image src="/img/1_0GEESq_ZDU6utjU7Gm206Q.png" title="Image" >}}

From here you can head over to the <strong>queries</strong> nav option and select <strong>SOQL Query</strong> from the dropdown list.
{{< image src="/img/1_p66Y85DvLpkvxVrs_R9g_Q.png" title="Image" >}}

Next, you will enter the sub-page which will be used to create your query. One of the benefits of using this tool is that it creates the query code you will need in order to properly retrieve the data you seek. In this example, we need to query deleted records and this tool already helps us traverse all the data rows available within our database which includes deleted and archived records.
It&#39;s good to note that deleted and archived records may not be retrieved by using standard SQL syntax. This method helps us toggle whether or not we want to include archived records to ensure all the data sought is gathered.
{{< image src="/img/1_ISd0fqQknIraU_9hOIIOSQ.png" title="Image" >}}

We begin building our query by choosing what object we plan to query deleted records from. In our case it&#39;s for <strong>Accounts</strong> — so will choose that. Then will select the <strong>Fields</strong> we’d like to return for each record that meets our conditions to ensure we have all the data we need. We proceed by selecting <strong>Account Number</strong>, <strong>Name,</strong> and <strong>IsDeleted</strong>. Simply hold the shift key to select multiple fields or just type them in on the query text below.
We want to obtain a list view of the records that meet our conditions so will keep the <strong>View as</strong> to List. You have the option to sort the result by any field type or leave it blank — for this walkthrough, we left it blank.
The next two settings are highly important. First, we need to <strong>Include Deleted and archived records</strong>, because if we don’t any archived deleted records will not be added to our list view and the same will go for deleted records — which is what we are trying to obtain. Next, will need to identify when a record has been deleted. Good to know that Salesforce toggles a flag when a record is deleted and will be used to find and filter our results.
{{< image src="/img/1_lkh9GHFW8EcKinwy3KSnIw.png" title="Image" >}}

Make sure to select <strong>IsDeleted</strong> from the dropdown under <strong>Filter results by:</strong> operation to <strong>equals to</strong> and the value to <strong>True</strong>.
If you had not already noticed each time you changed a setting the query would be updated to reflect those changes. The final SOQL query consists of the following.
<strong>SELECT</strong> AccountNumber, Name, IsDeleted <strong>FROM</strong> Account <strong>WHERE</strong> IsDeleted = <strong>True</strong>
If we read this back it says to include the following fields (Account Number, Account Name, and Is The Record Deleted Flag) from all the Account records where the flag IsDeleted is set to true which means a record within the account object has been deleted.
Pressing the <strong>Query</strong> button will output a list view. As you can see we had created three test accounts within the Accounts object and then deleted them to test and ensure the populated on the query results list view below.
{{< image src="/img/1_nhrTzmba1l7fz67J_zQI7A.png" title="Image" >}}

## Using Anonymous Window

The other method and one preferred when you are trying to quickly debug any issues, don’t need a fancy output, and use the Developer Console, is Anonymous window. Whereas using Workbench is great for us non-coding peeps, Anonymous Window favors those who love to read between the lines.
This is fairly straightforward as well just need a bit of understanding where the information you seek is available to review. First up head over to the developer console window by selecting the <strong>Gear Icon</strong> and choosing <strong>Developer Console</strong> from the dropdown window.
{{< image src="/img/1_F0eHft_K2W0nMBmmgC28yw.png" title="Image" >}}

This will fire up a Dev console window ready to use. Simply use the nav menu scroll over to <strong>Debug</strong> and select <strong>Open Execute Anonymous Window</strong> from this dropdown menu.
{{< image src="/img/1_xBzqbNfuzhlDqmw4rz_OWw.png" title="Image" >}}

This will launch the Anonymous Window where you can go ahead and take the following Apex code to help output the same information as method one under the debug console window. This method will not create a nice list view and does not have the option to tweak the code using a user interface. Instead, you’ll have to adjust the code directly.
Worry not the code is straightforward and just runs a loop for each record from all records (archived or deleted) within the Accounts object to see if the IsDeleted flag is set to true. Same thing as method one but does not require you to use an external app instead just fire up the Dev console and type in the following Apex code within an anonymous window.
for(Account acc : [SELECT Id, Name FROM Account WHERE IsDeleted = TRUE ALL ROWS])<br>{ system.debug(acc);<br>}
{{< image src="/img/1_klts51gvCDCJfbZCtdh81g.png" title="Image" >}}

Make sure to check off the <strong>Open Log</strong> box before pressing the <strong>Execute</strong> button to ensure a log window launches when the code is run. Upon running the code the log will populate with various timestamps as below.
{{< image src="/img/1_3sVoz_Ppp4qJJJwYTou5iw.png" title="Image" >}}

To filter the timestamps and obtain the deleted records you need simply check off the <strong>Debug Only</strong> box and the log will automatically filter with only the deleted record information as below.
{{< image src="/img/1_4p_X05qAzB9_XySYMNyDfQ.png" title="Image" >}}

In our example, we mentioned we had deleted three records from our Accounts object which appear as they did within Workbench. With this method, you avoid the need to use an external app and quickly get the data you seek in a raw-only mode. While some people may not appeal to this style others praise these simple tactics to quickly view the information they need.
No matter the method you choose, there are many roads to the same destination so try them out and see which feels better to you!
Thanks again for stopping by and we’ll catch you on the next one!
