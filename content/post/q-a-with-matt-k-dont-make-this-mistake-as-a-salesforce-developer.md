---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2024-01-11T19:15:18.000Z",
  "title": "Q & A with Matt K! Don’t Make this Mistake as a Salesforce Developer",
  "Slug": "q-a-with-matt-k-dont-make-this-mistake-as-a-salesforce-developer",
  "description": "We’re kicking off the new year with a new series: “Q &amp; A with Matt K!”..",
  "tags": ["q-and-a", "apex", "developer"],
  "author":
    {
      "name": Chris Stegall,
      "title": "Marketing Director",
      "jpeg": "/img/contributors/chris-stegall_352x352.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_DKmHmP9IUzpHX1mNgVU47A.png" },
}
---

We’re kicking off the new year with a new series: “Q &amp; A with Matt K!”.
Matt sits down weekly to tackle Salesforce questions from the community — unrehearsed and unedited to demonstrate what it looks like when we encounter, evaluate, troubleshoot, and resolve real-world issues and use-cases.
This time, Matt’s taking a look at an Apex error message that a lot of new Salesforce devs may encounter:
**Method does not exist or incorrect signature: void getGlobalDescribe() from the type Schema**

<iframe src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FoLv4Hb-kcaA%3Ffeature%3Doembed&amp;display_name=YouTube&amp;url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DoLv4Hb-kcaA&amp;image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FoLv4Hb-kcaA%2Fhqdefault.jpg&amp;key=a19fcc184b9711e1b4764040d3dc5c07&amp;type=text%2Fhtml&amp;schema=youtube" width="854" height="480" frameborder="0" scrolling="no">[https://medium.com/media/f70f4e02f7ead2d0eeef6c8b6ed1f153/href](https://medium.com/media/f70f4e02f7ead2d0eeef6c8b6ed1f153/href)</iframe>You may have a different function than “getGlobalDescribe()” and a different type than “Schema”, but this is a common error, that’s tricky to troubleshoot, if you’re new to the platform because it involves some reserved-but-not-reserved keywords for classes because they exist as objects in Salesforce.
For the restricted Apex keywords, take a look here: [https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_reserved_words.htm](https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_reserved_words.htm)
And for the unrestricted-but-restricted keywords, this is a good jumping off point: [https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_list.htm](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_list.htm)
Hopefully this’ll help some new SF developers avoid this headscratcher before it turns into a hair-puller!
And if you’ve got a question you’d like Matt to answer, leave it in the comments here so we can add it to a future video!
Until next time, keep working hard, smart, and happy. And we’ll see you in the cloud!
