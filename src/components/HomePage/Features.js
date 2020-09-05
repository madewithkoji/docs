import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #111111;
  color: rgb(249, 249, 249);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    text-align: center;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 32px auto;
`;

const FeaturesWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  flex-direction: row;

  > * {
    flex: 1;
  }

  div.text-wrapper {
    text-align: center;
    padding: 0 16px;
    width: calc((100% - 160px) / 3);
  }

  div.text-wrapper:first-child {
    padding-left: 0;
  }

  div.text-wrapper:last-child {
    padding-right: 0;
  }

  b {
    display: block;
    margin-bottom: 8px;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    
    div.text-wrapper {
      padding: none;
      width: 100%;
    }
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  max-width: 80px;

  @media screen and (max-width: 767px) {
    width: 100%;
    max-width: unset;
  }
`;

const Image = styled.img`
  width: 80px;
  height: auto;
  padding: 16px;
`;

const Features = () => (
  <Wrapper>
    <ContentWrapper>
      <h2>{'Koji for developers'}</h2>
      <FeaturesWrapper>
        <div className={'text-wrapper'}>
          <p>
            <b>{'Make an impact'}</b>
            {'Designers, content creators, brands, and influencers need custom templates. You empower these communities.'}
          </p>
        </div>
        <ImageWrapper>
          <Image src={'/images/Bulb.png'} alt={'Bulb'} />
        </ImageWrapper>
        <div className={'text-wrapper'}>
          <p>
            <b>{'Get noticed'}</b>
            {'Millions of people remix your template and share their creations on social platforms like Facebook, Twitter, and Reddit.'}
          </p>
        </div>
        <ImageWrapper>
          <Image src={'/images/Money.png'} alt={'Money'} />
        </ImageWrapper>
        <div className={'text-wrapper'}>
          <p>
            <b>{'Make money'}</b>
            {'Koji developers get paid through licensing, asset packs, and other compensation programs.'}
          </p>
        </div>
      </FeaturesWrapper>
    </ContentWrapper>
  </Wrapper>
);

export default Features;
