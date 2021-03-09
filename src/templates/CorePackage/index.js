/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import hljs from 'highlight.js';

import asciidoctor from 'asciidoctor';

import 'highlight.js/styles/github.css';
import '../../styles/dark-code.css';

import { lineNumbers } from '../Asciidoc/utils/line-numbers';
import { addCopyCodeButton } from '../Asciidoc/utils/copy-code';
import { addLanguageIndicator } from '../Asciidoc/utils/lang-indicator';

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
    kojiCorePackageItem(id: { eq: $id }) {
      id
      name
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
                elementType {
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
        name
        children {
          defaultValue
          id
          name
        }
      }
      Interfaces {
        id
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

function parseClass(c) {
  let description;

  const { name } = c;

  const { comment } = c;

  if (comment) {
    if (comment.shortText) description = comment.shortText;
  }

  return { name, description };
}

function convertToAsciiDoc(text) {
  const asciidoc = asciidoctor();
  return asciidoc.convert(text);
}

function getMethodTitle(method) {
  if (method.name.includes('constructor')) return false;

  if (method.signatures && method.signatures[0].parameters) {
    return `${method.name}(${method.signatures[0].parameters.map((p) => p.name).join(', ')})`;
  }

  return method.name;
}

function getMethodDescription(method) {
  if (!method.signatures[0] || !method.signatures[0].comment || !method.signatures[0].comment.shortText) return false;
  return method.signatures[0].comment.shortText;
}

function getMethodParameters(method) {
  if (!method.signatures || !method.signatures[0].parameters || !method.signatures[0].parameters.length) return false;
  return method.signatures[0].parameters;
}

function getMethodExample(method) {
  // eslint-disable-next-line max-len
  if (!method.signatures[0].comment || !method.signatures[0].comment.tags || !method.signatures[0].comment.tags[0] || method.signatures[0].comment.tags[0].tag !== 'example') return false;
  return method.signatures[0].comment.tags[0].text;
}

function getMethodSource(method) {
  if (!method.sources || !method.sources[0] || !method.sources[0].fileName || !method.sources[0].line) return false;
  return `${method.sources[0].fileName}#L${method.sources[0].line}`;
}

function renderParameterType(parameter) {
  if (!parameter.type || !parameter.type.type) return null;

  if (parameter.type.type === 'reference') {
    return (
      <a href={`#${parameter.type.name}`}>
        {parameter.type.name}
      </a>
    );
  }

  if (parameter.type.type === 'union') {
    const validTypes = parameter.type.types.filter(({ name }) => !!name).map(({ name }) => name);

    if (validTypes.length === 1) return validTypes[0];

    return validTypes.join(' | ');
  }

  if (parameter.type.type === 'array') {
    if (parameter.type.elementType) {
      return parameter.type.elementType.name;
    }
  }

  return parameter.type.name;
}

function parameterIsArray(parameter) {
  if (parameter.type.type === 'array') return true;
}

function renderMethod(method) {
  const methodTitle = getMethodTitle(method);
  const methodDescription = getMethodDescription(method);
  const methodParameters = getMethodParameters(method);
  const methodExample = getMethodExample(method);
  const methodSource = getMethodSource(method);

  return (
    <div key={method.id}>
      {
        methodTitle &&
        <h3 id={method.name}>{`.${methodTitle}`}</h3>
      }
      {
        methodDescription &&
        <p>{methodDescription}</p>
      }
      {
        methodParameters &&
        <div>
          <h4>{'Parameters'}</h4>
          <div className={'ulist'}>
            <ul>
              {
                methodParameters.map((parameter) => (
                  <li key={parameter.name}>
                    <p>
                      <code>{parameter.name}</code>
                      {' – '}
                      <em>{renderParameterType(parameter)}</em>
                      {parameterIsArray(parameter) && <span>{'[]'}</span>}
                      {parameter.flags && parameter.flags.isOptional && <span>{' (Optional)'}</span>}
                      {parameter.comment && parameter.comment.text ? `, ${parameter.comment.text}` : ''}
                    </p>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      }
      {
        methodExample &&
        <div>
          <h4>{'Example'}</h4>
          <div dangerouslySetInnerHTML={{ __html: convertToAsciiDoc(methodExample) }} />
        </div>
      }
      {
        methodSource &&
        <p>
          {'Source: '}
          <a
            href={`https://github.com/madewithkoji/koji-core/tree/main/src/${methodSource}`}
            rel={'noreferrer noopener'}
            target={'_blank'}
          >
            {methodSource}
          </a>
        </p>
      }
    </div>
  );
}

function renderEnum(e) {
  return (
    <div key={e.id}>
      {
        e.name &&
        <h3 id={e.name}>{e.name}</h3>
      }
      {
        (e.children.length && true) &&
        <>
          <h4>{'Possible Values'}</h4>
          <div className={'ulist'}>
            <ul>
              {
                e.children.map((child) => (
                  <li key={child.defaultValue}>{child.defaultValue}</li>
                ))
              }
            </ul>
          </div>
        </>
      }
    </div>
  );
}

function getInterfaceParameters(i) {
  return i.children;
}

function renderInterface(i) {
  const interfaceParameters = getInterfaceParameters(i);

  return (
    <div key={i.id}>
      {
        i.name &&
        <h3 id={i.name}>{i.name}</h3>
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
                      {parameter.flags && parameter.flags.isOptional && <span>{'(Optional) '}</span>}
                      <em>{renderParameterType(parameter)}</em>
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

const CorePackage = (props) => {
  const { allKojiCorePackageItem, kojiCorePackageItem } = props.data;

  console.log('k', kojiCorePackageItem);

  let {
    Classes,
    Enumerations,
    Interfaces,
  } = kojiCorePackageItem;

  if (!Classes) Classes = [];
  if (!Enumerations) Enumerations = [];
  if (!Interfaces) Interfaces = [];

  const AllInterfaces = allKojiCorePackageItem.nodes.map((node) => node.Interfaces || []).reduce((acc, cur) => [...acc, ...cur], []);

  const { name, description } = parseClass(Classes[0]);

  let constructor = Classes[0].children.find(({ kindString }) => kindString === 'Constructor');

  if (!constructor.signatures || !constructor.signatures[0] || !constructor.signatures[0].comment) constructor = false;
  const methods = Classes[0].children.filter(({ kindString }) => kindString === 'Method');

  const referenceIds = (constructor ? [...methods, constructor] : methods)
    .map((method) => (method.signatures && method.signatures[0]) || { parameters: [] })
    .reduce((acc, cur) => [...acc, ...(cur.parameters || [])], [])
    .filter((param) => param.type && param.type.type && param.type.type === 'reference')
    .reduce((acc, cur) => acc.includes(cur.type.id) ? acc : [...acc, cur.type.id], []);

  const enums = Enumerations.filter(({ id }) => referenceIds.includes(id));
  const interfaces = AllInterfaces.filter(({ id }) => referenceIds.includes(id));

  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
      lineNumbers(block);
      addCopyCodeButton(block);
      addLanguageIndicator(block);
    });
  }, []);

  return (
    <StyledContainer maxWidth="lg">
      <SEO title={name} description={description} />
      <Content>
        <h1>{name}</h1>
        <p>{description}</p>
        {
          constructor &&
          <div>
            <h2 id={'constructor'}>{'Constructor'}</h2>
            {
              renderMethod(constructor)
            }
          </div>
        }
        {
          methods.length > 0 &&
          <>
            <h2 id={'methods'}>{'Methods'}</h2>
            {
              methods.map((method) => (
                renderMethod(method)
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
      </Nav>
    </StyledContainer>
  );
};

export default CorePackage;
