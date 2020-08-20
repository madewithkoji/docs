import {PageSection, SectionComponent, Image} from './HomePageStyles'
import React from "react"
import { Link } from 'gatsby';
import styled from "styled-components"

const ResourcesSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: #F9F9F9;
  color: black;
  cursor: pointer;
  padding: 8px;
  margin: 1%;
  max-width: 600px;
  height: 400px;
  border-radius: 10px;
  transition: 0.6s;
  :hover {
    background-color: black;
    color: white;
  }
`;

const StyledP = styled.p`
  text-decoration: underline;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Resources = () => {

    return(
        <PageSection orientation="column">
          <SectionComponent orientation="row" row>
          <h1 style={{color: "black", marginTop: 20}}>Get started</h1>
          </SectionComponent>
          <SectionComponent orientation="row" row>

          <StyledLink activeStyle={{color: "black"}} to="/docs/blueprints/magazine-cover-blueprint">
              <ResourcesSection>
                <Image src="/images/FlyOffKoji.png" alt="Money" width="auto" height="100px" marginTop="20px"/>
                      <StyledP>
                        Build your first template
                      </StyledP>
                  <p style={{textAlign: "center"}}>Follow this block by block blueprint to get started quickly and publish your first web application on Koji.</p>
              </ResourcesSection>
            </StyledLink>

            <StyledLink activeStyle={{color: "black"}} to="/reference/packages/packages-overview">
              <ResourcesSection>
                <Image src="/images/ExploreKoji.png" alt="Money" width="auto" height="100px" marginTop="20px"/>
                    <StyledP>
                      Explore a Koji project
                    </StyledP>
                <p style={{textAlign: "center"}}>See the unique elements of a Koji web application and learn what powers the magic of customization.</p>
              </ResourcesSection>
            </StyledLink>
            
            <a href="https://discord.com/invite/eQuMJF6">
              <ResourcesSection>
                <Image src="/images/CommunityKoji.png" alt="Money" width="auto" height="100px" marginTop="20px"/>
                  <StyledP>
                    Connect with the community
                  </StyledP>
                <p style={{textAlign: "center"}}>Share tips and partner with other JavaScript developers, graphic designers, multimedia experts, and content creators.</p>
              </ResourcesSection>
            </a>
            
          </SectionComponent>
        </PageSection>
    )

}

export default Resources
