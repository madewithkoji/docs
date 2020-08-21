import {PageSection, SectionComponent, Button} from './HomePageStyles'
import React, {useState, useEffect} from "react"
import styled from "styled-components"
import { Link } from 'gatsby';

const BannerSection = styled(SectionComponent)`
  
  @media only screen and (min-width: 320px){
    flex-direction: column;
  }
  @media only screen and (min-width: 1800px){
    flex-direction: row;
  }
`;

const StyledFrame = styled.iframe`
    volume: silent;
    visibility: ${props => props.visibility || "visible"};
    @media only screen and (min-width: 320px) and (max-width: 480px){
      transform: scale(0.8);
      height: 800px;
      width: ${props => props.width || "auto"};
    }
    @media only screen and (min-width: 480px){
      width: 100%;
      height: 800px
    }
    @media only screen and (min-width: 950px) and (max-width: 1800px){
      margin-left: 0px;
      width: 55%;
      height: 800px;
    }
    @media only screen and (min-width: 1800px){
      margin-left: 64px;
      width: 100%;
      height: 800px;
    }
`;

function useWidnowDimensions() {
  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return{
      width,
      height
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    if(hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow])
  return windowDimensions;
}

const Banner = () => {
    const {width}  = useWidnowDimensions();

    return(
        <PageSection padding="5%">
          <BannerSection row>
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
              <StyledFrame width={width*1.2} src="https://withkoji.com/~JamesHole/kojidev"/> 
          </BannerSection>
      </PageSection>
    )

}

export default Banner
