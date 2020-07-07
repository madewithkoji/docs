import React, { useEffect } from "react"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"
import Container from '@material-ui/core/Container';
import Page from '../components/Page';

const Article = (props) => {
  useEffect(() => {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block)
    })
  });

  return (
    <Page drawer={'docs'}>
      <Container maxWidth="sm">
        <div
          dangerouslySetInnerHTML={{ __html: props.data.asciidoc.html }}
        />
      </Container>
    </Page>
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
