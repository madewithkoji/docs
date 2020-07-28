import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Container = styled.div`
  margin-top: 64px;
  margin-left: ${({ style: { hasDrawer } }) => hasDrawer ? '240px' : '0'};
  width: ${({ style: { hasDrawer } }) => hasDrawer ? 'calc(100vw - 240px)' : '100vw'};
  height: calc(100vh - 64px);
  overflow: auto;
`;

const Content = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

  return (
    <Container ref={props.contentRef} style={{ hasDrawer: props.hasDrawer && !isMobile }}>
      {cloneElement(props.children, { currentHeader: props.currentHeader })}
    </Container>
  );
};

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
