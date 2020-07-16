import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Search from './Search';
import { Link, useStaticQuery, graphql } from "gatsby"

const SearchWrapper = styled.div`
  flex: 1 1 auto;
  text-align: right;
`;

const AppBarComponent = () => {
  const data = useStaticQuery(graphql`
    query NavItems {
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
          }
        }
      }
    }
  `);

  const { allNavItem: { nodes: navItems = [] } } = data;

  return (
    <AppBar position={'fixed'}>
      <Toolbar>
        <Link
          to={'/'}
        >
          <Button style={{ color: '#ffffff' }}>{'Koji for Developers'}</Button>
        </Link>
        {
          navItems.map(({ defaultPath, id, name }) => (
            <Link
              key={id}
              to={defaultPath}
            >
              <Button style={{ color: '#ffffff' }}>{name}</Button>
            </Link>
          ))
        }
        <SearchWrapper>
          <Search />
          </SearchWrapper>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
