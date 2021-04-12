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
  return '';
}

function renderTypeAliasUnion() {
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

  return `
    <div>
      ${conditionallyRender((name && typeAliasType === 'function'), `
        <h3 id="${typeAlias.name}">${typeAlias.name}: ${conditionallyRender(typeAliasParameters, `(${typeAliasParameters.map(({ name: parameterName }) => parameterName).join(', ')})`)}${conditionallyRender(!typeAliasParameters, '()')}${conditionallyRender(typeAliasReturn, `&nbsp;=>&nbsp;<em>${typeAliasReturn}</em>`)}</h3>
      `)}
      ${conditionallyRender((name && typeAliasType === 'union'), `
        <div>
          <h3 id="${typeAlias.name}">${typeAlias.name}</h3>
        </div>
      `)}
      ${conditionallyRender((name && !['function', 'union'].includes(typeAliasType)), `
        <h3 id="${typeAlias.name}">${typeAlias.name}</h3>
      `)}
      ${conditionallyRender((typeAliasDescription, `<p>${typeAliasDescription}</p>`))}
      ${typeAliasParameters.length > 0 ? `
        <div>
          <h4>Parameters</h4>
          <div class="ulist">
            <ul>
              ${typeAliasParameters.map((parameter) => `
                <li>
                  <p><code>${parameter.name}</code>&nbsp;-&nbsp;<em>${renderParameterType(parameter)}</em>${conditionallyRender(parameterIsArray(parameter), '<span>[]</span>')}${conditionallyRender((parameter.flags && parameter.flags.isOptional), '<span>(Optional)</span>')}${renderParameterDescription(parameter, interfaces)}</p>
                </li>
              `)}
            </ul>
          </div>
        </div>
      ` : ''}
      ${unionOptions.length > 0 ? `
        <div>
          <h4>Possible values</h4>
          <div class="ulist">
            <ul>
              ${unionOptions.filter((u) => u !== null).map((unionOption) => `<li>${renderParameterType({ type: unionOption })}</li>`)}
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
