import React from "react";
import HomePage from "./HomePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";
import KindActsForm from "./KindActsForm";
import ContactForm from "./ContactsForm";
import RegistrationForm from "./RegistrationForm";
import PrivateRoute from "./PrivateRoute";
import { connect } from "react-redux";
import { getData, getContacts } from "../actions";

import "../styles/index.css";

class App extends React.Component {
  componentDidMount() {
    console.log(":: APP JS - COMPONENT DID MOUNT");
    //const token = localStorage.getItem("token");
    if (localStorage.getItem("data")) {
      this.props.getData(JSON.parse(localStorage.getItem("data")));
    }
  }
  render() {
    return (
      <Router>
        <Route path="/login" component={LoginForm} />
        <Route exact path="/" component={RegistrationForm} />
        <PrivateRoute exact path="/homepage" component={HomePage} />
        <PrivateRoute exact path="/profile" component={ProfileForm} />
        <PrivateRoute exact path="/contacts" component={ContactForm} />
        <PrivateRoute exact path="/acts" component={KindActsForm} />
      </Router>
    );
  }
}

export default connect(
  null,
  { getData, getContacts }
)(App);
