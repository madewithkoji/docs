import React from 'react';
import { renderParameterDescription, renderParameterType, parameterIsArray } from './parameter';

function parseTypeAliasType(declaration) {
  if (declaration.signatures && declaration.signatures[0]) return 'function';
  return declaration.type || false;
}

function getTypeAliasDescription(declaration) {
  if (!declaration.comment || !declaration.comment.shortText) return false;
  return declaration.comment.shortText;
}

function getTypeAliasParameters(declaration) {
  if (!declaration.signatures || !declaration.signatures[0]) return false;

  return declaration.signatures[0].parameters;
}

function renderTypeAliasFunction(declaration) {
  return '';
}

function renderTypeAliasUnion(declaration) {
  return '';
}

// eslint-disable-next-line import/prefer-default-export
export function renderTypeAlias(typeAlias, interfaces) {
  const {
    name,
    type,
  } = typeAlias;

  let { declaration } = type;
  if (!declaration) declaration = {};

  const typeAliasType = parseTypeAliasType(declaration);
  const typeAliasDescription = getTypeAliasDescription(declaration);
  const typeAliasParameters = getTypeAliasParameters(declaration);

  return (
    <div key={typeAlias.id}>
      {
        (name && typeAliasType === 'function') &&
        <h3 id={typeAlias.name}>
          {`${typeAlias.name}: `}
          {
            typeAliasParameters &&
            <>
              {`(${typeAliasParameters.map(({ name: parameterName }) => parameterName).join(', ')})`}
            </>
          }
        </h3>
      }
      {
        (name && typeAliasType !== 'function') &&
        <h3 id={typeAlias.name}>
          {typeAlias.name}
        </h3>
      }
      {
        typeAliasDescription &&
        <p>{typeAliasDescription}</p>
      }
      {
        typeAliasParameters &&
        <div>
          <h4>{'Parameters'}</h4>
          <div className={'ulist'}>
            <ul>
              {
                typeAliasParameters.map((parameter) => (
                  <li key={parameter.name}>
                    <p>
                      <code>{parameter.name}</code>
                      {' – '}
                      <em>{renderParameterType(parameter)}</em>
                      {parameterIsArray(parameter) && <span>{'[]'}</span>}
                      {parameter.flags && parameter.flags.isOptional && <span>{' (Optional)'}</span>}
                      {renderParameterDescription(parameter, interfaces)}
                    </p>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
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
