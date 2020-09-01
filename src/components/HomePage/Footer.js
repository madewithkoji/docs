import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { ResourcesFooterItems, DevelopersFooterItems, CampaignsFooterItems, ContactFooterItems } from './FooterItems';

const Wrapper = styled.div`
  background: #111111;
  color: #ffffff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  padding: 16px;
  margin: 16px auto 32px auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-wrap: wrap;

  @media screen and (max-width: 767px) {
    justify-content: flex-start;
  }
`;

const Section = styled.div`
  width: initial;
  margin-bottom: 0;

  @media screen and (max-width: 767px) {
    width: 50%;
    margin-bottom: 16px;
  }

  @media screen and (max-width: 479px) {
    width: 100%;
    margin-bottom: 16px;
  }
`;

const SectionHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const SectionItems = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: ${({ style: { header } }) => header === 'Contact' ? 'row' : 'column'};
`;

const ExternalSectionItem = styled.a`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 16px;

  svg {
    width: 16px;
    height: 16px;
  }

  > div {
    margin-left: 8px;
  }

  > div:hover {
    text-decoration: underline;
  }
`;

const SectionItem = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 16px;

  svg {
    width: 16px;
    height: 16px;
  }

  > div {
    margin-left: 8px;
  }

  > div:hover {
    text-decoration: underline;
  }
`;

const sections = [
  {
    header: 'Resources',
    items: ResourcesFooterItems,
  },
  {
    header: 'Developers',
    items: DevelopersFooterItems,
  },
  {
    header: 'Campaigns',
    items: CampaignsFooterItems,
  },
  {
    header: 'Contact',
    items: ContactFooterItems,
  },
];

const Footer = () => (
  <Wrapper>
    <ContentWrapper>
      {
        sections.map(({ header, items }) => (
          <Section key={header}>
            <SectionHeader>
              {header}
            </SectionHeader>
            <SectionItems style={{ header }}>
              {
                items.map(({ id, icon, name, link, href }) => href ?
                  (
                    <ExternalSectionItem key={id} href={href}>
                      {icon}
                      <div>{name}</div>
                    </ExternalSectionItem>
                  ) : (
                    <SectionItem key={id} to={link}>
                      {icon}
                      <div>{name}</div>
                    </SectionItem>
                  ))
              }
            </SectionItems>
          </Section>
        ))
      }
    </ContentWrapper>
  </Wrapper>
);

export default Footer;
