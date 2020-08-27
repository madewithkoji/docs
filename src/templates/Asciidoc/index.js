import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import hljs from 'highlight.js';
import styled from 'styled-components';
import 'highlight.js/styles/github.css';
import '../../styles/dark-code.css';
import { lineNumbers } from './utils/line-numbers';
import { addCopyCodeButton } from './utils/copy-code';
import { addChangeThemeButton } from './utils/code-theme';
import { addLanguageIndicator } from './utils/lang-indicator';
import { makeCollapsible } from './utils/collapsible';
import { graphql } from 'gatsby';
import Container from '@material-ui/core/Container';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Content from './components/Content';

// Load future-tabs conditionally for gatsby static rendering
var Tabs = null;
if (typeof Element !== `undefined`) {
  Tabs = require('future-tabs');
}


const SectionLink = styled.a`
  color: #333333;
  position: relative;

  &:hover {
    color: #000000;
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
  color: #333333;
  margin-left: 16px;
  position: relative;

  &:hover {
    color: #000000;
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
  }
`;

const Asciidoc = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

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
        let self = e.target;
        if(e.isTrusted) {
          document.querySelectorAll(`.tabbed__toggle[data-scope="${scope}"][data-scopevalue="${scopevalue}"]`).forEach((target)=> {
            if (target != self) target.click();
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
    for (var i = tabContainers.length - 1; i >= 0; i--) {
      if (Tabs) new Tabs.Tabs(tabContainers[i], 'tabbed');
    }
  }, []);

  const renderTextFromHref = (href, text) => {
    if (href[0] === '_') {
      return text;
    }

    return href;
  };
  let pageTitle = `${props.data.asciidoc.document.title} | Koji for Developers`;
  let pageDesc = props.data.asciidoc.pageAttributes.description ? props.data.asciidoc.pageAttributes.description : '';
  let pageUrl = props.location.href;
  let pageBanner = props.data.asciidoc.pageAttributes.banner ? props.data.asciidoc.pageAttributes.banner : '';
  if (pageBanner.charAt(0) === '/') {
    pageBanner = props.location.origin+pageBanner
  }
  return (
    <StyledContainer maxWidth="lg">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle}/>
        {pageDesc && <meta name="description" content={pageDesc}/>}

        <meta property="og:type" content="website"/>
        <meta property="og:url" content={pageUrl}/>
        <meta property="og:title" content={pageTitle}/>
        {pageDesc && <meta property="og:description" content={pageDesc}/>}
        {pageBanner && <meta property="og:image" content={pageBanner}/>}

        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={pageUrl}/>
        <meta property="twitter:title" content={pageTitle}/>
        {pageDesc && <meta property="twitter:description" content={pageDesc}/>}
        {pageBanner && <meta property="twitter:image" content={pageBanner}/>}

      </Helmet>
      <Content
        dangerouslySetInnerHTML={{ __html: props.data.asciidoc.html }}
        style={{ isMobile }}
      />
      {
        !isMobile && sections.length > 0 &&
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
