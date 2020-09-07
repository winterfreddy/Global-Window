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
            // photoStart: 0,
            // photoEnd: 10,
            // photosSet: []
            // statePages: null
            currPage: 0,
            filter: 'All Content'
        }
        // this.handleNext = this.handleNext.bind(this);
        // this.handlePrev = this.handlePrev.bind(this);
    }

    componentDidMount() {
        const url = `?lat1=${INIT_NE_LAT}&lng1=${INIT_NE_LNG}&lat2=${INIT_SW_LAT}&lng2=${INIT_SW_LNG}`;
        this.props.fetchPhotosInArea(url)
            .then(() => this.props.fetchUsers())
            .then(() => this.props.fetchUserFaves(this.props.currentUserId))
            // .then(() => this.setState({ 
            //     photosSet: this.props.photos.slice(this.state.photoStart, this.state.photoEnd) 
            // }));
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.photos.length !== this.props.photos.length) {
    //         this.setState({ 
    //             photosSet: this.props.photos.slice(this.state.photoStart, this.state.photoEnd 
    //         )});
    //     }
    // }

    // handleNext() {
    //     let copyPhotoStart = {...this.state}.photoStart;
    //     let copyPhotoEnd = {...this.state}.photoEnd;
    //     debugger
    //     this.setState({ 
    //         photoStart: copyPhotoStart += 10, 
    //         photoEnd: copyPhotoEnd += 10,
    //         photosSet: this.props.photos.slice(copyPhotoStart += 10, copyPhotoEnd += 10) 
    //     }, () => this.state.photosSet.forEach(photo => {
    //         debugger
    //         this.props.fetchPhoto(photo._id)
    //     }));
    // }

    // handlePrev() {
    //     let copyPhotoStart = {...this.state}.photoStart;
    //     let copyPhotoEnd = {...this.state}.photoEnd;
    //     let prevTenStart = (copyPhotoStart - 10 < 0) ? (0) : (copyPhotoStart -= 10);
    //     let prevTenEnd = (copyPhotoEnd - 10 < 10) ? (10) : (copyPhotoEnd -= 10);
    //     this.setState({ 
    //         photoStart: prevTenStart,
    //         photoEnd: prevTenEnd,
    //         photosSet: this.props.photos.slice(prevTenStart, prevTenEnd)
    //     }, () => {
    //         console.log(this.state.photosSet);
    //         this.state.photosSet.forEach(photo => {
    //         this.props.fetchPhoto(photo._id)
    //     })});  
    // }

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
            fetchUserFave
        } = this.props;

        let prevBtn;
        let nextBtn;
        let numPages = Math.floor(photos.length / 10);
        // let currPage = 0;
        let pages = {};
        let sidebarFilter;

        let copyPhotos = [...photos];
        for (let i = 0; i <= numPages; i++) {
            let subPage = [];
            [0,1,2,3,4,5,6,7,8,9].forEach(num => subPage.push(copyPhotos.shift()));
            pages[i] = subPage.filter(ele => ele !== undefined);
        }

        if (numPages > 0 && this.state.currPage < numPages) {
            nextBtn = (
                // <button className='next-btn' onClick={this.handleNext}>Next</button>
                <button className='next-btn' onClick={() => this.setState({ currPage: {...this.state}.currPage +=1 })}>Next</button>
                ); 
        }
            
        if (this.state.currPage > 0) {
            prevBtn = (
                // <button className='prev-btn' onClick={this.handlePrev}>Prev</button>
                <button className='prev-btn' onClick={() => this.setState({ currPage: {...this.state}.currPage -= 1})}>Previous</button>
                );
        }

        const dropdown = () => {
            document.getElementById("myDropdown").classList.toggle("show");
        }

        sidebarFilter = (
            <div className="dropdown-filter">
                <button onClick={() => dropdown()} className="dropdown-filter-button" type="button"><i class="fas fa-filter"></i>&nbsp;Filter&nbsp;by:</button>
                <div id="myDropdown" className="dropdown-content-filter">
                    <button className="filter-item" onClick={() => this.setState({ filter: 'All Content' })}>All Content</button>
                    <button className="filter-item" onClick={() => this.setState({ filter: 'Favorites' })}>Favorites</button>
                </div>
            </div>
        )

                
        // console.log('numPages', numPages);
        // console.log('pages', pages);
        // console.log('currPage', this.state.currPage);
        // console.log('pages[currPage]', pages[this.state.currPage]);
        // console.log(fetchUserFave(currentUserId));
        // if photo.favoriteId matches currentUserId, include this.
        
        if (pages[this.state.currPage] === undefined) {
            return null;
        } else {
            return (
              <div>
                <div className="filter-action">
                    {sidebarFilter}
                    <label>{this.state.filter}</label>
                </div>
                <span className="sidebar-content-container">
                    {pages[this.state.currPage].map((photo) => (
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
                        filter={this.state.filter}
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

// import React from 'react';
// import SidebarItem from './sidebar_item';
// import '../../stylesheets/sidebar.scss';
// import {
//     INIT_NE_LAT,
//     INIT_NE_LNG,
//     INIT_SW_LAT,
//     INIT_SW_LNG,
// } from "../maps/google_maps_container";

// class Sidebar extends React.Component {
//     constructor(props) {
//         super(props);

//     }

//     componentDidMount() {
//         const url = `?lat1=${INIT_NE_LAT}&lng1=${INIT_NE_LNG}&lat2=${INIT_SW_LAT}&lng2=${INIT_SW_LNG}`;
//         this.props
//             .fetchPhotosInArea(url)
//             .then(() => this.props.fetchUsers())
//             .then(() => this.props.fetchUserFaves(this.props.currentUserId));
//     }

//     render() {
//         const {
//             users,
//             currentUserId,
//             photos,
//             google,
//             fetchPhotos,
//             fetchPhoto,
//             deletePhoto,
//             makeFavorite,
//             unFavorite,
//             favorites,
//             fetchUserFave
//         } = this.props;
//         if (!photos) {
//             return null;
//         } else {
//             return (
//                 <div>
//                     <span className="sidebar-content-container">
//                         {photos.map((photo) => (
//                             <SidebarItem
//                                 key={photo._id}
//                                 users={users}
//                                 currentUserId={currentUserId}
//                                 photo={photo}
//                                 photos={photos}
//                                 google={google}
//                                 fetchPhotos={fetchPhotos}
//                                 fetchPhoto={fetchPhoto}
//                                 deletePhoto={deletePhoto}
//                                 makeFavorite={makeFavorite}
//                                 unFavorite={unFavorite}
//                                 favorites={favorites}
//                                 fetchUserFave={fetchUserFave}
//                             />
//                         ))}
//                     </span>
//                 </div>
//             );
//         }
//     }
// }

// export default Sidebar;