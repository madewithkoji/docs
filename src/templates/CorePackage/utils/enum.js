import React from 'react';

function getEnumDescription(e) {
  if (e.comment && e.comment.shortText) return e.comment.shortText;

  return false;
}

// eslint-disable-next-line import/prefer-default-export
export function renderEnum(e) {
  const description = getEnumDescription(e);

  return (
    <div key={e.id}>
      {
        e.name &&
        <h3 id={e.name}>{e.name}</h3>
      }
      {
        description &&
        <p>{description}</p>
      }
      {
        (e.children.length && true) &&
        <>
          <h4>{'Possible Values'}</h4>
          <div className={'ulist'}>
            <ul>
              {
                e.children.map((child) => (
                  <li key={child.defaultValue}>
                    {`${child.name}: = '${child.defaultValue.slice(0, -1).slice(1)}'`}
                  </li>
                ))
              }
            </ul>
          </div>
        </>
      }
    </div>
  );
}
