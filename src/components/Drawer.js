import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import NestedList from './NestedList';

const StyledDrawer = styled(Drawer)`
  > div {
    margin-top: 64px;
    z-index: 0;
    width: 240px;
    max-height: calc(100vh - 64px);
  }
`;

const DrawerComponent = ({ location, navItem }) => (
  <StyledDrawer
    open
    variant={'persistent'}
  >
    <div>
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
  </StyledDrawer>
);

DrawerComponent.propTypes = {
  location: PropTypes.object,
  navItem: PropTypes.object,
};

DrawerComponent.defaultProps = {
  location: {},
  navItem: {},
};

export default DrawerComponent;
