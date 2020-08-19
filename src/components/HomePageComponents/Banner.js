import {PageSection, SectionComponent, StyledFrame, Button, device} from './HomePageStyles'
import React from "react"
import styled from "styled-components"
import { Link } from 'gatsby';

const BannerSection = styled(SectionComponent)`
  color: ${props => props.textColor || "black"};
  display: flex;
  justify-content: space-between;
  align-items: ${props => props.alignItems || "center"};
  align-content: ${props => props.alignContent || "center"};
  max-width: ${props => props.maxWidth || "80%"};

  @media only screen and (min-width: 320px){
    flex-direction: column;
    font-size: 16px;
  }
  @media only screen and (min-width: 360px){
    flex-direction: column;
    font-size: 17px;
  }
  @media only screen and (min-width: 400px){
    flex-direction: column;
    font-size: 18px;
  }
  @media only screen and (min-width: 600px){
    flex-direction: column;
    font-size: 20px;
  }
  @media only screen and (min-width: 800px){
    flex-direction: column;
  }
  @media only screen and (min-width: 1000px){
    flex-direction: column;
  }
  @media only screen and (min-width: 1600px){
    flex-direction: row;
  }
`;

//Graphic component used inside the banner iframe (made to be responsive)
const Graphic = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  @media only screen and (min-width: 500px){
    padding-top: 180%;
    margin-left: 0px;
    width: 110%;
  }
  @media only screen and (min-width: 550px){
    padding-top: 170%;
    margin-left: 0px;
    width: 100%;
  }
  @media only screen and (min-width: 600px){
    padding-top: 160%;
    margin-left: 0px;
    width: 90%;
  }
  @media only screen and (min-width: 650px){
    padding-top: 145%;
    margin-left: 0px;
    width: 90%;
  }
  @media only screen and (min-width: 700px){
    padding-top: 140%;
    margin-left: 0px;
    width: 80%;
  }
  @media only screen and (min-width: 800px){
    padding-top: 120%;
    margin-left: 0px;
    width: 70%;
  }
  @media only screen and (min-width: 950px){
    padding-top: 100%;
    margin-left: 0px;
    width: 60%;
  }
  @media only screen and (min-width: 1100px){
    padding-top: 90%;
    margin-left: 0px;
    width: 55%;
  }
  @media only screen and (min-width: 1300px){
    padding-top: 75%;
    margin-left: 0px;
    width: 50%;
  }
  @media only screen and (min-width: 1500px){
    padding-top: 65%;
    margin-left: 0px;
    width: 40%;
  }
  @media only screen and (min-width: 1600px){
    margin-left: 0px;
    padding-top: 60%;
    margin-left: 64px;
    width: 100%;
  }
  @media only screen and (min-width: 1800px){
    margin-left: 0px;
    padding-top: 55%;
    margin-left: 64px;
    width: 90%;
  }
`;

const Banner = () => {

    return(
        <PageSection padding="5%;">
          <BannerSection>
            <div>
              <h1>{"Develop the future of social with remixable applications"}</h1>
                  <p>
                    {`Kojis are mini web applications that can be shared on all social platforms,
                      embedded in any website, and sent via messengers and email. Everyday users can
                      create Kojis in minutes by “remixing” templates and customizing them.`}
                    <br />
                    <br />
                    {`As a developer, you can build the templates that power Kojis, and your
                      templates will be remixed into custom web applications and shared by millions
                      of people across the world.`}
                  </p>
                    <br/>
                    <div style={{width: "300px"}}>
                      <Link to={'/docs/blueprints/magazine-cover-blueprint'}>
                        <Button>{'Build your first template'}</Button>
                      </Link>
                    </div>
                <br />
            </div>
              <Graphic>
                  <StyledFrame src="https://withkoji.com/~JamesHole/kojidev" />
              </Graphic>
          </BannerSection>
      </PageSection>
    )

}

export default Banner
