/* eslint-disable max-len */
const { conditionallyRender } = require('./common');
const { renderParameterDescription, renderParameterType, parameterIsArray } = require('./parameter');

function getTypeAliasUnionOptions(typeAlias) {
  return typeAlias.type.types ? typeAlias.type.types : false;
}

function parseTypeAliasType(typeAlias, declaration) {
  if (declaration.signatures && declaration.signatures[0]) return 'function';

  return typeAlias.type.type;
}

function getTypeAliasDescription(typeAlias, declaration) {
  if (typeAlias.comment && typeAlias.comment.shortText) return typeAlias.comment.shortText;

  if (!declaration.comment || !declaration.comment.shortText) return false;

  return declaration.comment.shortText;
}

function getTypeAliasParameters(declaration) {
  if (!declaration.signatures || !declaration.signatures[0]) return false;

  return declaration.signatures[0].parameters;
}

function getTypeAliasReturn(declaration) {
  if (!declaration.signatures || !declaration.signatures[0]) return false;

  return declaration.signatures[0].type && declaration.signatures[0].type.name;
}

function renderTypeAliasFunction() {
  // Placeholder for alternative render presentations
  return '';
}

function renderTypeAliasUnion() {
  // Placeholder for alternative render presentations
  return '';
}

function renderTypeAlias(typeAlias, interfaces) {
  const {
    name,
    type,
  } = typeAlias;

  let { declaration } = type;
  if (!declaration) declaration = {};

  const typeAliasType = parseTypeAliasType(typeAlias, declaration);
  const typeAliasDescription = getTypeAliasDescription(typeAlias, declaration);
  const typeAliasParameters = getTypeAliasParameters(declaration);
  const typeAliasReturn = getTypeAliasReturn(declaration);
  const unionOptions = getTypeAliasUnionOptions(typeAlias);

  // There is some additional logic here to make the typeAlias name look semi-analogous to TypeDoc output
  let typeAliasName = `${typeAlias.name}:`;
  if (typeAliasParameters) typeAliasName += `(${typeAliasParameters.map(({ name: parameterName }) => parameterName).join(', ')})`;
  if (!typeAliasParameters) typeAliasName += '()';
  if (typeAliasReturn) typeAliasName += `&nbsp;=>&nbsp;<em>${typeAliasReturn}</em>`;

  return `
    <div class="api-ref-section">
      ${conditionallyRender((name && typeAliasType === 'function'), `
        <h3 id="${typeAlias.name}">${typeAliasName}</h3>
      `)}
      ${conditionallyRender((name && typeAliasType === 'union'), `
        <div>
          <h3 id="${typeAlias.name}">${typeAlias.name}</h3>
        </div>
      `)}
      ${conditionallyRender((name && !['function', 'union'].includes(typeAliasType)), `
        <h3 id="${typeAlias.name}">${typeAlias.name}</h3>
      `)}
      ${conditionallyRender(typeAliasDescription, `<p>${typeAliasDescription}</p>`)}
      ${(typeAliasParameters && typeAliasParameters.length > 0) ? `
        <div>
          <h4>Parameters</h4>
          <div class="ulist">
            <ul>
              ${typeAliasParameters.map((parameter) => `
                <li>
                  <p><code>${parameter.name}</code>&nbsp;-&nbsp;<em>${renderParameterType(parameter)}</em>${conditionallyRender(parameterIsArray(parameter), '<span>[]</span>')}${conditionallyRender((parameter.flags && parameter.flags.isOptional), '<span>(Optional)</span>')}${renderParameterDescription(parameter, interfaces)}</p>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      ` : ''}
      ${unionOptions.length > 0 ? `
        <div>
          <h4>Possible values</h4>
          <div class="ulist">
            <ul>
              ${unionOptions.map((unionOption) => (unionOption === null || unionOption.value === null) ? '<li>null</li>' : `<li>${renderParameterType({ type: unionOption })}</li>`).join('')}
            </ul>
          </div>
        </div>
      ` : ''}

      ${conditionallyRender(typeAliasType === 'function', renderTypeAliasFunction(typeAlias))}
      ${conditionallyRender(typeAliasType === 'union', renderTypeAliasUnion(typeAlias))}
    </div>
  `;
}

module.exports = {
  renderTypeAlias,
};
