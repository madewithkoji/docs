import styled from 'styled-components';

const Content = styled.div`
  width: calc(100% - 296px);
  

  @media screen and (max-width: 1023px) {
    width: 100%;
  }

  margin-bottom: 64px;

  padding: 0 16px;

  a {
    text-decoration: underline;
  }

  p, body {
    font-size: 16px !important;
    line-height: 1.6;
    word-spacing: 0.04em;
    letter-spacing: 0.01em;
  }

  code {
    font-family: Menlo, Monaco, "Liberation Mono", Consolas, monospace;
    font-weight: normal;
    font-size: 14px;
    padding: 1px 4px;
    border: 1px solid #d4d9d9;
    transition: max-height 0.4s ease;
    position: relative;
    background-color: #F8F8F8;
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
    &:before {
      display: none;
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
      &:before {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        font-size: 12px;
        color: #DCDCDC;
        padding: 3px 5px;
        opacity: 0;
        transition: 0.2s ease-in-out;
        content: attr(data-tooltip);
      }
      &:hover:before {
        opacity: 1;
        top: calc(100% + 5px);
      }
    }
    button.copy {
      right: 5px;
      transition: 0.2s ease-in-out;
      &:after {
        color: #333;
        content: '\f00c';
        font-weight: 900;
        font-family: "Font Awesome 5 Free";
        position: absolute;
        top: 0;
        padding: 2px 8px;
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
        &:before {
          content: none;
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
    &.paragraph, .paragraph {
      padding: 5px;
      p {
        margin: 0;
      }
    }
    code {
      border: none;
    }
    .listingblock ~ div:not(.listingblock) {
      border-top: 3px solid #777;
      margin-top: 0;
      > table {
        border-width: 0;
      }
      code {
        background-color: #FFF;
        border: 1px solid #d4d9d9;
      }
    }
  }

`;

export default Content;
