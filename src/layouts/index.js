import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { ThemeProvider } from '@material-ui/core/styles';
import { useStaticQuery, graphql } from 'gatsby';
import theme from '../theme';
import AppBar from '../components/AppBar';
import Content from '../components/Content';
import Drawers from '../components/Drawers';

const Wrapper = styled.div`
  display: flex;
`;

const Layout = (props) => {
  const data = useStaticQuery(graphql`
    query {
      allNavItem {
        nodes {
          id
          defaultPath
          name
          sections {
            items {
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
  const [currentH2, setCurrentH2] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!elements) {
            elements = Array.from(document.querySelectorAll('h2')).map(({ id, offsetTop }) => ({
              id,
              offsetTop,
            }));
          }

          const height = contentRef.current.children[0].offsetHeight;
          const scrollPos = contentRef.current.scrollTop;

          elements.forEach(({ id, offsetTop }) => {
            if (Math.abs(scrollPos - offsetTop) < 200) setCurrentH2(id);
          });

          if (!elements || elements.length === 0) return;

          if (scrollPos + contentRef.current.offsetHeight + 32 > height) setCurrentH2(elements[elements.length - 1].id);
          if (scrollPos < 64) setCurrentH2(elements[0].id);
          ticking = false;
        });

        ticking = true;
      }
    };

    if (contentRef && contentRef.current) contentRef.current.addEventListener('scroll', onScroll);

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener('scroll', onScroll);
        ticking = false;
      }
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
            currentH2={currentH2}
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
