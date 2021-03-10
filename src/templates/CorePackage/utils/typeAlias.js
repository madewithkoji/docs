import React from 'react';

function parseTypeAliasType(declaration) {
  if (declaration.signatures && declaration.signatures[0]) return 'function';
  return declaration.type || false;
}

function getTypeAliasDescription(declaration) {
  if (!declaration.comment || !declaration.comment.shortText) return false;
  return declaration.comment.shortText;
}

function renderTypeAliasFunction(declaration) {
  return '';
}

function renderTypeAliasUnion(declaration) {
  return '';
}

// eslint-disable-next-line import/prefer-default-export
export function renderTypeAlias(typeAlias) {
  const {
    name,
    type: { declaration = {} },
  } = typeAlias;

  const typeAliasType = parseTypeAliasType(declaration);
  const typeAliasDescription = getTypeAliasDescription(declaration);

  return (
    <div key={typeAlias.id}>
      {
        name &&
        <h3 id={typeAlias.name}>{typeAlias.name}</h3>
      }
      {
        typeAliasDescription &&
        <p>{typeAliasDescription}</p>
      }
      {
        typeAliasType === 'function' &&
        renderTypeAliasFunction(typeAlias)
      }
      {
        typeAliasType === 'union' &&
        renderTypeAliasUnion(typeAlias)
      }
    </div>
  );
}
