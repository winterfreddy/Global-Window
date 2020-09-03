import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import UploadImageFormContainer from './upload_image_form_container';
import EditImageFormContainer from './edit_image_form_container';

const mapStyles = {
  width: "100%",
  height: "100%"
};

const darkMode = {
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }]
    }
  ]  
}

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

  // componentDidMount() {
  //   this.props.fetchPhotos();
  // }

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
      this.setState({
        lat: tmpLatLng[0],
        lng: tmpLatLng[1],
      });
    }); 

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
  }

  render() {
    let uploadForm;
    let editForm;
    console.log(this.props);
    if (this.props.location.pathname === '/upload') {
      uploadForm = (
      <div className='image-upload-form-container'>
        <UploadImageFormContainer lat={this.state.lat} lng={this.state.lng} />
      </div>);
    } else if (this.props.location.pathname === '/edit/:id') {
      editForm = (
        <div>
          <EditImageFormContainer lat={this.state.lat} lng={this.state.lng} />
        </div>
      );
    }
    let markers;
    if (this.props.photos) {
      markers = this.props.photos.map(photo => <Marker 
        key={photo.id} 
        position={photo.coordinates} 
        onClick={this.onMarkerClick} 
        name={photo.description}/>)
    }

    return (
      <div className='google-maps-images-container'>
        <div>
          <Map
            className="google-api-map"
            google={this.props.google}
            zoom={12}
            styles={darkMode.styles}
            style={mapStyles}
            gestureHandling='cooperative'
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
            {markers}
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
        </div>
        {uploadForm}
        {editForm}
      </div>
    );
  }
}

export default withRouter(GoogleApiWrapper({
  apiKey: 'AIzaSyAj-6TurQZ8nVQKKEMYKN_u7iCWuds7jpQ',
})(MapContainer));
