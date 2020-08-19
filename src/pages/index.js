import React from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';
import Banner from "../components/HomePageComponents/Banner"
import SingleContent from "../components/HomePageComponents/SingleContent"
import CtaBanner from "../components/HomePageComponents/CtaBanner"
import MultiContent from "../components/HomePageComponents/MultiContent"
import Resources from "../components/HomePageComponents/Resources"
import InteractiveContent from "../components/HomePageComponents/InteractiveContent"
import News from "../components/HomePageComponents/News"
import Footer from "../components/HomePageComponents/Footer"
const MyContainer = styled(Container)`
  max-width: 100%;
  padding: 0;
  margin: 0;

  a[target="_blank"] {
    &:after {
      content: none;
      position: relative;
      top: 2px;
    }
  }
`;

const IndexPage = () => (

  <MyContainer>

      <Banner />
      <SingleContent />
      <InteractiveContent />
      <MultiContent />
      <Resources />
      <News />
      <CtaBanner />
      <Footer />

  </MyContainer>
);

export default IndexPage;
