/* eslint-disable max-len */
const { capitalize } = require('./common');

function renderParameterType(parameter) {
  if (!parameter.type || !parameter.type.type) return null;

  if (parameter.type.type === 'literal' && parameter.type.value) return `'${parameter.type.value}'`;

  // If it's an index signature
  if (parameter.type.declaration && parameter.type.declaration.indexSignature) {
    return `[index: ${parameter.type.declaration.indexSignature.parameters[0].type.name}]: any`;
  }

  // T is a stand-in for any
  if (parameter.type.name && parameter.type.name === 'T') return 'Any';

  if (parameter.type.type === 'reference' && parameter.type.id) {
    return `<a href="#${parameter.type.name}">${capitalize(parameter.type.name)}</a>`;
  }

  if (parameter.type.type === 'union') {
    const validTypes = parameter.type.types.filter(({ name }) => name && name !== 'undefined').map(({ name, type }) => (type && type === 'reference') ? `<a href="#${name}">${capitalize(name)}</a>` : capitalize(name));
    const validValues = parameter.type.types.filter(({ type }) => type && type === 'literal').map(({ value }) => `'${value}'`);

    if (validTypes.length === 1) return validTypes[0];

    return [...validTypes, ...validValues].join(' | ');
  }

  if (parameter.type.type === 'array') {
    if (parameter.type.elementType) {
      if (parameter.type.elementType.type === 'reference' && parameter.type.elementType.id) {
        return `<a href="#${parameter.type.elementType.name}">${capitalize(parameter.type.elementType.name)}</a>`;
      }

      return capitalize(parameter.type.elementType.name);
    }
  }

  return capitalize(parameter.type.name);
}

function parameterIsArray(parameter) {
  return parameter.type && parameter.type.type && parameter.type.type === 'Array';
}

function renderParameterDescription(parameter, interfaces) {
  if (parameter.type.type === 'reference') {
    const { id } = parameter.type;
    const i = interfaces.find(({ id: interfaceId }) => interfaceId === id);
    if (i && i.comment && i.comment.shortText) return `, ${i.comment.shortText}`;
  }

  if (parameter.comment && parameter.comment.text) return `, ${parameter.comment.text}`;

  return '';
}

module.exports = {
  parameterIsArray,
  renderParameterDescription,
  renderParameterType,
};
