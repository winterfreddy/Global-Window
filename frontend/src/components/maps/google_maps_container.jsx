import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import ImageUploadFormContainer from './image_upload_form_container';

const mapStyles = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
      lat: "",
      lng: ""
    };

    this.mapClick = this.mapClick.bind(this);
  }

  onMarkerClick = (props, marker, e) => 
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  mapClick(mapProps, map, clickEvent) {
    const { google } = this.props;

    let tmpCoordinates = map.addListener('click', e => {
      let tmpLatLng = placeMarkerAndPanTo(e.latLng, map);
      console.log(tmpLatLng);
      this.setState({
        lat: tmpLatLng[0],
        lng: tmpLatLng[1],
      });
      return tmpLatLng; 
    }); 
    console.log(tmpCoordinates);

    function placeMarkerAndPanTo(latLng, map) {
      let marker = new google.maps.Marker({
        position: latLng,
        map: map,
      });
      map.panTo(latLng);
      let tmpLat = latLng.lat();
      let tmpLng = latLng.lng();
      return [tmpLat, tmpLng];
    }

    console.log(this.state);
  }

  render() {
      
    return (
      <div>
        <Map
          className="google-api-map"
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{
            lat: 37.7941135,
            lng: -122.4126891,
          }}
          onClick={this.mapClick}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={"App Academy San Francisco Office"}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
        <ImageUploadFormContainer lat={this.state.lat} lng={this.state.lng} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAj-6TurQZ8nVQKKEMYKN_u7iCWuds7jpQ',
})(MapContainer);
