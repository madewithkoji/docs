import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: calc(100% - 246px);
  height: 100%;

  @media screen and (max-width: 768px) {
    width: 100%;
    
  }
`;

const Content = (props) => (
  <Container ref={props.contentRef}>
    {cloneElement(props.children, { currentHeader: props.currentHeader })}
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
};

Content.defaultProps = {
  contentRef: null,
  currentHeader: null,
};

export default Content;
