import React from "react";
import { Link, withRouter } from "react-router-dom";
import '../../stylesheets/navbar.scss'
import '../../stylesheets/modal.scss';
import '../../stylesheets/session.scss';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.handleSocial = this.handleSocial.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    const { openModal, currentUser } = this.props;
    if (this.props.loggedIn) {
      return (
        <div className="navbar-links">
          {/* <Link to={"/tweets"}>All Tweets</Link>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/new_tweet"}>Write a Tweet</Link> */}
          <span className="welcome">Welcome, {currentUser.username}!</span>
          <Link to='/upload' className='navbar-upload'>
            <button className='navbar-upload-btn'>Upload</button>
          </Link>
          <button className='logout-btn' onClick={this.logoutUser}>Log Out</button>
        </div>
      );
    } else {
      return (
        <div className="navbar-links">
          <button className='navbar-login' onClick={() => openModal('login')}>Log In</button>
          <button className='navbar-signup' onClick={() => openModal('signup')}>Sign Up</button>
        </div>
      );
    }
  }

  handleSocial(social) {
    return () => window.open(`https://github.com/${social}`);
  }

  render() {
      let logoButton;
      if(this.props.location.pathname === '/home') {
        logoButton = (<div className="logo-title" onClick={() => window.location.reload()}>globalWindow</div>)
      } else {
        logoButton = (<Link to="/home" className="logo-title">globalWindow</Link>);
      }
    return (
      <div className="nav-bar">
        <div className="logo-section">
          <div className="dropdown">
            <i className="fas fa-globe"></i>
            <div className="dropdown-content">
              <a>Global Window Developers</a>
              {/* {<a href="https://github.com/winterfreddy">Winfred Huang (Frontend lead)</a>
              <a href="https://github.com/alex-choy">Alex Choy (Backend lead)</a>
              <a href="https://github.com/AdamKlimmek">Adam Klimmek (Flex backend)</a>
              <a href="https://github.com/kxwzhang">Kevin Zhang (Flex frontend)</a>} */}
              <a onClick={this.handleSocial('winterfreddy')} target="_blank">Winfred Huang (Project Lead)</a>
              <a onClick={this.handleSocial('alex-choy')} target="_blank">Alex Choy (Backend Lead)</a>
              <a onClick={this.handleSocial('AdamKlimmek')} target="_blank">Adam Klimmek (Backend Developer)</a>
              <a onClick={this.handleSocial('kxwzhang')} target="_blank">Kevin Zhang (Frontend Lead)</a>
              <div></div>
            </div>
          </div>
          {logoButton}
        </div>
        {this.getLinks()}
      </div>
    );
  }
}

export default withRouter(NavBar);
