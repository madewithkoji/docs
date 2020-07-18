import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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
  }
`;

const Article = (props) => {
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  });

  return (
    <Container maxWidth="lg">
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
