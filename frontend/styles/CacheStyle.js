import styled from 'styled-components';

const ItemStyle = styled.div`
  background: white;
  border: 2px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  margin: 6px;
  flex-direction: column;
  a,
  button {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    text-decoration: none;
    font-weight: 700;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
  }
  h1 {
    font-size: 1.5rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    position: relative;
    z-index: 2;
    transform: skew(-7deg);
    background: ${props => props.theme.grey};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    font-weight: 200;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1rem;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

export default ItemStyle;
