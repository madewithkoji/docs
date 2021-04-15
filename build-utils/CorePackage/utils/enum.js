/* eslint-disable max-len */
const { conditionallyRender } = require('./common');

function getEnumDescription(e) {
  if (e.comment && e.comment.shortText) return e.comment.shortText;

  return false;
}

function renderEnum(e) {
  const description = getEnumDescription(e);

  return `
    <div>
      ${conditionallyRender(e.name, `<h3 id="${e.name}">${e.name}</h3>`)}
      ${conditionallyRender(description, `<p>${description}</p>`)}
      ${conditionallyRender(e.children.length > 0, `
        <div>
          <h4>Possible values</h4>
          <div class="ulist">
            <ul>
              ${e.children.map((child) => `<li>${child.name}: = '${child.defaultValue.includes('"') ? child.defaultValue.slice(0, -1).slice(1) : child.defaultValue}'</li>`).join('')}
            </ul>
          </div>
        </div>
      `)}
    </div>
  `;
}

module.exports = {
  renderEnum,
};
