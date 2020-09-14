/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 32px auto 96px auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    text-align: center;
  }
`;

const ActionsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Action = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: initial;
  width: 33.3%;

  @media screen and (max-width: 767px) {
    width: 80%;
    margin-bottom: 48px;
  }
`;

const ExternalAction = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: initial;
  width: 33.3%;

  @media screen and (max-width: 767px) {
    width: 80%;
    margin-bottom: 48px;
  }
`;

const Image = styled.img`
  height: 64px;
  width: auto;
  margin-bottom: 16px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-decoration: underline;
  text-align: center;
  margin-bottom: 16px;
`;

const Description = styled.div`
  font-size: 16px;
  padding: 0 8px;
  text-align: center;
`;

const Actions = () => (
  <Wrapper>
    <h2>{'Get started'}</h2>
    <ActionsWrapper>
      <Action to="/docs/blueprints/magazine-cover-blueprint">
        <Image src="/images/FlyOffKoji.png" alt="Money" width="auto" height="100px" marginTop="20px" />
        <Title>{'Build your first template'}</Title>
        <Description>{'Follow this block-by-block blueprint to get started quickly and publish your first web application on Koji.'}</Description>
      </Action>
      <Action to="/docs/develop/projects">
        <Image src="/images/ExploreKoji.png" alt="Money" width="auto" height="100px" marginTop="20px" />
        <Title>{'Explore a Koji project'}</Title>
        <Description>{'See the unique elements of a Koji web application and learn what powers the magic of customization.'}</Description>
      </Action>
      <ExternalAction href="https://discord.gg/eQuMJF6" target="_blank">
        <Image src="/images/CommunityKoji.png" alt="Money" width="auto" height="100px" marginTop="20px" />
        <Title>{'Connect with the community'}</Title>
        <Description>{'Share tips and partner with other JavaScript developers, graphic designers, multimedia experts, and content creators.'}</Description>
      </ExternalAction>
    </ActionsWrapper>
  </Wrapper>
);

export default Actions;
