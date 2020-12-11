import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { BLACK, BLUE, DARK_GRAY, LIGHT_GRAY } from '../constants/colors';

import Logo from './Logo';
import DiscordLogo from './DiscordLogo';
import GithubLogo from './GithubLogo';

const Container = styled.div`
  height: 76px;
  width: calc(100% - 60px);
  margin: 0 30px;
  border-bottom: 1px solid #f4f4f4;
  padding: 5px 0px 10px 0px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    height: 60px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  a {
    font-size: 16px;
    color: ${DARK_GRAY};
    margin-right: 16px;
    padding: 4px 8px;
    border-radius: 8px;
    text-decoration: none;
  }

  a:hover {
    background: ${LIGHT_GRAY};
    text-decoration: none;
  }
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

const Tooltip = styled.div`
  position: relative;
  top: -4px;
  font-size: 12px;
  font-weight: bold;
  background: ${BLUE};
  color: white;
  padding: 6px;
  border-radius: 6px;
  margin-left: 4px;


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
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const LogoLink = styled(StyledLink)`
  display: flex;
  align-items: center;
  margin: 8px 0 0 -8px;

  a:hover, &:hover {
    background: transparent !important;
  }
`;

const SectionLinks = styled.div`
  display: flex;
  align-items: center;
  margin-left: 32px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Spacer = styled.div`
  flex: 1 1 auto;
`;

const BackLink = styled.a`
  display: flex;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ExternalLink = styled.a`
  display: flex;
  padding: 0 !important;

  @media screen and (max-width: 768px) {
    display: none;
  }

  &:hover {
    background: transparent !important;
  }

  svg {
    width: 20px;
    height: 20px;
    fill: #a5a5a5;
    margin-top: 4px;
  }
`;

const AppBar = ({ navItems }) => (
  <Container>
    <Wrapper>
      <LogoLink to={'/'}>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Tooltip>
          {'for developers'}
        </Tooltip>
      </LogoLink>
      <SectionLinks>
        {
          navItems.sort((a, b) => a.idx - b.idx).map(({ id, name, defaultPath }) => (
            <StyledLink key={id} to={defaultPath}>{name}</StyledLink>
          ))
        }
      </SectionLinks>
      <Spacer />
      <ExternalLink
        href={'https://github.com/madewithkoji'}
        target={'_blank'}
        title={'Check out our Github'}
      >
        <GithubLogo />
      </ExternalLink>
      <ExternalLink
        href={'https://discord.com/invite/eQuMJF6'}
        target={'_blank'}
        title={'Join us on Discord'}
        style={{ marginRight: '12px' }}
      >
        <DiscordLogo />
      </ExternalLink>
      <BackLink href={'https://withkoji.com'} style={{ marginRight: 0 }}>
        {'Back to withkoji.com'}
      </BackLink>
    </Wrapper>
  </Container>
);

AppBar.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    defaultPath: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
  })),
};

AppBar.defaultProps = {
  navItems: [],
};

export default AppBar;
