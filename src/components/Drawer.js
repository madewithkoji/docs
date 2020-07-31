import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Link from './Link';
import NestedList from './NestedList';

const StyledDrawer = styled(Drawer)`
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
`;

const KojiHomeWrapper = styled.div`
  position: absolute;
  bottom: 0;
  height: 48px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const DrawerComponent = ({ location, navItem }) => (
  <StyledDrawer
    open
    variant={'persistent'}
  >
    <div>
      <NavItemsWrapper>
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
      <KojiHomeWrapper>
        <a 
          href={'https://withkoji.com'}
          rel={'noopener noreferrer'}
          target={'_blank'}
        >
          {'Koji Homepage'}
        </a>
      </KojiHomeWrapper>
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
