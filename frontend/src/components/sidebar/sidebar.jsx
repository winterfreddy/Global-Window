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
            currPage: 0
        }
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }

    componentDidMount() {
        const url = `?lat1=${INIT_NE_LAT}&lng1=${INIT_NE_LNG}&lat2=${INIT_SW_LAT}&lng2=${INIT_SW_LNG}`;
        this.props.fetchPhotosInArea(url)
            .then(() => this.props.fetchUsers())
            .then(() => this.props.fetchUserFaves(this.props.currentUserId))
    }

    componentDidUpdate(prevProps) {
        if (this.props.photos !== prevProps.photos) {
            const renderedSideBar = document.getElementsByClassName("sidebar-content-container")[0];
            if (renderedSideBar !== undefined) renderedSideBar.scrollTop = 0;
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
            fetchUserFave
        } = this.props;

        let prevBtn;
        let nextBtn;
        let allResults;
        let numPages = (Math.floor((photos.length - 1) / 10) < 0) ? (0) : (Math.floor((photos.length - 1) / 10));
        let pages = {};

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

        if (photos.length <= 10) {
            allResults = <button disabled className="all-results">All Results</button>
        }
                
        console.log('numPages', numPages);
        console.log('pages', pages);
        console.log('currPage', this.state.currPage);
        console.log('pages[currPage]', pages[this.state.currPage]);
        
        if (pages[this.state.currPage] === undefined) {
            return null;
        } else {
            return (
              <div>
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