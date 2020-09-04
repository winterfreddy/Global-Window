import React from 'react';
import SidebarItem from './sidebar_item';
import '../../stylesheets/sidebar.scss';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.fetchPhotos()
    }

    render() {
        const { currentUserId, photos, google, fetchPhotos, deletePhoto } = this.props;
        if (!photos) {
            return null;
        } else {
            return (
              <div>
                <span className="sidebar-content-container">
                    {photos.map((photo) => (
                        <SidebarItem
                        key={photo._id}
                        currentUserId={currentUserId}
                        photo={photo}
                        photos={photos}
                        google={google}
                        fetchPhotos={fetchPhotos}
                        deletePhoto={deletePhoto}
                        />
                    ))}
                </span>
              </div>
            );
        }
    }
}

export default Sidebar;