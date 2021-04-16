const asciidoc = require('asciidoctor')();

function conditionallyRender(condition, html) {
  if (condition) return html;
  return '';
}

function convertToAsciiDoc(text) {
  return asciidoc.convert(text, { backend: 'base' });
}

function capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

module.exports = {
  conditionallyRender,
  convertToAsciiDoc,
  capitalize,
};
