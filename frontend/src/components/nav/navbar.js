import React from "react";
import { Link } from "react-router-dom";
// import "./navbar.css";
import '../../stylesheets/navbar.scss'
import '../../stylesheets/modal.scss';
import '../../stylesheets/session.scss';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    const { openModal } = this.props;
    if (this.props.loggedIn) {
      return (
        <div className="navbar-links">
          {/* <Link to={"/tweets"}>All Tweets</Link>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/new_tweet"}>Write a Tweet</Link> */}
          <button className='logout-btn' onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="navbar-links">
          <button className='navbar-login' onClick={() => openModal('login')}>Login</button>
          <button className='navbar-signup' onClick={() => openModal('signup')}>Signup</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="nav-bar">
        <Link to="/home" className="logo-title">globalWindow</Link>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;
