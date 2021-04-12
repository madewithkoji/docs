const asciidoctor = require('asciidoctor');

function conditionallyRender(condition, html) {
  if (condition) return html;
  return '';
}

function convertToAsciiDoc(text) {
  const asciidoc = asciidoctor();
  return asciidoc.convert(text);
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
