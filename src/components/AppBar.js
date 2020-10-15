import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import { BLACK, BLUE } from '../constants/colors';

import Link from './Link';
import Logo from './Logo';
import Search from './Search';

const LogoWrapper = styled.div`
  g {
    fill: ${BLACK};
  }

  svg {
    height: 32px;
    width: auto;
    margin-right: 8px;
  }
`;

const NavLinkWrapper = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  position: relative;
  margin-right: ${({ style: { logo } }) => logo ? '8px' : '0'};
`;

const SearchWrapper = styled.div`
  flex: 1 1 auto;
  text-align: right;
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
  box-shadow: none;

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

const NavLink = styled.a`
  font-size: 18px;
  color: #333333;

  &:active, &:focus {
    color: ${BLACK}
    text-decoration: none;
  }

  &:hover {
    color: ${BLACK}
  }
`;

const Tooltip = styled.div`
  position: relative;
  top: -4px;
  font-size: 12px;
  font-weight: bold;
  background: ${BLUE};
  color: white;
  padding: 6px;
  border-radius: 6px;


  &::after {
    content: '';
    position: absolute;
    top: 9px;
    left: -12px;
    width: 0px;
    height: 0px;
    border: 6px solid #007aff;
    border-color: transparent ${BLUE} transparent transparent;
    z-index: -1;
  }
}
`;

const AppBarComponent = (props) => {
  const [mobileSearchIsVisible, setMobileSearchIsVisible] = useState(false);

  return (
    <StyledAppBar position={'fixed'}>
      <Toolbar className={'mobile'}>
        {
          mobileSearchIsVisible &&
          <MobileSearchWrapper>
            <Search isMobile />
            <CloseIcon
              onClick={() => setMobileSearchIsVisible(false)}
              style={{
                color: '#333333',
                cursor: 'pointer',
              }}
            />
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
                alt={'Koji for developers'}
                src={'/images/dev-logo.png'}
                style={{ isMobile: true }}
              />
            </Link>
            <SearchIconWrapper>
              <SearchIcon
                onClick={() => setMobileSearchIsVisible(true)}
                style={{
                  color: '#333333',
                  cursor: 'pointer',
                }}
              />
            </SearchIconWrapper>
          </>
        }
      </Toolbar>

      <Toolbar className={'desktop'}>
        <NavLinkWrapper style={{ logo: true }}>
          <NavLink
            href={'https://withkoji.com'}
          >
            <LogoWrapper>
              <Logo />
            </LogoWrapper>
          </NavLink>
        </NavLinkWrapper>
        <NavLinkWrapper style={{ logo: false }}>
          <Link
            to={'/'}
          >
            <Tooltip>
              {'for developers'}
            </Tooltip>
          </Link>
        </NavLinkWrapper>
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
