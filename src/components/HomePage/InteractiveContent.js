import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto 32px auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 16px 0;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

const ButtonsWrapper = styled.div`
  width: 30%;
  margin-right: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;

  > button {
    margin-bottom: 16px;
  }

  @media screen and (max-width: 767px) {
    width: 80vw;
    align-items: unset;
    margin-right: 0;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const DetailWrapper = styled.div`
  width: 60vh;
  height: 60vh;
  overflow: hidden;

  @media screen and (max-width: 479px) {
    width: 80vw;
    height: 80vw;
  }
`;

const Button = styled.button`
  font-size: 16px;
  padding: 8px;
  background: ${({ style: { isActive } }) => isActive ? '#000000' : 'none'};
  color: ${({ style: { isActive } }) => isActive ? '#ffffff' : '#000000'};
  border: 2px solid #000000;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: 100%;

  &:hover {
    background: #000000;
    color: #ffffff;
  }

  @media screen and (max-width: 767px) {
    flex-direction: row;
  }
`;

const ScaffoldsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
`;

const ScaffoldWrapper = styled.div`
  margin: 8px;
  width: calc(50% - 16px);
  background: url(${({ style: { src } }) => src}) center center / cover;

  &::before {
    content: '';
    padding-bottom: 100%;
    display: block;
  }
`;

const StyledVideo = styled.video`
  width: 100%;
  height: auto;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const InteractiveContent = () => {
  const [activeContentIndex, setActiveContentIndex] = useState(0);

  const buttons = [
    'Start from a scaffold',
    'Define customizable elements',
    'Dynamically set custom values',
    'Publish to the Koji network',
  ];

  return (
    <Wrapper>
      <h2>{'How to build remixable templates'}</h2>
      <ContentWrapper>
        <ButtonsWrapper>
          {
            buttons.map((buttonText, idx) => (
              <Button
                key={buttonText}
                onClick={() => setActiveContentIndex(idx)}
                style={{ isActive: activeContentIndex === idx }}
              >
                {buttonText}
              </Button>
            ))
          }
        </ButtonsWrapper>
        <DetailWrapper>
          {
            activeContentIndex === 0 &&
            <ScaffoldsWrapper>
              <ScaffoldWrapper style={{ src: '/images/React.png' }} />
              <ScaffoldWrapper style={{ src: '/images/Vue.png' }} />
              <ScaffoldWrapper style={{ src: '/images/Svelte.png' }} />
              <ScaffoldWrapper style={{ src: '/images/VanillaJS.png' }} />
            </ScaffoldsWrapper>
          }
          {
            activeContentIndex === 1 &&
            <StyledVideo controls loop muted autoPlay src={'/videos/DefineCustomEl.mp4'} />
          }
          {
            activeContentIndex === 2 &&
            <StyledVideo controls loop muted autoPlay src={'/videos/SetCustomVal.mp4'} />
          }
          {
            activeContentIndex === 3 &&
            <Image
              alt={'Share to Koji'}
              src={'/images/ShareKoji2.png'}
            />
          }
        </DetailWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default InteractiveContent;
