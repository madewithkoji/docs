import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useStaticQuery, graphql } from 'gatsby';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Link from './Link';
import Search from './Search';

const Logo = styled.img`
  height: ${({ style: { isMobile } }) => isMobile ? '50px' : '64px'};
  margin-top: ${({ style: { isMobile } }) => isMobile ? '4px' : '8px'};
`;

const NavLinkWrapper = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  position: relative;
  margin-right: ${({ style: { logo } }) => logo ? '32px' : '16px'};
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

const StyledCloseIcon = styled(CloseIcon)`
  fill: #333333;
`;

const StyledSearchIcon = styled(SearchIcon)`
  fill: #333333;
`;

const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1 0 auto;
`;

const MobileSearchWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  input {
    width: calc(100vw - 80px) !important;
  }
`;

const StyledAppBar = styled(AppBar)`
  background-color: #ffffff !important;

  .mobile {
    display: none;
  }

  .desktop {
    display: inline-flex;
  }

  @media screen and (max-width: 1023px) {
    .mobile {
      display: inline-flex;
    }

    .desktop {
      display: none;
    }
  }
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
          idx
          name
          root
          sections {
            idx
            items {
              idx
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

  const [mobileSearchIsVisible, setMobileSearchIsVisible] = useState(false);

  return (
    <StyledAppBar position={'fixed'}>
      <Toolbar className={'mobile'}>
        {
          mobileSearchIsVisible &&
          <MobileSearchWrapper>
            <Search isMobile />
            <StyledCloseIcon onClick={() => setMobileSearchIsVisible(false)} />
          </MobileSearchWrapper>
        }
        {
          !mobileSearchIsVisible &&
          <>
            <IconButton onClick={() => props.toggleMobileDrawer()}>
              <MenuIcon />
            </IconButton>
            <Link
              to={'/'}
            >
              <Logo
                alt={'Koji for Developers'}
                src={'/images/dev-logo.png'}
                style={{ isMobile: true }}
              />
            </Link>
            <SearchIconWrapper>
              <StyledSearchIcon onClick={() => setMobileSearchIsVisible(true)} />
            </SearchIconWrapper>
          </>
        }
      </Toolbar>

      <Toolbar className={'desktop'}>
        <NavLinkWrapper style={{ logo: true }}>
          <NavLink
            to={'/'}
          >
            <Logo
              alt={'Koji for Developers'}
              src={'/images/dev-logo.png'}
              style={{ isMobile: false }}
            />
          </NavLink>
        </NavLinkWrapper>
        {
          navItems.sort((a, b) => a.idx - b.idx).map(({ defaultPath, id, name, root }) => (
            <NavLinkWrapper key={id} style={{}}>
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
