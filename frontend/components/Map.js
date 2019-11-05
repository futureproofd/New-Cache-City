/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable prefer-const */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

// marker component inline-style
const MarkerComponent = ({ text }) => (
  <div
    style={{
      color: 'white',
      fontStyle: 'bold',
      background: 'Blue',
      padding: '5px 8px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    {text}
  </div>
);

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: props.center.lat, lng: props.center.lng },
      markerCenter: { lat: props.center.lat, lng: props.center.lng },
      draggable: true,
      name: props.name,
    };
  }

  // Make marker component draggable (toggles draggable for entire map so Marker takes focus)
  onMouseDown = (childKey, childProps, mouse) => {
    this.setState({ draggable: false });
  };

  onMouseMove = (childKey, childProps, mouse) => {
    this.setState({
      markerCenter: mouse,
    });
    let { lat, lng } = mouse;
    this.props.handler({ coordinates: { lat, lng } });
  };

  onMouseUp = (childKey, childProps, mouse) => {
    this.setState({
      markerCenter: mouse,
      draggable: true,
    });
  };

  render() {
    let { center, draggable, markerCenter } = this.state;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${process.env.GOOGLE_API_KEY}` }}
          defaultCenter={center}
          defaultZoom={16}
          draggable={draggable}
          onChildMouseDown={this.onMouseDown}
          onChildMouseMove={this.onMouseMove}
          onChildMouseUp={this.onMouseUp}
        >
          <MarkerComponent
            lat={markerCenter.lat}
            lng={markerCenter.lng}
            text="X"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;
