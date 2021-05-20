const { navItems } = require('../nav.json');

const resolveBreadcrumbFromSlug = (slug) => {
  const resolvedBreadcrumb = navItems.map((navItem) => {
    let breadcrumb;
    navItem.sections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.slug && item.slug === slug) {
          breadcrumb = [
            { path: navItem.root, name: navItem.name },
            { path: `${navItem.root}${section.root}`, name: section.name },
            { path: `${navItem.root}${section.root}/${item.slug}`, name: item.name },
          ];
        }

        if (item.subItems) {
          item.subItems.forEach((subItem) => {
            if (subItem.slug && subItem.slug === slug) {
              breadcrumb = [
                { path: navItem.root, name: navItem.name },
                { path: `${navItem.root}${section.root}`, name: section.name },
                { path: `${navItem.root}${section.root}/${subItem.slug}`, name: item.name },
              ];
            }
          });
        }
      });
    });

    return breadcrumb;
  }).reduce((a, b) => a || b, null);

  return resolvedBreadcrumb;
};

// Export for use outside of babel
module.exports = {
  resolveBreadcrumbFromSlug,
};
