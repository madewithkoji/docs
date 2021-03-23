import React from 'react';
import { parameterIsArray, renderParameterType } from './parameter';

function getInterfaceProperties(i) {
  return i.children;
}

function getInterfaceDescription(i) {
  if (i.comment && i.comment.shortText) return i.comment.shortText;

  return false;
}

// eslint-disable-next-line import/prefer-default-export
export function renderInterface(i) {
  const interfaceDescription = getInterfaceDescription(i);
  const interfaceProperties = getInterfaceProperties(i);

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
        interfaceProperties &&
        <div>
          <h4>{'Properties'}</h4>
          <div className={'ulist'}>
            <ul>
              {
                interfaceProperties.map((property) => (
                  <li key={property.name}>
                    <p>
                      <code>{property.name}</code>
                      {' – '}
                      <em style={{ textTransform: 'capitalize' }}>{renderParameterType(property)}</em>
                      {parameterIsArray(property) && <span>{'[]'}</span>}
                      {property.flags && property.flags.isOptional && <span>{' (Optional)'}</span>}
                      {property.comment && property.comment.shortText ? `, ${property.comment.shortText}` : ''}
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
