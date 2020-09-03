import React from 'react';
// import { Map } from 'google-maps-react';
import '../../stylesheets/sidebar.scss';

class SidebarItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photo: this.props.photo,
            // google: this.props.google
        }

        this.handlePanTo = this.handlePanTo.bind(this);
    }

    handlePanTo() {
        // const { google } = this.props;
        // let google = this.state.google;
        // console.log(this.state.google);
        // console.log(this.props.google);
        const { lat, lng } = this.props.photo.coordinates;
        console.log(lat);
        console.log(lng);
        console.log(window.google);
        const google = window.google;
        const mapProp = { 
            center: new google.maps.LatLng(lat, lng),
            zoom: 12
        }
        console.log([...document.getElementsByClassName('google-api-map')][0]);
        const googleAPIMap = [...document.getElementsByClassName('google-api-map')][0];
        const map = new google.maps.Map(googleAPIMap, mapProp);
        // const map = new google.maps.Map(document.getElementById('map'), mapProp);
        // if(map) {
        //     console.log("check");
        const panPoint = new google.maps.LatLng(lat, lng);
        map.panTo(panPoint);
        // }
        // console.log(panPoint);
        // console.log("check2");
    }

    render() {
        const { currentUserId, photo, fetchPhotos, deletePhoto } = this.props;
        // console.log(this.props);
        let deleteButton;
        if (photo.creatorId === currentUserId) {
            deleteButton = (
                <button onClick={() => deletePhoto(photo._id).then(() => fetchPhotos())}>Delete</button>
            )
        }
        return (
            <div className='sidebar-item'>
                <img className='sidebar-img-item' src={photo.imageURL}/>
                <br/>
                <div>{photo.description}</div>
                <br/>
                <div>{photo.created}</div>
                {deleteButton}
                <button onClick={this.handlePanTo}>Locate me!</button>
            </div>
        );
    }
}

export default SidebarItem; 