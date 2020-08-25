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
    border: 1px solid #d4d9d9;
    transition: max-height 0.4s ease;
    position: relative;
    &.expanded {
      padding-bottom: 50px;
    }
    .collapsible {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      cursor: pointer;
      &:after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50px;
        background: linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%);
        transition: opacity 0.4s ease;
      }
      &:before {
        content: 'expand';
        text-transform: uppercase;
        text-align: center;
        display: block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 15px;
        background-color: #FFF;
        border-radius: 16px;
        z-index: 11;
        padding: 3px 15px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        transition: bottom 0.4s ease;
      }
      &:hover:before {
        bottom: 20px;
      }
      &:hover:after {
        opacity: 0.6;
      }
      &.expanded {
        top: auto;
        height: 50px;
        &:after {
          background: none;
        }
        &:before {
          content: 'collapse';
        }
      }
    }
    .lineNum:after {
      user-select: none;
      content: ' ' attr(data-line-number) ' | ';
      opacity: 0.5;
      color: #333;
    }
  }

  pre {
    position: relative;
    overflow: hidden;
    button.copy, button.theme {
      position: absolute;
      z-index: 10;
      top: 5px;
      border: none;
      background-color: transparent;
      color: #333;
      font-size: 20px;
      cursor: pointer;
      &:hover {
        color: #999;
      }
      i { pointer-events: none;}
      &:focus {
        outline: none;
      }
    }
    button.copy {
      right: 5px;
      transition: 0.2s ease-in-out;
      &:after {
        color: #333;
        content: '\f00c';
        font-family: "FontAwesome";
        position: absolute;
        top: 0;
        padding: 2px 10px;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
        transform: translateY(-100%);
      }
      &.copied {
        color: transparent;
        transform: translateY(100%);
        &:after {
          opacity: 1;
        }
      }
    }
    button.theme {
      right: 45px;
    }
  }

  pre, pre > code {
    line-height: 1.6;
    margin: 0;
    position: relative;
  }

  pre > code {
    padding-top: 30px;
  }

  .lang-indicator {
    font-family: Menlo, Monaco, "Liberation Mono", Consolas, monospace;
    text-transform: uppercase;
    display: block;
    position: absolute;
    top: 6px;
    right: 90px;
    opacity: 0.6;
    z-index: 12;
    &:before {
      content: attr(data-language);
    }
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

  /* Unordered Lists */
  ul li ul, ul li ol { margin-left: 1.25em; margin-bottom: 0.625em; font-size: 16px; /* Override nested font-size change */ }
  ul.square li ul, ul.circle li ul, ul.disc li ul { list-style: inherit; }
  ul.square { list-style-type: square; }
  ul.circle { list-style-type: circle; }
  ul.disc { list-style-type: disc; }
  ul.no-bullet { list-style: none; }

  /* Ordered Lists */
  ol li ul, ol li ol { margin-left: 1.25em; margin-bottom: 0.625em; }

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

  .conum {
    user-select: none;
  }

  // Tab related styling
  .tabbed {
    margin-top: 1.2em;
    .tabbed {
      margin-top: 0;
    }
  }

  .tabbed__toggle {
    border: 1px solid #AAA;
    border-bottom: none;
    padding: 5px 12px;
    display: inline-block;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;
    background-color: #DDD;
    position: relative;
    user-select: none;
    z-index: 10;
    font-weight: bold;
    margin-right: 5px;
    font-size: 16px;
    &.tabbed__toggle_active, &:hover {
      background-color: rgb(248,248,248);
    }
    &.tabbed__toggle_active:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -2px;
      height: 2px;
      background-color: rgb(248,248,248);
    }
  }

  /* nested tabs */
  .tabbed .tabbed .tabbed__toggle {
    background-color: transparent;
    border: none;
    &.tabbed__toggle_active, &:hover {
      background-color: transparent;
      border-bottom: 2px solid #000;
    }
    &.tabbed__toggle_active:after {
      content: none;
    }
  }

  .tabs {
    border: 1px solid #AAA;
    position: relative;
    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }

  .tabbed__tab {
    > .title {
      display: none;
    }
    &.paragraph {
      padding: 5px;
    }
    code {
      border: none;
    }
  }

`;

export default Content;
