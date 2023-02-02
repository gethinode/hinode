---
title: Hosting and deployment
description: Deploy your Hinode site to popular hosting providers.
date: 2023-02-02
group: getting-started
layout: docs
---

As a static website, your Hinode site can be deployed virtually anywhere. Hugo provides a comprehensive overview of the more popular [deployment solutions]({{< param "links.hugo_deployment" >}}). Hinode uses a different build process compared to a default Hugo site. Review the [considerations]({{< relref "#considerations" >}}) for more details. The next paragraphs highlight the specific build and deployment process of Hinode for a few selected hosting providers.

## Considerations

Before deciding on your hosting and deployment approach, review the following considerations.

1. Include npm in your build process

   Hinode uses npm to manage its dependencies. Visit the [Hinode introduction]({{< relref "introduction" >}}) and [commands overview]({{< relref "commands" >}}) for more details.

2. Configure the build timeout

   You might encounter timeout errors when you generate a large site that contains many resources (such as images). Adjust the `timout` in `config/_default/config.toml` as needed.

   {{< docs name="build" file="config/_default/config.toml" >}}

3. Consider using build automation

   Many popular Git providers provide the option to automate the build and deployment process (<abbr title="Continous Integration/Continuous Deployment">CI/CD</abbr>). You can trigger this process on each release to your main repository branch, or set up a preview during a Pull Request. The examples on this page assume you have a Git repository with GitHub.

4. Understand the support for custom domain names

   Most hosting providers provide a subdomain, such as `<username>.github.io`, to access your website by default. Usually you have the ability to use a custom domain instead, although additional services and configuration might be needed.

5. Decide on multiregion and CDN support

   Websites that serve a global audience might benefit from a multiregion or edge deployment to increase availability and reduce latency. You can also consider adding a dedicated <abbr title="Content Delivery Network">CDN</abbr>, which has the ability to reduce the impact of <abbr title="Distributed Denial of Service">DDoS</abbr> attacks for example.

6. Consider using custom HTTP headers

   Hinode uses custom HTTP headers to enable the [Content Security Policy]({{< relref "server" >}}). The support for custom HTTP headers varies per provider, and might need additional services and configuration.

The table below gives a brief overview of the features supported by a few selected hosting providers. The next paragraphs describe the build and deployment process for each provider in more detail.

{{< table "table-striped-columns w-auto" >}}
| Feature            | Azure blob storage | Netlify           |
|--------------------|--------------------|-------------------|
| Automation         | Custom action      | {{< fas check >}} |
| Custom domain name | Requires Azure CDN | {{< fas check >}} |
| CDN / Edge network | Requires Azure CDN | {{< fas check >}} |
| HTTP headers       | Requires Azure CDN | {{< fas check >}} |
{{< /table >}}

<!-- | Feature            | Azure blob storage | Azure Static Web App | GitHub pages      | Netlify           |
|--------------------|--------------------|----------------------|-------------------|-------------------|
| Automation         | Custom action      | {{< fas check >}}    | {{< fas check >}} | {{< fas check >}} |
| Custom domain name | Requires Azure CDN | {{< fas check >}}    | {{< fas check >}} | {{< fas check >}} |
| CDN / Edge network | Requires Azure CDN | {{< fas check >}}    | {{< fas check >}} | {{< fas check >}} |
| HTTP headers       | Requires Azure CDN | {{< fas check >}}    |                   | {{< fas check >}} |
{.table} -->

## Host on Azure blob storage

Azure supports hosting a static website directly from its blob storage. The service is [available for free]({{< param "links.az_blob_pricing" >}}) for the first 12 months (conditions apply). The next sections describe how to configure the cloud storage correctly and how to deploy your website from your local computer to Azure.
<!-- Consider using [Azure's Static Web App]({{< relref "#host-as-azure-static-web-app" >}}) if you plan to automate your deployments. The Static Web Apps have better support for integration with your Git provider and are easier to scale. -->

### Assumptions

- You have a Hinode website you are ready to deploy.
- You do not already have a Azure storage account.

### Preparations

The configuration folder should include a file `config/production/deployment.toml`. If not, copy it from the [Hinode main repository]({{< param "links.repository" >}}). The deployment file contains the settings used by the command `hugo deploy`. The panel below shows the default deployment settings for Azure blob storage. A more detailed example is available on the [Hugo website]({{< param "links.hugo_config_deploy" >}}).

{{< docs name="az-blob" file="config/production/deployment.toml" show="false" >}}

### Configure your site

Deploy your site to Azure blob storage in six steps.

{{< carousel class="col-sm-12 col-lg-8 mx-auto" >}}
  {{< img src="img/azblob-step1a.png" caption="Step 1a. Create a storage account" >}}
  {{< img src="img/azblob-step1b.png" caption="Step 1b. Define the instance details" >}}
  {{< img src="img/azblob-step1c.png" caption="Step 1c. Confirm the storage account deployment" >}}
  {{< img src="img/azblob-step2.png" caption="Step 2. Enable the static website" >}}
  {{< img src="img/azblob-step3.png" caption="Step 3. Configure environment variables" >}}
{{< /carousel >}}

<!-- markdownlint-disable MD037 -->
{{< accordion >}}
  {{< accordion-item header="Step 1. Create a storage account" >}}
    If not done so already, sign up for an account on the [Azure website]({{< param "links.azure" >}}). Log in to the Azure portal and create a storage account. The storage account needs to have a unique name across Azure. Select a region that best fits your needs. Leave all other options to their default value.
  {{< /accordion-item >}}
  {{< accordion-item header="Step 2. Enable the static website" >}}
    Go to the menu section `Data management` and select `Static website`. Set the toggle for `Static website` to `Enabled`. Azure will then create a storage container `$web` within your storage account to host your website. Capture the primary endpoint, for example `https://gethinode.z6.web.core.windows.net/`. Set the `Index document name` to `index.html`. Hit the `Save` button when done.
  {{< /accordion-item >}}
  {{< accordion-item header="Step 3. Configure environment variables" >}}
    Go to the menu section `Security + networking` and select `Access keys`. Capture the storage account name, e.g. `gethinode`. Next, copy either of the two keys to your clipboard. Set the credentials on your local computer:
    {{</* command user="user" host="localhost" */>}}
    export AZURE_STORAGE_ACCOUNT="<account name>"
    export AZURE_STORAGE_KEY="<storage key>"
    {{</* /command */>}}
  {{< /accordion-item >}}
  {{< accordion-item header="Step 4. Build the website locally" >}}
    Run the following command to build your website locally:
    {{</* command user="user" host="localhost" */>}}
    npm run build
    {{</* /command */>}}
  {{< /accordion-item >}}
  {{< accordion-item header="Step 5. Deploy the files" >}}
    Deploy the files to your Azure blob storage using the folling command. Add `--dryRun` to review the upload before actually publishing the files.
    {{</* command user="user" host="localhost" */>}}
    hugo deploy
    {{</* /command */>}}
  {{< /accordion-item >}}
  {{< accordion-item header="Step 6. Visit the end point" >}}
    Once the deployment has finished, visit the end point captured in step 2 to test the website in your browser.
  {{< /accordion-item >}}
{{< /accordion >}}
<!-- markdownlint-enable MD037 -->

You can make your static website available via a custom domain. Visit the [Azure documentation]({{< param "links.az_blob_domain" >}}) on how to map a custom domain to your blob storage endpoint. The static website does not support configuration of HTTP headers. Use Azure CDN to [configure HTTP headers]({{< param "links.az_cdn_rules" >}}) for your static website instead. Review the [server configuration]({{< relref "server" >}}) to identify the recommended configuration of the Content Security Policy.

<!-- ## Host as Azure Static Web App -->

<!-- TODO: expand for Azure Static Web Apps -->

<!-- Azure provides a Static Web App service that is [available for free]({{< param "links.az_blob_pricing" >}}). The free service is limited to 100 GB bandwidth per subscription, 2 custom domains, and 0.5 GB storage per app.

### Assumptions

- You have an account and repository with GitHub.
- You have a Hinode website you are ready to deploy.
- You do not already have a Azure account.

### Preparations

### Configure your site

## Host on GitHub pages -->

<!-- TODO: expand for Github pages-->

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

Your site is now ready to be used. Click on the domain settings of your site within the `Site overview` page to provide a domain alias and to edit the site name as needed. The same section also allows the configuration of a custom domain. Be sure to review your [server configuration]({{< relref "server" >}}) if you encounter any rendering issues, such as broken links or garbled stylesheets.
