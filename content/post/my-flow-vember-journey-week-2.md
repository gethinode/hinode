---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2023-11-17T17:43:49.000Z",
  "title": "My Flow-vember Journey — Week 2",
  "Slug": "my-flow-vember-journey-week-2",
  "description": "As I mentioned last week, learning to “Flow” is not a race so, if you get overwhelmed with info and ideas, take a rest, recupe’, and try again when you’re feeling ready! You can always go back and read the material again, or ask a question on the Trailhead forums too. You’ll be automating tasks in your Salesforce org in no time!.",
  "tags": ["automation", "flow", "administrator"],
  "author":
    {
      "name": "Jessie Penaloza",
      "title": "Digital Marketing Coordinator",
      "jpeg": "/img/contributors/jesus-penaloza_88-88.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_YbNQe_OVC23t3vUnjO3Lxw.png" },
}
---

As I mentioned last week, learning to “Flow” is not a race so, if you get overwhelmed with info and ideas, take a rest, recupe’, and try again when you’re feeling ready! You can always go back and read the material again, or ask a question on the Trailhead forums too. You’ll be automating tasks in your Salesforce org in no time!
In this installment of My Flow-vember Journey, we continue our experience as we traverse through even more Modules and Trails. Remember, you can follow along using the [Flow-vember Trailmix](https://trailhead.salesforce.com/users/cstegall/trailmixes/flow-vember).

## What Happens Inside A Flow?

“What happens in Vegas stays in Vegas” is a, perhaps questionably intentioned, marketing phrase but it can also be applied to Flows, without any untoward implications — what happens inside a “Flow” stays inside the Flow! By using the appropriate Elements and Variables within your Flows you can take Salesforce data, modify it, as you see fit, and then push those changes back to your org.
{{< image src="/img/1_7ZwTSVAIR5qb2x9N_jG4Zg.png" title="Image" >}}

You can create flows any way you see fit however there is some structure and logic to consider. First, you want to start by identifying what data you need to assess (From an Object’s perspective). From there, you copy the data into the flow (Depending on what records you intend to analyze). Then apply logic and adjust (Copied Record Data) as needed. Once the adjustments have been made you push all the changes back to the org. This process maximizes automation by doing every type of task only once throughout the Flow instead of having to go through each record and make changes one at a time.
Familiarize yourself with the various types of Elements available and remember to always use a Sandbox environment before activating a Flow within your production org.

## Flows Within Flows

Things start to get interesting as we realize that being lazy and not wanting to do something repetitive and tedious is… a skill you need to master, and not a fault. As confusing as this may sound since it&#39;s been known that practice makes better, right? Looking at this from a different perspective, you want to identify tedious, repetitive tasks that consume your resources each time they have to be done.
{{< image src="/img/1_KoVQJ88h1RDUyDrYpkcvfQ.png" title="Image" >}}

Consider having to send a thank you email to an interested website visitor every time they submit a form on your website. Instead of having to do it yourself, every time, you can create a Flow to do it on your behalf. These types of tasks do not require individuals to be involved day in and day out. Allocate team members&#39; resources to develop new ways to win for the company and themselves. If there is a repetitive task, that is deployed at various times within the same Flow use a Sub-Flow to manage it. This way if changes need to be made, you don’t have to go around making them to each part of the Flow but only the SubFlow.
The light bulb suddenly turned on as I began to understand one of the “Superpowers” of Flows. Building Flows within Flows is such a powerful platform building block. Learning to send/receive variables within SubFlows is essential and key to making sure automation between them returns the changes you seek. Break your automation into building blocks by creating SubFlows to manage smaller and repetitive tasks.

## So Many Flow Types

If Flows are supposed to help automate tasks within my org, why do we have some many different types? Well, one way to better understand them is to identify them based on which require triggers and which require user interaction.
{{< image src="/img/1_vlWDm5_9R5K0aR3ywK1bdw.png" title="Image" >}}

Most of the Flows “run in the background” but only one runs without triggers and user interaction. An <strong>Autolaunched Flow (No Trigger) </strong>runs in the background (once initiated) until it completes its tasks. These Flows can be quite helpful when you need to have things done within your org and can even define a mechanism when to initiate. They consist of attaching them to a button action, within another Flow aka SubFlow, or by some API call using custom code. Use these type of Flows when you need to complete automation by defining the scenario that will initiate it.
All other types of flows either require a trigger or user interaction to initiate. Whether you need to launch a screen, adjust a set of records, schedule during intervals, or even trigger from a platform event. Choose the Flow to build based on the trigger or interaction that needs to be met.

## Takeaways

<ul><li>Go back and familiarize yourself with all the types of Elements available within each Flow. There are new Element introduced within each new Trailhead Challenge and once you need to combine them all it can get a bit confusing.</li><li>Understand what type of Variables are needed within each Flow type and SubFlows. It’s important to understand why Variables are used in the first place. Don’t worry about having to rush through this and redo any Flows you didn’t fully understand.</li><li>Generate Flows for each type to understand their differences and what makes each one unique.</li><li>Take a rest, if needed, and try again when you are ready. Trailhead forums are a lot of help and Trailblazers are happy to answer your questions.</li></ul>Tune in next week as we complete our Trailmix and provide a summary overview of what we learned throughout our journey. Until then, keep working hard, smart, and happy!
And we’ll see you in the cloud.
