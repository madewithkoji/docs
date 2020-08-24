/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { ThemeProvider } from '@material-ui/core/styles';
import { useStaticQuery, graphql } from 'gatsby';
import theme from '../theme';
import AppBar from '../components/AppBar';
import Content from '../components/Content';
import Drawers from '../components/Drawers';
import './index.css';

const Wrapper = styled.div`
  display: flex;

  a {
    text-decoration: none;
  }

  a[target="_blank"] {
    &:after {
      content: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>');
      position: relative;
      top: 2px;
    }
  }
`;

const Layout = (props) => {
  const data = useStaticQuery(graphql`
    query {
      allNavItem {
        nodes {
          id
          defaultPath
          idx
          name
          sections {
            idx
            items {
              idx
              name
              path
            }
            name
            root
          }
          root
        }
      }
    }
  `);

  const [mobileDrawerIsOpen, setMobileDrawerIsOpen] = useState(false);

  const contentRef = useRef(null);

  // Detect h2s on scroll
  let ticking = false;
  let elements;
  const [currentHeader, setCurrentHeader] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!elements) {
            elements = Array.from(document.querySelectorAll('h2,h3')).map(({ id, offsetTop }) => ({
              id,
              offsetTop,
            }));
          }

          const height = contentRef.current.children[0].offsetHeight;
          const scrollPos = window.scrollY;

          elements.forEach(({ id, offsetTop }) => {
            if (Math.abs(scrollPos - offsetTop) < 200) {
              setCurrentHeader(id);
            }
          });

          if (!elements || elements.length === 0) return;

          if (scrollPos + window.innerHeight > height) setCurrentHeader(elements[elements.length - 1].id);
          if (scrollPos < 64) setCurrentHeader(elements[0].id);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      ticking = false;
    };
  }, [props.location]);

  useEffect(() => {
    // If there isn't a hash on the page, scroll the content container to the top
    if (!props.location.hash && contentRef.current) contentRef.current.scrollTo(0, 0);

    // If the mobile drawer is open, close it
    if (mobileDrawerIsOpen) setMobileDrawerIsOpen(false);
  }, [props.location]);

  // Handle all clicks and allow closing of menu
  useEffect(() => {
    const onDocClick = (e) => {
      if (e.target.classList.contains('MuiBackdrop-root') && mobileDrawerIsOpen) setMobileDrawerIsOpen(false);
    };

    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [mobileDrawerIsOpen]);

  const { allNavItem: { nodes: navItems = [] } } = data;
  const hasDrawer = navItems.map(({ root }) => props.location.pathname.includes(root)).reduce((a, b) => a || b);

  return (
    <>
      <Helmet>
        <title>{'Koji for Developers'}</title>
        <meta name={'viewport'} content={'minimum-scale=1, initial-scale=1, width=device-width'} />
        <link
          href={'https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap'}
          rel={'stylesheet'}
        />
        <link
          href={'https://fonts.googleapis.com/icon?family=Material+Icons'}
          rel={'stylesheet'}
        />
        <title>Koji for Developers - Remix with Koji</title>
        <meta name="title" content="Koji for Developers - Remix with Koji"/>
        <meta name="description" content="Develop the future of social with remixable applications. Kojis are mini web applications that can be shared on all social platforms, embedded in any website, and sent via messengers and email. Everyday users can create Kojis in minutes by remixing templates and customizing them."/>

        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://developer.withkoji.com/"/>
        <meta property="og:title" content="Koji for Developers - Remix with Koji"/>
        <meta property="og:description" content="Develop the future of social with remixable applications. Kojis are mini web applications that can be shared on all social platforms, embedded in any website, and sent via messengers and email. Everyday users can create Kojis in minutes by remixing templates and customizing them."/>
        <meta property="og:image" content="/images/og-banner.jpg"/>

        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://developer.withkoji.com/"/>
        <meta property="twitter:title" content="Koji for Developers - Remix with Koji"/>
        <meta property="twitter:description" content="Develop the future of social with remixable applications. Kojis are mini web applications that can be shared on all social platforms, embedded in any website, and sent via messengers and email. Everyday users can create Kojis in minutes by remixing templates and customizing them."/>
        <meta property="twitter:image" content="/images/og-banner.jpg"/>
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Wrapper>
          <AppBar
            location={props.location}
            mobileDrawerIsOpen={mobileDrawerIsOpen}
            toggleMobileDrawer={() => setMobileDrawerIsOpen(!mobileDrawerIsOpen)}
          />
          <Drawers
            location={props.location}
            mobileDrawerIsOpen={mobileDrawerIsOpen}
            navItems={navItems}
          />
          <Content
            currentHeader={currentHeader}
            contentRef={contentRef}
            hasDrawer={hasDrawer}
          >
            {props.children}
          </Content>
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  location: PropTypes.object,
};

Layout.defaultProps = {
  location: {},
};

export default Layout;
