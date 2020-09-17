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
    this.handleGitHub = this.handleGitHub.bind(this);
    this.handleLinkedIn = this.handleLinkedIn.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  dropdown = () => {
    document.getElementById("myDropdownUser").classList.toggle("show");
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    const { openModal, currentUser } = this.props;
    if (this.props.loggedIn) {
      return (
        <div className="navbar-links">
          <span className="welcome">Welcome, {currentUser.username}!</span>
          <div className="dropdown-user">
            <button onClick={() => this.dropdown()} className="dropdown-user-button" type="button"><i className="fas fa-user"></i></button>
            <div id="myDropdownUser" className="dropdown-content-user">
              
              <button className='logout-btn' onClick={this.logoutUser}><i className="fas fa-sign-out-alt"></i>&nbsp;Log Out</button>
            </div>
          </div>
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

  handleGitHub(social) {
    return () => window.open(`https://github.com/${social}`);
  }

  handleLinkedIn(social) {
    return () => window.open(`https://www.linkedin.com/in/${social}`)
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
            <div className="about">About</div>
            <div className="dropdown-content">
              <a className='global-window-devs'>Global Window Developers</a>
              <div className='dropdown-item'>Winfred Huang
                <span>Project Lead</span>
                <div className='social-btns'>
                  <i className="fab fa-github-square" onClick={this.handleGitHub('winterfreddy')}></i>
                  <i className="fab fa-linkedin" onClick={this.handleLinkedIn('winfred-huang')}></i>
                </div>
              </div>
              <div className='dropdown-item'>Alex Choy
                <span>Backend Dev</span>
                <div className='social-btns'>
                  <i className="fab fa-github-square" onClick={this.handleGitHub('alex-choy')}></i>
                  <i className="fab fa-linkedin" onClick={this.handleLinkedIn('alexchoy179')}></i>
                </div>
              </div>
              <div className='dropdown-item'>Adam Klimmek
                <span>Backend Dev</span> 
                <div className='social-btns'>
                  <i className="fab fa-github-square" onClick={this.handleGitHub('AdamKlimmek')}></i>
                  <i className="fab fa-linkedin" onClick={this.handleLinkedIn('adamklimmek')}></i>
                </div>
              </div>
              <div className='dropdown-item'>Kevin Zhang
                <span>Frontend Dev</span> 
                <div className='social-btns'>
                  <i className="fab fa-github-square" onClick={this.handleGitHub('kxwzhang')}></i>
                  <i className="fab fa-linkedin" onClick={this.handleLinkedIn('kevinxzhang')}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="logo-container">
          <i className="fas fa-globe"></i>
          {logoButton}
        </div>
        {this.getLinks()}
      </div>
    );
  }
}

export default withRouter(NavBar);
