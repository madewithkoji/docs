import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { useStaticQuery, graphql } from "gatsby"
import NestedList from './NestedList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  paper: {
    marginTop: '64px',
    zIndex: 0,
  },
});

const DrawerComponent = ({ location, navItem }) => {
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
              openByDefault={location.pathname.includes(section.root)}
              pathname={location.pathname}
              section={section}
            />
          ))
        }
      </div>
    </Drawer>
  );
};

export default DrawerComponent;
