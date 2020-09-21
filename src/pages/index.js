import React from 'react';
import styled from 'styled-components';
import Banner from '../components/HomePage/Banner';
import CallOut from '../components/HomePage/CallOut';
import InteractiveContent from '../components/HomePage/InteractiveContent';
import Features from '../components/HomePage/Features';
import Press from '../components/HomePage/Press';
import Actions from '../components/HomePage/Actions';
import CTA from '../components/HomePage/CTA';

import Footer from '../components/HomePage/Footer';

const MyContainer = styled.div`
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

  h1 {
    font-size: 3rem;
    line-height: 3.6rem;
  }

  h2 {
    font-size: 2.4rem;
    line-height: 2.8rem;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6rem;
  }
`;

const IndexPage = () => (

  <MyContainer>
    <Banner />
    <CallOut />
    <InteractiveContent />
    <Features />
    <Actions />
    <Press />
    <CTA />

  </MyContainer>
);

export default IndexPage;
