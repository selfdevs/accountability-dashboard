# Ziro dashboard front-end Single Page web Application

> In this project, we use Yarn rather than NPM.

## Configuring the environment

There are 3 necessary environment variables for the front-end project to run locally
with all features available. Go to your `.env` file, and check them out. You may want to create a
`.env.local` file to override the values you want to customize. This file is already added to
`.gitignore` file, so it won't be committed.

- `REACT_APP_REDIRECT_URI`: This is the URL that will be called after Discord authorizations prompt.
This should be set to your served local front-end homepage. Most likely `http://localhost:3000/`. Don't
forget the / at the end.
- `REACT_APP_API_BASE_URL`: API base URL, leave `https://ziro.cchampou.me/api` if you want to use the
preview API and start developing immediately.
- `REACT_APP_DISCORD_CDN`: Based on the official documentation, keep `https://cdn.discordapp.com`.

## How to run the project locally

First, install dependencies

```shell
yarn install
```

Then, you can run the project using start command

```shell
yarn start
```

## How to lint your code

Eslint is used on this project. You can verify your code by using

```shell
yarn lint
```
