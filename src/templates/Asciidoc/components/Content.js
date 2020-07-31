import styled from 'styled-components';

const Content = styled.div`
  width: ${({ style: { isMobile } }) => isMobile ? '100%' : 'calc(100% - 296px)'};

  margin-bottom: 64px;

  padding: 0 16px;

  a {
    text-decoration: underline;
  }

  p, body {
    font-size: 16px !important;
    line-height: 1.55;
    word-spacing: 0.04em;
    letter-spacing: 0.01em;
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
  .admonitionblock > table td.content { padding-left: 1.125em; padding-right: 1.25em; border-left: 1px solid #dddddd; color: #404040; line-height: 1.5; font-size: 15px; }
  .admonitionblock > table td.content > :last-child > :last-child { margin-bottom: 0; }

  .img-overview {
    min-width: 350px;
    width: 35%;
    float: right;
    padding-left: 10px;
  }

  .init-cap::first-letter {
     text-transform: capitalize;
  }
  .title, .tableblock > caption {
    line-height: 1.4;
    font-weight: 700;
    margin-top: 0.2em;
    margin-bottom: 0.2em;
    font-size: 16px;
  }

  th.tableblock.halign-left, td.tableblock.halign-left { text-align: left; }
  th.tableblock.halign-right, td.tableblock.halign-right { text-align: right; }
  th.tableblock.halign-center, td.tableblock.halign-center { text-align: center; }

  th.tableblock.valign-top, td.tableblock.valign-top { vertical-align: top; }
  th.tableblock.valign-bottom, td.tableblock.valign-bottom { vertical-align: bottom; }
  th.tableblock.valign-middle, td.tableblock.valign-middle { vertical-align: middle; }

  ul.unstyled, ol.unnumbered, ul.checklist, ul.none { list-style-type: none; padding-left: 0;}
  ul.unstyled, ol.unnumbered, ul.checklist { margin-left: 0.625em; }


  ul.checklist li > p:first-child > input[type="checkbox"]:first-child { position: relative; top: 1px; }

  table, td, th {
    padding: 3px;
  }



  td.hdlist1 { padding-right: .8em; font-weight: bold; font-size: 16px;}

  h1, h2, h3 {
    margin-top: 1.9em;
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
  .hcode > h3 {
    font-family: Menlo, Monaco, "Liberation Mono", Consolas, monospace;
  }

  img {
    max-width: 100%;
  }
`;

export default Content;
