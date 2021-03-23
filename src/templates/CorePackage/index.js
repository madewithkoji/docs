/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import hljs from 'highlight.js';

import { renderEnum } from './utils/enum';
import { renderInterface } from './utils/interface';
import { renderMethod } from './utils/method';
import { renderProperty } from './utils/property';
import { renderTypeAlias } from './utils/typeAlias';

import 'highlight.js/styles/github.css';
import '../../styles/dark-code.css';

import { lineNumbers } from '../utils/line-numbers';
import { addCopyCodeButton } from '../utils/copy-code';
import { addLanguageIndicator } from '../utils/lang-indicator';

import Content from '../Asciidoc/components/Content';
import SEO from '../../components/Seo';

import { BLACK, DARK_GRAY } from '../../constants/colors';

export const query = graphql`
  query($id: String!) {
    allKojiCorePackageItem {
      nodes {
        id
        Interfaces {
          id
          comment {
            shortText
          }
          name
          children {
            id
            flags {
              isOptional
            }
            comment {
              shortText
            }
            name
            type {
              name
              type
              types {
                name
                type
              }
            }
          }
        }
        Type_aliases {
          comment {
            shortText
          }
          name
          id
          type {
            declaration {
              comment {
                shortText
              }
              name
              sources {
                fileName
                line
              }
              signatures {
                parameters {
                  kind
                  type {
                    type
                    name
                    id
                  }
                  name
                }
                type {
                  name
                  type
                }
              }
            }
            type
            types {
              type
              value
            }
          }
        }
      }
    }
    kojiCorePackageItem(id: { eq: $id }) {
      id
      name
      referenceIds
      Classes {
        id
        name
        comment {
          shortText
        }
        children {
          id
          name
          kindString
          signatures {
            id
            comment {
              shortText
              tags {
                tag
                text
              }
            }
            parameters {
              comment {
                text
              }
              flags {
                isOptional
              }
              name
              type {
                id
                declaration {
                  indexSignature {
                    parameters {
                      name
                      kind
                      type {
                        name
                        type
                      }
                    }
                    type {
                      name
                      type
                    }
                  }
                }
                elementType {
                  id
                  name
                  type
                }
                name
                type
                types {
                  name
                  type
                }
              }
            }
          }
          sources {
            fileName
            line
            character
          }
          type {
            id
            name
            type
            types {
              name
              type
            }
          }
        }
      }
      Enumerations {
        id
        comment {
          shortText
        }
        name
        children {
          defaultValue
          id
          name
        }
      }
      Interfaces {
        id
        comment {
          shortText
        }
        name
        children {
          id
          flags {
            isOptional
          }
          comment {
            shortText
          }
          name
          type {
            name
            type
            types {
              name
              type
            }
          }
        }
      }
    }
  }
`;

const Container = styled.div`

`;

const StyledContainer = styled(Container)`
  display: flex;
  opacity: ${({ style: { isReady } }) => isReady ? 1 : 0};
`;

const TOC = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  color: #999999;

  a, a:hover {
    text-decoration: none;
  }
`;

const SectionLink = styled.a`
  color: ${DARK_GRAY} !important;
  position: relative;
  font-size: 13px;
  text-decoration: none;

  &:hover {
    color: ${BLACK} !important;
    text-decoration: none;
  }

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: #666666;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
    transform: translate(-16px, 4px);
    border-radius: 50%;
    opacity: ${({ style: { isActive } }) => isActive ? 1 : 0};
    transition: all 0.2s ease-in-out;
  }
`;

const SubSectionLink = styled.a`
  color: ${DARK_GRAY} !important;
  margin-left: 16px;
  position: relative;
  font-size: 13px;
  text-decoration: none;

  &:hover {
    color: ${BLACK} !important;
    text-decoration: none;
  }

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: #666666;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
    transform: translate(-16px, 4px);
    border-radius: 50%;
    opacity: ${({ style: { isActive } }) => isActive ? 1 : 0};
    transition: all 0.2s ease-in-out;
  }
`;

const Nav = styled.div`
  position: sticky;
  top: 8px;
  margin-top: 4px;
  min-width: 200px;
  width: 200px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 48px);
  overflow: auto;

  > * {
    margin-bottom: 8px;
  }

  @media screen and (max-width: 1023px) {
    display: none;
  }

  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: #babac0;
    }
  }

  /* total width */
  ::-webkit-scrollbar {
      background-color: #fff;
      width: 16px;
  }

  /* background of the scrollbar except button or resizer */
  ::-webkit-scrollbar-track {
      background-color: #fff;
  }

  /* scrollbar itself */
  ::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 16px;
      border: 4px solid #fff;
  }

  /* set button(top and bottom of the scrollbar) */
  ::-webkit-scrollbar-button {
      display:none;
  }
`;

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
  return `${pieces[1].toUpperCase()} ${pieces[2]}`;
}

const CorePackage = (props) => {
  const [isReady, setIsReady] = useState(false);

  const { allKojiCorePackageItem, kojiCorePackageItem } = props.data;

  let {
    Classes,
    Enumerations,
    Interfaces,
    referenceIds,
  } = kojiCorePackageItem;

  if (!Classes) Classes = [];
  if (!Enumerations) Enumerations = [];
  if (!Interfaces) Interfaces = [];
  if (!referenceIds) referenceIds = [];

  const AllInterfaces = allKojiCorePackageItem.nodes.map((node) => node.Interfaces || []).reduce((acc, cur) => [...acc, ...cur], []);
  const AllTypeAliases = allKojiCorePackageItem.nodes.map((node) => node.Type_aliases || []).reduce((acc, cur) => [...acc, ...cur], []);

  const description = getClassDescription(Classes[0]);
  const name = getClassName(kojiCorePackageItem.name);

  let constructor = Classes[0].children.find(({ kindString }) => kindString === 'Constructor');

  if (!constructor.signatures || !constructor.signatures[0] || !constructor.signatures[0].comment) constructor = false;
  const methods = Classes[0].children.filter(({ kindString }) => kindString === 'Method');

  const properties = Classes[0].children.filter(({ kindString }) => kindString === 'Property');

  const methodReferenceIds = (constructor ? [...methods, constructor] : methods)
    .map((method) => (method.signatures && method.signatures[0]) || { parameters: [] })
    .reduce((acc, cur) => [...acc, ...(cur.parameters || [])], [])
    .filter((param) => param.type && param.type.type && param.type.type === 'reference')
    .reduce((acc, cur) => acc.includes(cur.type.id) ? acc : [...acc, cur.type.id], []);

  const propertyReferenceIds = properties
    .map((property) => property.type || {})
    .filter((param) => param.type && param.type.type && param.type.type === 'reference')
    .reduce((acc, cur) => acc.includes(cur.type.id) ? acc : [...acc, cur.type.id], []);

  let allReferenceIds = [
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

  useEffect(() => {
    // Note: need to do async for loops here so we can call setIsReady after processing

    const codeBlocks = document.querySelectorAll('pre code');
    for (let idx = 0; idx < codeBlocks.length; idx += 1) {
      const block = codeBlocks[idx];
      hljs.highlightBlock(block);
      lineNumbers(block);
      addCopyCodeButton(block);
      addLanguageIndicator(block);
    }

    const paragraphs = document.querySelectorAll('p');
    for (let idx = 0; idx < paragraphs.length; idx += 1) {
      const paragraph = paragraphs[idx];
      paragraph.innerHTML = paragraph.innerHTML.replace(new RegExp(/\[\[.*\s\|\s.*\]\]/g), (match) => {
        const [href, link] = match.slice(2, -2).split('|').map((t) => t.trim());
        return `<a href="${href}" target="_blank">${link}</a>`;
      });

      paragraph.innerHTML = paragraph.innerHTML.replace(new RegExp(/\[\[\S*]]/g), (match) => {
        const [href] = match.slice(2, -2).split('|').map((t) => t.trim());
        return `<a href="#${href}">${href}</a>`;
      });

      paragraph.innerHTML = paragraph.innerHTML.replace(new RegExp(/`.*?`/g), (match) => `<code>${match.slice(1, -1)}</code>`);
    }

    setIsReady(() => true);
  }, []);

  return (
    <StyledContainer maxWidth="lg" style={{ isReady }}>
      <SEO title={name} description={description} />
      <Content>
        <h1 style={{ textTransform: 'capitalize' }}>{name}</h1>
        <p>{description}</p>
        {
          constructor &&
          <div>
            <h2 id={'constructor'}>{'Constructor'}</h2>
            {
              renderMethod(constructor, interfaces)
            }
          </div>
        }
        {
          methods.length > 0 &&
          <>
            <h2 id={'methods'}>{'Methods'}</h2>
            {
              methods.map((method) => (
                renderMethod(method, interfaces)
              ))
            }
          </>
        }
        {
          properties.length > 0 &&
          <>
            <h2 id={'properties'}>{'Properties'}</h2>
            {
              properties.map((property) => (
                renderProperty(property)
              ))
            }
          </>
        }
        {
          enums.length > 0 &&
          <>
            <h2 id={'enums'}>{'Enums'}</h2>
            {
              enums.map((e) => (
                renderEnum(e)
              ))
            }
          </>
        }
        {
          interfaces.length > 0 &&
          <>
            <h2 id={'interfaces'}>{'Interfaces'}</h2>
            {
              interfaces.map((i) => (
                renderInterface(i)
              ))
            }
          </>
        }
        {
          typeAliases.length > 0 &&
          <>
            <h2 id={'typeAliases'}>{'Type aliases'}</h2>
            {
              typeAliases.map((typeAlias) => (
                renderTypeAlias(typeAlias, interfaces)
              ))
            }
          </>
        }
      </Content>
      <Nav>
        <TOC>{'Table of Contents'}</TOC>
        {
          constructor &&
          <SectionLink
            style={{ isActive: props.currentHeader === 'constructor' }}
            href={'#constructor'}
          >
            {'Constructor'}
          </SectionLink>
        }
        {
          methods.length > 0 &&
          <>
            <SectionLink
              style={{ isActive: props.currentHeader === 'methods' }}
              href={'#methods'}
            >
              {'Methods'}
            </SectionLink>
            {
              methods.map(({ id, name: methodName }) => (
                <SubSectionLink
                  style={{ isActive: methodName === props.currentHeader }}
                  href={`#${methodName}`}
                  key={id}
                >
                  {`.${methodName}`}
                </SubSectionLink>
              ))
            }
          </>
        }
        {
          properties.length > 0 &&
          <>
            <SectionLink
              style={{ isActive: props.currentHeader === 'properties' }}
              href={'#properties'}
            >
              {'Properties'}
            </SectionLink>
            {
              properties.map(({ id, name: propertyName }) => (
                <SubSectionLink
                  style={{ isActive: propertyName === props.currentHeader }}
                  href={`#${propertyName}`}
                  key={id}
                >
                  {propertyName}
                </SubSectionLink>
              ))
            }
          </>
        }
        {
          enums.length > 0 &&
          <>
            <SectionLink
              style={{ isActive: props.currentHeader === 'enums' }}
              href={'#enums'}
            >
              {'Enums'}
            </SectionLink>
            {
              enums.map(({ id, name: enumName }) => (
                <SubSectionLink
                  style={{ isActive: enumName === props.currentHeader }}
                  href={`#${enumName}`}
                  key={id}
                >
                  {enumName}
                </SubSectionLink>
              ))
            }
          </>
        }
        {
          interfaces.length > 0 &&
          <>
            <SectionLink
              style={{ isActive: props.currentHeader === 'interfaces' }}
              href={'#interfaces'}
            >
              {'Interfaces'}
            </SectionLink>
            {
              interfaces.map(({ id, name: interfaceName }) => (
                <SubSectionLink
                  style={{ isActive: interfaceName === props.currentHeader }}
                  href={`#${interfaceName}`}
                  key={id}
                >
                  {interfaceName}
                </SubSectionLink>
              ))
            }
          </>
        }
        {
          typeAliases.length > 0 &&
          <>
            <SectionLink
              style={{ isActive: props.currentHeader === 'typeAliases' }}
              href={'#typeAliases'}
            >
              {'Type aliases'}
            </SectionLink>
            {
              typeAliases.map(({ id, name: typeAliasName }) => (
                <SubSectionLink
                  style={{ isActive: typeAliasName === props.currentHeader }}
                  href={`#${typeAliasName}`}
                  key={id}
                >
                  {typeAliasName}
                </SubSectionLink>
              ))
            }
          </>
        }
      </Nav>
    </StyledContainer>
  );
};

export default CorePackage;
