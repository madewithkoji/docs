/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const asciidoc = require(`asciidoctor`)();
const { navItems } = require('./src/nav.json');

class TemplateConverter {
  constructor() {
    this.baseConverter = asciidoc.Html5Converter.$new()
  }

  convert(node, transform) {
    if (node.getNodeName() === "inline_anchor") {
      console.log('n', node);
    }

    return this.baseConverter.convert(node, transform)
  }
}

module.exports = {
  /* Your site config here */
  siteMetadata: {},
  plugins: [
    'gatsby-plugin-layout',
    {
      resolve: 'gatsby-plugin-material-ui',
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
    },
    {
      resolve: `gatsby-transformer-asciidoc`,
      options: {
        safe: 'unsafe',
        attributes: {
          showtitle: true,
          imagesdir: `/images`,
        },
        options: {
          converterFactory: TemplateConverter,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src`,
      },
    },
  ],
};
