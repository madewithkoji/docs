/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #111111;
  color: #ffffff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PressWrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 32px auto;

  @media screen and (max-width: 479px) {
    flex-direction: column;
    padding: 16px;
  }
`;

const PressItem = styled.a`
  width: 28.3%;
  margin: 0 2.5% 2rem 2.5%;
  color: initial;

  display: flex;
  flex-direction: column;

  img {
    max-width: 100%;
  }

  @media screen and (max-width: 767px) {
    width: 45%;
    margin: 0 2.5% 2rem 2.5%;
  }

  @media screen and (max-width: 479px) {
    width: 100%;
    margin: 0 0 2rem 0;
  }
`;

const PressFooter = styled.div`
  padding: 0.75rem;
  background: #efefef;
  flex: 1 0 auto;

  .source {
    font-size: 0.8rem;
    text-transform: uppercase;
  }

  .headline {
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
`;

const press = [
  {
    href: 'https://www.protocol.com/koji',
    src: 'https://images.koji-cdn.com/685c3256-2a4c-406c-ae81-3a3b32364013/7a3ay-7h3uoprotocol.png?fit=crop&width=720&height=405',
    headline: 'The startup taking on Apple and Snapchat in a mini-app war',
    source: 'protocol.com',
  },
  {
    href: 'https://www.fastcompany.com/90522337/koji-wants-to-do-for-games-memes-and-selfies-what-tiktok-did-for-music',
    src: 'https://images.koji-cdn.com/685c3256-2a4c-406c-ae81-3a3b32364013/aho9a-ubyvsposterkoji1.png?fit=crop&width=720&height=405',
    headline: 'Koji wants to do for games, memes, and selfies what TikTok did for music',
    source: 'fastcompany.com',
  },
  {
    href: 'https://www.sandiegouniontribune.com/business/story/2020-06-30/start-up-koji-raises-10-million-for-platform-to-help-non-techies-create-games-memes-on-social-media',
    src: 'https://images.koji-cdn.com/685c3256-2a4c-406c-ae81-3a3b32364013/yz3l8-download.jpeg?fit=crop&width=720&height=405',
    headline: 'Startup Koji raises $10M to help non-techies create games, memes and other content for social media',
    source: 'sandiegouniontribune.com',
  },
  {
    href: 'https://venturebeat.com/2020/06/30/koji-raises-10-million-so-you-can-remix-games-and-interactive-content-for-social-media-posts/',
    src: 'https://images.koji-cdn.com/685c3256-2a4c-406c-ae81-3a3b32364013/ulg95-koji.jpg?fit=crop&width=720&height=405',
    headline: 'Koji raises $10 million so you can remix games and interactive content for social media',
    source: 'venturebeat.com',
  },
  {
    href: 'https://www.sandiegouniontribune.com/business/technology/story/2019-09-26/ex-myspace-executive-koji',
    src: 'https://images.koji-cdn.com/685c3256-2a4c-406c-ae81-3a3b32364013/85p9c-unionTribunePhoto.png?fit=crop&width=720&height=405',
    headline: 'Backed by tech billionaires, this ex-MySpace exec has big ideas for San Diego startup',
    source: 'sandiegouniontribune.com',
  },
  {
    href: 'https://venturebeat.com/2019/04/23/gometa-raises-6-million-and-launches-koji-web-app-development-platform/',
    src: 'https://images.koji-cdn.com/685c3256-2a4c-406c-ae81-3a3b32364013/fky6b-ventureBeatPhoto.png?fit=crop&width=720&height=405',
    headline: 'GoMeta raises $6 million to launch Koji web app development platform',
    source: 'venturebeat.com',
  },
];

const Press = () => (
  <Wrapper>
    <h2>{'Press'}</h2>
    <PressWrapper>
      {
        press.map(({ href, src, headline, source }) => (
          <PressItem
            href={href}
            key={href}
            target="_blank"
          >
            <img src={src} alt={headline} />
            <PressFooter>
              <div className="source">{source}</div>
              <div className="headline">{headline}</div>
            </PressFooter>
          </PressItem>
        ))
      }
    </PressWrapper>
  </Wrapper>
);

export default Press;
