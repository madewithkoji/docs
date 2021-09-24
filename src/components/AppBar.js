import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

import SearchIcon from '@material-ui/icons/Search';

import { BLACK } from '../constants/colors';

import Logo from './Logo';
import DiscordLogo from './DiscordLogo';
import GithubLogo from './GithubLogo';

const Container = styled.div`
  height: 64px;
  width: 100%;
  margin: 0;
  border-bottom: 1px solid #f4f4f4;
  padding: 0 24px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    height: 60px;
    border-bottom: none;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

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

const StyledLink = styled(Link)`
  color: #111;
  padding: 8px 12px;
  border-radius: 4px;

  text-decoration: none;
  margin-right: 1px;
  &:hover {
    text-decoration: none;
    background: rgba(0,0,0,0.06);
  }

  ${({ isActive }) => isActive && `
    background: rgba(0,0,0,0.06);
    font-weight: 500;
  `}
`;

const BackToKojiLink = styled(StyledLink)`
  background: #007aff;
  color: white;
  font-weight: 500;
  margin-right: 0;
  margin-left: 12px;

  font-size: 11px;
  padding: 10px 12px;
  text-transform: uppercase;

  &:hover {
    background: #007aff;
    color: white;
    opacity: 0.8;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const LogoLink = styled(StyledLink)`
  display: flex;
  align-items: center;
  margin: 4px 0 0 -8px;

  a:hover, &:hover {
    background: transparent !important;
  }
`;

const SectionLinks = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Spacer = styled.div`
  flex: 1 1 auto;
`;

const ExternalLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;
  margin: 0;

  @media screen and (max-width: 768px) {
    display: none;
  }

  &:hover {
    background: transparent !important;
  }

  svg {
    fill: #a5a5a5;
  }
`;

const GithubLink = styled(ExternalLink)`
  margin-right: 10px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const DiscordLink = styled(ExternalLink)`
  margin-right: 0;
  svg {
    width: 22px;
    height: 22px;
    margin-top: 2px;
  }
`;

const SearchButton = styled.div`
  cursor: pointer;
  margin-right: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 23px;
    height: 23px;
    fill: #a5a5a5;
  }
`;

const AppBar = ({ navItems, onStartSearch, currentArea }) => (
  <Container>
    <Wrapper>
      <LogoLink to={'/'}>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
      </LogoLink>
      <SectionLinks>
        {navItems.sort((a, b) => a.idx - b.idx).map(({ id, name, defaultPath }) => (
          <StyledLink
            key={id}
            to={defaultPath}
            isActive={name === currentArea}
          >
            {name}
          </StyledLink>
        ))}
      </SectionLinks>

      <Spacer />

      <SearchButton onClick={() => onStartSearch()}>
        <SearchIcon />
      </SearchButton>

      <GithubLink
        href={'https://github.com/madewithkoji'}
        target={'_blank'}
        title={'Check out our Github'}
      >
        <GithubLogo />
      </GithubLink>

      <DiscordLink
        href={'https://discord.com/invite/9egkTWf4ec'}
        target={'_blank'}
        title={'Join us on Discord'}
        style={{ marginRight: '12px' }}
      >
        <DiscordLogo />
      </DiscordLink>

      <BackToKojiLink href={'https://withkoji.com'} style={{ marginRight: 0 }}>
        {'Back to withkoji.com'}
      </BackToKojiLink>
    </Wrapper>
  </Container>
);

AppBar.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    defaultPath: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
  })),
  currentArea: PropTypes.string,
  onStartSearch: PropTypes.func,
};

AppBar.defaultProps = {
  navItems: [],
  currentArea: 'Developer Docs',
  onStartSearch: () => {},
};

export default AppBar;
