import React from 'react';
import SidebarItem from './sidebar_item';
import '../../stylesheets/sidebar.scss';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.fetchPhotos()
            .then(() => this.props.fetchUserFaves(this.props.currentUserId));
    }

    render() {
        const { 
            currentUserId, 
            photos, 
            google, 
            fetchPhotos, 
            deletePhoto, 
            makeFavorite, 
            unFavorite,
            favorites,
            fetchUserFave
        } = this.props;
        if (!photos || !favorites) {
            return null;
        } else {
            return (
              <div>
                <span className="sidebar-content-container">
                    <label>SIDEBAR CONTENT</label>
                    {photos.map((photo) => (
                        <SidebarItem
                        key={photo._id}
                        currentUserId={currentUserId}
                        photo={photo}
                        photos={photos}
                        google={google}
                        fetchPhotos={fetchPhotos}
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