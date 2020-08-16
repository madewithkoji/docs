import {PageSection, SectionComponent, Graphic, StyledFrame, Button} from './HomePageStyles'
import React from "react"
import { Link } from 'gatsby';
const Banner = () => {

    return(
        <PageSection padding="5%;">
          <SectionComponent row>
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
                  <p>
                    <br/>
                    <Link to={'/docs/blueprints/magazine-cover-blueprint'}>
                      <Button>{'Build your first template'}</Button>
                    </Link>
                  </p>
                <br />
            </div>
              <Graphic>
                  <StyledFrame src="https://withkoji.com/~JamesHole/kojidev" />
              </Graphic>
          </SectionComponent>
      </PageSection>
    )

}

export default Banner
