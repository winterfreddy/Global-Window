import React from "react";

class Splash extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="splash-container">
        <h2 className="splash-header">See the world through your own window.</h2>
        <img src="../../images/homepage copy.png" className='splash-screenshot' />
        {/* <h2>The Image Geo-Tagging Social Media Platform that was developed by Kev Win Ad and Al</h2> */}
      </div>
    );
  }
}

export default Splash;
