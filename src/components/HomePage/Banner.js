import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto 32px auto;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;

  > div {
    width: 100%;
  }

  > div:first-child {
    margin-right: 16px;
  }

  > div:last-child {
    display: block;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;

    > div {
      width: 100%;
    }

    > div:first-child {
      margin-right: 0;
    }

    > div:last-child {
      display: none;
    }
  }
`;

const IFrame = styled.iframe`
  width: 100%;
  height: 70vh;
`;

const Button = styled.button`
  font-size: 20px;
  padding: 16px;
  background: none;
  color: #111111;
  border: 2px solid #111111;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #111111;
    color: rgb(249, 249, 249);
  }
`;

const Banner = () => (
  <Wrapper>
    <div>
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
      <br />
      <div>
        <Link to={'/docs/getting-started/start-guide-1'}>
          <Button>{'Build your first template'}</Button>
        </Link>
      </div>
      <br />
    </div>
  </Wrapper>
);

export default Banner;
