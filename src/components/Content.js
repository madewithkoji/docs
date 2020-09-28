import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Footer from './HomePage/Footer';

const Container = styled.div`
  margin-top: 64px;
  margin-left: ${({ style: { hasDrawer } }) => hasDrawer ? '240px' : '0'};
  width: ${({ style: { hasDrawer } }) => hasDrawer ? 'calc(100vw - 240px)' : '100vw'};
  overflow-x: hidden;

  @media screen and (max-width: 1023px) {
    margin-left: 0 !important;
    width: 100vw !important;
  }
`;

const Content = (props) => (
  <Container ref={props.contentRef} style={{ hasDrawer: props.hasDrawer }}>
    {cloneElement(props.children, { currentHeader: props.currentHeader })}
    <Footer/>
  </Container>
);

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  contentRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  currentHeader: PropTypes.string,
  hasDrawer: PropTypes.bool,
};

Content.defaultProps = {
  contentRef: null,
  currentHeader: null,
  hasDrawer: false,
};

export default Content;
