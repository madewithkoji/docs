/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { navigate } from '@reach/router';

import AppBar from '../components/AppBar';
import AppSubBar from '../components/AppSubBar';
import Content from '../components/Content';
import LeftNav from '../components/LeftNav';
import Search from '../components/Search';
import SEO from '../components/Seo';

import '../styles/adoc-koji.css';
import './index.css';

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: #ffffff;
  position: relative;
  top: 0;
  width: 100%;
  z-index: 100;

  @media screen and (max-width: 768px) {
    position: fixed;
    top: 0;
  }
`;

const Main = styled.div`
  margin-top: 0;

  @media screen and (max-width: 768px) {
    margin-top: 114px;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  width: calc(100% - 60px);
  max-width: 1100px;
  margin: 16px auto 0 auto;
  min-height: calc(100% - 114px);
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 199;
`;

const SearchWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: ${({ style: { isSearching } }) => isSearching ? 'block' : 'none'};
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
      site {
        siteMetadata {
          title
          description
          url
          image
        }
      }
    }
  `);

  const [isSearching, setIsSearching] = useState(false);

  const containerRef = useRef(null);
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
    if (!props.location.hash && containerRef.current) containerRef.current.scrollTo(0, 0);

    // Also reset the search visibility
    setIsSearching(() => false);
  }, [props.location]);

  // Handle the current home page redirect
  useEffect(() => {
    if (props.location.pathname === '/') navigate('/docs/getting-started/introduction');
  }, [props.location]);

  if (props.location.pathname === '/') {
    return null;
  }

  return (
    <>
      <SEO />
      <Helmet
        bodyAttributes={{
          class: typeof window !== 'undefined' && localStorage.getItem('lightCode') ? '' : 'darkCode',
        }}
      >
        <link rel={'stylesheet'} href={'https://use.typekit.net/kru4cvn.css'} />
        <link
          href={'https://fonts.googleapis.com/icon?family=Material+Icons'}
          rel={'stylesheet'}
        />
        <link
          href={'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css'}
          rel={'stylesheet'}
        />
      </Helmet>
      <Container ref={containerRef} style={{ isSearching }}>
        <SearchWrapper style={{ isSearching }}>
          <Overlay onClick={() => setIsSearching(() => false)} />
          <Search isSearching={isSearching} />
        </SearchWrapper>
        <Header>
          <AppBar navItems={data.allNavItem.nodes || []} />
          <AppSubBar
            location={props.location}
            navItems={data.allNavItem.nodes || []}
            onSearchClick={() => setIsSearching(() => true)}
          />
        </Header>
        <Main>
          <MainWrapper>
            <LeftNav
              location={props.location}
              navItems={data.allNavItem.nodes || []}
            />
            <Content contentRef={contentRef} currentHeader={currentHeader}>
              {props.children}
            </Content>
          </MainWrapper>
        </Main>
      </Container>
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
