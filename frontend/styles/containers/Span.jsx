/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import styled, { css } from 'styled-components';
import Loader from './Loader';

const StyledSpan = styled.span`
  border-radius: 5px;
  background-color: ${props => (props.secondary ? props.theme.offBlue : props.theme.blue)};
  color: #fff;
  padding: ${(props) => {
    if (props.big) return '12px 18px';
    return '6px 10px';
  }};
  font-size: ${(props) => {
    if (props.big) return '20px';
    return '12px';
  }};
  outline: none;
  border: none;
  cursor: pointer;
  margin: 15px;
  border: 2px solid
    ${props => (props.secondary ? props.theme.offBlue : props.theme.blue)};

  ${props => props.inverse
    && css`
      background-color: #fff;
      color: props.theme.black;
    `}
`;

const Span = ({
 secondary, big, inverse, loading, children, ...props 
}) => (
  <StyledSpan secondary={secondary} big={big} inverse={inverse} {...props}>
    {loading ? <Loader small white /> : children}
  </StyledSpan>
);

export default Span;
