import React from "react";
import GoogleMapsContainer from '../maps/google_maps_container';
import Sidebar from '../sidebar/sidebar';
import '../../stylesheets/main_page.scss';

class MainPage extends React.Component {
  render() {
    return (
      <div className="main-page">
        <div className="left-aside">
            SIDE BAR GOES HERE
        </div>
        <div className="google-maps-container">
          <GoogleMapsContainer google={window.google}/>
        </div>
      </div>
    );
  }
}

export default MainPage;
