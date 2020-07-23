const { navItems } = require('./src/nav.json');
const { resolvePathFromSlug } = require('./src/utils/resolvePathFromSlug');

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  navItems.forEach((navItem) => {
    const mappedNavItem = { ...navItem };

    mappedNavItem.sections = mappedNavItem.sections.map((section) => {
      const mappedSection = { ...section };

      mappedSection.items = mappedSection.items.map((item) => {
        const mappedItem = { ...item };
        mappedItem.path = `${navItem.root}${section.root}/${item.slug}`;

        return mappedItem;
      });

      return mappedSection;
    });

    const node = {
      ...mappedNavItem,
      id: createNodeId(`Nav-Item-${mappedNavItem.name}`),
      internal: {
        type: 'NavItem',
        contentDigest: createContentDigest(mappedNavItem),
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
    if (!node.pageAttributes.slug) return;

    const path = resolvePathFromSlug(node.pageAttributes.slug);

    if (!path) return;

    createPage({
      path,
      component: articleTemplate,
      context: {
        id: node.id,
        // additional data can be passed via context
        slug: node.pageAttributes.slug,
      },
    });
  });
};
