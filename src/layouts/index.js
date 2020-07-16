import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import DocsDrawer from '../components/DocsDrawer';
import AppBar from '../components/AppBar';
import theme from '../../src/theme';

const Content = styled.div`
  width: ${({ style: { hasDrawer }}) => hasDrawer ? 'calc(100vw - 240px)' : '100vw'};
`;

export default function TopLayout(props) {
  const showDocsDrawer = props.location.pathname.includes('/docs');
  const showReferenceDrawer = props.location.pathname.includes('/reference');
  const hasDrawer = showDocsDrawer || showReferenceDrawer;

  return (
    <React.Fragment>
      <Helmet>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <div style={{ display: 'flex' }}>
          <AppBar />
          {
            showDocsDrawer &&
            <DocsDrawer />
          }
          <Content style={{ hasDrawer }}>
            {props.children}
          </Content>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

TopLayout.propTypes = {
  children: PropTypes.node,
};