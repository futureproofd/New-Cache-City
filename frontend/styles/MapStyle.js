import styled from 'styled-components';

const MapStyle = styled.div`
  .map {
    padding: 100px;
    background: white;
    box-shadow: $shad;
  }
  #map {
    height: 400px;
  }

  .popup {
    width: 300px;
    img {
      width: 100%;
    }
  }
`;

export default MapStyle;
