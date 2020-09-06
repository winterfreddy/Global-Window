import React from 'react';
import SidebarItem from './sidebar_item';
import '../../stylesheets/sidebar.scss';
import {
  INIT_NE_LAT,
  INIT_NE_LNG,
  INIT_SW_LAT,
  INIT_SW_LNG,
} from "../maps/google_maps_container";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {    
        const url = `?lat1=${INIT_NE_LAT}&lng1=${INIT_NE_LNG}&lat2=${INIT_SW_LAT}&lng2=${INIT_SW_LNG}`;
        this.props
          .fetchPhotosInArea(url)
          .then(() => this.props.fetchUsers())
          .then(() => this.props.fetchUserFaves(this.props.currentUserId));
    }

    render() {
        const { 
            users,
            currentUserId, 
            photos, 
            google, 
            fetchPhotos,
            fetchPhoto, 
            deletePhoto, 
            makeFavorite, 
            unFavorite,
            favorites,
            fetchUserFave
        } = this.props;
        if (!photos) {
            return null;
        } else {
            return (
              <div>
                <span className="sidebar-content-container">
                    {photos.map((photo) => (
                        <SidebarItem
                        key={photo._id}
                        users={users}
                        currentUserId={currentUserId}
                        photo={photo}
                        photos={photos}
                        google={google}
                        fetchPhotos={fetchPhotos}
                        fetchPhoto={fetchPhoto}
                        deletePhoto={deletePhoto}
                        makeFavorite={makeFavorite}
                        unFavorite={unFavorite}
                        favorites={favorites}
                        fetchUserFave={fetchUserFave}
                        />
                    ))}
                </span>
              </div>
            );
        }
    }
}

export default Sidebar;