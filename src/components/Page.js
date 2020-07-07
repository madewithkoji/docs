import React from 'react';
import DocsDrawer from '../components/DocsDrawer';
import AppBar from '../components/AppBar';
import Layout from "../layouts"

const Page = (props) => {
  console.log('p', props);
  return (
    <Layout>
      <AppBar />
      <DocsDrawer visible={props.drawer === 'docs'} />
      {props.children}
    </Layout>
  );
};

export default Page;
