import React from 'react';
import Container from '@material-ui/core/Container';

const IndexPage = () => (
  <Container>
    <div style={{float:'right', margin:'10px'}}>
    <iframe src="https://koji.to/4kUw" title="Explore a Koji Template" height="522px" width="350px">
    </iframe>
    </div>
    <h1>Develop the future of social with remixable applications</h1>
    <p>Kojis are mini web applications that can be shared on all social platforms, embedded in any website, and sent via messengers and email. Everyday users can create Kojis in minutes by “remixing” templates and customizing them.
As a developer, you can build the templates that power Kojis, and your templates will be remixed into custom web applications and shared by millions of people across the world.</p>
<button style={{backgroundColor:'aliceblue',padding:'5px'}}><a href="/docs/blueprints/magazine-cover">Build your first template</a></button>
  </Container>
);

export default IndexPage;
