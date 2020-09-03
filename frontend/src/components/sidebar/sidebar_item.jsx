import React from 'react';
// import { Map } from 'google-maps-react';
import '../../stylesheets/sidebar.scss';

class SidebarItem extends React.Component {
    constructor(props) {
        super(props);

        this.handlePanTo = this.handlePanTo.bind(this);
    }


    handlePanTo() {
        const { google } = this.props;
        const { lat, lng } = this.props.photo.coordinates;
        // const mapProp = { 
        //     center: new google.maps.LatLng(lat, lng),
        //     zoom: 5
        // }
        const map = new google.maps.Map(document.getElementsByClassName('google-api-map'))
        console.log(map);
        const panPoint = new google.maps.LatLng(lat, lng);
        map.panTo(panPoint);
    }

    render() {
        const { photo } = this.props;
        return (
            <div onClick={this.handlePanTo} className='sidebar-item'>
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