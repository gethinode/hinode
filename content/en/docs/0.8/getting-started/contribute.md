---
title: Contribute
description: Contribute to the open-source development of Hinode.
date: 2023-01-06
group: getting-started
layout: docs
---

Hinode is fully open source and welcomes any contributions, either big or small. To streamline the contribution process, please take a moment to review the guidelines outlined in this article.

## Using the issue tracker

The [issue tracker]({{< param "links.issue_tracker" >}}) on GitHub is the preferred channel for bug reports, feature requests and submitting pull requests.

## Bug reports

A bug is a *demonstrable problem* that is caused by the code in the repository. This may also include issues with the documentation or configuration files. Before filing a bug report, please consider the following guidelines:

- Validate your HTML and Markdown content to ensure your problem isn't caused by a simple error in your own code.
- Use the GitHub [issue search]({{< param "links.issue_tracker" >}}) — check if the issue has already been reported.
- Check if the issue has been fixed — try to reproduce it using the latest main in the [repository]({{< param "links.repository" >}}).
- Isolate the problem — ideally create a reduced test case.
- Use the provided template in the [issue tracker]({{< param "links.issue_tracker" >}}) to capture the context, evidence and steps on how to reproduce the issue.

## Feature requests

Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the project. Please use the provided template in the [issue tracker]({{< param "links.issue_tracker" >}}) to capture the idea and context.

## Pull requests

Good pull requests—patches, improvements, new features—are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

**Please ask first** before embarking on any **significant** pull request (e.g. implementing features, refactoring code, porting to a different language), otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project. For trivial things, or things that don't require a lot of your time, you can go ahead and make a PR.

Please adhere to the [coding guidelines](#coding-guidelines) used throughout the project (indentation, accurate comments, etc.) and any other requirements (such as test coverage).

Adhering to the following process is the best way to get your work included in the project:

1. Fork the project, clone your fork, and configure the remotes:

    ```bash
    git clone https://github.com/<your-username>/hinode.git
    cd hinode
    git remote add upstream https://github.com/gethinode/hinode
    ```

1. If you cloned a while ago, get the latest changes from upstream:

    ```bash
    git checkout main
    git pull upstream main
    ```

1. Create a new topic branch (off the main project development branch) to contain your feature, change, or fix:

    ```bash
    git checkout -b <topic-branch-name>
    ```

1. Commit your changes in logical chunks. Please adhere to these [git commit message guidelines]({{< param "links.commit_message" >}}). Use Git's [interactive rebase]({{< param "links.github_rebase" >}}) feature to tidy up your commits before making them public.

1. Locally merge (or rebase) the upstream development branch into your topic branch:

    ```bash
    git pull [--rebase] upstream main
    ```

1. Push your topic branch up to your fork:

    ```bash
    git push origin <topic-branch-name>
    ```

1. Open a [Pull Request]({{< param "links.github_pr" >}}) with a clear title and description against the main branch.

{{< alert >}}
**IMPORTANT**: By submitting a patch, you agree to allow the project owners to license your work under the terms of the [MIT license]({{< param "links.license" >}}) (if it includes code changes) and under the terms of the Creative Commons ([CC BY-NC 4.0)]({{< param "links.cc_by_nc_4_0" >}}) license (if it includes documentation changes).
{{< /alert >}}

## Coding guidelines

In general, run `npm run lint` before committing to ensure your changes follow our coding standards.

### HTML

[Adhere to the Code Guide]({{< param "links.html_codeguide" >}}).

- Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags).
- Use npm packages for third-party JS when possible.
- Use WAI-ARIA attributes in documentation examples to promote accessibility.

### CSS

[Adhere to the Code Guide]({{< param "links.css_codeguide" >}}).

- When feasible, default color palettes should comply with [WCAG color contrast guidelines]({{< param "links.wcag_contrast" >}}).

### Javascript

Bundle related client-side javascript in a logically named file. Add the file to the `assets/js` when using Hugo templating. Adjust the eslint configuration as needed to handle necessary exceptions. When adapting someone else's code, please add a link to the original source to give them credit.

- No semicolons (in client-side JS)
- 2 spaces (no tabs)
- strict mode
- "Attractive"

### Markdown

See [markdown rules]({{< param "links.markdown_rules" >}}) for more details. The following rules are globally disabled:

| #     | Rule | Remarks |
|-------|-----------------------------------------------------------------------------------------------|---------------------------------|
| MD013 | [Line length]({{< param "links.markdown_md013" >}})                                           | |
| MD024 | [Multiple headings with the same content]({{< param "links.markdown_md024" >}})               | |
| MD026 | [Trailing punctuation in heading]({{< param "links.markdown_md026" >}})                       | |
| MD033 | [Inline HTML]({{< param "links.markdown_md033" >}})                                           | |
| MD034 | [Bare URL used]({{< param "links.markdown_md034" >}})                                         | |
| MD051 | [Link fragments should be valid]({{< param "links.markdown_md051" >}})                        | |
| MD053 | [Link and image reference definitions should be needed]({{< param "links.markdown_md053" >}}) | Disabled due to false positives |
{.table}

## License

By contributing your code, you agree to license your contribution under the [MIT license]({{< param "links.license" >}}). By contributing to the documentation, you agree to license your contribution under the Creative Commons ([CC BY-NC 4.0)]({{< param "links.cc_by_nc_4_0" >}}) license.
