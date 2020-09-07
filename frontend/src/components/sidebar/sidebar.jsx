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
        this.state = {
            photoStart: 0,
            photoEnd: 10,
            photosSet: [],
        }
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }

    componentDidMount() {
        const url = `?lat1=${INIT_NE_LAT}&lng1=${INIT_NE_LNG}&lat2=${INIT_SW_LAT}&lng2=${INIT_SW_LNG}`;
        this.props.fetchPhotosInArea(url)
            .then(() => this.props.fetchUsers())
            .then(() => this.props.fetchUserFaves(this.props.currentUserId))
            .then(() => this.setState({ 
                photosSet: this.props.photos.slice(this.state.photoStart, this.state.photoEnd) 
            }));
    }

    handleNext() {
        let copyPhotoStart = {...this.state}.photoStart;
        let copyPhotoEnd = {...this.state}.photoEnd;
        this.setState({ 
            photoStart: copyPhotoStart += 10, 
            photoEnd: copyPhotoEnd += 10,
            photosSet: this.props.photos.slice(copyPhotoStart+=10, copyPhotoEnd+=10) 
        }, () => this.state.photosSet.forEach(photo => {
            this.props.fetchPhoto(photo._id)
        }));
    }

    handlePrev() {
        let copyPhotoStart = {...this.state}.photoStart;
        let copyPhotoEnd = {...this.state}.photoEnd;
        let prevTenStart = (copyPhotoStart - 10 < 0) ? (0) : (copyPhotoStart -= 10);
        let prevTenEnd = (copyPhotoEnd - 10 < 10) ? (10) : (copyPhotoEnd -= 10);
        this.setState({ 
            photoStart: prevTenStart,
            photoEnd: prevTenEnd,
            // photoStart: copyPhotoStart -= 10,
            // photoEnd: copyPhotoEnd -= 10,
            photosSet: this.props.photos.slice(prevTenStart, prevTenEnd)
        }, () => {
            console.log(this.state.photosSet);
            this.state.photosSet.forEach(photo => {
            this.props.fetchPhoto(photo._id)
        })});  
    }

    render() {
        console.log('photoStart ', this.state.photoStart);
        console.log('photoEnd ', this.state.photoEnd);
        console.log(this.state.photosSet);

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

        let prevBtn;
        let nextBtn;

        if (photos.length > 10 && this.state.photoEnd + 10 < photos.length ) {
           nextBtn = (
                <button className='next-btn' onClick={this.handleNext}>Next</button>
           ); 
        };

        if (this.state.photoStart > 0) {
            prevBtn = (
                <button className='prev-btn' onClick={this.handlePrev}>Prev</button>
            );
        }
        
        if (!photos || !this.state.photosSet) {
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
                <div className="sidebar-buttons">
                    {prevBtn}
                    {nextBtn}
                </div>
              </div>
            );
        }
    }
}

export default Sidebar;