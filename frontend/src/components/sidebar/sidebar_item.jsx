import React from 'react';
import { Link } from 'react-router-dom';
// import { Map } from 'google-maps-react';
import '../../stylesheets/sidebar.scss';

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

class SidebarItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photo: this.props.photo,
            // google: this.props.google
        }

        this.handlePanTo = this.handlePanTo.bind(this);
    }

    handlePanTo() {
        const allPhotos = this.props.photos;
        const { lat, lng } = this.props.photo.coordinates;
        // console.log(allPhotos);
        // console.log(this.props.photo.coordinates);
        // console.log(window.google);
        const google = window.google;
        const mapProp = { 
            center: new google.maps.LatLng(lat, lng),
            zoom: 12
        }
        // console.log([...document.getElementsByClassName('google-api-map')][0]);
        const googleAPIMap = [...document.getElementsByClassName('google-api-map')][0];
        const map = new google.maps.Map(googleAPIMap, mapProp);
        map.setOptions({ styles: darkMode.styles });

        let markers;
        markers = allPhotos.map(point => {
            const marker = new google.maps.Marker({
                position: point.coordinates,
                map
            });
            const infowindow = new google.maps.InfoWindow({
                content: point.description
            });
            marker.addListener("click", () => {
                infowindow.open(map, marker);
            });
        })

        const panPoint = new google.maps.LatLng(lat, lng);
        map.panTo(panPoint);
    }

    render() {
        const { currentUserId, photo, fetchPhotos, deletePhoto } = this.props;
        // console.log(this.props);
        let deleteButton;
        let editButton;
        if (photo.creatorId === currentUserId) {
            deleteButton = (
                <button onClick={() => deletePhoto(photo._id).then(() => fetchPhotos())}>Delete</button>
            );
            editButton = (
                <Link to={`/edit/${photo._id}`}>
                    <button>Edit Location</button>
                </Link>
            );
        }
        return (
            <div className='sidebar-item'>
                <img className='sidebar-img-item' src={photo.imageURL}/>
                <br/>
                <div>{photo.description}</div>
                <br/>
                <div>{photo.created}</div>
                {deleteButton}
                {editButton}
                <button onClick={this.handlePanTo}>Locate me!</button>
            </div>
        );
    }
}

export default SidebarItem; 