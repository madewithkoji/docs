import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MobileDrawer from './MobileDrawer';
import TabbedDrawer from './TabbedDrawer';

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
    <TabbedDrawer
      location={props.location}
      navItems={props.navItems}
    />
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
