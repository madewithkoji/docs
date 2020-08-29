import {PageSection} from './HomePageStyles'
import React from "react"
import styled from "styled-components"
import {ResourcesFooterItems, DevelopersFooterItems, CampaignsFooterItems, ContactFooterItems} from "./FooterItems"

  const IconDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 8px;
    font-size: 50px;
  `;

  const ItemName = styled.p`
    font-size: 14px;
    margin-left: 8px;
    font-weight: bold;
    margin: 12px;
    text-align: left;
  `;

  const SectionItemDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    margin: 0;
    background-color: #111111;
    border-radius: 8px;
    color: white;
    :hover{
      background-color: #666666;
    }
  `;

  const FooterSection = styled.div`
    display: flex;
    background-color: #111111;
    color: white;
    flex-direction: ${props => props.orientation || "column"};
    justify-content: left;
    align-items: left;
    margin: 3%;
`;


const Footer = () => {

    const resources = ResourcesFooterItems.map((footerItem) => {
      return(
        <a href={footerItem.link} target="_blank">
          <SectionItemDiv>
              <IconDiv>{footerItem.icon}</IconDiv>
              <ItemName>{footerItem.name}</ItemName>
          </SectionItemDiv>
        </a>
      )
    })

    const developers = DevelopersFooterItems.map((footerItem) => {
      return(
        <a href={footerItem.link} target="_blank">
          <SectionItemDiv>
              <IconDiv>{footerItem.icon}</IconDiv>
              <ItemName>{footerItem.name}</ItemName>
          </SectionItemDiv>
        </a>
      )
    })

    const campaigns = CampaignsFooterItems.map((footerItem) => {
      return(
        <a href={footerItem.link} target="_blank">
          <SectionItemDiv>
              <IconDiv>{footerItem.icon}</IconDiv>
              <ItemName>{footerItem.name}</ItemName>
          </SectionItemDiv>
        </a>
      )
    })

    const contact = ContactFooterItems.map((footerItem) => {
      return(
        <a href={footerItem.link} target="_blank">
          <SectionItemDiv>
              <IconDiv style={{margin: "4px"}}>{footerItem.icon}</IconDiv>
          </SectionItemDiv>
        </a>
      )
    })

    return(
      <PageSection backColor="#111111" orientation="row" align="flex-start" footer>

          <FooterSection>
            <ItemName style={{marginLeft: "8px", textTransform: "uppercase"}}>Resources</ItemName>
            {resources}
          </FooterSection>

          <FooterSection>
          <ItemName style={{marginLeft: "8px", textTransform: "uppercase"}}>Developers</ItemName>
            {developers}
          </FooterSection>

          <FooterSection>
          <ItemName style={{marginLeft: "8px", textTransform: "uppercase"}}>Campaigns</ItemName>
            {campaigns}
          </FooterSection>

          <FooterSection>
          <ItemName style={{marginLeft: "9px", textTransform: "uppercase"}}>Contact</ItemName>
            <FooterSection orientation="row">
              {contact}
            </FooterSection>
          </FooterSection>
          
      </PageSection>
      
    )

}

export default Footer
