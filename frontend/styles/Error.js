import styled from 'styled-components';

const Error = styled.div`
  padding: 1rem;
  background: white;
  margin: 1rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 20;
  }
  strong {
    margin-right: 1rem;
  }
`;

export default Error;
