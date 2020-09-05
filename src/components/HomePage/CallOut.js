import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #111111;
  color:rgb(249, 249, 249);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  padding: 16px;
  margin: 0 auto 32px auto;
`;

const CallOut = () => (
  <Wrapper>
    <ContentWrapper>
      <h2>{'Kojis are JavaScript applications'}</h2>
      <p>
        {`Kojis are full-stack, modern JavaScript applications 
        that take advantage of the latest web standards and emerging technologies. 
        They are designed to be responsive, so that they can run on any browser and every device. 
        They can embed multimedia, leverage web AR/VR support, facilitate e-commerce transactions, and more.`}
      </p>
      <br />
      <h2>{'Templates empower everyone to make amazing Kojis'}</h2>
      <p>
        {`Developers build “remixable” templates for any type of web application, 
        such as interactive selfies, memes, games, and utilities. 
        Non-developers can edit template elements without coding, 
        such as images, text, and sounds, and create a custom version that they can share anywhere on the web. 
        With the ability to create and share remixable, interactive content, 
        the opportunities for creative new applications and experiences are endless.`}
      </p>
    </ContentWrapper>
  </Wrapper>
);

export default CallOut;
