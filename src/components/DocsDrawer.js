import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { useStaticQuery, graphql } from "gatsby"
import NestedList from './NestedList';

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

  return (
    <Drawer
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
