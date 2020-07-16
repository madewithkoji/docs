import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { ThemeProvider } from '@material-ui/core/styles';
import { useStaticQuery, graphql } from 'gatsby';
import theme from '../theme';
import AppBar from '../components/AppBar';
import Drawer from '../components/Drawer';

const Wrapper = styled.div`
  display: flex;
`;

const Content = styled.div`
  margin-top: 64px;
  margin-left: ${({ style: { hasDrawer } }) => hasDrawer ? '240px' : '0'};
  width: ${({ style: { hasDrawer } }) => hasDrawer ? 'calc(100vw - 240px)' : '100vw'};
  height: calc(100vh - 64px);
  overflow: auto;
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

  const { allNavItem: { nodes: navItems = [] } } = data;
  const hasDrawer = navItems.map(({ root }) => props.location.pathname.includes(root)).reduce((a, b) => a || b);

  return (
    <>
      <Helmet>
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
          <AppBar />
          {
            navItems.map((navItem) => {
              if (props.location.pathname.includes(navItem.root)) {
                return (
                  <Drawer
                    key={navItem.root}
                    location={props.location}
                    navItem={navItem}
                  />
                );
              }
              return null;
            })
          }
          <Content style={{ hasDrawer }}>
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
