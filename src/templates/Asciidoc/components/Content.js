import styled from 'styled-components';

const Content = styled.div`
  width: ${({ style: { isMobile } }) => isMobile ? '100%' : 'calc(100% - 240px)'};

  margin-bottom: 64px;

  padding: 0 16px;

  a {
    text-decoration: underline;
  }

  p {
    font-size: 1rem;
  }

  h1 { 
    font-size: 2.125em;
  }

  h2 { 
    font-size: 1.6875em;
  }

  h3 { 
    font-size: 1.375em;
  }

  h4 { 
    font-size: 1.125em;
  }

  h5 { 
    font-size: 1.125em;
  }

  h6 { 
    font-size: 1em;
  }
  
  img {
    max-width: 100%;
  }
`;

export default Content;
