import React, { useEffect, useState, Fragment } from 'react';
import * as JsSearch from 'js-search';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { resolveBreadcrumbFromSlug } from '../utils/resolveBreadcrumbFromSlug';

const Wrapper = styled.div`
  position: relative;
`;

const MatchesWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 0px;
  display: flex;
  flex-direction: column;
  z-index: 10000;
  max-width: 480px;
`;

const MatchWrapper = styled.div`
  background: #ffffff;
  padding: 8px;
  line-height: 1.2;
  border: 1px solid black;
  margin: 1rem 0 0 0 ;

  span {
    color: blue;
  }

  p {
    margin: 0;
    text-align: left;
  }

  h2 {
    margin: 0.5rem 0;
  }

  > a {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #000000;
    text-decoration: none;
  }
`;

const Search = () => {
  const [value, setValue] = useState('');
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState(null);

  const data = useStaticQuery(graphql`
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
      allNavItem {
        nodes {
          id
          defaultPath
          name
          sections {
            items {
              name
              path
            }
            name
            root
          }
          root
        }
      }
    }
  `);

  useEffect(() => {
    const s = new JsSearch.Search('id');
    s.addIndex('html');
    s.addIndex(['document', 'title']);

    const docs = data.allAsciidoc.edges.map(({ node }) => node);

    s.addDocuments(docs);

    setSearch(s);
  }, [data]);

  useEffect(() => {
    if (search && value && value !== '' && value.length > 2) {
      const searchMatches = search.search(value);

      const mappedMatches = searchMatches.map((searchMatch) => {
        const { pageAttributes: { slug } } = searchMatch;

        const breadcrumb = resolveBreadcrumbFromSlug(slug);

        // If pages aren't correctly added to the navigation,
        // we could have bad matches
        if (!breadcrumb) return null;

        return ({
          ...searchMatch,
          breadcrumb,
          link: breadcrumb[breadcrumb.length - 1].path,
        });
      }).filter((match) => match);

      setMatches(mappedMatches);
    } else {
      setMatches([]);
    }
  }, [search, value]);

  return (
    <Wrapper>
      <input onChange={(e) => setValue(e.currentTarget.value)} value={value} />
      <MatchesWrapper>
        {
          matches.map((match) => (
            <MatchWrapper key={JSON.stringify(match)}>
              <p>
                {
                  match.breadcrumb.map(({ name, path }, idx) => (
                    <Fragment key={path}>
                      <Link to={path}>{name}</Link>
                      {
                        idx + 1 !== match.breadcrumb.length &&
                        <span>{' > '}</span>
                      }
                    </Fragment>
                  ))
                }
              </p>
              <Link to={match.link} onClick={() => setMatches([])}>
                <h2>{match.document.title}</h2>
                <p>
                  {
                    match.html.replace(/(<([^>]+)>)/ig, '').slice(0, 140)
                  }
                </p>
              </Link>
            </MatchWrapper>
          ))
        }
      </MatchesWrapper>
    </Wrapper>
  );
};

export default Search;
