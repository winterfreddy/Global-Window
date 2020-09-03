import React from "react";
import GoogleMapsContainer from '../maps/google_maps_container';
import SidebarContainer from '../sidebar/sidebar_container';
import '../../stylesheets/main_page.scss';

class MainPage extends React.Component {
  render() {
    const { photos, fetchPhotos } = this.props;
    const google = window.google;
    return (
      <div className="main-page">
        <div className="left-aside">
            SIDE BAR GOES HERE
            <SidebarContainer google={google} />
        </div>
        <div className="google-maps-container">
          <GoogleMapsContainer google={google} photos={photos} fetchPhotos={fetchPhotos} />
        </div>
      </div>
    );
  }
}

export default MainPage;
