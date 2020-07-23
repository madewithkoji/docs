import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import NestedList from './NestedList';

const useStyles = makeStyles({
  paper: {
    marginTop: 0,
    zIndex: 0,
  },
});

const MobileDrawer = (props) => {
  const classes = useStyles();

  return (
    <Drawer
      classes={{ paper: classes.paper }}
      open={props.open}
    >
      <div style={{ width: '240px', paddingLeft: '16px' }}>
        {
          props.navItems.map((navItem) => (
            <List
              component={'nav'}
              aria-labelledby={'nested-list-subheader'}
              className={classes.root}
            >
              <ListItemText primary={navItem.name} />
              <>
                {
                  navItem.sections.map((section) => (
                    <NestedList
                      key={section.name}
                      openByDefault={props.location.pathname.includes(section.root)}
                      pathname={props.location.pathname}
                      section={section}
                    />
                  ))
                }
              </>
            </List>
          ))
        }
      </div>
    </Drawer>
  );
};

MobileDrawer.propTypes = {
  location: PropTypes.object,
  navItems: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};

MobileDrawer.defaultProps = {
  location: {},
  navItems: [],
  open: false,
};

export default MobileDrawer;
