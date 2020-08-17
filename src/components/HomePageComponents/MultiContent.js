import {PageSection, SectionComponent, Image} from './HomePageStyles'
import React from "react"
import styled from "styled-components"

const MultiContentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  padding: 15px;
  max-width: 600px;

`;

const StyledP = styled.p`
    text-align: center;
`;


const MultiContent = () => {

    return(
        <PageSection backColor="black" orientation="column">
            <h1 style={{color: "white", marginTop: 20, fontSize: 48}}>Koji for developers</h1>
            <SectionComponent orientation="row" row >

                <MultiContentSection>
                    <StyledP><b>Make an impact</b><br/>Designers, content creators, brands, and influencers need custom templates. You empower these communities</StyledP>
                </MultiContentSection>

                <Image src="/images/Bulb.png" alt="Bulb" width="80px"/>
                <MultiContentSection>
                    <StyledP><b>Get noticed</b><br/>Milions of people remix your template and share their creations on social platforms like Facebook, Twitter and Reddit</StyledP>
                </MultiContentSection>

                <Image src="/images/Money.png" alt="Money" width="100px"/>
                <MultiContentSection>
                    <StyledP><b>Make Money</b><br/>Koji developers get paid through licensing, asset packs, and other compensation programs</StyledP>
                </MultiContentSection>

            </SectionComponent>
      </PageSection>
    )

}

export default MultiContent
