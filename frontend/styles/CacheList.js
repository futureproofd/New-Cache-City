import styled from 'styled-components';

const CacheList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

export default CacheList;
