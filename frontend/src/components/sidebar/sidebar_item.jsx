import React from 'react';
import '../../stylesheets/sidebar.scss';

class SidebarItem extends React.Component {
    render() {
        const { photo } = this.props;
        return (
            <div className='sidebar-item'>
                <img className='sidebar-img-item' src={photo.imageURL}/>
                <br/>
                <div>{photo.description}</div>
                <br/>
                <div>{photo.created}</div>
            </div>
        );
    }
}

export default SidebarItem; 