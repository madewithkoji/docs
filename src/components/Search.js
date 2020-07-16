import * as JsSearch from 'js-search';
import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useStaticQuery, graphql } from "gatsby"

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
    <div style={{ position: 'relative' }}>
      <input onChange={(e) => setValue(e.currentTarget.value)} value={value} />
      <div style={{
        position: 'absolute',
        top: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        zIndex: 10000,
      }}>
        {
          matches.map((match) => (
            <div
              style={{
                background: '#ffffff',
                padding: '8px',
                lineHeight: '1.2',
                border: '1px solid black',
                margin: '1rem 0 0 0',
              }}
            >
              <Link to={match.pageAttributes.slug} onClick={() => setMatches([])}>
                <h2>{match.document.title}</h2>
                <p>
                  {
                    match.html.replace(/(<([^>]+)>)/ig,"").slice(0, 100)
                  }
                </p>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Search;

