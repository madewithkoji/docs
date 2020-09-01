import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #111111;
  color: #ffffff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  align-items: center;
  justify-content: space-around;
  flex-direction: row;

  p {
    text-align: center;
    padding: 0 16px;
    width: calc((100% - 160px) / 3);
  }

  p:first-child {
    padding-left: 0;
  }

  p:last-child {
    padding-right: 0;
  }

  b {
    display: block;
    margin-bottom: 8px;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    
    p {
      padding: none;
      width: 100%;
    }
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
        <p>
          <b>{'Make an impact'}</b>
          {'Designers, content creators, brands, and influencers need custom templates. You empower these communities.'}
        </p>
        <Image src={'/images/Bulb.png'} alt={'Bulb'} />
        <p>
          <b>{'Get noticed'}</b>
          {'Millions of people remix your template and share their creations on social platforms like Facebook, Twitter, and Reddit.'}
        </p>
        <Image src={'/images/Money.png'} alt={'Money'} />
        <p>
          <b>{'Make money'}</b>
          {'Koji developers get paid through licensing, asset packs, and other compensation programs.'}
        </p>
      </FeaturesWrapper>
    </ContentWrapper>
  </Wrapper>
);

export default Features;
