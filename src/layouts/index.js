import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { ThemeProvider } from '@material-ui/core/styles';
import { useStaticQuery, graphql } from 'gatsby';
import theme from '../../src/theme';
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

const TopLayout = (props) => {
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
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default TopLayout;
