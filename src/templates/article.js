import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import hljs from 'highlight.js';
import styled from 'styled-components';
import 'highlight.js/styles/github.css';
import { graphql } from 'gatsby';
import Container from '@material-ui/core/Container';
import '../styles/adoc-rocket-panda.css';

const Content = styled.div`
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

  return (
    <Container maxWidth="lg">
      <Helmet>
        <title>{props.data.asciidoc.document.title}</title>
      </Helmet>
      <Content
        dangerouslySetInnerHTML={{ __html: props.data.asciidoc.html }}
      />
    </Container>
  );
};

Article.propTypes = {
  data: PropTypes.object,
};

Article.defaultProps = {
  data: {},
};

export default Article;
