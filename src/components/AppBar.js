import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { useTheme, withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Search from './Search';

const SearchWrapper = styled.div`
  flex: 1 1 auto;
  text-align: right;
`;

const StyledAppBar = withStyles({
  root: {
  },
})(AppBar);

const AppBarComponent = (props) => {
  const data = useStaticQuery(graphql`
    query NavItems {
      allNavItem {
        nodes {
          id
          defaultPath
          name
          sections {
            items {
              name
              path
            }
            name
          }
        }
      }
    }
  `);

  const { allNavItem: { nodes: navItems = [] } } = data;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

  if (isMobile) {
    return (
      <StyledAppBar position={'fixed'}>
        <Toolbar>
          <IconButton onClick={() => props.toggleMobileDrawer()}>
            <MenuIcon />
          </IconButton>
          <Link
            to={'/'}
          >
            <Button style={{ color: '#ffffff' }}>{'Koji for Developers'}</Button>
          </Link>
        </Toolbar>
      </StyledAppBar>
    );
  }

  return (
    <StyledAppBar position={'fixed'}>
      <Toolbar>
        <Link
          to={'/'}
        >
          <Button style={{ color: '#ffffff' }}>{'Koji for Developers'}</Button>
        </Link>
        {
          navItems.map(({ defaultPath, id, name }) => (
            <Link
              key={id}
              to={defaultPath}
            >
              <Button style={{ color: '#ffffff' }}>{name}</Button>
            </Link>
          ))
        }
        <SearchWrapper>
          <Search />
        </SearchWrapper>
      </Toolbar>
    </StyledAppBar>
  );
};

AppBarComponent.propTypes = {
  toggleMobileDrawer: PropTypes.func,
};

AppBarComponent.defaultProps = {
  toggleMobileDrawer() { },
};

export default AppBarComponent;
