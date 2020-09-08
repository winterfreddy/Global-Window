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
            currPage: 0,
            filter: 'All Content'
        }
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }

    componentDidMount() {
        if(this.props.currentUserId !== undefined) {
            let test = this.props.fetchUserFaves(this.props.currentUserId);
            // console.log(test);
        }
        const url = `?lat1=${INIT_NE_LAT}&lng1=${INIT_NE_LNG}&lat2=${INIT_SW_LAT}&lng2=${INIT_SW_LNG}`;
        this.props.fetchPhotosInArea(url)
            .then(() => this.props.fetchUsers())
            .then(() => this.props.fetchUserFaves(this.props.currentUserId))
    }

    componentDidUpdate(prevProps) {
        if (this.props.photos.length !== prevProps.photos.length) {
            // const renderedSideBar = document.getElementsByClassName("sidebar-content-container")[0];
            // if (renderedSideBar !== undefined) renderedSideBar.scrollTop = 0;
            if (this.state.currPage > 0) this.setState({ currPage: 0 });
        }
    }

    handleNext() {
        this.setState({ currPage: { ...this.state }.currPage += 1 })
        document.getElementsByClassName("sidebar-content-container")[0].scrollTop = 0;
    }

    handlePrev() {
        this.setState({ currPage: { ...this.state }.currPage -= 1 })
        document.getElementsByClassName("sidebar-content-container")[0].scrollTop = 0;
    }
    
    render() {
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
            fetchUserFave, 
            fetchPhotosInArea
        } = this.props;
        // console.log(favorites);
        // console.log(Object.values(this.props.favorites).length);

        let prevBtn;
        let nextBtn;
        let allResults;
        let numPages = (Math.floor((photos.length - 1) / 10) < 0) ? (0) : (Math.floor((photos.length - 1) / 10));
        let pages = {};
        let sidebarFilter;
        let allContent;
        let favoriteContent;

        // let copyPhotos = this.state.filter === "All Content" ? [...photos] : [...Object.values(favorites)];
        let copyPhotos = [...photos];
        for (let i = 0; i <= numPages; i++) {
            let subPage = [];
            [0,1,2,3,4,5,6,7,8,9].forEach(num => subPage.push(copyPhotos.shift()));
            pages[i] = subPage.filter(ele => ele !== undefined);
        }

        if (numPages > 0 && this.state.currPage < numPages) {
            nextBtn = (
                <button className='next-btn' onClick={this.handleNext}>Next</button>
                ); 
        }
            
        if (this.state.currPage > 0) {
            prevBtn = (
                <button className='prev-btn' onClick={this.handlePrev}>Previous</button>
                );
        }

        const dropdown = () => {
            document.getElementById("myDropdown").classList.toggle("show");
        }

        sidebarFilter = (
            <div className="dropdown-filter">
                <button onClick={() => dropdown()} className="dropdown-filter-button" type="button"><i className="fas fa-filter"></i>&nbsp;Filter&nbsp;by:</button>
                <div id="myDropdown" className="dropdown-content-filter">
                    <button className="filter-item" onClick={() => this.setState({ filter: 'All Content' })}>All Content</button>
                    <button className="filter-item" onClick={() => this.setState({ filter: 'Favorites' })}>Favorites</button>
                </div>
            </div>
        )

        if (photos.length <= 10) {
            allResults = <button disabled className="all-results">All Results</button>
        }
        
        if (pages[this.state.currPage] === undefined) {
            return null;
        } else {
            return (
              <div>
                {/* <div className="filter-action">
                    {sidebarFilter}
                    <label>{this.state.filter}</label>
                </div> */}
                <span className="sidebar-content-container">
                    {pages[this.state.currPage].map((photo) => (
                        <SidebarItem
                            key={photo._id}
                            users={users}
                            currentUserId={currentUserId}
                            photo={photo}
                            photos={photos}
                            google={google}
                            fetchPhotosInArea={fetchPhotosInArea}
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
                    {allResults}
                    {prevBtn}
                    {nextBtn}
                </div>
              </div>
            );
        }
    }
}

export default Sidebar;