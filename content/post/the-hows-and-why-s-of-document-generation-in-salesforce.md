---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2023-03-14T08:00:00-07:00",
  "title": "The How’s (and Why’s) of Document Generation in Salesforce",
  "Slug": "the-hows-and-why-s-of-document-generation-in-salesforce",
  "description": "Built-In Tools vs. AppExchange Solutions",
  "tags": [],
  "author":
    {
      "name": "Jessie Penaloza",
      "title": "Content Contributor",
      "webp": "/img/jesus-penaloza_88-88.webp",
      "jpeg": "/img/jesus-penaloza_88-88.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_RWzNAhyMEKQWqw6IGGJFAw.png" },
}
---

As one of the leading CRMs used by businesses worldwide, Salesforce is known for its robust features that centralize interactions between customers and businesses in a single platform. But not as widely known are Salesforce’s built-in tools for generating documents such as contracts, invoices, quotes, work orders, and more. And, while these tools are available to everyone, why do so many businesses still opt for [AppExchange solutions](https://appexchange.salesforce.com/category/doc-generation-apps) to meet their document-generating needs?

To begin answering this question we need to understand how data is stored and used within Salesforce. Similar to tables in a traditional database, Objects (tables) contain fields (Columns) that represent data elements, such as a name, email address, or phone number. Objects can also have relationships with other Objects, such as a Contact being related to an Account. From there Records (Rows) are created within Objects and can be used to run Reports, Dashboards, and APIs, Allowing users to analyze and assess data to their business needs.

### Reports & Email Templates

One of the simplest ways to generate documents within Salesforce is by using Reports or Email Templates. Simply choose the Objects and Fields, Select the Records, set the filter criteria, and generate your output. Export results to either one of the following formats; PDF, Excel, CSV, or Word. Schedule output to be sent at specific intervals to specific recipients. Use API to automate each process.

{{< image src="/img/0_WNA6RgSU_93fCU0Y.jpg">}}
_Report Example_

Disadvantages

- Requires the skills (and permissions/access) to create, save, export, etc… reports and to verify the accuracy of the resulting data.

- Requires effort to adapt reports and data to the document formats you want.

- Requires knowledge and implementation of email template functionality.

- Requires custom code for automating processes.

### Workflow Rules and Process Builder

A more elaborate and tech-savvy way of generating documents includes rules which define criteria that must be met to initiate document generation and design templates for different use cases. Followed by establishing the action that will trigger the rule to generate each document for each criteria met within Objects, Fields, or Records. Custom code can be used to merge data from an external system or automate processes.

{{< image src="/img/0_U_l0-WgGlwfjuUjC.jpg">}}
_Workflow Rule Example_

Disadvantages

- Requires understanding Workflow Rules functionality and the skills to develop templates.

- Whenever changes are made to triggers or templates, rules need to be reconfigured.

- Document generation using this method is not straightforward and requires users with knowledge of coding.

### CPQ (Configure, Price, Quote) or Visualforce

Whether you’re utilizing Sales Cloud or starting from scratch, there are two additional options to consider. CPQ can streamline and personalize product and service offerings for sales teams, generating professional-looking quotes, proposals, contracts, and other documents. Meanwhile, Visualforce lets you create custom user interfaces for Salesforce applications to showcase data, engage with users, and generate a range of documents, such as PDFs and Excel spreadsheets.

{{< image src="/img/1_DEaSfAjyEqjAnPuDr4RHxQ.png">}}
_CPQ Quote Example_

Disadvantages

- You must first configure a set of products and services for each document, and then specify any additional data you wish to include.

- This method is also limited to a subset of the Salesforce platform.

- More importantly, Visualforce requires you to understand and write code.

### Lightning Components (a.k.a — AppExchange)

This approach involves using third-party document-generating tools, also known as apps, which can be integrated into Salesforce. Many of these apps can be [downloaded from the AppExchange](https://appexchange.salesforce.com/category/doc-generation-apps) and use a WYSIWYG editor to compile record data by merging placeholder field syntax with the reference data found within those fields.

Each app may utilize one or more of the built-in tools as part of its custom solution for generating documents, resulting in a streamlined and effortless process. The custom deployment process includes installation and configuration to get you started, after which you can leverage the included resources to learn how to use the app and put it to work for you.

One significant difference between these apps and built-in methods is the degree of flexibility and customization available for each unique use case. Allowing you to create the experience your customers need.

{{< image src="/img/1_1zVfy7AMtwsS2udtyEXuHw.png">}}
_The AppExchange_

Disadvantages

- Disadvantages vary based on the app, but some potential issues to consider and evaluate are: cost, ease of setup, ease of maintenance, support quality, etc…

### Final Thoughts

Third-party solutions have established themselves as the “go-to” way to generate documents in Salesforce given the limitations of the in-built solutions.

But how can you tell which app is right for you? Read the reviews, watch some tech demos, ask the community, weigh their strengths, costs, responsiveness of support, etc… against your needs and you’ll be on your way to generating professional documents out of Salesforce in no time!

Or, if you don’t mind taking our word for it — try [Mambo Merge for free](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3u00000MBinOEAT)! It’s the solution we built (as a Lightning Web Component for our clients, because we were tired of issues with other options) that became so popular we started listing it on the AppExchange for everyone to use!

Whatever you decide — feel free to leave your comments, tips, and recommendations for other Trailblazers here in the comments.

And we’ll see you in the cloud.
