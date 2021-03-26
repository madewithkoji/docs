import React from 'react';
import { renderParameterDescription, renderParameterType, parameterIsArray } from './parameter';

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

// eslint-disable-next-line import/prefer-default-export
export function renderTypeAlias(typeAlias, interfaces) {
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
          {
            !typeAliasParameters &&
            <>
              {'()'}
            </>
          }
          {
            typeAliasReturn &&
            <>
              {' => '}
              <em>{typeAliasReturn}</em>
            </>
          }
        </h3>
      }
      {
        (name && typeAliasType === 'union') &&
        <div>
          <h3 id={typeAlias.name}>
            {typeAlias.name}
          </h3>
        </div>
      }
      {
        (name && !['function', 'union'].includes(typeAliasType)) &&
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
                      <em style={{ textTransform: 'capitalize' }}>{renderParameterType(parameter)}</em>
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
        (unionOptions.length && true) &&
        <>
          <h4>{'Possible values'}</h4>
          <div className={'ulist'}>
            <ul>
              {
                unionOptions.filter((u) => u !== null).map((unionOption, idx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={`${unionOption}-${idx}`}>
                    {renderParameterType({ type: unionOption })}
                  </li>
                ))
              }
            </ul>
          </div>
        </>
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
