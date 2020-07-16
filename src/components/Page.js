import React from 'react';
import Layout from "../layouts";

const Page = (props) => {
  console.log('page render');
  return (<div>{props.children}</div>);
};

export default Page;
