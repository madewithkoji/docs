import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import asciidoctor from 'asciidoctor';
import { graphql } from 'gatsby';

import '../../styles/dark-code.css';

import { lineNumbers } from '../utils/line-numbers';
import { addCopyCodeButton } from '../utils/copy-code';
import { addLanguageIndicator } from '../utils/lang-indicator';

import Content from '../Asciidoc/components/Content';
import SEO from '../../components/Seo';

import {
  ContentWrapper,
  SectionLink,
  SubSectionLink,
  StyledContainer,
  TOC,
  Nav,
} from '../Asciidoc';

function convertToAsciiDoc(text) {
  const asciidoc = asciidoctor();
  return asciidoc.convert(text);
}

// Load future-tabs conditionally for gatsby static rendering
let Tabs = null;

if (typeof Element !== 'undefined') {
  // eslint-disable-next-line global-require
  Tabs = require('future-tabs');
}

export const query = graphql`
  query($id: String!) {
    allSitePage {
      nodes {
        context {
          slug
        }
        path
      }
    }
    kojiCorePackageItem(id: { eq: $id }) {
      document {
        description
        title
      }
      html
    }
  }
`;

const CorePackage = (props) => {
  const [sections, setSections] = useState([]);
  const [isReady, setIsReady] = useState(false);

  // If a good description came through on the document prop, use that; otherwise fall back to the default
  let pageDesc = '';
  if (props.data.kojiCorePackageItem.document.description) {
    pageDesc = props.data.kojiCorePackageItem.document.description;
  }
  const pageTitle = props.data.kojiCorePackageItem.document.title;

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

    // Because all of the output of concern is wrapped in paragraph tags,
    // we can use that as a way to target match/replace when looking at the innerHTML
    const paragraphs = Array.from([
      ...document.querySelectorAll('p'),
      ...document.getElementsByClassName('content'),
    ]);

    for (let idx = 0; idx < paragraphs.length; idx += 1) {
      const paragraph = paragraphs[idx];

      // Replace TypeDoc in-module reference urls (e.g., [[local-link | related method]])
      // as well as any external links (e.g., [[https://withkoji.com | Koji homepage]])
      paragraph.innerHTML = paragraph.innerHTML.replace(new RegExp(/\[\[([^\]\]]*)\]\]/g), (match) => {
        const [href, linkText] = match.slice(2, -2).split('|').map((t) => t && t.trim());

        // Note: In some instances, this content has been passed through convertToAsciiDoc to preserve
        // formatting. This will mean we have to de-structure the link that was automatically built
        if (href.includes('class="bare"')) {
          const parsedURL = href.split('href="')[1]?.split('" class="')[0];
          if (parsedURL) return `<a href="#${parsedURL}">${linkText || parsedURL}</a>`;
        }

        if (href.includes('http')) return `<a href="${href}" ${href.includes('http') ? 'target="_blank"' : ''}>${linkText || href}</a>`;

        return `<a href="#${href}">${linkText || href}</a>`;
      });

      // When there are cross-module links, we expect them to be in the typedoc with a special format:
      // {@doclink slug | linkText}
      //
      // This allows the documentation to link to other modules, and relies on the allSitePage data
      // to derive the path from a slug
      //
      // When writing documentation in the koji-core package that uses cross-module reference links,
      // you can refer to nav.json inside this repo to know which slugs to use for which modules
      paragraph.innerHTML = paragraph.innerHTML.replace(new RegExp(/\{@doclink([^}]*)}/g), (match) => {
        const [docLink, linkText] = match.slice(1, -1).split('|').map((t) => t && t.trim());

        const target = docLink.split('@doclink').map((t) => t && t.trim())[1];

        // If we aren't able to derive a target, the link may be malformed
        if (!target) return '';

        // Account for a possible hash
        const [slug, hash] = target.split('#');

        if (slug) {
          const page = props.data.allSitePage.nodes.find(({ context }) => context && context.slug && context.slug === slug);

          if (page) {
            let href = page.path;
            if (hash) href += `#${hash}`;
            return `<a href="${href}">${linkText}</a>`;
          }
        }

        // Return an empty string to prevent bad html renders
        return '';
      });

      // Wrap back-ticked content with a <code> block
      paragraph.innerHTML = paragraph.innerHTML.replace(new RegExp(/`.*?`/g), (match) => `<code>${match.slice(1, -1)}</code>`);
    }

    // Map note content into asciidoc form and then use a converter
    // to turn it into admonition presentation
    const notes = document.querySelectorAll('p.note');
    for (let idx = 0; idx < notes.length; idx += 1) {
      const note = notes[idx];

      note.innerHTML = convertToAsciiDoc(`NOTE: ${note.innerText}`);
    }

    const tips = document.querySelectorAll('p.tip');
    for (let idx = 0; idx < tips.length; idx += 1) {
      const tip = tips[idx];

      tip.innerHTML = convertToAsciiDoc(`NOTE: ${tip.innerText}`);
    }

    setIsReady(() => true);
  }, []);

  useEffect(() => {
    // Map headers/sections so that we can leverage them to build a TOC
    const elem = document.createElement('html');
    elem.innerHTML = props.data.kojiCorePackageItem.html;

    const headers = elem.querySelectorAll('h2,h3');
    const mappedSections = Array.from(headers).map((header) => {
      // Check specifically for dot-prefixed titles so that reference links can
      // link to them using bare method/property names
      if (header.innerText[0] === '.') {
        return {
          altText: `.${header.id}`,
          href: header.id,
          text: header.innerText,
          type: header.localName,
        };
      }

      return {
        href: header.id,
        text: header.innerText,
        type: header.localName,
      };
    });

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

  const renderTextFromHref = (altText, href, text) => {
    if (altText) return altText;

    if (href[0] === '_') {
      return text;
    }

    return href;
  };

  return (
    <StyledContainer maxWidth="lg" style={{ isReady }}>
      <SEO title={pageTitle} description={pageDesc} article />
      <ContentWrapper>
        <Content
          dangerouslySetInnerHTML={{ __html: props.data.kojiCorePackageItem.html }}
        />
      </ContentWrapper>
      {
        sections.length > 0 &&
        <Nav>
          <TOC>{'Table of Contents'}</TOC>
          {
            sections.map(({ altText, href, text, type }) => {
              if (type === 'h2') {
                return (
                  <SectionLink
                    style={{ isActive: href === props.currentHeader }}
                    href={`#${href}`}
                    key={href}
                  >
                    {renderTextFromHref(altText, href, text)}
                  </SectionLink>
                );
              }
              return (
                <SubSectionLink
                  style={{ isActive: href === props.currentHeader }}
                  href={`#${href}`}
                  key={href}
                >
                  {renderTextFromHref(altText, href, text)}
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
