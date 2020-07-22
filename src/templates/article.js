import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js';
import styled from 'styled-components';
import 'highlight.js/styles/github.css';
import { graphql } from 'gatsby';
import Container from '@material-ui/core/Container';
import '../styles/adoc-rocket-panda.css';

const StyledContainer = styled(Container)`
  display: flex;
`;

const Nav = styled.div`
  position: fixed;
  top: 72px;
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
  width: calc(100% - 240px);

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
  }
`;

const Article = (props) => {
  const [isReady, setIsReady] = useState(false);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
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

    setSections(mappedSections);
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <StyledContainer maxWidth="lg">
      <Content
        dangerouslySetInnerHTML={{ __html: props.data.asciidoc.html }}
      />
      <Nav>
        {
          sections.map(({ href, text }) => (
            <a href={`#${href}`}>{text}</a>
          ))
        }
      </Nav>
    </StyledContainer>
  );
};

Article.propTypes = {
  data: PropTypes.object,
};

Article.defaultProps = {
  data: {},
};

export default Article;
