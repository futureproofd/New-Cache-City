import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
`;

export const FormStyle = styled.form`
  padding: 20px;
  font-size: 1.2rem;
  line-height: 1.5;
  font-weight: 400;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  h1 {
    font-weight: 100;
    font-size: 0.75rem;
    padding: 0.5rem;
  }
  img {
    width: 120px;
    padding: 0.5rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid ${props => props.theme.black};
    border-radius: 3px;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.blue};
    }
  }

  button,
  input[type="submit"] {
    width: auto;
    background: ${props => props.theme.blue};
    color: white;
    border: 0;
    border-radius: 5px;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    cursor: pointer;
    &[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: "";
      display: block;
      background-image: linear-gradient(
        to right,
        #0061ff 0%,
        #ffffff 50%,
        #0061ff 100%
      );
    }
    &[aria-busy="true"]::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export const FormEditStyle = styled.form`
  padding: 20px;
  font-size: 1.2rem;
  line-height: 1.5;
  font-weight: 400;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  dialog {
    box-shadow: 0 4px 2px -2px grey;
    position: static;
    width: 950px;
    height: 650px;
    top: 50%;
  }
  h1 {
    font-weight: 100;
    font-size: 0.75rem;
    padding: 0.5rem;
  }

  input,
  textarea,
  select {
    width: 60%;
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    background: rgba(0, 0, 0, 0.02);
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.blue};
    }
  }
  button,
  input[type="submit"] {
    width: auto;
    background: ${props => props.theme.blue};
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    cursor: pointer;
    &[disabled] {
      opacity: 0.8;
      cursor: not-allowed;
    }
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 1;
    }
    &::before {
      height: 8px;
      content: "";
      display: block;
      background-image: linear-gradient(
        to right,
        #0061ff 0%,
        #ffffff 50%,
        #0061ff 100%
      );
    }
    &[aria-busy="true"]::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export const DialogImage = styled.img`
  width: inherit;
  height: inherit;
`;

export const MapImage = styled.img`
  width: 80%;
  height: 80%;
  padding: 0.5rem;
`;

export const CacheImage = styled.img`
  width: 600px;
  padding: 0.5rem;
`;

export const Message = styled.label`
  margin-bottom: 0.2em;
  color: red;
  font-size: 1rem;
  display: block;
`;
