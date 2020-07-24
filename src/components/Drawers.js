import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Drawer from './Drawer';
import MobileDrawer from './MobileDrawer';

const Drawers = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

  if (isMobile) {
    return (
      <MobileDrawer
        location={props.location}
        navItems={props.navItems}
        open={props.mobileDrawerIsOpen}
      />
    );
  }

  return (
    <>
      {
        props.navItems.sort((a, b) => a.idx - b.idx).map((navItem) => {
          if (props.location.pathname.includes(navItem.root)) {
            return (
              <Drawer
                key={navItem.root}
                location={props.location}
                navItem={navItem}
              />
            );
          }
          return null;
        })
      }
    </>
  );
};

Drawers.propTypes = {
  location: PropTypes.object,
  mobileDrawerIsOpen: PropTypes.bool,
  navItems: PropTypes.arrayOf(PropTypes.object),
};

Drawers.defaultProps = {
  location: {},
  mobileDrawerIsOpen: false,
  navItems: [],
};

export default Drawers;
