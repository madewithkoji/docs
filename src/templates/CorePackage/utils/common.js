import asciidoctor from 'asciidoctor';

// eslint-disable-next-line import/prefer-default-export
export function convertToAsciiDoc(text) {
  const asciidoc = asciidoctor();
  return asciidoc.convert(text);
}
