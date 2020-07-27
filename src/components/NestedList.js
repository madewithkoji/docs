import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Link from './Link';

const StyledListItem = styled(ListItem)`
  padding-bottom: 4px;
  padding-top: 4px;
`;

const NestedList = ({ pathname, section, openByDefault }) => {
  const [open, setOpen] = React.useState(openByDefault);

  useEffect(() => {
    if (section.items.find((item) => item.path === pathname) && !open) setOpen(true);
  }, [pathname]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component={'nav'}
      aria-labelledby={'nested-list-subheader'}
    >
      <StyledListItem button onClick={handleClick}>
        <ListItemText primary={section.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </StyledListItem>
      <Collapse in={open} timeout="auto">
        <List
          className={'test'}
          component={'div'}
          disablePadding
        >
          {
            section.items.sort((a, b) => a.idx - b.idx).map((item) => (
              <Link
                key={item.path}
                to={item.path}
              >
                <StyledListItem
                  button
                  selected={pathname === item.path}
                >
                  <ListItemText secondary={item.name} />
                </StyledListItem>
              </Link>
            ))
          }

        </List>
      </Collapse>
    </List>
  );
};

NestedList.propTypes = {
  openByDefault: PropTypes.bool,
  pathname: PropTypes.string,
  section: PropTypes.object,
};

NestedList.defaultProps = {
  openByDefault: false,
  pathname: '',
  section: {},
};

export default NestedList;
