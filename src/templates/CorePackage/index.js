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
    kojiCorePackageItem(id: { eq: $id }) {
      id
      comment {
        shortText
        text
      }
      kindString
      name
      slug
      methods {
        name
        id
        sources {
          fileName
          line
        }
        signatures {
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
            kind
            name
            type {
              name
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

const CorePackage = (props) => {
  const { kojiCorePackageItem } = props.data;

  console.log('k', kojiCorePackageItem);

  const {
    methods,
    name: pageTitle,
    name: pageDesc,
    name: pageBanner,
  } = kojiCorePackageItem;

  const asAsciiDoc = (text) => {
    const asciidoc = asciidoctor();
    return asciidoc.convert(text);
  };

  const getTitle = (method) => {
    if (method.signatures && method.signatures[0].parameters) {
      return `${method.name}(${method.signatures[0].parameters.map((p) => p.name).join(', ')})`;
    }

    return method.name;
  };

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
      <SEO title={pageTitle} description={pageDesc} image={pageBanner} article />
      <Content>
        <h1>{pageTitle}</h1>
        <h2 id={'methods'}>{'Methods'}</h2>
        {
          methods.map((method) => (
            <div key={method.id}>
              <h3 id={method.name}>{`.${getTitle(method)}`}</h3>
              {
                (method.signatures[0] && method.signatures[0].comment && method.signatures[0].comment.shortText && true) &&
                <p>{method.signatures[0].comment.shortText}</p>
              }
              {
                (method.signatures && method.signatures[0].parameters && method.signatures[0].parameters.length && true) &&
                <div>
                  <h4>{'Parameters'}</h4>
                  <div className={'ulist'}>
                    <ul>
                      {
                        method.signatures[0].parameters.map((parameter) => (
                          <li key={parameter.name}>
                            <p>
                              <code>{parameter.name}</code>
                              {' – '}
                              {parameter.flags && parameter.flags.isOptional && <span>{'(Optional) '}</span>}
                              <em>{parameter.type ? parameter.type.name : ''}</em>
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
                (method.signatures[0].comment && method.signatures[0].comment.tags && method.signatures[0].comment.tags[0] && method.signatures[0].comment.tags[0].tag === 'example' && true) &&
                <div>
                  <h4>{'Example'}</h4>
                  <div dangerouslySetInnerHTML={{ __html: asAsciiDoc(method.signatures[0].comment.tags[0].text) }} />
                </div>
              }
              <p>
                {'Source: '}
                <a
                  href={`https://github.com/madewithkoji/koji-core/tree/main/src/${method.sources[0].fileName}#L${method.sources[0].line}`}
                >
                  {`${method.sources[0].fileName}#${method.sources[0].line}`}
                </a>
              </p>
            </div>
          ))
        }
      </Content>
      {
        methods.length > 0 &&
        <Nav>
          <TOC>{'Table of Contents'}</TOC>
          <SectionLink
            style={{ isActive: 'methods' === props.currentHeader }}
            href={'#methods'}
          >
            {'Methods'}
          </SectionLink>
          {
            methods.map(({ id, name }) => (
              <SubSectionLink
                style={{ isActive: name === props.currentHeader }}
                href={`#${name}`}
                key={id}
              >
                {`.${name}`}
              </SubSectionLink>
            ))
          }
        </Nav>
      }
    </StyledContainer>
  );
};

export default CorePackage;
