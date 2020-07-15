exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const articleTemplate = require.resolve(`./src/templates/article.js`)

  const result = await graphql(`
    query {
      allAsciidoc {
        edges {
          node {
            id
            html
            document {
              title
            }
            pageAttributes {
              slug
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allAsciidoc.edges.forEach(({ node }) => {
    createPage({
      path: node.pageAttributes.slug,
      component: articleTemplate,
      context: {
        id: node.id,
        // additional data can be passed via context
        slug: node.pageAttributes.slug,
      },
    })
  })
}