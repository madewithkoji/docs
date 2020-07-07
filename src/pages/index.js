import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../layouts"

const IndexPage = (props) => {
  const sections = props.data.allAsciidoc.edges
    .filter(({ node }) => node.pageAttributes.slug.match(/\//g).length === 1)
    .map(({ node }) => node.pageAttributes.slug);

  const menu = sections.map((section) => {
    return {
      slug: section,
      links: props.data.allAsciidoc.edges
        .filter(({ node }) => node.pageAttributes.slug.includes(section))
        .map(({ node }) => node.pageAttributes.slug),
    }
  });

  console.log('m', menu);

  return (
    <Layout>
      <ul>
        {props.data.allAsciidoc.edges.map(({ node }) => (
          <li key={node.id}>
            <Link to={node.pageAttributes.slug}>{node.document.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage

export const pageQuery = graphql`
  query {
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
`