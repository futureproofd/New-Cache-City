/* eslint-disable prefer-const */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const MarkerComponent = ({ text }) => <div>{text}</div>;

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

  // Make marker component draggable
  onMouseDown = (childKey, childProps, mouse) => {
    this.setState({ draggable: false });
  };

  onMouseMove = (childKey, childProps, mouse) => {
    this.setState({
      markerCenter: mouse,
    });
  };

  onMouseUp = (childKey, childProps, mouse) => {
    this.setState({
      markerCenter: mouse,
      center: mouse,
      draggable: true,
    });
  };

  render() {
    let {
 center, draggable, markerCenter, name 
} = this.state;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '90%' }}>
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
            text={name}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;
