import React from "react";
import GoogleMapsContainer from '../maps/google_maps_container';
import SidebarContainer from '../sidebar/sidebar_container';
import '../../stylesheets/main_page.scss';

class MainPage extends React.Component {
  componentDidMount() {
    // this.props.fetchPhotos();
  }

  render() {
    const { photos, favorites, fetchPhotos, fetchPhotosInArea } = this.props;
    const google = window.google;
    return (
      <div className="main-page">
        <div className="left-aside">
            <SidebarContainer 
              google={google} />
        </div>
        <div className="google-maps-container">
          <GoogleMapsContainer
            google={google}
            photos={photos}
            favorites={favorites}
            fetchPhotos={fetchPhotos}
            fetchPhotosInArea={fetchPhotosInArea}
            
            />
        </div>
      </div>
    );
  }
}

export default MainPage;
