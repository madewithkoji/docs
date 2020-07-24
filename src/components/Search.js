import React, { useEffect, useRef, useState } from 'react';
import * as JsSearch from 'js-search';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import Link from './Link';
import { resolveBreadcrumbFromSlug } from '../utils/resolveBreadcrumbFromSlug';

const GroupsWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 22px;
  display: flex;
  flex-direction: column;
  z-index: 10000;
  width: 100%;
  max-width: 480px;
  max-height: 80vh;
  background: #ffffff;
  overflow: auto;
  color: #333333;
  padding: 16px;
  border-radius: 4px;
  text-align: left;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`;

const Group = styled.div`
`;

const GroupHeader = styled.div`
  font-size: 18px;
`;

const Item = styled.div`
  display: flex;
  padding: 8px 0;

  p {
    margin-bottom: 0;
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  fill: #333333;
  position: relative;
  right: 32px;
  top: 6px;
`;

const StyledCloseIcon = styled(CloseIcon)`
  fill: #333333;
  position: relative;
  right: 32px;
  top: 6px;
`;

const SearchInput = styled.input`
  height: 32px;
  padding-right: 40px;
`;

const Wrapper = styled.div`
  position: relative;
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

const Search = () => {
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
  const handleClearClick = () => {
    setValue('');
    setGroups([]);

    if (inputRef && inputRef.current) inputRef.current.focus();
  };

  return (
    <Wrapper>
      <SearchInput
        onChange={(e) => setValue(e.currentTarget.value)}
        ref={inputRef}
        value={value}
      />
      {(!value || value === '') && <StyledSearchIcon />}
      {(value && value !== '') && <StyledCloseIcon onClick={handleClearClick} />}
      {
        groups && groups.length > 0 &&
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
                      <Link to={item.link} onClick={() => setGroups([])}>
                        <ItemContent>
                          <div>{item.document.title}</div>
                          <p>
                            {
                              item.html.replace(/(<([^>]+)>)/ig, '').slice(0, 140)
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
        </GroupsWrapper>
      }
    </Wrapper>
  );
};

export default Search;
