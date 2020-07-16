exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const navItems = [
    {
      name: 'Docs',
      root: '/docs',
      defaultPath: '/docs/getting-started',
      sections: [
        {
          name: 'Getting Started',
          root: '/docs/getting-started',
          items: [
            {
              name: 'Intro to Koji',
              path: '/docs/getting-started',
            },
            {
              name: 'Starter guide',
              path: '/docs/getting-started/start-guide-1',
            },
            {
              name: 'Starter guide, part 2',
              path: '/docs/getting-started/start-guide-2',
            },
          ],
        },
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
          ],
        },
        {
          name: 'Concepts',
          root: '/docs/concepts',
          items: [
          ],
        },
        {
          name: 'Develop',
          root: '/docs/develop',
          items: [
          ],
        },
        {
          name: 'Customizations',
          root: '/docs/customizations',
          items: [
            {
              name: 'Custom VCCs',
              path: '/docs/customizations/build-custom-VCC',
            },
          ],
        },
        {
          name: 'Test',
          root: '/docs/test',
          items: [
          ],
        },
        {
          name: 'Publish and iterate',
          root: '/docs/publish',
          items: [
          ],
        },
        {
          name: 'Guidelines',
          root: '/docs/guidelines',
          items: [
          ],
        },
        {
          name: 'Release notes',
          root: '/docs/releases',
          items: [
          ],
        },
        {
          name: 'Videos',
          root: '/docs/videos',
          items: [
            {
              name: 'Starter course',
              path: '/docs/videos/starter-course',
            },
            {
              name: 'KaiOS apps',
              path: '/docs/videos/kai-OS',
            },
            {
              name: 'Image Best Practices',
              path: '/docs/videos/image-best-practices',
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

    actions.createNode(node);
  });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const articleTemplate = require.resolve('./src/templates/article.js');

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
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
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
    });
  });
};
