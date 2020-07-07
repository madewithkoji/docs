exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const navItems = [
    {
      name: 'Docs',
      root: '/docs',
      defaultPath: '/docs/blueprints',
      sections: [
        {
          name: 'Blueprints',
          items: [
            {
              name: 'Overview',
              path: '/docs/blueprints',
            },
            {
              name: 'Magazine Cover',
              path: '/docs/blueprints/magazine-cover',
            },
          ]
        },
        {
          name: 'Getting Started',
          items: [
            {
              name: 'Developer',
              path: '/docs/getting-started',
            },
            {
              name: 'Start Guide 1',
              path: '/docs/getting-started/start-guide-1',
            },
          ],
        },
      ],
    },
  ];

  navItems.forEach((navItem) => {
    const node = {
      ...navItem,
      id: createNodeId(`Nav-Item-${navItem.name}`),
      internal: {
        type: 'NavItem',
        contentDigest: createContentDigest(navItem),
      },
    };

    actions.createNode(node)
  });
};

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