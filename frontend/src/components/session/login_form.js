import React from "react";
import { withRouter } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
  }

  // Once the user has been authenticated, redirect to the main page TODO
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/home");
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  // Handle field updates (called in the render method)
  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleDemoLogin(e) {
    e.persist();
    this.setState({ username: 'DemoUser', password: '123456' }, () => this.handleSubmit(e));
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.login(user)
      .then(this.props.history.push('/home'))
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul className='errors-list'>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="login-form">
            <div className="modal-header">Login to Global Window</div>
            <div id='close-x' onClick={this.props.closeModal} className="close-x">
              X
            </div>
            <input
              className="session-input"
              type="text"
              value={this.state.username}
              onChange={this.update("username")}
              placeholder="Username"
            />
            <br />
            <input
              className="session-input"
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            <br />
            <input type="submit" value="Submit" className="session-btn" />
            <br />
            <button className='session-btn' onClick={this.handleDemoLogin}>Demo Login</button>
            <br />
            <div className="other-form-text">Join for free!{this.props.otherForm}</div>
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);