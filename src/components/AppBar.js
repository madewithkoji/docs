import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useStaticQuery, graphql } from "gatsby"

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
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        {
          navItems.map(({ defaultPath, id, name}) => (
            <Link
              key={id}
              to={defaultPath}
            >
              <Button style={{ color: '#ffffff' }}>{name}</Button>
            </Link>
          ))
        }
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
