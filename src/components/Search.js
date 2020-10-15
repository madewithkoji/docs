import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
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
  right:  ${({ style: { isMobile } }) => isMobile ? '0px' : '22px'};
  display: flex;
  flex-direction: column;
  z-index: 10000;
  width: 80vw;
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
  flex-direction: ${({ style: { isMobile } }) => isMobile ? 'column' : 'row'};

  p {
    margin-bottom: 0;
    font-size: 14px;
  }
`;

const SearchInput = styled.input`
  height: 32px;
  padding-right: 40px;
  border-radius: 4px;
  padding-left: 8px;
`;

const Wrapper = styled.div`
  position: relative;
  height: 32px;
`;

const ItemSection = styled.div`
  min-width: 120px;
  width: 120px;
  text-align: ${({ style: { isMobile } }) => isMobile ? 'left' : 'right'};
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

const Search = ({ isMobile }) => {
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
        autoFocus={isMobile}
        onChange={(e) => setValue(e.currentTarget.value)}
        ref={inputRef}
        style={{ isMobile }}
        value={value}
      />
      {
        (!value || value === '' || isMobile) &&
        <SearchIcon
          style={{
            color: '#333333',
            position: 'relative',
            right: '32px',
            top: '8px',
          }}
        />
      }
      {
        (value && value !== '' && !isMobile) &&
        <CloseIcon
          onClick={handleClearClick}
          style={{
            color: '#333333',
            position: 'relative',
            right: '32px',
            top: '8px',
            cursor: 'pointer',
          }}
        />
      }
      {
        groups && groups.length > 0 &&
        <GroupsWrapper style={{ isMobile }}>
          {
            groups.map((group) => (
              <Group>
                <GroupHeader>{group.name}</GroupHeader>
                <Divider />
                {
                  group.items.map((item) => (
                    <Item style={{ isMobile }}>
                      <ItemSection style={{ isMobile }}>{item.breadcrumb[1].name}</ItemSection>
                      <Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />
                      <Link to={item.link} onClick={() => setGroups([])}>
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
        </GroupsWrapper>
      }
    </Wrapper>
  );
};

Search.propTypes = {
  isMobile: PropTypes.bool,
};

Search.defaultProps = {
  isMobile: false,
};

export default Search;
