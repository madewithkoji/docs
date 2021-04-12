/* eslint-disable indent */
const { renderEnum } = require('./utils/enum');
const { renderInterface } = require('./utils/interface');
const { renderMethod } = require('./utils/method');
const { renderProperty } = require('./utils/property');
const { renderTypeAlias } = require('./utils/typeAlias');

function getClassDescription(c) {
  let description;

  if (c.comment) {
    if (c.comment.shortText) description = c.comment.shortText;
  }

  return description;
}

function getClassName(name) {
  const pieces = name.split('/');

  if (pieces.length === 2) return pieces[1];

  // Support ui-prefixed names
  return `${pieces[1].toUpperCase()} / ${pieces[2]}`;
}

function generateModuleHTML(m, AllInterfaces, AllTypeAliases) {
  const {
    Classes = [],
    Enumerations = [],
    Interfaces = [],
    referenceIds = [],
  } = m;

  const description = getClassDescription(Classes[0]);
  const name = getClassName(m.name);

  let constructor = Classes[0].children.find(({ kindString }) => kindString === 'Constructor');

  if (!constructor.signatures || !constructor.signatures[0] || !constructor.signatures[0].comment) constructor = false;
  const methods = Classes[0].children.filter(({ kindString }) => kindString === 'Method');

  const properties = Classes[0].children.filter(({ kindString }) => kindString === 'Property');

  const interfaceReferenceIds = Interfaces
    .reduce((acc, cur) => [...acc, ...(cur.children || [])], [])
    .filter((property) => property.type && property.type.type && (property.type.type === 'reference' || property.type.type === 'union'))
    .reduce((acc, cur) => (cur.type.types || []).length ? [...acc, ...cur.type.types] : [...acc, cur.type], [])
    .reduce((acc, cur) => {
      let id;

      if (cur.elementType) id = cur.elementType.id;
      if (cur.id) id = cur.id;

      return (!id || acc.includes(id)) ? acc : [...acc, id];
    }, []);

  const methodReferenceIds = (constructor ? [...methods, constructor] : methods)
    .map((method) => (method.signatures && method.signatures[0]) || { parameters: [] })
    .reduce((acc, cur) => [...acc, ...(cur.parameters || [])], [])
    .filter((param) => param.type && param.type.type && param.type.type === 'reference')
    .reduce((acc, cur) => acc.includes(cur.type.id) ? acc : [...acc, cur.type.id], []);

  const methodReturnReferenceIds = methods
    // eslint-disable-next-line max-len
    .map((method) => (method.signatures && method.signatures[0] && method.signatures[0].type && method.signatures[0].type) || { typeArguments: [] })
    .reduce((acc, cur) => [...acc, ...(cur.typeArguments || [])], [])
    .filter((typeArgument) => typeArgument.type && typeArgument.type === 'reference')
    .reduce((acc, cur) => acc.includes(cur.id) ? acc : [...acc, cur.id], []);

  const propertyReferenceIds = properties
    .map((property) => property.type || {})
    .filter((param) => param.type && param.type.type && param.type.type === 'reference')
    .reduce((acc, cur) => acc.includes(cur.type.id) ? acc : [...acc, cur.type.id], []);

  let allReferenceIds = [
    ...interfaceReferenceIds,
    ...methodReturnReferenceIds,
    ...methodReferenceIds,
    ...propertyReferenceIds,
  ].reduce((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], []);

  const enums = Enumerations.filter(({ id }) => allReferenceIds.includes(id));

  // Type aliases include the generic reference ids
  const typeAliases = AllTypeAliases.filter(({ id }) => [...referenceIds, ...allReferenceIds].includes(id));

  // One more pass for the typeAlias interface references
  const typeAliasReferenceIds = typeAliases
    // eslint-disable-next-line max-len
    .map((typeAlias) => (typeAlias.type && typeAlias.type.declaration && typeAlias.type.declaration.signatures && typeAlias.type.declaration.signatures[0].parameters) || [])
    .filter((arr) => arr.length)
    .reduce((acc, cur) => [...acc, ...cur], [])
    .filter((par) => par.type && par.type.type && par.type.type === 'reference')
    .reduce((acc, cur) => [...acc, cur.type.id], []);

  allReferenceIds = [
    ...allReferenceIds,
    ...typeAliasReferenceIds,
  ];

  const interfaces = AllInterfaces.filter(({ id }) => allReferenceIds.includes(id));

  return {
    html: `
      <div>
        <h1 style="text-transform: capitalize">${name}</h1>
        <p>${description}</p>
        ${constructor ? `
          <div>
            <h2 id="Constructor">Constructor</h2>
            ${renderMethod(constructor, interfaces)}
          </div>
          ` : ''}
        ${methods.length > 0 ? `
          <div>
            <h2 id="Methods">Methods</h2>
            ${methods.map((method) => renderMethod(method, interfaces)).join('')}
          </div>
          ` : ''}
        ${properties.length > 0 ? `
          <div>
          <h2 id="Properties">Properties</h2>
          ${properties.map((property) => renderProperty(property)).join('')}
          </div>
        ` : ''}
        ${enums.length > 0 ? `
          <div>
            <h2 id="Enums">Enums</h2>
            ${enums.map((e) => renderEnum(e)).join('')}
          </div>
        ` : ''}
        ${interfaces.length > 0 ? `
          <div>
            <h2 id="Interfaces">Interfaces</h2>
            ${interfaces.map((i) => renderInterface(i)).join('')}
          </div>
        ` : ''}
        ${typeAliases.length > 0 ? `
          <div>
            <h2 id="TypeAliases">Type aliases<h2>
            ${typeAliases.map((typeAlias) => renderTypeAlias(typeAlias)).join('')}
          </div>
        ` : ''}
      </div>
    `,
    name,
  };
}

module.exports = {
  generateModuleHTML,
};
