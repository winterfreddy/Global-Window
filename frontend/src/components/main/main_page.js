import React from "react";
import GoogleMapsContainer from '../maps/google_maps_container';
import SidebarContainer from '../sidebar/sidebar_container';
import '../../stylesheets/main_page.scss';

class MainPage extends React.Component {
  componentDidMount() {
    this.props.fetchPhotos().then(() => console.log(this.props));

  }

  render() {
    const { photos, fetchPhotos } = this.props;
    const google = window.google;
    console.log(this.props);
    return (
      <div className="main-page">
        <div className="left-aside">
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
