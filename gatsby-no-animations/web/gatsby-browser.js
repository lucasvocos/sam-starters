// Polyfills
require("unfetch")

const React = require("react")
const Layout = require("./src/components/Layout").default
// Wrap every page with the main layout
exports.wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)

// Site Credit
console.log(`
Site Credit
===========
Development : https://buena-suerte.studio
`)
