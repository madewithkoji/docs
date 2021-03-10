import React from 'react';
import { renderParameterType } from './parameter';

// eslint-disable-next-line import/prefer-default-export
export function renderProperty(property) {
  return (
    <div key={property.id}>
      {
        property.name &&
        <>
          <h3 id={property.name}>{property.name}</h3>
          <p>
            <code>{property.name}</code>
            {' – '}
            <em>{renderParameterType(property)}</em>
            {property.comment && property.comment.shortText ? `, ${property.comment.shortText}` : ''}
          </p>
        </>
      }
    </div>
  );
}
