import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Drawer from './Drawer';
import MobileDrawer from './MobileDrawer';

const Wrapper = styled.span`
  .mobile {
    display: none;
  }

  .desktop {
    display: block;
  }

  @media screen and (max-width: 1023px) {
    .mobile {
      display: block;
    }

    .desktop {
      display: none;
    }
  }
`;

const Drawers = (props) => (
  <Wrapper>
    <MobileDrawer
      location={props.location}
      navItems={props.navItems}
      open={props.mobileDrawerIsOpen}
    />
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
  </Wrapper>
);

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
