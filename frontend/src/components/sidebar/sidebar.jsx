import React from 'react';
import SidebarItem from './sidebar_item';
import '../../stylesheets/sidebar.scss';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.fetchPhotos();
    }

    render() {
        const { currentUserId, photos, google, fetchPhotos, deletePhoto } = this.props;
        if (!photos) {
            return null;
        } else {
            return (
                <div>
                    <header className='sidebar-header'>THIS IS SIDEBAR</header>
                    <span className='sidebar-content-container'>
                        SIDEBAR CONTENT
                    {photos.map( (photo, idx) => <SidebarItem 
                                            key={idx} 
                                            currentUserId={currentUserId}
                                            photo={photo} 
                                            google={google}
                                            fetchPhotos={fetchPhotos}
                                            deletePhoto={deletePhoto} />)}
                    </span>
                </div>
            );
        }
    }
}

export default Sidebar;