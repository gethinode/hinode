---
{
  "priority":"0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2023-07-27T00:12:38.000Z",
  "title": "Validation Rules, Dependent Fields, and Nested IFs, ANDs, NOTs, and ORs",
  "Slug": "validation-rules-dependent-fields-and-nested-ifs-ands-nots-and-ors",
  "description": "Today’s post comes to us straight from the trenches. Well, not the trenches — Awesome Salesforce Admins don’t work in trenches, but this was a practical puzzle as opposed to a hypothetical one, so it’s straight from the real world at least. Let’s set the stage..",
  "tags": ["validation-rule","formula-fields","salesforce-admin","salesforce","salesforce-formula"],
  "author": {
    "name": Chris Stegall,
    "title": Marketing Director,
    "jpeg": /img/contributors/chris-stegall_128-128.jpeg
  },
  "layout": "single",
  "thumbnail": {
    "url": "/img/1_Y_YFXY8i8dl8o08LkiYPoA.png"
  }
}
---
Today’s post comes to us straight from the trenches. Well, not the trenches — Awesome [Salesforce](https://www.salesforce.com/products/) Admins don’t work in trenches, but this was a practical puzzle as opposed to a hypothetical one, so it’s straight from the real world at least. Let’s set the stage.

## The Puzzle

You’re an admin and you’ve developed a custom object for your team. They need to be able to create records in the object without filling out every field. But, once they enter data in a certain field, there are three other fields that now need to be required as well — so it’s time to build a validation rule!
The question is, how do you write the rule so that if all four fields are blank, it passes but, if any one of them is completed while another (or others) remain blank, it fails?
{{< image src="/img/1_OBQg4EakvbYUyXI3odLumg.png" title="Image" >}}

It’s time for some nested IF, AND, NOT, and OR magic!

## The Solution

The easiest way to begin something like this is to breakdown, in plain language, exactly what you need the rule to do. From there you can then identify the components that will help you achieve that goal, and then ultimately, you can craft the formula that you’ll plug into production.
For the sake of explanation, let’s call our four dependent/required fields Make, Model, Mileage, and Last Service.
Obviously, just making the fields required is out, because then your users won’t be able to create a record without filling out the fields — so we need to make our validation rule:
<ol><li>Check if any of the relevant fields are filled out</li><li>If they are, check if the other relevant fields are filled out</li><li>If not, trigger the validation rule</li></ol>From there we can start to ID the components and functions we’ll need:
<ol><li>Check if any of the relevant fields are filled out (IF, NOT, ISBLANK)</li><li>If they are, check if the other relevant fields are filled out (AND, OR, ISBLANK)</li><li>If not, trigger the validation rule (TRUE, FALSE)</li></ol>If your more of a visual learner/doer, you might make a flowchart or diagram that looks something like this:
{{< image src="/img/1__AeqKY1vuQ_PihDXeajsrQ.png" title="Image" >}}

So now we have our fields:
Make (Make__c), Model (Model__c), Mileage (Mileage__c), and Last Service (Last_Service__c)
and our core formula functions:
IF, NOT, ISBLANK, AND, OR, TRUE, FALSE
To get started, the easiest thing to do is tackle it one field at a time and, once that works, repeat the process to add in the additional checks.We’ll start with the Make field and a “regular language” explanation of what we want:
<strong>IF</strong> the MAKE FIELD is <strong>NOT</strong> **BLANK** <strong>AND</strong> the MODEL FIELD, <strong>OR</strong> the MILEAGE FIELD, <strong>OR</strong> the LAST SERVICE FIELD **IS BLANK** then <strong>TRUE</strong> (because validation rules trigger on True), otherwise <strong>FALSE</strong>.
That makes it pretty clear and we can set down our initial formula like so:
<pre>IF( <br>   AND( <br>      NOT(ISBLANK(Make__c)), <br>         OR(ISBLANK(Model__c), <br>            ISBLANK(Mileage__c), <br>            ISBLANK(Last_Service__c) <br>            ) <br>      ), <br>TRUE, FALSE)</pre>Perfect! Now, if the Make field is not blank but (and) Model, or Mileage, or Last Service are, we get “True” and the validation rule fires! If not, we get False and the user is allowed to continue!
Well, almost perfect. It turns out that Make, Model, and Last Service are picklists so when we click Check Syntax it tells us that ISBLANK can’t handle picklists, so we need to convert those fields to text first.
{{< image src="/img/1_JjViV0_MIg4I1ibanTCUlA.png" title="Image" >}}

Luckily, that’s as easy as adding the TEXT function to the relevant fields, so now our formula looks like this:
<pre>IF( <br>   AND( <br>      NOT(ISBLANK(TEXT(Make__c))), <br>         OR(ISBLANK(TEXT(Model__c)), <br>            ISBLANK(Mileage__c), <br>            ISBLANK(TEXT(Last_Service__c)) <br>            ) <br>      ), <br>TRUE, FALSE)</pre>and we pass the syntax check
**(Note: There’s a screenshot there that won’t load for some reason. But the caption works!)**
Our first check works for the Make field now, all we need to do is repeat that process for the other three and, instead of making a separate validation rule for each field, we can just nest them right in our already functional formula!
To do that, all we need to do is replace “FALSE” with our next check but, because we’ll still want that FALSE at the end of our final check, just knock it down a couple lines to give yourself some space.
<pre>IF( <br>   AND( <br>      NOT(ISBLANK(TEXT(Make__c))), <br>         OR(ISBLANK(TEXT(Model__c)), <br>            ISBLANK(Mileage__c), <br>            ISBLANK(TEXT(Last_Service__c)) <br>            ) <br>      ), <br>TRUE,**NEXT CHECK WILL GO HERE**FALSE)</pre>From there, we can copy and paste in our first check, swap the Make and Model fields (so this time it checks, if Model is not blank, whether or not any of the others are), and be sure to add the additional close parenthesis at the end to wrap everything up:
<pre>IF( <br>   AND( <br>      NOT(ISBLANK(TEXT(Make__c))), <br>         OR(ISBLANK(TEXT(Model__c)), <br>            ISBLANK(Mileage__c), <br>            ISBLANK(TEXT(Last_Service__c)) <br>            ) <br>      ), <br>TRUE,IF( <br>   AND( <br>      NOT(ISBLANK(TEXT(Model__c))), <br>         OR(ISBLANK(TEXT(Make__c)), <br>            ISBLANK(Mileage__c), <br>            ISBLANK(TEXT(Last_Service__c)) <br>            ) <br>      ), <br>TRUE,FALSE))</pre>A syntax check and a test proves that that works as well, so all we need to do is repeat the process two more times for the other two fields we’re checking!
Bump FALSE down a line again.
<pre>IF( <br>   AND( <br>      NOT(ISBLANK(TEXT(Make__c))), <br>         OR(ISBLANK(TEXT(Model__c)), <br>            ISBLANK(Mileage__c), <br>            ISBLANK(TEXT(Last_Service__c)) <br>            ) <br>      ), <br>TRUE,IF( <br>   AND( <br>      NOT(ISBLANK(TEXT(Model__c))), <br>         OR(ISBLANK(TEXT(Make__c)), <br>            ISBLANK(Mileage__c), <br>            ISBLANK(TEXT(Last_Service__c)) <br>            ) <br>      ), <br>TRUE,**NEXT CHECK WILL GO HERE**FALSE))</pre>Copy and paste our first formula in there and, again, be sure to swap the fields around so you’re checking something new, make sure you still have the TEXT function wherever you need it, and add one more closing parenthesis after FALSE because we’re adding another IF statement:
<pre>IF( <br>   AND( <br>      NOT(ISBLANK(TEXT(Make__c))), <br>         OR(ISBLANK(TEXT(Model__c)), <br>            ISBLANK(Mileage__c), <br>            ISBLANK(TEXT(Last_Service__c)) <br>            ) <br>      ), <br>TRUE,IF( <br>   AND( <br>      NOT(ISBLANK(TEXT(Model__c))), <br>         OR(ISBLANK(TEXT(Make__c)), <br>            ISBLANK(Mileage__c), <br>            ISBLANK(TEXT(Last_Service__c)) <br>            ) <br>      ), <br>TRUE,IF( <br>   AND( <br>      NOT(ISBLANK(Mileage__c)), <br>         OR(ISBLANK(TEXT(Make__c)), <br>            ISBLANK(TEXT(Model__c)), <br>            ISBLANK(TEXT(Last_Service__c)) <br>            ) <br>      ), <br>TRUE,FALSE)))</pre>Syntax passes again, and a quick test shows us that we’re now successfully checking Make, Model, and Mileage against the other four! Repeat the process one more time (knock FALSE down a line or two, copy and paste our first formula, swap the fields around, add one last closing parenthesis after FALSE) and boom:
<pre>IF( <br>   AND( <br>      NOT(ISBLANK(TEXT(Make__c))), <br>         OR(ISBLANK(TEXT(Model__c)), <br>            ISBLANK(Mileage__c), <br>            ISBLANK(TEXT(Last_Service__c)) <br>            ) <br>      ), <br>TRUE,IF( <br>   AND( <br>      NOT(ISBLANK(TEXT(Model__c))), <br>         OR(ISBLANK(TEXT(Make__c)), <br>            ISBLANK(Mileage__c), <br>            ISBLANK(TEXT(Last_Service__c)) <br>            ) <br>      ), <br>TRUE,IF( <br>   AND( <br>      NOT(ISBLANK(Mileage__c)), <br>         OR(ISBLANK(TEXT(Make__c)), <br>            ISBLANK(TEXT(Model__c)), <br>            ISBLANK(TEXT(Last_Service__c)) <br>            ) <br>      ), <br>TRUE,IF( <br>   AND( <br>      NOT(ISBLANK(TEXT(Last_Service__c))), <br>         OR(ISBLANK(TEXT(Make__c)), <br>            ISBLANK(TEXT(Model__c)), <br>            ISBLANK(Mileage__c) <br>            ) <br>      ), <br>TRUE,FALSE))))</pre>There you have it!
Four IF statements, checking the status of the fields we need and either returning TRUE to fire the validation rule or jumping into the next IF statement to try again, all wrapped up at the end with that FALSE that will let the user continue once all the checks pass! (And a bunch of closing parenthesis to wrap up all those IF statements.)
And you could extend this formula indefinitely! Just repeat the steps above and add as many additional checks as you need!
Honestly, this is one of those admin things that almost feels like explaining it makes it seem more complicated than it is but, hopefully if you’ve been able to follow along, you’ll be able to apply these same principles to any of the formulas or validation rules that are giving you a hard time!
And, as always, if you get stuck, need a hand, or want some expert guidance on best practices and getting your org in sync with your vision — [drop us a line](https://appexchange.salesforce.com/appxConsultingListingDetail?listingId=a0N30000001gF9jEAE)! We’ve probably encountered it before and we’re here to help.
Until next time, keep working hard, smart, and happy — and we’ll see you in the cloud.
