import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

import NestedList from './NestedList';

const StyledDrawer = styled(Drawer)`
  > div {
    margin-top: 64px;
    z-index: 0;
    width: 272px;
    height: calc(100vh - 64px);
    overflow: hidden;
  }
`;

const NavItemsWrapper = styled.div`
  height: calc(100vh - 64px);
  overflow: auto;
  padding-top: 24px;
  margin-left: 16px;
`;

const DrawerComponent = (props) => (
  <StyledDrawer
    className={'desktop'}
    open
    variant={'persistent'}
  >
    <NavItemsWrapper>
      {
        props.navItems.sort((a, b) => a.idx - b.idx).map((navItem) => (
          <List
            component={'nav'}
            aria-labelledby={'nested-list-subheader'}
            key={navItem.name}
          >
            <ListItemText primary={navItem.name} />
            <>
              {
                navItem.sections.sort((a, b) => a.idx - b.idx).map((section) => (
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
    </NavItemsWrapper>
  </StyledDrawer>
);

DrawerComponent.propTypes = {
  location: PropTypes.object,
  navItems: PropTypes.arrayOf(PropTypes.object),
};

DrawerComponent.defaultProps = {
  location: {},
  navItems: [],
};

export default DrawerComponent;
