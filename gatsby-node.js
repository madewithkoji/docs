exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const navItems = [
    {
      name: 'Docs',
      root: '/docs',
      defaultPath: '/docs/blueprints',
      sections: [
        {
          name: 'Blueprints',
          root: '/docs/blueprints',
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
          root: '/docs/getting-started',
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
    {
      name: 'Reference',
      root: '/reference',
      defaultPath: '/reference/vcc',
      sections: [
        {
          name: 'VCC',
          root: '/reference/vcc',
          items: [
            {
              name: 'Overview',
              path: '/reference/vcc',
            },
            {
              name: '3D Object',
              path: '/reference/vcc/3d-object',
            },
            {
              name: 'Array',
              path: '/reference/vcc/array',
            },
            {
              name: 'Boolean',
              path: '/reference/vcc/boolean',
            },
            {
              name: 'Color',
              path: '/reference/vcc/color',
            },
            {
              name: 'Coordinate',
              path: '/reference/vcc/coordinate',
            },
            {
              name: 'File',
              path: '/reference/vcc/file',
            },
            {
              name: 'Google Font',
              path: '/reference/vcc/google-font',
            },
            {
              name: 'Image',
              path: '/reference/vcc/image',
            },
            {
              name: 'Object',
              path: '/reference/vcc/object',
            },
            {
              name: 'Range',
              path: '/reference/vcc/range',
            },
            {
              name: 'Secret',
              path: '/reference/vcc/secret',
            },
            {
              name: 'Size',
              path: '/reference/vcc/size',
            },
            {
              name: 'Sound',
              path: '/reference/vcc/sound',
            },
            {
              name: 'Text',
              path: '/reference/vcc/text',
            },
            {
              name: 'Video',
              path: '/reference/vcc/video',
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