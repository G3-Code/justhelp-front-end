import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import LeftImage from "../assets/rag_pic_grandmom.jpeg";
import { connect } from "react-redux";
import { updateUser } from "../actions";
import { Link } from "react-router-dom";

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        phone_number: this.props.user.phone_number,
        email: this.props.user.email
      },
      token: ""
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    console.log(":::: COMPONENT DID MOUNT IN PROFILE FORM:::");
    this.setState({
      credentials: {
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        phone_number: this.props.user.phone_number,
        email: this.props.user.email,
        id: this.props.user.id
      },
      token: token
    });
    console.log(
      "::::::: PROFILE FORM ---------> " +
        JSON.stringify(this.state.credentials)
    );
  }

  componentWillReceiveProps() {
    const token = localStorage.getItem("token");
    console.log(":::: COMPONENT DID MOUNT IN PROFILE FORM:::");
    this.setState({
      credentials: {
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        phone_number: this.props.user.phone_number,
        email: this.props.user.email,
        id: this.props.user.id
      },
      token: token
    });
    console.log(
      "::::::: PROFILE FORM ---------> " +
        JSON.stringify(this.state.credentials)
    );
  }

  handleChanges = e => {
    console.log("::: HANDLE CHANGES IN PROFILE FORM :::" + e.target.value);
    e.persist();
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
        id: this.props.user.id
      }
    });
    console.log(
      "---------------------" + JSON.stringify(this.state.credentials)
    );
  };

  updateUserInProfile = e => {
    e.preventDefault();
    console.log(
      ":: ON SUBMIT CLICKED IN PROFILE FORM ::" +
        JSON.stringify(this.state.credentials),
      JSON.stringify(this.state.token)
    );
    this.props.updateUser(this.state.credentials, this.state.token).then(() => {
      this.props.history.push("/homepage");
    });
    console.log(":: COMPLETED UPDATE REDIRECTING TO HOMEPAGE ::");
    //this.props.history.push("/homepage");
  };

  render() {
    if (this.props.isGettingUser) {
      return <div>Loading ...</div>;
    }
    console.log(
      ":: IN RENDER OF PROFILE FORM ::" + JSON.stringify(this.state.credentials)
    );

    console.log(
      ":: IN RENDER OF PROFILE FORM - PROPS::" + JSON.stringify(this.props.user)
    );
    return (
      <div>
        <Nav isLoggedIn={this.props.isLoggedIn} />
        <div className="body-container">
          <section className="left-section">
            <img className="left-image" src={LeftImage} alt="Fireworks" />
          </section>
          <section className="middle-section" />
          <section className="right-section">
            <div className="right-section-container-register">
              <form onSubmit={this.updateUserInProfile}>
                <div className="form-text-register">Email</div>
                <div className="form-element">
                  {this.state.credentials.email}
                </div>
                <div className="form-text-register">First Name</div>
                <div className="form-element">
                  <input
                    className="form-input-register"
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={this.state.credentials.first_name}
                    onChange={this.handleChanges}
                  />
                </div>
                <div className="form-text-register">Last Name</div>
                <div className="form-element">
                  <input
                    className="form-input-register"
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={this.state.credentials.last_name}
                    onChange={this.handleChanges}
                  />
                </div>

                <div className="form-text-register">Phone Number</div>
                <div className="form-element">
                  <input
                    className="form-input-register"
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={this.state.credentials.phone_number}
                    onChange={this.handleChanges}
                  />
                </div>
                <button className="profile-btn" type="submit">
                  Update Profile
                </button>
                <Link to="/homepage">
                  <button className="profile-btn">Cancel</button>
                </Link>
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
const mapStateToProps = state => {
  console.log(":: PROFILE FORM USER OBJECT IS ::" + JSON.stringify(state.user));
  return {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
    loggingIn: state.loggingIn,
    isGettingUser: state.isGettingUser,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { updateUser }
)(ProfileForm);
