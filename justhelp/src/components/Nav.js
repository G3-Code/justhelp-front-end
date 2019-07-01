import React from "react";
import "../styles/nav.css";
import logo from "../assets/rag_pic_logo1xJustHelp.png";
import { logout } from "../actions";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";

class Nav extends React.Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <div>
        <div className="nav-container">
          <div className="nav-subcontainer">
            <div className="brand-logo">
              {this.props.isLoggedIn && (
                <Link to="/homepage">
                  <img className="logo" src={logo} alt="Brand logo" />
                </Link>
              )}
              {!this.props.isLoggedIn && (
                <a href="https://justhelp.netlify.com">
                  <img className="logo" src={logo} alt="Brand logo" />
                </a>
              )}

              <div className="welcome-msg">
                {this.props.isLoggedIn && `Welcome, ${this.props.user.first}`}
              </div>
            </div>
            {this.props.isLoggedIn && (
              <div className="nav-links">
                <NavLink to="/contacts" className="nav-link">
                  Contacts
                </NavLink>
                <NavLink to="/acts" className="nav-link">
                  Kind Acts
                </NavLink>
                <NavLink to="/profile" className="nav-link">
                  Profile
                </NavLink>
                <div className="nav-link" onClick={this.onLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="home-page-circle1" />
        <div className="home-page-circle2" />
        <div className="home-page-circle3" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    isLoggedIn: state.isLoggedIn
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(Nav);
