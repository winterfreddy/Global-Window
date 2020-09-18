import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import UploadImageFormContainer from './upload_image_form_container';
import EditImageFormContainer from './edit_image_form_container';

// Initial Maps Coords
const INIT_CENTER_LAT = 37.7941135;
const INIT_CENTER_LNG = -122.4126891;
export const INIT_NE_LAT = 37.90422179588181;
export const INIT_NE_LNG = -122.19241635173456;
export const INIT_SW_LAT = 37.683840859595705;
export const INIT_SW_LNG = -122.6329618482654;


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
      lng: "",
      neLatBound: INIT_NE_LAT,
      neLngBound: INIT_NE_LNG,
      swLatBound: INIT_SW_LAT,
      swLngBound: INIT_SW_LNG,
      searchInput: "",
    };

    this.mapClick = this.mapClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    }, () => marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png'));
  }

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

  centerMoved = (mapProps, map) => {
    this.setState({ neLatBound: map.getBounds().getNorthEast().lat()});
    this.setState({ neLngBound: map.getBounds().getNorthEast().lng()});
    this.setState({ swLatBound: map.getBounds().getSouthWest().lat()});
    this.setState({ swLngBound: map.getBounds().getSouthWest().lng()}); 
  }

  handleInput(e) {
    this.setState({ searchInput: e.currentTarget.value });
  }
  
  handleSearch() {
    const { neLatBound, neLngBound, swLatBound, swLngBound, searchInput } = this.state;
    let url = `?lat1=${neLatBound}&lng1=${neLngBound}&lat2=${swLatBound}&lng2=${swLngBound}`;
    if (searchInput !== "") {
      url += `&tags=${searchInput}`
    }
    this.props.fetchPhotosInArea(url);
  }

  status(photoId) {
    const { favorites } = this.props;
    let favoriteStatus = 'unFavorited';
    favorites.forEach(favorite => {
      if (photoId === favorite.photoId) {
        favoriteStatus = "Favorited";
      }
    });
    return favoriteStatus;
  }

  render() {
    let uploadForm;
    let editForm;
    if (this.props.location.pathname === '/upload') {
      uploadForm = (
      <div className='image-upload-form-container'>
        <UploadImageFormContainer lat={this.state.lat} lng={this.state.lng} />
      </div>);
    } 
    let markers;
    if (this.props.photos) {
      markers = this.props.photos.map(photo => <Marker 
        key={photo._id} 
        position={photo.coordinates} 
        onClick={this.onMarkerClick}
        imageURL={photo.imageURL}
        numFavorites={photo.numFavorites}
        tags={photo.tags} 
        description={photo.description}
        photoId={photo._id}
        />)
        
    }
    return (
      <div className="google-maps-images-container">
        <div id="mainpage-google-map">
          <div className="search-bar">
            <input type="text" className="search-bar-input" value={this.state.searchInput} onChange={this.handleInput} placeholder="Find photos by tag or just press search to update"/>
            <button className="search-button" onClick={this.handleSearch}>
              <i className="fas fa-search"></i>
            </button>
            <Link to='/upload' className='upload'>
              <button className='upload-btn'><i className="fas fa-upload"></i>&nbsp;Upload</button>
            </Link>
          </div>
          <Map
            id="google-api-map"
            className={
              this.props.formType === "upload"
                ? "google-api-map-upload"
                : "google-api-map"
            }
            google={this.props.google}
            zoom={12}
            styles={darkMode.styles}
            initialCenter={{
              lat: INIT_CENTER_LAT,
              lng: INIT_CENTER_LNG,
            }}
            onClick={
              this.props.location.pathname === "/upload"
                ? this.mapClick
                : () => console.log("click inactive")
            }
            onDragend={this.centerMoved}
            onZoomChanged={this.centerMoved}
          >
            {markers}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div className='info-window-container'>
                <img className='info-window-img' src={this.state.selectedPlace.imageURL}/>
                <div className='info-window-subcontainer'>
                  <h4 className='info-window-description'>{this.state.selectedPlace.description}</h4>
                  <h4 className='info-window-faves'>
                    <i className='fas fa-heart' id={this.status(this.state.selectedPlace.photoId)}></i>
                    {this.state.selectedPlace.numFavorites}</h4>
                </div>
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
