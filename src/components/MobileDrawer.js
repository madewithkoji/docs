import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { navigate } from '@reach/router';

import NestedList from './NestedList';

const Wrapper = styled.div`
  width: 272px;
  padding-left: 16px;
`;

const StyledListItemText = styled(ListItemText)`
  cursor: pointer;
`;

const MobileDrawer = (props) => (
  <Drawer className={'mobile'} open={props.open}>
    <Wrapper>
      {
        props.navItems.sort((a, b) => a.idx - b.idx).map((navItem) => (
          <List
            component={'nav'}
            aria-labelledby={'nested-list-subheader'}
            key={navItem.name}
          >
            <StyledListItemText
              onClick={() => navigate(navItem.defaultPath)}
              primary={navItem.name}
            />
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
    </Wrapper>
  </Drawer>
);

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
