import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
        }

        this.handlePanTo = this.handlePanTo.bind(this);
        this.handleFavorites = this.handleFavorites.bind(this);
    }

    handlePanTo() {
        const allPhotos = this.props.photos;
        const { lat, lng } = this.props.photo.coordinates;
        const google = window.google;
        const mapProp = { 
            center: new google.maps.LatLng(lat, lng),
            zoom: 12
        }
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

    handleFavorites() {
        const { 
            favorites, 
            photo, 
            currentUserId, 
            makeFavorite, 
            unFavorite, 
            fetchPhotos
        } = this.props;
        let clickAction;
        console.log(favorites);
        console.log(photo);
        if (favorites[photo._id] !== undefined) {
            if (favorites[photo._id].favoriterId === currentUserId) {
                console.log('hitting unfave')
                console.log(favorites[photo._id].photoId);
                // clickAction = unFavorite(favorites[photo._id].photoId).then(() => fetchPhotos()).catch(err => console.log(err));
                let formData = new FormData()
                formData.append('photoId', favorites[photo._id].photoId)
                return axios.delete('api/favorites/', formData, {
                    headers: {
                        accept: 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                        'Access-Control-Allow-Origin': '*',
                    }})
                    .then(() => fetchPhotos())
                    .catch(err => console.log(err.response));
                // clickAction = unFavorite({ photoId: favorites[photo._id].photoId})
                //     .then(() => fetchPhotos()).catch(err => console.log(err));
            } else {
            }
        } else {
            console.log(favorites[photo._id]);
            console.log('hitting fave');
            clickAction = makeFavorite({ photoId: photo._id })
                .then(() => fetchPhotos()).catch(err => console.log(err));
        } 
        return clickAction;
    }

    render() {
        const { 
            users,
            currentUserId, 
            photo, 
            fetchPhotos, 
            deletePhoto, 
            makeFavorite, 
            unFavorite,
            favorites 
        } = this.props;
        let deleteButton;
        let editButton;
        if (photo.creatorId === currentUserId) {
            deleteButton = (
                <i className="far fa-trash-alt" onClick={() => deletePhoto(photo._id).then(() => fetchPhotos())}></i>
            );
            editButton = (
                <Link to={`/edit/${photo._id}`}>
                    <i className="far fa-edit"></i>
                </Link>
            );
        }

        if (!users[photo.creatorId]) {
            return null;
        } else {
            console.log(users);
            return (
                <div className='sidebar-item'>
                    <div className='sidebar-username'>{users[photo.creatorId].username}</div>
                    <img className='sidebar-img-item' src={photo.imageURL}/>
                    <br/>
                    <div className="sidebar-item-description">"{photo.description}"</div>
                    <br/>
                    <div className="sidebar-item-timestamp">{photo.created}</div>
                    <br/>
                    <div className="sidebar-item-actions">
                        <div className="item-favorites">
                            <i className="fas fa-heart" onClick={this.handleFavorites}></i>
                            <div className="numFavorites">{photo.numFavorites}</div>
                        </div>
                        {deleteButton}
                        {editButton}
                        <i className="fas fa-map-marker-alt" onClick={this.handlePanTo}></i>
                    </div>
                </div>
            );
        }     
    }
}

export default SidebarItem; 