/* eslint-disable max-len */
const { conditionallyRender, convertToAsciiDoc } = require('./common');
const { parameterIsArray, renderParameterType } = require('./parameter');

function getInterfaceProperties(i) {
  return i.children;
}

function getInterfaceDescription(i) {
  if (i.comment && i.comment.shortText) return i.comment.shortText;

  return false;
}

function renderInterface(i) {
  const interfaceDescription = getInterfaceDescription(i);
  const interfaceProperties = getInterfaceProperties(i);

  return `
    <div class="api-ref-section">
      ${conditionallyRender(i.name, `<h3 id="${i.name}">${i.name}</h3>`)}
      ${conditionallyRender(interfaceDescription, `<p>${interfaceDescription}</p>`)}
      ${(interfaceProperties && interfaceProperties.length > 0) ? `
        <div>
          <h4>Properties</h4>
          <div class="ulist">
            <ul>
              ${interfaceProperties.map((property) => `
                <li>
                  <p><code>${property.name}</code>&nbsp;-&nbsp;<em>${renderParameterType(property)}</em>${conditionallyRender(parameterIsArray(property), '<span>[]</span>')}${conditionallyRender((property.flags && property.flags.isOptional), ' (Optional)')}${(property.comment && property.comment.shortText) ? `, ${property.comment.shortText}` : ''}</p>
                  ${(property.comment && property.comment.text) ? convertToAsciiDoc(property.comment.text) : ''}
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
        ` : ''}
    </div>
  `;
}

module.exports = {
  renderInterface,
};
