import {PageSection, SectionComponent, Image} from './HomePageStyles'
import React from "react"
import styled from "styled-components"

const MultiContentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #111111;
  color: white;
  padding: 15px;
  max-width: 600px;

`;

const StyledP = styled.p`
    text-align: center;
`;


const MultiContent = () => {

    return(
        <PageSection backColor="#111111" orientation="column">
            <SectionComponent orientation="row" row>
            <h1 style={{color: "white", marginTop: 20, textAlign: "center"}}>Koji for developers</h1>
            </SectionComponent>
            <SectionComponent row>

                <MultiContentSection>
                    <StyledP><b>Make an impact</b><br/>Designers, content creators, brands, and influencers need custom templates. You empower these communities.</StyledP>
                </MultiContentSection>

                <Image src="/images/Bulb.png" alt="Bulb" width="80px"/>
                <MultiContentSection>
                    <StyledP><b>Get noticed</b><br/>Milions of people remix your template and share their creations on social platforms like Facebook, Twitter, and Reddit.</StyledP>
                </MultiContentSection>

                <Image src="/images/Money.png" alt="Money" width="100px"/>
                <MultiContentSection>
                    <StyledP><b>Make money</b><br/>Koji developers get paid through licensing, asset packs, and other compensation programs.</StyledP>
                </MultiContentSection>

            </SectionComponent>
      </PageSection>
    )

}

export default MultiContent
