import React from 'react';

class SidebarItem extends React.Component {
    render() {
        const { photo } = this.props;
        return (
            <div>
                <img className='sidebar-img-item' src={photo.imageURL}/>
                <br/>
                <div>{photo.description}</div>
            </div>
        );
    }
}

export default SidebarItem; 