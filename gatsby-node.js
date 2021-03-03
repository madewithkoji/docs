/* eslint-disable no-console */
const { navItems } = require('./src/nav.json');
const { resolvePathFromSlug } = require('./src/utils/resolvePathFromSlug');

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  navItems.forEach((navItem, idx) => {
    const mappedNavItem = { ...navItem, idx };

    mappedNavItem.sections = mappedNavItem.sections.map((section, sectionIdx) => {
      const mappedSection = { ...section, idx: sectionIdx };

      mappedSection.items = mappedSection.items.map((item, itemIdx) => {
        const mappedItem = { ...item, idx: itemIdx };
        mappedItem.path = `${navItem.root}${section.root}/${item.slug}`;

        if (mappedItem.subItems) {
          mappedItem.subItems = mappedItem.subItems.map((subItem, subItemIdx) => {
            const mappedSubItem = { ...subItem, idx: subItemIdx };
            mappedSubItem.path = `${navItem.root}${section.root}/${subItem.slug}`;

            return mappedSubItem;
          });
        }

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

  const asciidocTemplate = require.resolve('./src/templates/Asciidoc/index.js');

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
              description
              banner
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

  const knownSlugs = [];

  navItems.forEach((navItem) => {
    navItem.sections.forEach((section) => {
      section.items.forEach((item) => {
        knownSlugs.push(item.slug);

        if (item.subItems) {
          item.subItems.forEach((subItem) => {
            knownSlugs.push(subItem.slug);
          });
        }
      });
    });
  });

  const slugsInUse = [];

  result.data.allAsciidoc.edges.forEach(({ node }) => {
    // If the doc is missing a slug it won't be accessible
    if (!node.pageAttributes.slug) {
      console.warn(`Asciidoc missing slug. [Document Title]: ${node.document.title}`);
    }

    // If the doc's slug isn't in the navigation, it won't be accessible
    if (node.pageAttributes.slug && !knownSlugs.includes(node.pageAttributes.slug)) {
      console.warn(`An asciidoc has been indexed but is missing from navigation. [Slug]: ${node.pageAttributes.slug}`);
    }

    slugsInUse.push(node.pageAttributes.slug);

    const path = resolvePathFromSlug(node.pageAttributes.slug);

    if (!path) return;

    createPage({
      path,
      component: asciidocTemplate,
      context: {
        id: node.id,
        // additional data can be passed via context
        slug: node.pageAttributes.slug,
      },
    });

    // When we move back to an actual home page, just remove this
    // section to prevent creation of the duplicate introduction page
    if (node.pageAttributes.slug === 'introduction') {
      createPage({
        path: '/',
        component: asciidocTemplate,
        context: {
          id: node.id,
          // additional data can be passed via context
          slug: node.pageAttributes.slug,
        },
      });
    }
  });

  knownSlugs.forEach((knownSlug) => {
    if (!slugsInUse.includes(knownSlug)) {
      throw new Error(`A nav item has been created, but there is no corresponding asciidoc. [Slug]: ${knownSlug}`);
    }
  });
};
