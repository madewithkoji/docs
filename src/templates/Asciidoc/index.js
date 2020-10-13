import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js';
import styled from 'styled-components';
import 'highlight.js/styles/github.css';
import '../../styles/dark-code.css';

import { graphql } from 'gatsby';
import Container from '@material-ui/core/Container';

import { lineNumbers } from './utils/line-numbers';
import { addCopyCodeButton } from './utils/copy-code';
import { addChangeThemeButton } from './utils/code-theme';
import { addLanguageIndicator } from './utils/lang-indicator';
import { makeCollapsible } from './utils/collapsible';

import { BLACK, DARK_GRAY } from '../../constants/colors';
import Content from './components/Content';
import SEO from '../../components/Seo';

// Load future-tabs conditionally for gatsby static rendering
let Tabs = null;

if (typeof Element !== 'undefined') {
  // eslint-disable-next-line global-require
  Tabs = require('future-tabs');
}

const SectionLink = styled.a`
  color: ${DARK_GRAY} !important;
  position: relative;

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
    transform: translate(-16px, 6px);
    border-radius: 50%;
    opacity: ${({ style: { isActive } }) => isActive ? 1 : 0};
    transition: all 0.2s ease-in-out;
  }
`;

const SubSectionLink = styled.a`
  color: ${DARK_GRAY} !important;
  margin-left: 16px;
  position: relative;

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
    transform: translate(-16px, 6px);
    border-radius: 50%;
    opacity: ${({ style: { isActive } }) => isActive ? 1 : 0};
    transition: all 0.2s ease-in-out;
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
`;

const TOC = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  color: #999999;
`;

const Nav = styled.div`
  position: fixed;
  top: 72px;
  right: 16px;
  width: 296px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 108px);
  overflow: auto;

  > * {
    margin-bottom: 8px;
  }

  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export const query = graphql`
  query($id: String!) {
    asciidoc(id: { eq: $id }) {
      html
      document {
        title
        subtitle
        main
      }
      pageAttributes {
        description
        banner
      }
    }
    allAsciidoc {
      edges {
        node {
          id
          html
          document {
            title
          }
          pageAttributes {
            slug
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const Asciidoc = (props) => {
  const [sections, setSections] = useState([]);

  const resolveTitleFromSlug = (slug) => {
    const match = props.data.allAsciidoc.edges.map(({ node }) => node).find(({ pageAttributes: { slug: s } = {} }) => s === slug);
    if (match) return match.document.title;

    return null;
  };

  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
      lineNumbers(block);
      addCopyCodeButton(block);
      addChangeThemeButton(block);
      addLanguageIndicator(block);
      makeCollapsible(block);
    });

    document.querySelectorAll('a[data-slug]').forEach((elem) => {
      const { slug } = elem.dataset;
      // eslint-disable-next-line no-param-reassign
      if (slug) elem.innerText = resolveTitleFromSlug(slug) || elem.innerText;
    });

    document.querySelectorAll('.tabbed__toggle[data-scope]').forEach((tab) => {
      const { scope, scopevalue } = tab.dataset;
      tab.addEventListener('click', (e) => {
        const self = e.target;
        if (e.isTrusted) {
          document.querySelectorAll(`.tabbed__toggle[data-scope="${scope}"][data-scopevalue="${scopevalue}"]`).forEach((target) => {
            if (target !== self) target.click();
          });
        }
      });
    });
  }, []);

  useEffect(() => {
    const elem = document.createElement('html');
    elem.innerHTML = props.data.asciidoc.html;

    const headers = elem.querySelectorAll('h2,h3');
    const mappedSections = Array.from(headers).map((header) => ({
      href: header.id,
      text: header.innerText,
      type: header.localName,
    }));

    elem.remove();

    setSections(mappedSections);
  }, []);

  useEffect(() => {
    const tabContainers = document.querySelectorAll('.tabbed');
    for (let i = tabContainers.length - 1; i >= 0; i -= 1) {
      // eslint-disable-next-line no-new
      if (Tabs) new Tabs.Tabs(tabContainers[i], 'tabbed');
    }
  }, []);

  const renderTextFromHref = (href, text) => {
    if (href[0] === '_') {
      return text;
    }

    return href;
  };

  const pageTitle = props.data.asciidoc.document.title;
  const pageDesc = props.data.asciidoc.pageAttributes.description ? props.data.asciidoc.pageAttributes.description : '';
  const pageBanner = props.data.asciidoc.pageAttributes.banner ? props.data.asciidoc.pageAttributes.banner : '';

  return (
    <StyledContainer maxWidth="lg">
      <SEO title={pageTitle} description={pageDesc} image={pageBanner} article />
      <Content
        dangerouslySetInnerHTML={{ __html: props.data.asciidoc.html }}
      />
      {
        sections.length > 0 &&
        <Nav>
          <TOC>{'Table of Contents'}</TOC>
          {
            sections.map(({ href, text, type }) => {
              if (type === 'h2') {
                return (
                  <SectionLink
                    style={{ isActive: href === props.currentHeader }}
                    href={`#${href}`}
                    key={href}
                  >
                    {renderTextFromHref(href, text)}
                  </SectionLink>
                );
              }
              return (
                <SubSectionLink
                  style={{ isActive: href === props.currentHeader }}
                  href={`#${href}`}
                  key={href}
                >
                  {renderTextFromHref(href, text)}
                </SubSectionLink>
              );
            })
          }
        </Nav>
      }
    </StyledContainer>
  );
};

Asciidoc.propTypes = {
  currentHeader: PropTypes.string,
  data: PropTypes.object,
};

Asciidoc.defaultProps = {
  currentHeader: null,
  data: {},
};

export default Asciidoc;
