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

const IndexPage = () => (
  <Container>
    <IFrameWrapper>
      <iframe
        src={'https://koji.to/4kUw'}
        title={'Explore a Koji Template'}
        height={'522px'}
        width={'350px'}
      />
    </IFrameWrapper>
    <h1>{'Develop the future of social with remixable applications'}</h1>
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
    <Button>
      <Link to={'/docs/blueprints/magazine-cover'}>
        {'Build your first template'}
      </Link>
    </Button>
  </Container>
);

export default IndexPage;
