import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto 32px auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;

  h2 {
    text-align: center;
  }
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
    color:rgb(249, 249, 249);
  }
`;

const CTA = () => (
  <Wrapper>
    <h2>{'Ready to build the future?'}</h2>
    <Link to={'/docs/getting-started/introduction'}>
      <Button>{'Get started'}</Button>
    </Link>
  </Wrapper>
);

export default CTA;
