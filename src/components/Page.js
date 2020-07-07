import React from 'react';
import DocsDrawer from '../components/DocsDrawer';
import AppBar from '../components/AppBar';
import Layout from "../layouts"

const Page = (props) => {
  return (
    <Layout>
      <AppBar />
      {
        props.drawer === 'docs' &&
        <DocsDrawer visible={props.drawer === 'docs'} />
      }
      {props.children}
    </Layout>
  );
};

export default Page;
