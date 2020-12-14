import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { BLACK, DARK_GRAY, LIGHT_GRAY } from '../constants/colors';

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

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
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

const BackLink = styled.a`
  display: flex;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ExternalLink = styled.a`
  display: flex;
  padding: 0 !important;
  margin-right: 10px!important;

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
  }
`;

const DiscordLink = styled(ExternalLink)`
  margin-right: 4px!important;
  svg {
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
      <DiscordLink
        href={'https://discord.com/invite/eQuMJF6'}
        target={'_blank'}
        title={'Join us on Discord'}
        style={{ marginRight: '12px' }}
      >
        <DiscordLogo />
      </DiscordLink>
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
