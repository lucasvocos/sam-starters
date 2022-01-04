# Sanity + (Gatsby/Next.js) Starters

This should contain everything you need to know about getting running a headless Sanity + Gatsby/Next.js site up and running.<br> If you have any questions please email lucas@buena-suerte.studio

## Getting Started

### Sanity Initialization

1. Clone this repo (or download an individual monorepo folder)
2. In each `studio` folder run ```sanity init``` and set up a new project. The CLI will walk you through titling the project.
3. Take a close look at the `deskStructure.js` file to see how the Studio frontend is rendered, as well as making sure to import any new schemas into the `schemas.js` folder. This will allow these data schemas to be used throughout the Sanity CMS backend.

### Gatsby 

#### Programmatic Page Building

1. If you look at `gatsby-node.js`, you'll see that all the magic happens in `src/build/createPages.js`. 
2. Queries are imported from `src/api/sanity.js` and when they are resolved we use Gatsby's `actions` to create pages.
3. There is a `templates` folder full of JSX files, and these are passed in as the `component` in the `createPage()` function in `createPages.js`

### Next.js

#### Programmatic Page Building

1. Next.js' page structure is similar to Gatsby's with one exception, by the use of the `[slug].jsx` file. Think of this as a template.
2. There is a `pages/` folder, and any sub-folders will be a new path. (e.g. `/projects/TITLE`). 
3. In this example, inside the `pages/` folder we have the following files:

## Styling

The Next.js theme is built with [Tailwind CSS](https://v1.tailwindcss.com/). The Gatsby project uses a mixture of scss stylesheets and [Magic Tricks](https://github.com/gardener-nyc/magic-tricks) (Ian's custom set of utilities. Not the most robust documentation yet, but you can poke around to see the classes & utilities)

### Tailwind Configuration

- I customised some of Tailwind's existing utility classes for use with the Next.js theme. This is configured in `tailwind.config.js` – please see [Tailwind Docs](https://v1.tailwindcss.com/docs/configuration) for more information.
- Since Tailwind is utility-first, the majority of the styles are inline. There are some stylesheets, but tbh they could all probably be converted into inline classes.
- More complex / repeatable components (and also any components that are rendered via JS) are styled with a mix of [Sass](https://sass-lang.com/documentation)
  and Tailwind's [`@apply` function](https://v1.tailwindcss.com/docs/functions-and-directives#apply) in their own stylesheet.
