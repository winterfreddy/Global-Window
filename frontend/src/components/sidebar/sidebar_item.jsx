import React from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/sidebar.scss";

const darkMode = {
  styles: [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ],
};

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: this.props.photo,
    };

    this.handlePanTo = this.handlePanTo.bind(this);
    this.handleFavorites = this.handleFavorites.bind(this);
  }

  handlePanTo() {
    const allPhotos = this.props.photos;
    const { lat, lng } = this.props.photo.coordinates;
    const google = window.google;
    const mapProp = {
      center: new google.maps.LatLng(lat, lng),
      zoom: 12,
    };
    const googleAPIMap = [
      ...document.getElementsByClassName("google-api-map"),
    ][0];
    const map = new google.maps.Map(googleAPIMap, mapProp);
    // console.log("Map: ", map);
    map.setOptions({ styles: darkMode.styles });
    
    // Put this in localStorage, the if statement gets triggered after 
    // clicking on 'Location' twice
    // map.addListener("dragend", function () {
    //   console.log("map: ", map);
    //   if (map.__proto__.getBounds()) {
    //     console.log("LAT: ", map.__proto__.getBounds().getNorthEast().lat());
    //     console.log("LNG: ", map.__proto__.getBounds().getNorthEast().lng());
    //   }
    // });
    // console.log("MAP: ", map.__proto__.getBounds());

    // TESTING BEGIN
    // let newLat = null;
    // let newLng = null;
    // let bounds = null;
    // while (!bounds) {
    //     setTimeout()
    //     bounds = map.__proto__.getBounds()
    // }
    // newLat = bounds.getNorthEast().lat();
    // newLng = bounds.getNorthEast().lng();
    // console.log(newLat)
    // console.log(newLng)
    // while(map.__proto__.getBounds() === undefined) {
    //     map.__proto__.getBounds();
    // }

    // const locButton = document.getElementById("triple-click");
    // for(let i = 0; i < 3; i++) {
    //     return locButton.click();
    // }

    // if (map.__proto__.getBounds()) {
    //   console.log("LAT: ", map.__proto__.getBounds().getNorthEast().lat());
    //   console.log("LNG: ", map.__proto__.getBounds().getNorthEast().lng());
    // }
    // TESTING END

    let markers;
    markers = allPhotos.map((point) => {
      const marker = new google.maps.Marker({
        position: point.coordinates,
        map,
      });
      const infowindow = new google.maps.InfoWindow({
        content: point.description,
      });
      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
    });

    const panPoint = new google.maps.LatLng(lat, lng);
    console.log("panPoint: ", panPoint);
    map.panTo(panPoint);
  }

  handleFavorites() {
    const {
      favorites,
      photo,
      currentUserId,
      makeFavorite,
      unFavorite,
      fetchPhotos,
      fetchPhoto,
    } = this.props;
    let clickAction;
    if (favorites[photo._id] !== undefined) {
      if (favorites[photo._id].favoriterId === currentUserId) {
        clickAction = unFavorite(favorites[photo._id].photoId)
          .then((photoId) => fetchPhoto(photoId.id.data))
          .catch((err) => console.log(err.response));
      } else {
      }
    } else {
      console.log(favorites[photo._id]);
      console.log("hitting fave");
      clickAction = makeFavorite({ photoId: photo._id })
        .then((photo) => fetchPhoto(photo.favorite.data.photoId))
        .catch((err) => console.log(err));
    }
    return clickAction;
  }

    handlePanTo() {
        const allPhotos = this.props.photos;
        console.log(allPhotos);
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
            if(!allPhotos[this.state.photo._id]) {
                const marker = new google.maps.Marker({
                    position: this.state.photo.coordinates,
                    map
                });
                const infowindow = new google.maps.InfoWindow({
                    content: this.state.photo.description
                });
                marker.addListener("click", () => {
                    infowindow.open(map, marker);
                });    
            }

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
            fetchPhotos,
            fetchPhoto
        } = this.props;
        let clickAction;
        if (favorites[photo._id]) {
            if (favorites[photo._id].creatorId === currentUserId) {
                // console.log("hitting unfave");
                clickAction = unFavorite(favorites[photo._id]._id)
                    .then(photoId => fetchPhoto(photoId.id.data))
                    .catch(err => console.log(err.response));
            } else if (favorites[photo._id].favoriterId === currentUserId) {
                // console.log("hitting unfave");
                clickAction = unFavorite(favorites[photo._id].photoId)
                    .then(photoId => fetchPhoto(photoId.id.data))
                    .catch(err => console.log(err.response));
            }
        } else {
            // console.log(favorites[photo._id]);
            // console.log('hitting fave');
            clickAction = makeFavorite({ photoId: photo._id })
                .then(photo => fetchPhoto(photo.favorite.data.photoId)).catch(err => console.log(err));
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
            // console.log(photo);
            deleteButton = (
                <i className="far fa-trash-alt" onClick={() => deletePhoto(photo._id).then(() => fetchPhotos())}></i>
            );
            editButton = (
                <Link to={`/edit/${photo._id}`}>
                    <i className="far fa-edit"></i>
                </Link>
            );
        }

        let favoriteButton = (
            <div>
                <i className="fas fa-heart" onClick={this.handleFavorites}></i>
            </div>
        )

        if(favorites[photo._id]) {
            // console.log("liked");
            favoriteButton = (
                <div className="favorite-like">
                    <i className="fas fa-heart" onClick={this.handleFavorites}></i>
                </div>
            );
        }

        if (!users[photo.creatorId]) {
            return null;
        } else {
            return (
                <div className='sidebar-item'>
                    <img className='sidebar-img-item' src={photo.imageURL}/>
                    <br/>
                    <div className="sidebar-item-description">"{photo.description}"</div>
                    <br/>
                    <div className="sidebar-item-other-info">
                        <div className='sidebar-username'>@{users[photo.creatorId].username}</div>
                        <div className="sidebar-item-timestamp">{photo.created}</div>
                        <div className='sidebar-item-tags'>Tags: {photo.tags.join(', ')}</div>
                    </div>
                    <br/>
                    <div className="sidebar-item-actions">
                        <div className="item-favorites">
                            {favoriteButton}
                            {/* <i className="fas fa-heart" onClick={this.handleFavorites}></i> */}
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
