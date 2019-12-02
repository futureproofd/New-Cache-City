/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';

/**
 * Container system for different screen sizes / layouts
 * controlled via props (default with padding)
 */
const Container = styled.div`
  padding-left: ${(props) => {
    if (props.full) return 0;
    return 'calc((100vw - 1200px) / 2)';
  }};

  padding-right: ${(props) => {
    if (props.full) return 0;
    return 'calc((100vw - 1200px) / 2)';
  }};

  padding-top: ${(props) => {
    if (props.fullVertical) return 0;
    if (props.tight) return '15px';
    return '25px';
  }};

  padding-bottom: ${(props) => {
    if (props.fullVertical) return 0;
    if (props.tight) return '15px';
    return '25px';
  }};
`;

export default Container;
