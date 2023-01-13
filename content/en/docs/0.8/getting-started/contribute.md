---
layout: docs
title: Contribute
description: Contribute to the open-source development of the Hinode theme.
date: 2023-01-06
group: getting-started
layout: docs
---

The Hinode theme is fully open source and welcomes any contributions, either big or small. To streamline the contribution process, please take a moment to review the guidelines outlined in this article.

## Using the issue tracker

The [issue tracker][issue_tracker] on GitHub is the preferred channel for bug reports, feature requests and submitting pull requests.

## Bug reports

A bug is a *demonstrable problem* that is caused by the code in the repository. This may also include issues with the documentation or configuration files. Before filing a bug report, please consider the following guidelines:

- Validate your HTML and Markdown content to ensure your problem isn't caused by a simple error in your own code.
- Use the GitHub [issue search][issue_tracker] — check if the issue has already been reported.
- Check if the issue has been fixed — try to reproduce it using the latest main in the [repository][repository].
- Isolate the problem — ideally create a reduced test case.
- Use the provided template in the [issue tracker][issue_tracker] to capture the context, evidence and steps on how to reproduce the issue.

## Feature requests

Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the project. Please use the provided template in the [issue tracker][issue_tracker] to capture the idea and context.

## Pull requests

Good pull requests—patches, improvements, new features—are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

**Please ask first** before embarking on any **significant** pull request (e.g. implementing features, refactoring code, porting to a different language), otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project. For trivial things, or things that don't require a lot of your time, you can go ahead and make a PR.

Please adhere to the [coding guidelines](#coding-guidelines) used throughout the project (indentation, accurate comments, etc.) and any other requirements (such as test coverage).

Adhering to the following process is the best way to get your work included in the project:

1. Fork the project, clone your fork, and configure the remotes:

    ```bash
    git clone https://github.com/<your-username>/hugo-theme-hinode.git
    cd hugo-theme-hinode
    git remote add upstream https://github.com/markdumay/hugo-theme-hinode
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

1. Commit your changes in logical chunks. Please adhere to these [git commit message guidelines][commit_message]. Use Git's [interactive rebase][github_rebase] feature to tidy up your commits before making them public.

1. Locally merge (or rebase) the upstream development branch into your topic branch:

    ```bash
    git pull [--rebase] upstream main
    ```

1. Push your topic branch up to your fork:

    ```bash
    git push origin <topic-branch-name>
    ```

1. Open a [Pull Request][github_pr] with a clear title and description against the main branch.

**IMPORTANT**: By submitting a patch, you agree to allow the project owners to license your work under the terms of the [MIT license][license] (if it includes code changes) and under the terms of the Creative Commons ([CC BY-NC 4.0)][cc-by-nc-4.0] license (if it includes documentation changes).

## Coding guidelines

In general, run `npm run lint` before committing to ensure your changes follow our coding standards.

### HTML

[Adhere to the Code Guide][html_codeguide].

- Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags).
- Use npm packages for third-party JS when possible.
- Use WAI-ARIA attributes in documentation examples to promote accessibility.

### CSS

[Adhere to the Code Guide][css_codeguide].

- When feasible, default color palettes should comply with [WCAG color contrast guidelines][wcag_contrast].

### Javascript

Bundle related client-side javascript in a logically named file. Add the file to the `assets/js` when using Hugo templating. Adjust the eslint configuration as needed to handle necessary exceptions. When adapting someone else's code, please add a link to the original source to give them credit.

- No semicolons (in client-side JS)
- 2 spaces (no tabs)
- strict mode
- "Attractive"

### Markdown

See [markdown rules][markdown_rules] for more details. The following rules are globally disabled:

| #     | Rule | Remarks |
|-------|-------------------------------------------------------------------------|---------------------------------|
| MD013 | [Line length][markdown_md013]                                           | |
| MD024 | [Multiple headings with the same content][markdown_md024]               | |
| MD026 | [Trailing punctuation in heading][markdown_md026]                       | |
| MD033 | [Inline HTML][markdown_md033]                                           | |
| MD034 | [Bare URL used][markdown_md034]                                         | |
| MD051 | [Link fragments should be valid][markdown_md051]                        | |
| MD053 | [Link and image reference definitions should be needed][markdown_md053] | Disabled due to false positives |
{.table}

## License

By contributing your code, you agree to license your contribution under the [MIT license][license]. By contributing to the documentation, you agree to license your contribution under the Creative Commons ([CC BY-NC 4.0)][cc-by-nc-4.0] license.

[issue_tracker]: https://github.com/markdumay/hugo-theme-hinode/issues
[license]: https://github.com/markdumay/hugo-theme-hinode/blob/main/LICENSE
[cc-by-nc-4.0]: https://creativecommons.org/licenses/by-nc/4.0/
[github_rebase]: https://help.github.com/articles/about-git-rebase/
[repository]: https://github.com/markdumay/hugo-theme-hinode
[commit_message]: https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
[github_pr]: https://help.github.com/articles/about-pull-requests/
[html_codeguide]: https://codeguide.co/#html
[css_codeguide]: https://codeguide.co/#css
[wcag_contrast]: https://www.w3.org/TR/WCAG20/#visual-audio-contrast
[markdown_rules]: https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md

[markdown_md013]: https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md013---line-length
[markdown_md024]: https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md024---multiple-headings-with-the-same-content
[markdown_md026]: https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md026---trailing-punctuation-in-heading
[markdown_md033]: https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md033---inline-html
[markdown_md034]: https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md034---bare-url-used
[markdown_md051]: https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md051---link-fragments-should-be-valid
[markdown_md053]: https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md053---link-and-image-reference-definitions-should-be-needed
