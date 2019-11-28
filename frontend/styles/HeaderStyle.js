import styled from 'styled-components';

const StyledHeader = styled.header`
  .bar {
    border-bottom: 3px solid black;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    background: whitesmoke;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid black;
  }
`;

export default StyledHeader;
