import React, { useEffect, useState } from 'react';
import * as JsSearch from 'js-search';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useStaticQuery, graphql } from "gatsby"

const Wrapper = styled.div`
  position: relative;
`;

const MatchesWrapper = styled.div`
  position: absolute;
  top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 10000;
`;

const MatchWrapper = styled.div`
  background: #ffffff;
  padding: 8px;
  line-height: 1.2;
  border: 1px solid black;
  margin: 1rem 0 0 0 ;
`;

const Search = () => {
  const [value, setValue] = useState('');
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState(null);

  const data = useStaticQuery(graphql`
    query AsciiDocs {
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
  `);

  useEffect(() => {
    const s = new JsSearch.Search('id');
    s.addIndex('html');
    s.addIndex(['document', 'title']);

    const docs = data.allAsciidoc.edges.map(({ node }) => node);

    s.addDocuments(docs);

    setSearch(s)
  }, [data]);

  useEffect(() => {
    if (search && value && value !== '') {
      setMatches(search.search(value));
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
            <MatchWrapper>
              <Link to={match.pageAttributes.slug} onClick={() => setMatches([])}>
                <h2>{match.document.title}</h2>
                <p>
                  {
                    match.html.replace(/(<([^>]+)>)/ig,"").slice(0, 100)
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

