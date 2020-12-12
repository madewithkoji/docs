import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as JsSearch from 'js-search';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';

import { BLUE } from '../constants/colors';

import Link from './Link';
import { resolveBreadcrumbFromSlug } from '../utils/resolveBreadcrumbFromSlug';

const GroupsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #ffffff;
  overflow: auto;
  color: #111111;
  padding: 16px;
  text-align: left;
  flex: 1 0 auto;
  height: calc(100% - 80px);

  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: #babac0;
    }
  }

  /* total width */
  ::-webkit-scrollbar {
      background-color: #fff;
      width: 16px;
  }

  /* background of the scrollbar except button or resizer */
  ::-webkit-scrollbar-track {
      background-color: #fff;
  }

  /* scrollbar itself */
  ::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 16px;
      border: 4px solid #fff;
  }

  /* set button(top and bottom of the scrollbar) */
  ::-webkit-scrollbar-button {
      display:none;
  }
`;

const Group = styled.div`
`;

const GroupHeader = styled.div`
  font-size: 18px;
`;

const Item = styled.div`
  display: flex;
  padding: 8px 0;
  flex-direction: row;

  p {
    margin-bottom: 0;
    font-size: 14px;
  }
`;

const SearchInput = styled.input`
  height: 48px;
  padding-right: 40px;
  border-radius: 4px;
  padding-left: 8px;
  width: calc(100% - 32px);
  margin: 16px auto;
  flex: 1 0 auto;
  max-height: 48px;
  border-color: ${BLUE};
  outline-color: ${BLUE};
  font-size: 18px;
`;

const Wrapper = styled.div`
  z-index: 200;
  width: calc(100vw - 60px);
  max-width: 720px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: calc(100vh - 60px);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1), 0 10px 30px rgba(0,0,0,0.05);
`;

const ItemSection = styled.div`
  min-width: 120px;
  width: 120px;
  text-align: right;
  padding-right: 8px;
`;

const ItemContent = styled.div`
  width: 100%;
  padding-left: 8px;
  background: #ffffff;

  &:hover {
    background: #f1f1f1;
  }
`;

const ItemTitle = styled.div`
  font-weight: bold;
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Search = ({ isSearching }) => {
  const [value, setValue] = useState('');
  const [groups, setGroups] = useState([]);
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

        const el = document.createElement('html');
        el.innerHTML = searchMatch.html;

        const h1s = el.querySelectorAll('h1');
        h1s.forEach((h1) => h1.remove());

        const newHTML = el.innerHTML;

        el.remove();

        return ({
          ...searchMatch,
          breadcrumb,
          link: breadcrumb[breadcrumb.length - 1].path,
          html: newHTML,
        });
      }).filter((match) => match);

      const newGroups = [];

      mappedMatches.forEach((match) => {
        const groupIndex = newGroups.findIndex(({ path }) => path === match.breadcrumb[0].path);
        if (groupIndex === -1) {
          newGroups.push({ ...match.breadcrumb[0], items: [match] });
        } else {
          newGroups[groupIndex] = {
            ...newGroups[groupIndex],
            items: [
              ...newGroups[groupIndex].items,
              match,
            ],
          };
        }
      });

      setGroups(newGroups);
    } else {
      setGroups([]);
    }
  }, [search, value]);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearching && inputRef.current) inputRef.current.focus();
  }, [isSearching]);

  return (
    <Wrapper className={'search-wrapper'}>
      <SearchInput
        onChange={(e) => setValue(e.currentTarget.value)}
        ref={inputRef}
        value={value}
      />
      <GroupsWrapper>
        {
          groups.map((group) => (
            <Group>
              <GroupHeader>{group.name}</GroupHeader>
              <Divider />
              {
                group.items.map((item) => (
                  <Item>
                    <ItemSection>{item.breadcrumb[1].name}</ItemSection>
                    <Divider orientation={'vertical'} flexItem />
                    <Link to={item.link}>
                      <ItemContent>
                        <ItemTitle>{item.document.title}</ItemTitle>
                        <p>
                          {
                            `${item.html.replace(/(<([^>]+)>)/ig, '').slice(0, 140)}...`
                          }
                        </p>
                      </ItemContent>
                    </Link>
                  </Item>
                ))
              }
            </Group>
          ))
        }
        {
          (!groups || groups.length === 0) &&
          <Empty>
            <SearchIcon />
            {'Start typing to search...'}
          </Empty>
        }
      </GroupsWrapper>
    </Wrapper>
  );
};

Search.propTypes = {
  isSearching: PropTypes.bool,
};

Search.defaultProps = {
  isSearching: false,
};

export default Search;
