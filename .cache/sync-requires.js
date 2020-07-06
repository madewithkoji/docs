const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/home/sean/Koji/draft-docs/.cache/dev-404-page.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/home/sean/Koji/draft-docs/src/pages/index.js"))),
  "component---src-templates-article-js": hot(preferDefault(require("/home/sean/Koji/draft-docs/src/templates/article.js")))
}

