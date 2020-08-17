import {PageSection} from './HomePageStyles'
import React from "react"
import styled from "styled-components"
import {ResourcesFooterItems, DevelopersFooterItems, CampaignsFooterItems, ContactFooterItems} from "./FooterItems"

  const IconDiv = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 50px;
  `;

  const ItemName = styled.p`
    font-size: 14px;
    margin-left: 8px;
    font-weight: bold;
    margin-bottom: 12px;
  `;

  const SectionItemDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: black;
    color: white;
  `;

  const FooterSection = styled.div`
    display: flex;
    background-color: black;
    color: white;
    flex-direction: ${props => props.orientation || "column"};
    justify-content: left;
    align-items: left;
    margin: 3%;
`;

const StyledLink = styled.a`
  margin-bottom: -20px;
`;

const Footer = () => {

    const resources = ResourcesFooterItems.map((footerItem) => {
      return(
        <StyledLink href={footerItem.link} target="_blank">
          <SectionItemDiv>
              <IconDiv>{footerItem.icon}</IconDiv>
              <ItemName>{footerItem.name}</ItemName>
          </SectionItemDiv>
        </StyledLink>
      )
    })

    const developers = DevelopersFooterItems.map((footerItem) => {
      return(
        <StyledLink href={footerItem.link} target="_blank">
          <SectionItemDiv>
              <IconDiv>{footerItem.icon}</IconDiv>
              <ItemName>{footerItem.name}</ItemName>
          </SectionItemDiv>
        </StyledLink>
      )
    })

    const campaigns = CampaignsFooterItems.map((footerItem) => {
      return(
        <StyledLink href={footerItem.link} target="_blank">
          <SectionItemDiv>
              <IconDiv>{footerItem.icon}</IconDiv>
              <ItemName>{footerItem.name}</ItemName>
          </SectionItemDiv>
        </StyledLink>
      )
    })

    const contact = ContactFooterItems.map((footerItem) => {
      return(
        <StyledLink href={footerItem.link} target="_blank">
          <SectionItemDiv>
              <IconDiv>{footerItem.icon}</IconDiv>
              <ItemName>{footerItem.name}</ItemName>
          </SectionItemDiv>
        </StyledLink>
      )
    })

    return(
      <PageSection backColor="black" orientation="row" align="flex-start" footer>

          <FooterSection>
            <ItemName>Resources</ItemName>
            {resources}
          </FooterSection>

          <FooterSection>
          <ItemName>Developers</ItemName>
            {developers}
          </FooterSection>

          <FooterSection>
          <ItemName>Campaigns</ItemName>
            {campaigns}
          </FooterSection>

          <FooterSection>
            <ItemName>Contact</ItemName>
            <FooterSection orientation="row">
              {contact}
            </FooterSection>
          </FooterSection>
          
      </PageSection>
      
    )

}

export default Footer
