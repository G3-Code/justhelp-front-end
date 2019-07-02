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
      const data = JSON.parse(localStorage.getItem("data"));
      console.log(`****************************${data.contacts}`);
      this.props.getData(data);
      this.props.getContacts(data.user.id, data.token);
    }
    console.log(
      `:: APP JS - COMPONENT DID MOUNT USER OBJECT IS ${JSON.stringify(
        this.props.user
      )}`
    );
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

const mapStateToProps = state => {
  console.log(
    ":: CONTACTS FORM USER OBJECT IS ::" + JSON.stringify(state.user)
  );
  console.log(
    ":: CONTACTS FORM CONTACTS OBJECT IS ::" + JSON.stringify(state.contacts)
  );
  return {
    user: state.user,
    error: state.error,
    contacts: state.contacts
  };
};
export default connect(
  mapStateToProps,
  { getData, getContacts }
)(App);
