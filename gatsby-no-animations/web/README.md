# Simple Photography Starter

This is the Gatsby frontend for a photographer's portfolio.

## Requirements

- Node 8+
- NPM

## Local Development

1. Install NPM dependencies

```
$ npm install
```

2. Copy `.env.example` to `.env.development` and set the proper values.
3. Start the Netlify dev process. This will log you into Netlify.

```
$ npm start
```

## Deployments

Continuious deployments are automatically happening based on two things:

1. Pushing code to `main`. Netlify is watching this branch and will deploy any code changes.
2. Webhooks coming from Sanity. Any time any update happens in Gatsby, Netlify will trigger a `main` branch build.
