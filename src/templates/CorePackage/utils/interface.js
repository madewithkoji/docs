import React from 'react';
import { parameterIsArray, renderParameterType } from './parameter';

function getInterfaceParameters(i) {
  return i.children;
}

function getInterfaceDescription(i) {
  if (i.comment && i.comment.shortText) return i.comment.shortText;

  return false;
}

// eslint-disable-next-line import/prefer-default-export
export function renderInterface(i) {
  const interfaceDescription = getInterfaceDescription(i);
  const interfaceParameters = getInterfaceParameters(i);

  return (
    <div key={i.id}>
      {
        i.name &&
        <h3 id={i.name}>{i.name}</h3>
      }
      {
        interfaceDescription &&
        <p>{interfaceDescription}</p>
      }
      {
        interfaceParameters &&
        <div>
          <h4>{'Parameters'}</h4>
          <div className={'ulist'}>
            <ul>
              {
                interfaceParameters.map((parameter) => (
                  <li key={parameter.name}>
                    <p>
                      <code>{parameter.name}</code>
                      {' – '}
                      <em style={{ textTransform: 'capitalize' }}>{renderParameterType(parameter)}</em>
                      {parameterIsArray(parameter) && <span>{'[]'}</span>}
                      {parameter.flags && parameter.flags.isOptional && <span>{' (Optional)'}</span>}
                      {parameter.comment && parameter.comment.shortText ? `, ${parameter.comment.shortText}` : ''}
                    </p>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      }
    </div>
  );
}
