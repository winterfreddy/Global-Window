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
        const { photos } = this.props;
        if (!photos) {
            return null;
        } else {
            return (
                <div>
                    <header className='sidebar-header'>THIS IS SIDEBAR</header>
                    <span className='sidebar-content-container'>
                        SIDEBAR CONTENT
                    {photos.map(photo => <SidebarItem photo={photo} />)}
                    </span>
                </div>
            );
        }
    }
}

export default Sidebar;