import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { useStaticQuery, graphql } from 'gatsby';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from './Link';
import Search from './Search';

const Logo = styled.img`
  height: 36px;
  margin-top: 8px;
`;

const NavLinkWrapper = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 16px;
`;

const Active = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: #333333;
`;

const SearchWrapper = styled.div`
  flex: 1 1 auto;
  text-align: right;
`;

const StyledAppBar = styled(AppBar)`
  background: #ffffff;
`;

const NavLink = styled(Link)`
  font-size: 18px;
  color: #333333;

  &:active, &:focus {
    color: #000000;
    text-decoration: none;
  }

  &:hover {
    color: #000000;
  }
`;

const AppBarComponent = (props) => {
  const data = useStaticQuery(graphql`
    query NavItems {
      allNavItem {
        nodes {
          id
          defaultPath
          name
          root
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
            <Logo
              alt={'Koji for Developers'}
              src={'/images/dev-logo.png'}
            />
          </Link>
        </Toolbar>
      </StyledAppBar>
    );
  }

  return (
    <StyledAppBar position={'fixed'}>
      <Toolbar>
        <NavLinkWrapper>
          <NavLink
            to={'/'}
          >
            <Logo
              alt={'Koji for Developers'}
              src={'/images/dev-logo.png'}
            />
          </NavLink>
          {props.location.pathname === '/' && <Active />}
        </NavLinkWrapper>
        {
          navItems.map(({ defaultPath, id, name, root }) => (
            <NavLinkWrapper key={id}>
              <NavLink to={defaultPath}>
                {name}
              </NavLink>
              {props.location.pathname.includes(root) && <Active />}
            </NavLinkWrapper>
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
  location: PropTypes.object,
  toggleMobileDrawer: PropTypes.func,
};

AppBarComponent.defaultProps = {
  location: {},
  toggleMobileDrawer() { },
};

export default AppBarComponent;
