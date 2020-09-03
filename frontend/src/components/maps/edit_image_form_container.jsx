import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PhotoForm from './photo_form';
import { fetchPhoto } from '../../actions/photo_actions';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

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

class EditImageForm extends React.Component {
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

    componentDidMount() {
        this.props.fetchPhoto(this.props.match.params.id)
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
        const { photo, formType, fetchPhoto } = this.props;
        if (!photo) {
            return null;
        } else {
            console.log(photo);
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
                                lat: photo.data.coordinates.lat,
                                lng: photo.data.coordinates.lng,
                            }}
                            onClick={this.mapClick}
                        >
                            <Marker
                                key={photo._id}
                                position={photo.coordinates}
                                onClick={this.onMarkerClick}
                                name={photo.data.description} />
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
                    <div className='image-upload-form-container'>
                        <PhotoForm
                        lat={this.state.lat}
                        lng={this.state.lng} 
                        photo={photo}
                        formType={formType}
                        fetchPhoto={fetchPhoto} />
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => ({
    photo: state.photos[ownProps.match.params.id],
    formType: 'edit photo'
});

const mapDispatchToProps = dispatch => ({
    fetchPhoto: (id) => dispatch(fetchPhoto(id)),
});

// export default withRouter(GoogleApiWrapper({
//     apiKey: 'AIzaSyAj-6TurQZ8nVQKKEMYKN_u7iCWuds7jpQ',
// })(MapContainer));
export default withRouter(GoogleApiWrapper({ apiKey: 'AIzaSyAj-6TurQZ8nVQKKEMYKN_u7iCWuds7jpQ'})(connect(mapStateToProps, mapDispatchToProps)(EditImageForm)));