# How can I contribute ?

## General contribution workflow

This project has been launched by the Self.dev community. If you plan to contribute
to this project, consider joining the [Discord server](https://discord.gg/AgNcUeS3Zx) first.
If you just want to know who we are, [here is the website](https://theselfdev.com/).

## Issues

If you just want to report an issue with the dashboard or the code itself, feel free
to open a new ticket under `issues` tab. To be sure your issue is valuable for the
team, please give as many details as you can. Here are some ideas:

- The behaviour you observe
- What would you expect instead
- The client you are using (mobile, desktop, Windows, Mac, Chrome, Firefox...)
- Some screenshots maybe

You can then wait for the team to reply. **Remember that the team members are working
on this project on their free time**, so be patient and respectful.

## Development workflow

> This workflow is mostly like the famous GitFlow, so if you are
> familiar with it, this shouldn't be new.

We have two main branches on the repo, one is call `main` and contains
the production ready code, and the other one is `develop`, where we have
the newly merged features. If you plan to work on a new feature or a bug fix,
you need to create a new branch **starting from develop**, and call it after
the subject of your work, then commit on this branch. When your work is ready
to be reviewed, feel free to open a pull request.

**Not a single commit should be pushed directly to `main` or `develop`.**

## Pull requests

> We highly recommend you to join the [Discord server](https://discord.gg/AgNcUeS3Zx) as mentioned in the first
> paragraph before you open pull request on the project, to get in touch with the team,
> and have a bit of context before you start.

We want the code to be clean, and understood by anyone. So for this we will ask your pull
request to be reviewed by at least one person of the team.

### Labels
- `Review needed` is to apply when your feature or bug fix is ready, and no additional
code is needed.
- `WIP`, work in progress. Use it if you're not finished yet or applying major modifications
to your code.
- `In discussion` this is useful when there is active debate or questions opened
on the pull request.
- `Don't merge`, use it if your code is unsafe to be merged.

## Commit and pull request title convention

Because we find it cool, we recommend you to use the famous [Gitmojis](https://gitmoji.dev/)
before describing the subject of your work. You have [on the website](https://gitmoji.dev/)
the description of what kind of modifications you brought to the repo for each emoji.
Here are some examples:

For a new feature:
> ✨ Contact form sending emails to support address

For a dependency upgrade:
> 📦️ Add string parsing library