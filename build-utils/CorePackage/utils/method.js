/* eslint-disable max-len */
/* eslint-disable indent */

const { convertToAsciiDoc } = require('./common');
const { renderParameterDescription, renderParameterType, parameterIsArray } = require('./parameter');

const { conditionallyRender } = require('./common');

function getMethodTitle(method) {
  if (method.name.includes('constructor')) return false;

  if (method.signatures && method.signatures[0].parameters) {
    return `${method.name}(${method.signatures[0].parameters.map((p) => p.name).join(', ')})`;
  }

  return `${method.name}()`;
}

function getMethodDescription(method) {
  if (!method.signatures[0] || !method.signatures[0].comment || !method.signatures[0].comment.shortText) return false;
  return method.signatures[0].comment.shortText;
}

function getMethodExtendedDescription(method) {
  if (!method.signatures[0] || !method.signatures[0].comment || !method.signatures[0].comment.text) return false;
  return method.signatures[0].comment.text;
}

function getMethodParameters(method) {
  if (!method.signatures || !method.signatures[0].parameters || !method.signatures[0].parameters.length) return false;

  // Some methods have multiple signatures. The first signature will have the description,
  // the last signature will have the correct types.
  return method.signatures[method.signatures.length - 1].parameters.map((parameter, parameterIdx) => ({
    ...parameter,
    comment: method.signatures[0].parameters[parameterIdx].comment,
  }));
}

function getMethodExample(method) {
  // eslint-disable-next-line max-len
  if (!method.signatures[0].comment || !method.signatures[0].comment.tags || !method.signatures[0].comment.tags[0] || method.signatures[0].comment.tags[0].tag !== 'example') return false;
  return method.signatures[0].comment.tags[0].text;
}

function getMethodReturn(method) {
  // Some methods have multiple signatures. The last signature will have the correct return type.
  const returnType = method.signatures[method.signatures.length - 1].type;

  if (returnType.name && returnType.name === 'Promise') {
    const { typeArguments } = returnType;

    const mappedTypeArguments = typeArguments.map((typeArgument) => renderParameterType({ type: typeArgument }));

    return `Promise<${mappedTypeArguments.map((mta) => mta)}>`;
  }

  return false;
}

function getMethodReturnDescription(method) {
  // eslint-disable-next-line max-len
  if (!method.signatures[0].comment || !method.signatures[0].comment.returns) return false;
  return method.signatures[0].comment.returns;
}

function getMethodSource(method) {
  if (!method.sources || !method.sources[0] || !method.sources[0].fileName || !method.sources[0].line) return false;
  return `${method.sources[0].fileName}#L${method.sources[0].line}`;
}

function renderMethod(method, interfaces) {
  const methodTitle = getMethodTitle(method);
  const methodDescription = getMethodDescription(method);
  const methodExtendedDescription = getMethodExtendedDescription(method);
  const methodParameters = getMethodParameters(method);
  const methodExample = getMethodExample(method);
  const methodSource = getMethodSource(method);
  const methodReturn = getMethodReturn(method);
  const methodReturnDescription = getMethodReturnDescription(method);

  return `
    <div class="sect2 hcode">
      ${conditionallyRender(methodTitle, `<h3 id="${method.name}">${methodTitle}</h3>`)}
      ${conditionallyRender(methodDescription, `<p>${methodDescription}</p>`)}
      ${conditionallyRender(methodExtendedDescription, `<p>${methodExtendedDescription}</p>`)}
      ${methodParameters ? `
        <div>
          <h4>Parameters</h4>
          <div class="ulist">
            <ul>
              ${methodParameters.map((parameter) => (
                `<li>
                  <p>
                    <code>${parameter.name}</code>&nbsp;-&nbsp;<em>${renderParameterType(parameter)}</em>${conditionallyRender(parameterIsArray(parameter), '<span>{\'[]\'}</span>')}${conditionallyRender(parameter.flags && parameter.flags.isOptional, ' (Optional)')}${renderParameterDescription(parameter, interfaces)}
                  </p>
                </li>
                `)).join('')
            }
            </ul>
          </div>
        </div>
      ` : ''}
      ${methodReturn ? `
        <div>
          <h4>Returns</h4>
          <p>
            <em>${methodReturn}</em>${conditionallyRender(methodReturnDescription, `, ${methodReturnDescription} `)}
          </p>
        </div>
      ` : ''}
      ${methodExample ? `
        <div>
          <h4>Example</h4>
          <div>${convertToAsciiDoc(methodExample)}</div>
        </div>
      ` : ''}
      ${methodSource ? `
        <p>Source: <a href="https://github.com/madewithkoji/koji-core/tree/main/src/${methodSource}" rel="noreferrer noopener" target="_blank">${methodSource}</a></p>
      ` : ''}
    </div>
  `;
}

module.exports = {
  renderMethod,
};
