import styled from 'styled-components';

const StyledHeader = styled.header`
  .bar {
    border-bottom: 2px solid ${props => props.theme.black};
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
    box-shadow: 0 4px 7px -2px ${props => props.theme.black};
  }
`;

export default StyledHeader;
