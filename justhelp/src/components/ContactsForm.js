import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Bin from "../assets/rag_pic_bin.png";
import Pencil from "../assets/rag_pic_pencil.png";
import "../styles/contact.css";
import {
  addContacts,
  getContacts,
  deleteContacts,
  updateContacts
} from "../actions";

import { connect } from "react-redux";

class ContactsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newContact: {
        contact_first_name: "",
        contact_last_name: "",
        contact_type: "",
        contact_nick_name: "",
        user_id: this.props.user.id
      },
      isLoading: "initial",
      isDeleting: "initial"
    };
  }

  componentDidMount() {
    console.log(
      ":: CONTACTS FORMS :: IN COMPONENT DID MOUNT ::***1" + this.props.user.id
    );
    console.log(
      ":: CONTACTS FORMS :: IN COMPONENT DID MOUNT ::***2" +
        JSON.stringify(this.props.contacts)
    );
    const token = localStorage.getItem("token");
    // this.props.getContacts(this.props.user.id, token).then(() => {
    //   this.setState({ ...this.state, formContacts: this.props.contacts });
    // });
    this.setState({ ...this.state, formContacts: this.props.contacts });
  }

  componentDidUpdate(prevProps) {
    console.log("prev", prevProps);
    if (this.props.contacts !== prevProps.contacts) {
      if (
        !this.props.isAddingContacts &&
        !this.props.isGettingContacts &&
        !this.props.isUpdatingContacts &&
        !this.props.isDeletingContacts
      ) {
        this.setState({ ...this.state, formContacts: this.props.contacts });
      }
    }
  }

  handleChanges = e => {
    e.persist();
    this.setState({
      newContact: {
        ...this.state.newContact,
        [e.target.name]: e.target.value,
        user_id: this.props.user.id
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(":: ADD CONTACT FORM USER ID IS ::" + this.props.user.id);
    console.log(
      ":: ON SUBMIT CLICKED IN CONTACT FORM ::",
      JSON.stringify(this.state.newContact)
    );
    if (e.target.name === "add") {
      this.props.addContacts(this.state.newContact, token);
    }
    if (e.target.name === "update") {
      console.log(`>>>>>>>>>>>>>>> ${this.props.user.id}`);
      console.log(`>>>>>>>>>>>>>>> ${JSON.stringify(this.state.newContact)}`);
      // code for update
      this.props.updateContacts(
        this.props.user.id,
        this.state.newContact,
        token
      );
      // .then(() => this.props.getContacts(this.props.user.id, token));
    }

    this.setState({
      newContact: {
        contact_first_name: "",
        contact_last_name: "",
        contact_type: "",
        contact_nick_name: "",
        contactId: null,
        user_id: this.props.user.id
      }
    });
  };

  handleEditButton = id => {
    console.log("CALLING HANDLE EDIT BUTTON" + id);
    let updateContact = this.props.contacts.filter(contact => {
      console.log(`>>>>>>>>>>>>>> VALUE OF ID IS ${id}`);
      return contact.id === id;
    });
    console.log(":: UPDATE CONTACT ::" + JSON.stringify(updateContact));
    this.setState({
      ...this.state,
      newContact: {
        contact_first_name: updateContact[0].contact_first_name,
        contact_last_name: updateContact[0].contact_last_name,
        contact_type: updateContact[0].contact_type,
        contact_nick_name: updateContact[0].contact_nick_name,
        user_id: this.props.user.id,
        id: updateContact[0].id
      }
    });
  };

  handleDeleteButton = id => {
    var userResponse = window.confirm(
      "Do you want to delete this act?",
      "Please Confirm"
    );

    if (userResponse) {
      const token = localStorage.getItem("token");
      console.log(":: CALLING DELETE BUTTON IN CONTACT FORM ::" + id);
      this.props
        .deleteContacts(id, token)
        .then(() => this.props.getContacts(this.props.user.id, token));
    }
  };

  handleCancelClick = e => {
    e.preventDefault();
    this.setState({
      newContact: {
        contact_first_name: "",
        contact_last_name: "",
        contact_type: "",
        contact_nick_name: "",
        id: null,
        user_id: this.props.user.id
      }
    });
  };

  render() {
    if (this.props.isAddingContacts) {
      return <div>Loading ...</div>;
    }
    if (this.props.isDeletingContacts) {
      return <div>Loading ...</div>;
    }
    if (this.props.isUpdatingContacts) {
      return <div>Loading ...</div>;
    }
    if (this.props.isGettingContacts) {
      return <div>Loading ...</div>;
    }
    console.log(
      ":: RENDER OF CONTACTS FORM - STATE CONTACT LIST IS ::" +
        JSON.stringify(this.state.formContacts)
    );

    console.log(
      ":: RENDER OF CONTACTS FORM - PROP CONTACT LIST IS ::" +
        JSON.stringify(this.props.contacts)
    );
    let isRender;
    if (
      this.state.formContacts === undefined ||
      this.state.formContacts === null ||
      (Object.entries(this.state.formContacts).length === 0 &&
        this.state.formContacts.constructor === Object)
    ) {
      isRender = false;
      console.log(":: THE VALUE OF IS RENDER IS ::" + isRender);
      return <div>Loading .... </div>;
    } else {
      isRender = true;
      console.log(":: THE VALUE OF IS RENDER IS ::" + isRender);
    }

    return (
      <div>
        <Nav isLoggedIn={this.props.isLoggedIn} />
        <div className="body-container">
          <div className="contacts-content-container">
            <section className="left-section">
              <div className="left-section-container-contact ">
                <form onSubmit={this.onSubmit}>
                  <div className="form-text-contact">First Name</div>
                  <div className="form-element-contact">
                    <input
                      className="form-input-contact"
                      type="text"
                      name="contact_first_name"
                      placeholder="First Name"
                      value={this.state.newContact.contact_first_name}
                      onChange={this.handleChanges}
                    />
                  </div>
                  <div className="form-text-contact">Last Name</div>
                  <div className="form-element-contact">
                    <input
                      className="form-input-contact"
                      type="text"
                      name="contact_last_name"
                      placeholder="Last Name"
                      value={this.state.newContact.contact_last_name}
                      onChange={this.handleChanges}
                    />
                  </div>
                  <div className="form-text-contact">Contact Type</div>
                  <div className="form-element-contact">
                    <input
                      className="form-input-contact"
                      type="text"
                      name="contact_type"
                      placeholder="Friends, Family, Pet, Community"
                      value={this.state.newContact.contact_type}
                      onChange={this.handleChanges}
                    />
                  </div>
                  <div className="form-text-contact">Contact Nick Name</div>
                  <div className="form-element-contact">
                    <input
                      className="form-input-contact"
                      type="text"
                      name="contact_nick_name"
                      placeholder="Nick name"
                      value={this.state.newContact.contact_nick_name}
                      onChange={this.handleChanges}
                    />
                  </div>
                  {!this.state.newContact.id && (
                    <button
                      className="contact-btn"
                      name="add"
                      onClick={this.onSubmit}
                    >
                      Add Contact
                    </button>
                  )}
                  {this.state.newContact.id && (
                    <button
                      className="contact-btn-update"
                      name="update"
                      onClick={this.onSubmit}
                    >
                      Update Contact
                    </button>
                  )}
                  <button
                    className="contact-btn"
                    name="cancel"
                    onClick={this.handleCancelClick}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </section>
            <section className="middle-section" />
            <section className="right-section-contact">
              <div className="right-section-contact-heading">
                <div className="contact-heading1a">First Name</div>
                <div className="contact-heading1b">Last Name</div>
                <div className="contact-heading2">Nick name</div>
                <div className="contact-heading3" />
              </div>

              {isRender &&
                this.state.formContacts.map((contact, index) => (
                  <div
                    key={contact.id}
                    className="right-section-contact-content"
                  >
                    <div className="contact-heading1a-content">
                      {contact.contact_first_name}
                    </div>
                    <div className="contact-heading1b-content">
                      {contact.contact_last_name}
                    </div>
                    <div className="contact-heading2-content">
                      {contact.contact_nick_name}
                    </div>
                    <div className="contact-heading3-content">
                      <img
                        className="contact-form-img"
                        src={Pencil}
                        onClick={() => this.handleEditButton(contact.id)}
                        alt="edit"
                      />
                      <img
                        className="contact-form-img"
                        src={Bin}
                        onClick={() => this.handleDeleteButton(contact.id)}
                        alt="delete"
                      />
                    </div>
                  </div>
                ))}
            </section>
          </div>
        </div>
        <div className="login-filler" />
        <Footer />
      </div>
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
    isLoggedIn: state.isLoggedIn,
    loggingIn: state.loggingIn,
    error: state.error,
    contacts: state.contacts,
    isGettingContacts: state.isGettingContacts,
    isUpdatingContacts: state.isUpdatingContacts,
    isDeletingContacts: state.isDeletingContacts,
    isAddingContacts: state.isAddingContacts
  };
};

export default connect(
  mapStateToProps,
  { addContacts, getContacts, deleteContacts, updateContacts }
)(ContactsForm);
