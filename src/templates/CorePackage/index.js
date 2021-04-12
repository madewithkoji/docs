import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js';
import styled from 'styled-components';
import 'highlight.js/styles/github.css';
import { graphql } from 'gatsby';

import { decodeHTML } from '../../utils/decodeHTML';
import '../../styles/dark-code.css';

import { lineNumbers } from '../utils/line-numbers';
import { addCopyCodeButton } from '../utils/copy-code';
import { addLanguageIndicator } from '../utils/lang-indicator';

import { BLACK, DARK_GRAY } from '../../constants/colors';
import Content from '../Asciidoc/components/Content';
import SEO from '../../components/Seo';

// Load future-tabs conditionally for gatsby static rendering
let Tabs = null;

if (typeof Element !== 'undefined') {
  // eslint-disable-next-line global-require
  Tabs = require('future-tabs');
}

const Container = styled.div`

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

export const query = graphql`
  query($id: String!) {
    kojiCorePackageItem(id: { eq: $id }) {
      html
    }
  }
`;

const CorePackage = (props) => {
  console.log('p', props);
  const [sections, setSections] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const resolveTitleFromSlug = (slug) => {
    const match = props.data.allAsciidoc.edges.map(({ node }) => node).find(({ pageAttributes: { slug: s } = {} }) => s === slug);
    if (match) {
      // Could be html entities in the title
      return decodeHTML(match.document.title);
    }

    return null;
  };

  useEffect(() => {
    // Note: need to do sync for loops here so we can call setIsReady after processing

    const codeBlocks = document.querySelectorAll('pre code');
    for (let idx = 0; idx < codeBlocks.length; idx += 1) {
      const block = codeBlocks[idx];
      hljs.highlightBlock(block);
      lineNumbers(block);
      addCopyCodeButton(block);
      addLanguageIndicator(block);
    }

    const dataSlugLinks = document.querySelectorAll('a[data-slug]');
    for (let idx = 0; idx < dataSlugLinks.length; idx += 1) {
      const dataSlugLink = dataSlugLinks[idx];
      const { slug } = dataSlugLink.dataset;
      // eslint-disable-next-line no-param-reassign
      if (slug) dataSlugLink.innerText = resolveTitleFromSlug(slug) || dataSlugLink.innerText;
    }

    const tabs = document.querySelectorAll('.tabbed__toggle[data-scope]');
    for (let idx = 0; idx < tabs.length; idx += 1) {
      const tab = tabs[idx];
      const { scope, scopevalue } = tab.dataset;
      tab.addEventListener('click', (e) => {
        const self = e.target;
        if (e.isTrusted) {
          document.querySelectorAll(`.tabbed__toggle[data-scope="${scope}"][data-scopevalue="${scopevalue}"]`).forEach((target) => {
            if (target !== self) target.click();
          });
        }
      });
    }

    setIsReady(() => true);
  }, []);

  useEffect(() => {
    const elem = document.createElement('html');
    elem.innerHTML = props.data.kojiCorePackageItem.html;

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

  // const pageTitle = props.data.asciidoc.document.title;
  // const pageDesc = props.data.asciidoc.pageAttributes.description ? props.data.asciidoc.pageAttributes.description : '';
  // const pageBanner = props.data.asciidoc.pageAttributes.banner ? props.data.asciidoc.pageAttributes.banner : '';

  return (
    <StyledContainer maxWidth="lg" style={{ isReady }}>
      <SEO title={''} description={''} image={''} article />
      <Content
        dangerouslySetInnerHTML={{ __html: props.data.kojiCorePackageItem.html }}
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

CorePackage.propTypes = {
  currentHeader: PropTypes.string,
  data: PropTypes.object,
};

CorePackage.defaultProps = {
  currentHeader: null,
  data: {},
};

export default CorePackage;
