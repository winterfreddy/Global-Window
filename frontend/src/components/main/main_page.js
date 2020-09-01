import React from "react";
import GoogleMapsContainer from '../maps/google_maps_container';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <GoogleMapsContainer />
        <footer>Copyright &copy; 2020 WAAK</footer>
      </div>
    );
  }
}

export default MainPage;
