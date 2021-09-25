/* eslint-disable max-len */
const { renderParameterType } = require('./parameter');
const { conditionallyRender } = require('./common');

function renderProperty(property) {
  return conditionallyRender(property.name, `
    <div class="hcode api-ref-section">
      <h3 id="${property.name}">.${property.name}</h3>
      <p><em>${renderParameterType(property)}</em>${conditionallyRender((property.comment && property.comment.shortText), `, ${property.comment.shortText}`)}</p>
    </div>
  `);
}

module.exports = {
  renderProperty,
};
