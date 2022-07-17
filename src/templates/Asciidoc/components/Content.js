/* eslint-disable max-len */
import styled from 'styled-components';

import { BLUE } from '../../../constants/colors';

const Content = styled.div`
  width: 100%;
  max-width: 720px;

  @media screen and (max-width: 1023px) {
    width: 100%;
  }

  margin: 64px 0;;
  padding: 0;

  @media screen and (max-width: 768px) {
    padding: 0 24px;
  }

  a {
    text-decoration: underline;
  }

  a, a:visited {
    color: ${BLUE};
  }

  p, body {
    font-size: 16px;
    line-height: 1.65;
    letter-spacing: -0.32px;
  }

  code {
    font-family: Menlo, Monaco, "Liberation Mono", Consolas, monospace;
    font-weight: normal;
    font-size: 12px;
    padding: 4px;
    border-radius: 1px;
    transition: max-height 0.4s ease;
    position: relative;
    background-color: #f4f4f4;
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
      color: #111111;
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
      color: #111111;
      font-size: 16px;
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
        background-color: #111111;
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
        color: #111111;
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
    line-height: 1.5;
    margin: 0;
    position: relative;
  }

  pre > code {
    padding: 6px;
  }

  .lang-indicator {
    font-family: Menlo, Monaco, "Liberation Mono", Consolas, monospace;
    text-transform: uppercase;
    display: block;
    position: absolute;
    top: 8px;
    right: 36px;
    opacity: 0.6;
    z-index: 12;
    font-size: 11px;
    font-weight: normal!important;
    &:before {
      content: attr(data-language);
    }
  }

  .img-overview {
    min-width: 350px;
    width: 35%;
    float: right;
    padding-left: 10px;

    @media screen and (max-width: 768px) {
      float: none;
      position: relative;
      width: 100%;
      min-width: unset;
    }
  }

  .init-cap p::first-letter {
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

  h1 {
    font-size: 48px;
    line-height: 52px;
    font-weight: 700;

    padding: 0;
    margin: 0;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 32px;
    line-height: 41px;
    letter-spacing: 0.4px;
    font-weight: bold;

    margin: 45px 0 16px;
  }

  h3 {
    font-size: 22px;
    line-height: 28px;
    letter-spacing: 0.35px;
    margin: 48px 0 14px;
  }

  h4, h5, h6 {
    font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.24px;

    color: #4f4f4f;

    padding: 0;
    margin: 18px 0 10px;
  }

  img {
    max-width: 100%;
  }

  ul {
    margin: 0;
  }

  li {
    p {
      margin: 0;
      margin-bottom: 10px;
    }
  }

  .img50 {
    width: 60%;
    min-width: 200px;

    img {
      border-radius: 8px;
    }
  }

  .quoteblock {
    padding: 10px 20px;
    font-style: italic;
    font-size: 120%;
    color: #777777;
    blockquote {
      margin: 0;
    }
  }

  // Tab related styling
  .tabbed {
    margin-top: 1.2em;
    .tabbed {
      margin-top: 0;
    }
  }

  .tabbed__toggle {
    padding: 5px 12px;
    display: inline-block;
    cursor: pointer;
    background-color: #DDD;
    position: relative;
    user-select: none;
    z-index: 10;
    font-weight: bold;
    font-size: 11px;
    text-transform: uppercase;

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
    position: relative;
    border-radius: 0 4px 4px 4px;
    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }

  .intro {
    background-color: #f7f7f7;
    color: rgba(0, 0, 0, 0.87);
    font-weight: 500;
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
        border-radius: 1px;
      }
    }
  }

  .faq details {
    summary {
      font-weight: bold !important;
      font-style: normal !important;
      font-size: 120% !important;
      padding-top: 15px;
    }
    .content {
      padding: 0px 20px;
    }
  }

  .faq details {
    summary {
      font-weight: bold !important;
      font-style: normal !important;
      font-size: 120% !important;
      padding-top: 15px;
    }
    .content {
      padding: 0px 20px;
    }
  }

  li details summary {
    font-weight: normal !important;
    font-style: italic;
    font-size: 100% !important;
  }

  .colist {
    padding: 12px 0;

    ol {
      list-style: none;
      counter-reset: coctr;
      padding-left: 0;
    }

    ol li {
      counter-increment: coctr;
    }

    ol li::before {
      content: counter(coctr);
      display: inline-block;
      float: left;
      width: 10px !important;
      height: 10px !important;
      line-height: 10px !important;
      font-size: 10px;
      color: black !important;
      background-color: rgba(0,0,0,0.08)!important;
      border-radius: 50%;
      text-align: center;
      font-weight: 500;
      font-style: normal;
      position: relative;
      user-select: none;

      padding: 3px;
      margin-right: 4px;
      margin-top: 4px;
    }
  }

  .card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    background-color: #F8F8F8;
    padding: 20px 20px 0px 20px;
    margin: 10px;
    border-radius: 8px;
    min-width: 300px;
    width: 45%;
    height: 165px;
    float: left;
    overflow: auto;
  }
  .cardht165 { height: 165px; }
  .cardht190 { height: 190px; }
  .cardht230 { height: 230px; }
  .clearfloat {
    clear: both;
    margin: 30px 0;
  }

  .fp,
  .filepath {
    font-family: Menlo, Monaco, "Liberation Mono", Consolas, monospace;
  }

  .term {
    font-style: italic;
  }

  .singlespaced li p {
    margin: 0;
  }

  .uicontrol {
    font-weight: bold !important;
  }

  .msgnum,
  .msgph,
  .msgblock {
    font-family: Menlo, Monaco, "Liberation Mono", Consolas, monospace;
  }

  .api-ref-section {
    padding: 64px 0;
    border-bottom: 2px solid #f4f4f4;

    &:first-of-type {
      padding-top: 20px;
    }

    h3 {
      margin-top: 0;
    }
  }

  .api-ref-source {
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0px;

    svg {

    }
  }
`;

export default Content;
