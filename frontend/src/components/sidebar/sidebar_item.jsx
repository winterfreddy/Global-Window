import React from 'react';
// import { Map } from 'google-maps-react';
import '../../stylesheets/sidebar.scss';

class SidebarItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photo: this.props.photo,
            google: this.props.google
        }

        this.handlePanTo = this.handlePanTo.bind(this);
    }


    handlePanTo(google) {
        // const { google } = this.props;
        // let google = this.state.google;
        console.log(google);
        const { lat, lng } = this.props.photo.coordinates;
        console.log(lat);
        console.log(lng);
        // const mapProp = { 
        //     center: new google.maps.LatLng(lat, lng),
        //     zoom: 5
        // }
        const map = new google.maps.Map(document.getElementById('google-api-map'))
        // console.log(map);
        const panPoint = new google.maps.LatLng(lat, lng);
        map.panTo(panPoint);
    }

    render() {
        console.log(this.props.google);
        // console.log(this.state);
        const { photo } = this.props;
        return (
            <div onClick={() => this.handlePanTo(this.props.google)} className='sidebar-item'>
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