/* eslint-disable import/prefer-default-export */
// https://stackoverflow.com/a/7394787/4072377

export function decodeHTML(html) {
  // Create a textarea element
  const textArea = document.createElement('textarea');

  // Add the html
  textArea.innerHTML = html;

  // Pull the non-entity value
  const { value } = textArea;

  // Clean up
  textArea.remove();

  return value;
}
