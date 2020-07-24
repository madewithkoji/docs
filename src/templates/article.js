import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import hljs from 'highlight.js';
import styled from 'styled-components';
import 'highlight.js/styles/github.css';
import { graphql } from 'gatsby';
import Container from '@material-ui/core/Container';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import '../styles/adoc-rocket-panda.css';

const SectionLink = styled.a`
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: blue;
    position: relative;
    z-index: 10000;
    position: fixed;
    transform: translate(-16px, 6px);
    border-radius: 50%;
    opacity: ${({ style: { isActive } }) => isActive ? 1 : 0};
    transition: all 0.2s ease-in-out;
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
`;

const Nav = styled.div`
  position: fixed;
  top: 96px;
  right: 16px;
  width: 240px;
  padding: 16px;
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 8px;
  }
`;

const Content = styled.div`
  width: ${({ style: { isMobile } }) => isMobile ? '100%' : 'calc(100% - 240px)'};

  margin-bottom: 64px;
  
  img {
    max-width: 100%;
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

const Article = (props) => {
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
    });

    document.querySelectorAll('a[data-slug]').forEach((elem) => {
      const { slug } = elem.dataset;
      // eslint-disable-next-line no-param-reassign
      if (slug) elem.innerText = resolveTitleFromSlug(slug) || elem.innerText;
    });
  }, []);

  useEffect(() => {
    const elem = document.createElement('html');
    elem.innerHTML = props.data.asciidoc.html;

    const headers = elem.getElementsByTagName('h2');
    const mappedSections = Array.from(headers).map((header) => ({
      href: header.id,
      text: header.innerText,
    }));

    elem.remove();

    setSections(mappedSections);
  }, []);

  return (
    <StyledContainer maxWidth="lg">
      <Helmet>
        <title>{props.data.asciidoc.document.title}</title>
      </Helmet>
      <Content
        dangerouslySetInnerHTML={{ __html: props.data.asciidoc.html }}
        style={{ isMobile }}
      />
      {
        !isMobile &&
        <Nav>
          {
            sections.map(({ href, text }) => (
              <SectionLink
                style={{ isActive: href === props.currentH2 }}
                href={`#${href}`}
                key={href}
              >
                {text}
              </SectionLink>
            ))
          }
        </Nav>
      }
    </StyledContainer>
  );
};

Article.propTypes = {
  currentH2: PropTypes.string,
  data: PropTypes.object,
};

Article.defaultProps = {
  currentH2: null,
  data: {},
};

export default Article;
