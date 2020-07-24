import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import NestedList from './NestedList';

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
          navItem.sections.sort((a, b) => a.idx - b.idx).map((section) => (
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

DrawerComponent.propTypes = {
  location: PropTypes.object,
  navItem: PropTypes.object,
};

DrawerComponent.defaultProps = {
  location: {},
  navItem: {},
};

export default DrawerComponent;
