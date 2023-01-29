---
title: Hosting and deployment
description:
date: 2023-01-28
group: getting-started
layout: docs
---

<!-- TODO: expand -->

<!-- ## Hugo deploy -->

<!-- https://gohugo.io/hosting-and-deployment/hugo-deploy/ -->

## Host on Netlify

Netlify can host your website with continous deployment from your Git provider. The starter price plan is free for any public repository and provides 100 GB bandwidth and 300 build minutes each month. Review the next sections how to automatically deploy your site to Netlify on each update to the main branch of your repository.

{{< alert >}}
The starter plan requires your repository to be public. You will require a paid plan if your repository is set to private.
{{< /alert >}}

### Assumptions

- You have an account and repository with GitHub, GitLab, or Bitbucket.
- You have a Hinode website you are ready to deploy.
- You do not already have a Netlify account.

### Preparations

The repository root should include a file `netlify.toml`. If not, copy it from the [Hinode main repository]({{< param "links.repository" >}}). The configuration file contains the build settings that Netlify will pick up when connecting to your repository. The panel below shows the default build settings. The key command to observe is `npm run build`, which ensures the site is built properly.

{{< alert >}}
The default configuration provides basic security headers. Please review the [server configuration]({{< relref "server" >}}) for more details about the Content Security Policy.
{{< /alert >}}

{{< docs name="netlify" file="netlify.toml" show="false" >}}

You might encounter timeout errors when you generate a large site that contains many resources (such as images). Adjust the `timout` in `config/_default/config.toml` as needed.

{{< docs name="build" file="config/_default/config.toml" >}}

### Configure your site

Sign up for Netlify and configure your site in seven steps.

{{< carousel class="col-sm-12 col-lg-8 mx-auto" >}}
  {{< img src="img/netlify-step1.png" caption="Step 1. Sign up for Netlify" >}}
  {{< img src="img/netlify-step2.png" caption="Step 2. Sign in with your Git provider" >}}
  {{< img src="img/netlify-step3.png" caption="Step 3. Authenticate your sign in (2FA)" >}}
  {{< img src="img/netlify-step4.png" caption="Step 4. Add a new site" >}}
  {{< img src="img/netlify-step5.png" caption="Step 5. Connect to your Git provider" >}}
  {{< img src="img/netlify-step6.png" caption="Step 6. Import an existing project" >}}
  {{< img src="img/netlify-step7.png" caption="Step 7. Configure the build settings" >}}
{{< /carousel >}}

{{< accordion >}}
  {{< accordion-item header="Step 1. Sign up for Netlify" >}}
    Go to [netlify.com]({{< param "links.netlify" >}}) and click on the button `Sign up`. Select your preferred signup method next. This will likely be a hosted Git provider, although you also have the option to sign up with an email address. The next steps use GitHub, but other Git providers will follow a similar process.
  {{< /accordion-item >}}
  {{< accordion-item header="Step 2. Sign in with your Git provider" >}}
    Enter the credentials for your Git provider and click the button to sign in.
  {{< /accordion-item >}}
  {{< accordion-item header="Step 3. Authenticate your sign in (2FA)" >}}
    Assuming you have enabled two-factor authentication with your Git provider, authenticate the sign in next. This example uses the GitHub Mobile app.
  {{< /accordion-item >}}
  {{< accordion-item header="Step 4. Add a new site" >}}
    Click on the button `Add new site` to set up a new site with Netlify.
  {{< /accordion-item >}}
  {{< accordion-item header="Step 5. Connect to your Git provider" >}}
    Connect to your Git provider to import your existing Hinode repository.
  {{< /accordion-item >}}
  {{< accordion-item header="Step 6. Import an existing project" >}}
    Pick a repository from your Git provider. Ensure Netlify has access to the correct repository.
  {{< /accordion-item >}}
  {{< accordion-item header="Step 7. Configure the build settings" >}}
    Review the basic build settings. Netlify will use the settings provided in the [preparations]({{< relref "#preparations" >}}). Click on the button `Deploy site` to start the build and deployment process.
  {{< /accordion-item >}}
{{< /accordion >}}

Your site is now ready to be used. Click on the domain settings of your site within the `Site overview` page to provide a domain alias and to edit the site name as needed. Be sure to review your [server configuration]({{< relref "server" >}}) if you encounter any rendering issues, such as broken links or garbled stylesheets.
