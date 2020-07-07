import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { useStaticQuery, graphql } from "gatsby"
import NestedList from './NestedList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  paper: {
    marginTop: '48px',
  },
});

const DocsDrawer = () => {
  const data = useStaticQuery(graphql`
    query DocsItems {
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

  const navItem = navItems.find((i) => i.name === 'Docs');

  const classes = useStyles();

  return (
    <Drawer
      classes={{ paper: classes.paper }}
      open
      variant={'persistent'}
    >
      <div style={{ width: '240px' }}>
        {
          navItem.sections.map((section) => (
            <NestedList
              key={section.name}
              section={section}
            />
          ))
        }
      </div>
    </Drawer>
  );
};

export default DocsDrawer;
