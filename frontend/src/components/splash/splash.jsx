import React from "react";

class Splash extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="splash-container">
        <h2 className="splash-header">See the world through your own window.</h2>
        <img src={require("../../images/homepage.png")} className='splash-screenshot' />
      </div>
    );
  }
}

export default Splash;
