import {PageSection, SectionComponent, Button} from './HomePageStyles'
import React from "react"
import styled from "styled-components"
import { Link } from 'gatsby';

const CtaBannerTitle = styled.h2`
    color: black;
    padding-top: 2%;
    padding-bottom: 15%;
    margin: 0;
`;
const CtaBanner = () => {

    return(
        <PageSection>
            <SectionComponent column alignItems="center">
                <CtaBannerTitle>
                    Ready to build the future?
                </CtaBannerTitle>
                <Link to="/docs/getting-started/introduction"> 
                    <Button>
                        Get started
                    </Button>
                </Link>
            </SectionComponent>
        </PageSection>
    )

}

export default CtaBanner
