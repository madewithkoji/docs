import styled from 'styled-components';

const Content = styled.div`
  width: ${({ style: { isMobile } }) => isMobile ? '100%' : 'calc(100% - 296px)'};

  margin-bottom: 64px;

  padding: 0 16px;

  a {
    text-decoration: underline;
  }

  p, body {
    font-size: 16px;
  }

  code {
    font-family: Menlo, Monaco, "Liberation Mono", Consolas, monospace;
    font-weight: normal;
    font-size: 14px;
    padding: 3px 4px;
    color: #3b3b3b;
    background-color: rgb(248, 248, 248);
    border: 1px solid #d4d9d9
  }

  pre, pre > code {
    line-height: 1.6;
  }

  .admonitionblock > table { border: 0; background: none; width: 100%; }
  .admonitionblock > table td.icon { text-align: center; width: 80px; }
  .admonitionblock > table td.icon img { max-width: none; }
  .admonitionblock > table td.icon .title { font-weight: bold; text-transform: uppercase; }
  .admonitionblock > table td.content { padding-left: 1.125em; padding-right: 1.25em; border-left: 1px solid #dddddd; color: #404040; }
  .admonitionblock > table td.content > :last-child > :last-child { margin-bottom: 0; }

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
