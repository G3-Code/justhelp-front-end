import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import BeTheChange from "../assets/rag_pic_change.png";
import "../styles/login.css";
import { login } from "../actions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class LoginForm extends React.Component {
  state = {
    credentials: {
      email: "",
      password: ""
    }
  };
  componentDidMount = () => {
    if (this.props.location.state) {
      console.log(this.props.location.state);
      if (
        this.props.location.state.email &&
        this.props.location.state.password
      ) {
        this.setState({
          credentials: {
            email: this.props.location.state.email,
            password: this.props.location.state.password
          }
        });
      }
    }
  };
  handleChanges = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };
  onLogin = e => {
    e.preventDefault();
    this.props.login(this.state.credentials).then(() => {
      this.props.history.push("/homepage");
    });
  };
  render() {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   this.props.history.push("/homepage");
    // }
    return (
      <div>
        <Nav isLoggedIn={false} />
        <div className="body-container">
          <section className="left-section">
            <img
              className="left-image-text"
              src={BeTheChange}
              alt="Be The Change"
            />
          </section>
          <section className="middle-section" />
          <section className="right-section">
            <span className="login-text">
              Sign in below to access your "justhelp" page. Don't have an
              account yet?{" "}
              <Link className="link-register" to="/">
                Create one here.
              </Link>
            </span>

            <div className="right-section-container-login">
              <form onSubmit={this.onLogin} autoComplete="false">
                <div className="form-text">Email</div>
                <div className="form-element">
                  <input
                    className="form-input"
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    value={this.state.credentials.email}
                    onChange={this.handleChanges}
                  />
                </div>
                <div className="form-text">Password</div>
                <div className="form-element">
                  <input
                    className="form-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.credentials.password}
                    onChange={this.handleChanges}
                  />
                  <button className="login-btn" onClick={this.onLogin}>
                    Start Changing
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
        <div className="login-filler" />
        <Footer />
      </div>
    );
  }
}

export default connect(
  null,
  { login }
)(LoginForm);
