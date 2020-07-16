import React, { useEffect } from "react"
import hljs from "highlight.js"
import styled from 'styled-components';
import "highlight.js/styles/github.css"
import Container from '@material-ui/core/Container';

const Content = styled.div`
  img {
    max-width: 100%;
  }
`;

const Article = (props) => {
  useEffect(() => {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block)
    })
  });

  return (
    <Container maxWidth="sm">
      <Content
        dangerouslySetInnerHTML={{ __html: props.data.asciidoc.html }}
      />
    </Container>
  );
};

export default Article

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
