const { navItems } = require('../nav.json');

const resolvePathFromSlug = (slug) => {
  const resolvedPath = navItems.map((navItem) => {
    let path;
    navItem.sections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.slug && item.slug === slug) path = `${navItem.root}${section.root}/${item.slug}`;
      });
    });

    return path;
  }).reduce((a, b) => a || b, null);

  return resolvedPath;
};

module.exports = {
  resolvePathFromSlug,
};
