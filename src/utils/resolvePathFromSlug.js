const { navItems } = require('../data/nav.json');

const resolvePathFromSlug = (slug) => {
  const resolvedPath = navItems.map((navItem) => {
    let path;
    navItem.sections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.slug && item.slug === slug) path = `${navItem.root}${section.root}/${item.slug}`;

        if (item.subItems) {
          item.subItems.forEach((subItem) => {
            if (subItem.slug && subItem.slug === slug) path = `${navItem.root}${section.root}/${subItem.slug}`;
          });
        }
      });
    });

    return path;
  }).reduce((a, b) => a || b, null);

  return resolvedPath;
};

// Export for use outside of babel
module.exports = {
  resolvePathFromSlug,
};
