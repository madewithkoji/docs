/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const { navItems } = require('./src/nav.json');
const { resolvePathFromSlug } = require('./src/utils/resolvePathFromSlug');
const core = require('./src/core.json');

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  try {
    // Restrict the graphql data to only modules we want to display
    const moduleNames = [
      'backend/base',
      'backend/database',
      'backend/dispatch',
      'backend/iap',
      'backend/identity',
      'backend/secret',
      'frontend/analytics',
      'frontend/dispatch',
      'frontend/iap',
      'frontend/identity',
      'frontend/playerState',
      'frontend/remix',
      'frontend/ui/capture',
      'frontend/ui/navigate',
      'frontend/ui/present',
    ];

    core.children.forEach((child) => {
      if (moduleNames.includes(child.name)) {
        const {
          children,
          flags,
          groups,
          sources,
          ...newModule
        } = child;

        // Create a list of referenceIds for each module
        const referenceIds = [];

        // For each group, look for Classes, Enumerations, Functions, Interfaces, TypeAliases and Variables
        // and make them top level properties.
        //
        // Also, make sure to build out the referenceIds so they're easily available
        child.groups.forEach((group) => {
          newModule[group.title] = child.children.filter(({ id }) => group.children.includes(id));
          group.children.forEach((childId) => {
            if (!referenceIds.includes(childId)) referenceIds.push(childId);
          });
        });

        newModule.referenceIds = referenceIds;

        const node = {
          ...newModule,
          id: createNodeId(`Koji-Core-Package-Item-${newModule.name}`),
          internal: {
            type: 'KojiCorePackageItem',
            contentDigest: createContentDigest(newModule),
          },
          slug: `core-${newModule.name.replace(/\//g, '-').toLowerCase()}`,
        };

        actions.createNode(node);
      }
    });
  } catch (err) {
    console.log('err', err);
  }

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

  const corePackageData = await graphql(`
    query {
      allKojiCorePackageItem {
        nodes {
          id
          name
          slug
        }
      }
    }
  `);

  const corePackageTemplate = require.resolve('./src/templates/CorePackage/index.js');

  // For each node, create a page and use the updated corePackageTemplate
  corePackageData.data.allKojiCorePackageItem.nodes.forEach((node) => {
    createPage({
      path: `/reference/packages/core/${node.slug}`,
      component: corePackageTemplate,
      context: {
        id: node.id,
        // additional data can be passed via context
        slug: node.slug,
      },
    });

    slugsInUse.push(node.slug);
  });

  knownSlugs.forEach((knownSlug) => {
    if (!slugsInUse.includes(knownSlug)) {
      throw new Error(`A nav item has been created, but there is no corresponding asciidoc. [Slug]: ${knownSlug}`);
    }
  });
};
