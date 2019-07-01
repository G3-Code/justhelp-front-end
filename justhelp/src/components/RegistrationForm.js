import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import SayHello from "../assets/rag_pic_groupregister1x.png";
import Kindness from "../assets/rag_pic_kindness1x.png";
import TitlePic from "../assets/rag_pic_livealife.jpeg";
import "../styles/login.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions";

class RegistrationForm extends React.Component {
  state = {
    credentials: {
      first: "",
      last: "",
      phone: "",
      email: "",
      password: ""
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

  onSubmit = e => {
    e.preventDefault();
    this.props.register(this.state.credentials).then(() => {
      this.props.history.push({
        pathname: "/login",
        state: {
          email: this.state.credentials.email,
          password: this.state.credentials.password
        }
      });
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
          <div className="content-container">
            <section className="left-section">
              <img className="left-image" src={SayHello} alt="Say Hello" />
              <img className="left-image-text" src={Kindness} alt="Kindness" />
              <img className="left-image" src={TitlePic} alt="show kindness" />
            </section>
            <section className="middle-section" />
            <section className="right-section">
              <p>
                Get started by creating your account, or{" "}
                <Link className="link-register" to="/login">
                  logging in
                </Link>{" "}
                if you already have one.
              </p>
              <div className="right-section-container-register">
                <form onSubmit={this.onSubmit}>
                  <div className="form-text-register">First Name</div>
                  <div className="form-element">
                    <input
                      className="form-input-register"
                      type="text"
                      name="first"
                      placeholder="First Name"
                      value={this.state.credentials.first}
                      onChange={this.handleChanges}
                    />
                  </div>

                  <div className="form-text-register">Last Name</div>
                  <div className="form-element">
                    <input
                      className="form-input-register"
                      type="text"
                      name="last"
                      placeholder="Last Name"
                      value={this.state.credentials.last}
                      onChange={this.handleChanges}
                    />
                  </div>
                  <div className="form-text-register">Email</div>
                  <div className="form-element">
                    <input
                      className="form-input-register"
                      type="text"
                      name="email"
                      placeholder="Email Address"
                      value={this.state.credentials.email}
                      onChange={this.handleChanges}
                    />
                  </div>
                  <div className="form-text-register">Phone Number</div>
                  <div className="form-element">
                    <input
                      className="form-input-register"
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={this.state.credentials.phone}
                      onChange={this.handleChanges}
                    />
                  </div>
                  <div className="form-text-register">Password</div>
                  <div className="form-element">
                    <input
                      className="form-input-register"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.credentials.password}
                      onChange={this.handleChanges}
                    />
                    <button className="login-btn" onClick={this.onSubmit}>
                      Join Now
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
        <div className="login-filler" />
        <Footer />
      </div>
    );
  }
}
export default connect(
  null,
  { register }
)(RegistrationForm);
