---
{
  "priority": "0.5",
  "haveYoutube": false,
  "haveGithubGist": false,
  "haveTwitter": false,
  "date": "2029-07-29T16:38:14.000Z",
  "title": "Troubleshooting Formula Errors",
  "Slug": "troubleshooting-formula-errors",
  "description": "Formulas are one of Salesforce’s most powerful tools for manipulating, understanding, and exploring your data.",
  "tags": ["administrator", "troubleshooting", "formulas"],
  "author":
    {
      "name": "Chris Stegall",
      "title": "Marketing Director",
      "jpeg": "/img/contributors/chris-stegall_352x352.jpg",
    },
  "layout": "single",
  "thumbnail": { "url": "/img/1_JwH1p88bpVCuFfJ0DjcVCA.jpg" },
}
---

From automating routine calculations to enforcing data best-practices, formulas are a key component of making your org work the way you want it to. But what do you do when one of those pesky errors stands between you and your vision?

In today’s post, we’ll walkthrough troubleshooting a formula error from start to finish, so you can learn what to ask, and how to react, when you’re not getting the results you expect.

Let’s dive in!

## The Problem

Today’s example comes straight from the [Trailblazer community](https://success.salesforce.com/answers?feedtype=RECENT&criteria=BESTANSWERS), that wonderful resource where you can ask all of your Salesforce-related head-scratchers and get the solutions you need from the community of engaged experts.
[Chrystele posted](https://success.salesforce.com/answers?id=9063A000000phk9QAA):

> Hello,  
> I’m trying to create a custom formula field where the formula would say:

> IF the opportunity record type is XYZ then perform that calculation,

> OR

> IF(ISPICKVAL(Pursuit type = “Upsell” then use that particular field’s value

> OR

> if neither of the 2 above then perform that calculation.

> Here is the formula I made which gives me this error syntax: Error: Incorrect number of parameters for function ‘IF()’. Expected 3, received 2:

> IF( Opportunity.RecordTypeId = “012G00000010fD7”,  
> (  
> ( Day*Rate_Price**c /(Opportunity.Existing_Monthly_Rate**c /30.4)* SIP*Renewal_Max_Factor_Product**c )+((Day_Rate_Price**c-(Opportunity.Existing_Monthly_Rate**c /30.4)/Day_Rate_Price**c)* SIP_Payout_Factor_Inc_Product\_\_c )),

> IF(ISPICKVAL( Opportunity.Pursuit_Type**c ,”Upsell”),SIP_Payout_Factor_Inc_Product**c),

> (  
> ((Day_Rate_Price**c/Opportunity.Existing_Day_Rate**c)*SIP_Renewal_Max_Factor_Product**c)+((Day_Rate_Price**c-Opportunity.Existing_Day_Rate**c)/Day_Rate_Price**c)*SIP_Payout_Factor_Inc_Product\_\_c))

> Thanks in advance for your help!
> What we have here is a classic case of “I know exactly what I want the formula to do, I have a plan for how I want it to do it, and it’s not working”. She’s included the error she’s getting (super helpful) and the formula as she’s entered it (again, super good. If you post a question to the Trailblazer community, the more info you provide in your initial post, the better your odds of getting a speedy answer).
> Now, let’s start troubleshooting!

## Finding the Issue

If your formula’s throwing a syntax error, you’ve got a pretty good clue where to start! Until we get the syntax fixed, the formula won’t run at all, so step one will be solving that issue first.
Begin, by reading the error — take a look at what Salesforce is telling you about where and why the syntax is off. In this case, Chrystele is seeing, “syntax: Error: Incorrect number of parameters for function ‘IF()’. Expected 3, received 2”.

> Additional Tip: Pay attention to where your cursor ends up after clicking “Check Syntax”. Salesforce will do its best to put your cursor in the right spot to highlight the error and where you’re likely going to need to make a change.
> Our syntax error this time is pretty clear, the IF() function of our formula is expecting 3 parameters and it’s only seeing two. (If you’re unsure of what your syntax error means, google it! You’ll find help docs, trailhead trails, and community answers outlining exactly what it means!)

## Solving the Syntax Error

We know that the syntax error is being thrown because the IF() function is missing a parameter, so let’s give it what it expects. Looking at [the documentation](https://help.salesforce.com/articleView?id=customize_functions_i_z.htm&type=5), we find that IF() functions expect 3 parameters, we’ll call them “A”, “B”, and “C”, and it expects to find them formatted like so: IF(A, B, C). In our shorthand, “A”=“this thing is this way”, “B”=“then do this”, and “C”=“otherwise, do this”.
Looking back to the formula in the question:

<pre>IF( Opportunity.RecordTypeId = &quot;012G00000010fD7&quot;,  <br>(<br>( Day_Rate_Price__c /(Opportunity.Existing_Monthly_Rate__c  /30.4)* SIP_Renewal_Max_Factor_Product__c )+((Day_Rate_Price__c-(Opportunity.Existing_Monthly_Rate__c  /30.4)/Day_Rate_Price__c)* SIP_Payout_Factor_Inc_Product__c )),</pre><pre>IF(ISPICKVAL( Opportunity.Pursuit_Type__c ,&quot;Upsell&quot;),SIP_Payout_Factor_Inc_Product__c),</pre><pre>(<br>((Day_Rate_Price__c/Opportunity.Existing_Day_Rate__c)*SIP_Renewal_Max_Factor_Product__c)+((Day_Rate_Price__c-Opportunity.Existing_Day_Rate__c)/Day_Rate_Price__c)*SIP_Payout_Factor_Inc_Product__c))</pre>We find that it’s checking:

A = if the Opportunity’s RecordTypeID is “012G00000010fD7” ,
B = then do this math [**Big, Complex, Math Formula] ,**
C = otherwise do this [an**other IF() function, this time checking if a certain picklist value is selected\*\*]
And since “C” is another IF() function, the formula is expecting another round of A, B, Cs. That means our super simplified version of the function would look something like this:

<pre>IF( A, B, <br>     IF( A, B, C)<br>  )</pre>Most of the time when we get a parameter expectation error like this, the culprit can be tracked down to either a missing/extra “,” or a missing/extra “)”. Since the system uses the “,” to delineate between parameters, and parenthesis to separate the functions (and for the math in this case too), missing or extraneous characters will “break” the syntax.

## How to Fix It

Ok, so now we know we’re likely looking for a missing or misplaced “,” or “)” — what’s the best way to actually fix it?
For simple formulas, it’s usually enough to count the commas and make sure you have as many as you’d expect, given the function. Ditto for the “)”, just checking that for every opening parenthesis you have a corresponding closing parenthesis somewhere.
But what about more complex formulas, like our example here? In that case, they key is to transform your formula into something simpler and work your way back to full functionality!
Begin like we did above, by drafting a super-simple version of your desired formula:

<pre>IF( A1, B1, <br>     IF( A2, B2, C2)<br>  )</pre><pre>///note:&quot;C1&quot; is the second IF() statement here.</pre>**[ADMIN TIP: indenting your code makes it way easier to keep track of all of your nested functions. Bump each new function a few spaces to the right and close your parenthesis directly beneath their corresponding opener and you’ll find it’s way easier to keep everything organized.]**

Once you’ve got your super simplified formula, add in the parameters one at a time, again, keeping things as simple as possible — we just want to make sure our syntax works.
For our example, we’d begin by adding our “A” parameters and, instead of going straight to the complex math calculations, we’ll substitute our Bs and Cs with simple test values to help us verify that everything’s working correctly.
So:

<pre>IF( Opportunity.RecordTypeId = &quot;012G00000010fD7&quot;, &quot;Test B1&quot;, <br>     IF(<br>          ISPICKVAL( Opportunity.Pursuit_Type__c ,&quot;Upsell&quot;), &quot;Test B2&quot;, &quot;Test C2&quot;<br>       )<br>  )</pre>Nice and neatly indented. It passes the syntax check and, if we go ahead and create the formula field, we can verify it works by testing it. If the opportunity record type matches the first check, we’ll see “B1” in the field, if it doesn’t but the picklist value matches “Upsell”, we’ll see “B2”. and if both fail, we’ll see “C2”!

Now, one by one, we can swap out the test fillers with our calculations.
**[ADMIN TIP: Test your calculations by themselves in a formula field first. That way you can check syntax and ensure that you’re getting the expected results before you drop them into your complex final formula.]**
{{< image src="/img/1_7VibcRe4uGCrePuA26qzFg.png" title="Image" >}}

Replacing “Test B1” with our calculation gives us:

<pre>IF( Opportunity.RecordTypeId = &quot;012G00000010fD7&quot;, (( Day_Rate_Price__c /(Opportunity.Existing_Monthly_Rate__c  /30.4)* SIP_Renewal_Max_Factor_Product__c )+((Day_Rate_Price__c-(Opportunity.Existing_Monthly_Rate__c  /30.4)/Day_Rate_Price__c)* SIP_Payout_Factor_Inc_Product__c )), <br>     IF(<br>          ISPICKVAL( Opportunity.Pursuit_Type__c ,&quot;Upsell&quot;), &quot;Test B2&quot;, &quot;Test C2&quot;<br>       )<br>  )</pre>It looks a bit messy, but the indentation helps make it easy to keep track of where that nested IF() and ISPICKVAL() functions are **and **helps us avoid confusing calculation parenthesis for function ones.

Replacing “Test B2” with out desired value yields:

<pre>IF( Opportunity.RecordTypeId = &quot;012G00000010fD7&quot;, (( Day_Rate_Price__c /(Opportunity.Existing_Monthly_Rate__c  /30.4)* SIP_Renewal_Max_Factor_Product__c )+((Day_Rate_Price__c-(Opportunity.Existing_Monthly_Rate__c  /30.4)/Day_Rate_Price__c)* SIP_Payout_Factor_Inc_Product__c )), <br>     IF(<br>          ISPICKVAL( Opportunity.Pursuit_Type__c ,&quot;Upsell&quot;), SIP_Payout_Factor_Inc_Product__c, &quot;Test C2&quot;<br>       )<br>  )</pre>And lastly, replacing “Test C2” with our final calculation give us the finished product!:
<pre>IF( Opportunity.RecordTypeId = &quot;012G00000010fD7&quot;, (( Day_Rate_Price__c /(Opportunity.Existing_Monthly_Rate__c  /30.4)* SIP_Renewal_Max_Factor_Product__c )+((Day_Rate_Price__c-(Opportunity.Existing_Monthly_Rate__c  /30.4)/Day_Rate_Price__c)* SIP_Payout_Factor_Inc_Product__c )), <br>     IF(<br>          ISPICKVAL( Opportunity.Pursuit_Type__c ,&quot;Upsell&quot;), SIP_Payout_Factor_Inc_Product__c, (<br>((Day_Rate_Price__c/Opportunity.Existing_Day_Rate__c)*SIP_Renewal_Max_Factor_Product__c)+((Day_Rate_Price__c-Opportunity.Existing_Day_Rate__c)/Day_Rate_Price__c)*SIP_Payout_Factor_Inc_Product__c)<br>       )<br>  )</pre>A (complicated looking) formula that passes the syntax check and gives us exactly the results we’re looking for!

{{< image src="/img/1_21UJCf_LEbxCRFnrlzwKag.png" title="Image" >}}

Congratulations, you’re now equipped to troubleshoot your own formulas!
All you have to do next time is remember these steps:

1. Determine what you want your formula to do and how you want it to do it.
2. Simplify the formula as much as possible and write it out using clean, indented code.
3. Add your parameters one at a time, checking for syntax and functionality as you go.
4. Enjoy your fully-functional final formula!

In the meantime, keep working hard, smart, and happy! We’ll see you in the cloud.
