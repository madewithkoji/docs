import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import NestedList from './NestedList';

const StyledTab = styled(Tab)`
  min-width: unset !important;
`;

const StyledDrawer = styled(Drawer)`
  > * {
    border-right: none;
  }

  > div {
    margin-top: 64px;
    z-index: 0;
    width: 240px;
    height: calc(100vh - 64px);
    overflow: hidden;
  }
`;

const NavItemsWrapper = styled.div`
  height: calc(100vh - 64px - 48px);
  overflow: auto;

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  ::-webkit-scrollbar {
    display: none;
  }
`;

const DrawerComponent = ({ location, navItems }) => {
  const [activeTab, setActiveTab] = useState(0);

  const sortedNavItems = navItems.sort((a, b) => a.idx - b.idx);

  useEffect(() => {
    // Handle navigating back to the root
    if (location.pathname === '/') setActiveTab(0);

    sortedNavItems.forEach((navItem, idx) => {
      if (location.pathname.includes(navItem.name.toLowerCase())) {
        setActiveTab(idx);
      }
    });
  }, [location.pathname]);

  return (
    <StyledDrawer
      className={'desktop'}
      open
      variant={'persistent'}
    >
      <div>
        <Tabs
          value={activeTab}
          onChange={(e, t) => setActiveTab(t)}
          aria-label={'Tabbed navigation'}
          variant={'fullWidth'}
        >
          {
            sortedNavItems.map((navItem) => (
              <StyledTab key={navItem.name} label={navItem.name} />
            ))
          }
        </Tabs>
        {
          sortedNavItems.map((navItem, idx) => idx === activeTab ? (
            <NavItemsWrapper key={navItem.name}>
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
            </NavItemsWrapper>
          ) : null)
        }
      </div>
    </StyledDrawer>
  );
};

DrawerComponent.propTypes = {
  location: PropTypes.object,
  navItems: PropTypes.arrayOf(PropTypes.object),
};

DrawerComponent.defaultProps = {
  location: {},
  navItems: [],
};

export default DrawerComponent;
