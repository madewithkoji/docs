/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const fetch = require('node-fetch');
const { navItems } = require('./src/nav.json');
const { resolvePathFromSlug } = require('./src/utils/resolvePathFromSlug');
const { capitalize } = require('./build-utils/CorePackage/utils/common');
const { generateModuleHTML } = require('./build-utils/CorePackage');

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  function buildSourceNodes(kojiCoreDocs, res, rej) {
    try {
      // Restrict the graphql data to only modules we want to display
      const moduleNames = [
        'backend/base',
        'backend/database',
        'backend/dispatch',
        'backend/iap',
        'backend/identity',
        'backend/secret',
        'backend/utilities',
        'frontend/analytics',
        'frontend/dispatch',
        'frontend/iap',
        'frontend/identity',
        'frontend/playerState',
        'frontend/remix',
        'frontend/ui/capture',
        'frontend/ui/navigate',
        'frontend/ui/present',
        'frontend/ui/upload',
      ];

      const modules = [];
      const excludedModules = [];

      for (let x = 0; x < kojiCoreDocs.children.length; x += 1) {
        const child = kojiCoreDocs.children[x];

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
        (child.groups || []).forEach((group) => {
          newModule[group.title] = child.children.filter(({ id }) => group.children.includes(id));
          group.children.forEach((childId) => {
            if (!referenceIds.includes(childId)) referenceIds.push(childId);
          });
        });

        newModule.referenceIds = referenceIds;

        if (moduleNames.includes(child.name)) {
          modules.push(newModule);
        } else {
          excludedModules.push(newModule);
        }
      }

      const AllInterfaces = [...modules, ...excludedModules].map((m) => m.Interfaces || []).reduce((acc, cur) => [...acc, ...cur], []);
      const AllTypeAliases = [...modules, ...excludedModules].map((m) => m['Type aliases'] || []).reduce((acc, cur) => [...acc, ...cur], []);

      modules.forEach((m) => {
        const { html, name = '', shortDescription } = generateModuleHTML(m, AllInterfaces, AllTypeAliases);
        const slug = `core-${m.name.replace(/\//g, '-').toLowerCase()}`;

        const node = {
          id: createNodeId(`Koji-Core-Package-Item-${m.name}`),
          document: {
            description: shortDescription,
            title: `Koji Core Package: ${capitalize(name)}`,
          },
          internal: {
            type: 'kojiCorePackageItem',
            contentDigest: createContentDigest(html),
          },
          html,
          pageAttributes: {
            slug,
          },
          slug,
        };

        actions.createNode(node);
      });
    } catch (err) {
      console.log('err', err);
      rej(err);
    }

    for (let idx = 0; idx < navItems.length; idx += 1) {
      const mappedNavItem = { ...navItems[idx], idx };

      mappedNavItem.sections = mappedNavItem.sections.map((section, sectionIdx) => {
        const mappedSection = { ...section, idx: sectionIdx };

        mappedSection.items = mappedSection.items.map((item, itemIdx) => {
          const mappedItem = { ...item, idx: itemIdx };
          mappedItem.path = `${mappedNavItem.root}${section.root}/${item.slug}`;

          if (mappedItem.subItems) {
            mappedItem.subItems = mappedItem.subItems.map((subItem, subItemIdx) => {
              const mappedSubItem = { ...subItem, idx: subItemIdx };
              mappedSubItem.path = `${mappedNavItem.root}${section.root}/${subItem.slug}`;

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
    }

    res();
  }

  return new Promise((res, rej) => {
    fetch('https://raw.githubusercontent.com/madewithkoji/koji-core/main/koji-core-docs.json')
      .then((response) => response.json())
      .then((json) => buildSourceNodes(json, res, rej));
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
          html
          slug
        }
      }
    }
  `);

  const corePackageTemplate = require.resolve('./src/templates/CorePackage/index.js');

  // For each node, create a page and use the updated corePackageTemplate
  corePackageData.data.allKojiCorePackageItem.nodes.forEach((node) => {
    createPage({
      path: `/reference/core/${node.slug}`,
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
      throw new Error(`A nav item has been created, but there is no corresponding page. [Slug]: ${knownSlug}`);
    }
  });
};
