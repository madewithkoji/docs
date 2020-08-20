import {PageSection, SectionComponent} from './HomePageStyles'
import React from "react"

const SingleContent = () => {

    return(
        <PageSection backColor="#111111">
        <SectionComponent alignItems="left" textColor="white">
              <h1>{'Kojis are JavaScript applications'}</h1>
                <p>
                  {`Kojis are full-stack, modern JavaScript applications 
                  that take advantage of the latest web standards and emerging technologies. 
                  They are designed to be responsive, so that they can run on any browser and every device. 
                  They can embed multimedia, leverage web AR/VR support, facilitate e-commerce transactions, and more.`}
                </p>
                <br/>
                <h1 style={{marginTop: 0}}>{'Templates empower everyone to make amazing Kojis'}</h1>
                <p>
                  {`Developers build “remixable” templates for any type of web application, 
                  such as interactive selfies, memes, games, and utilities. 
                  Non-developers can edit template elements without coding, 
                  such as images, text, and sounds, and create a custom version that they can share anywhere on the web. 
                  With the ability to create and share remixable, interactive content, 
                  the opportunities for creative new applications and experiences are endless.`}
                </p>
        </SectionComponent>
      </PageSection>
    )

}

export default SingleContent
