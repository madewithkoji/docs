import React from 'react';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import { Link } from 'gatsby';

const IFrameWrapper = styled.div`
  float: right;
  margin: 10px;
`;

const Button = styled.button`
  background-color: aliceblue;
  padding: 5px;
`;

const myP = {
    fontSize:18
  };

const IndexPage = () => (
  <Container>
  <br />
  <br />
    <h1>{'Develop the future of social with remixable applications'}</h1>
    <p style={ myP }>
      {`Kojis are mini web applications that can be shared on all social platforms,
        embedded in any website, and sent via messengers and email. Everyday users can
        create Kojis in minutes by “remixing” templates and customizing them.`}
      <br />
      <br />
      {`As a developer, you can build the templates that power Kojis, and your
        templates will be remixed into custom web applications and shared by millions
        of people across the world.`}
    </p>
    <p style={ myP }>
      <Link to={'/docs/blueprints/magazine-cover-blueprint'}>
        {'Build your first template'}
      </Link>
      </p>
      <br />
      <hr />
    <h1>{'Kojis are JavaScript applications'}</h1>
    <p style={ myP }>
      {`Kojis are full-stack, modern JavaScript applications that take advantage of the latest web standards and emerging technologies. They are designed to be responsive, so that they can run on any browser and every device. They can embed multimedia, leverage web AR/VR support, facilitate e-commerce transactions, and more.`}
      </p>
      <br />
      <hr />
    <h1>{'Templates empower everyone to make amazing Kojis'}</h1>
    <p style={ myP }>
      {`Developers build “remixable” templates for any type of web application, such as interactive selfies, memes, games, and utilities. Non-developers can edit template elements without coding, such as images, text, and sounds, and create a custom version that they can share anywhere on the web. With the ability to create and share remixable, interactive content, the opportunities for creative new applications and experiences are endless.`}
        </p>
  </Container>
);

export default IndexPage;
