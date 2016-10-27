import React from 'react';
import { connect } from'react-redux';
import { Link, browserHistory } from 'react-router';
import { logout } from '../redux/auth';

/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.renderLoginSignup = this.renderLoginSignup.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
  }

  render() {
    console.log('currentUser', this.props.currentUser.name)
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target=".navbar-collapse">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/"><img src="/logo.png" /></Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/users" activeClassName="active">users</Link>
              </li>
              <li>
                <Link to="/stories" activeClassName="active">stories</Link>
              </li>

               <li> {this.props.currentUser.name} is logged in
               </li>
            </ul>

            { this.renderLogout() }
            { this.renderLoginSignup() }
          </div>
        </div>
      </nav>
    );
  }

  renderLoginSignup() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
         <Link to="/signup" activeClassName="active">signup</Link>
        </li>
        <li>
          <Link to="/login" activeClassName="active">login</Link>
        </li>
      </ul>
    );
  }

  renderLogout() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
        <button className="navbar-btn btn btn-default"
          onClick={this.props.logoutUser}>logout</button>
        </li>
      </ul>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapProps = (currentUser) => ({currentUser});

const mapDispatch = dispatch => ({
  logoutUser: () => {
    console.log('You signed out. Sorta.')
    dispatch(logout())
    browserHistory.push('/');
  }
})

export default connect(mapProps, mapDispatch)(Navbar);
