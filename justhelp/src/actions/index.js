import axios from "axios";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

//export const URL = "https://random-acts-generator.herokuapp.com";

//export const URL = "https://justhelp.herokuapp.com/";

export const URL = "http://localhost:5000";

export const login = creds => dispatch => {
  console.log(":: IN ACTION -> LOGIN ::");
  dispatch({ type: LOGIN_START });
  return axios
    .post(`${URL}/login`, creds)
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("data", res.data);
      const saved = JSON.stringify(res.data);
      localStorage.setItem("data", saved);
      console.log("LOGIN RESPONSE IS ----------->" + JSON.stringify(res));
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILED, payload: err });
      alert("Please register or use correct credentials!");
    });
};

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const register = creds => dispatch => {
  console.log(":: IN ACTION -> REGISTER ::" + JSON.stringify(creds));
  dispatch({ type: REGISTER_START });
  return axios
    .post(`${URL}/register`, creds)
    .then(res => {
      console.log(
        `====================RESPONSE IS >> ${JSON.stringify(res.data)}`
      );
      localStorage.setItem("token", res.data.token);
      dispatch({ type: REGISTER_SUCCESS });
      console.log("REGISTER RESPONSE IS ----->" + JSON.stringify(res));
    })
    .catch(err => {
      dispatch({ type: REGISTER_FAILED, payload: err });
      alert("Something is wrong, please try again");
    });
};

export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const logout = () => dispatch => {
  console.log(":: IN ACTION LOGOUT ::");
  dispatch({ type: LOGOUT });
  localStorage.removeItem("token");
  localStorage.removeItem("data");
  dispatch({ type: LOGOUT_SUCCESS });
  window.location.reload();
};

export const FETCHING_DATA = "FETCHING_DATA";
export const FETCHING_DATA_SUCCESS = "FETCHING_DATA_SUCCESS";

export const getData = data => dispatch => {
  dispatch({ type: FETCHING_DATA, payload: data });
  dispatch({ type: FETCHING_DATA_SUCCESS });
};

export const UPDATE_USER_START = "UPDATE_USER_START";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export const updateUser = (newUser, token) => dispatch => {
  console.log(
    ":: UPDATE USER - ACTION ::" + JSON.stringify(newUser),
    JSON.stringify(token)
  );
  dispatch({ type: UPDATE_USER_START });
  return axios
    .put(`${URL}/user/${newUser.id}`, newUser, {
      headers: { Authorization: token }
    })
    .then(res => {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data });
      localStorage.setItem("data", JSON.stringify(res.data));
    })
    .catch(err => {
      dispatch({ type: UPDATE_USER_FAILED, payload: err.response });
      alert("Something is wrong, please try again");
    });
};

/* CRUD FOR CONTACTS*/

export const GET_CONTACTS_START = "GET_CONTACTS_START";
export const GET_CONTACTS_SUCCESS = "GET_CONTACTS_SUCCESS";
export const GET_CONTACTS_FAILED = "GET_CONTACTS_FAILED";

export const getContacts = (id, token) => dispatch => {
  console.log(":: GET CONTACTS ACTION - ID IS " + id);
  dispatch({ type: GET_CONTACTS_START });
  return axios
    .get(`${URL}/contact/user/${id}`, {
      headers: { Authorization: token }
    })
    .then(res => {
      console.log(
        ":: GET CONTACT SUCCESS RESPONSE DATA IS :: " + JSON.stringify(res)
      );
      dispatch({ type: GET_CONTACTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_CONTACTS_FAILED, payload: err.response });
      alert("Something is wrong, please try again");
    });
};

export const ADD_CONTACTS_START = "ADD_CONTACTS_START";
export const ADD_CONTACTS_SUCCESS = "ADD_CONTACTS_SUCCESS";
export const ADD_CONTACTS_FAILED = "ADD_CONTACTS_FAILED";

export const addContacts = (newContact, token) => dispatch => {
  dispatch({ type: ADD_CONTACTS_START });
  return axios
    .post(`${URL}/contact`, newContact, {
      headers: { Authorization: token }
    })
    .then(res => {
      console.log(
        ":: ADD CONTACTS - RESPONSE IS ::" + JSON.stringify(res.data)
      );
      dispatch({ type: ADD_CONTACTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ADD_CONTACTS_FAILED, payload: err.response });
      alert("Something is wrong, please try again");
    });
};

export const DELETE_CONTACTS_START = "DELETE_CONTACTS_START";
export const DELETE_CONTACTS_SUCCESS = "DELETE_CONTACTS_SUCCESS";
export const DELETE_CONTACTS_FAILED = "DELETE_CONTACTS_FAILED";

export const deleteContacts = (contactId, token) => dispatch => {
  dispatch({ type: DELETE_CONTACTS_START });
  return axios
    .delete(`${URL}/contact/${contactId}`, {
      headers: { Authorization: token }
    })
    .then(res => {
      dispatch({ type: DELETE_CONTACTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: DELETE_CONTACTS_FAILED, payload: err.response });
      alert("Failed to delete project, please try again");
    });
};

export const UPDATE_CONTACTS_START = "UPDATE_CONTACTS_START";
export const UPDATE_CONTACTS_SUCCESS = "UPDATE_CONTACTS_SUCCESS";
export const UPDATE_CONTACTS_FAILED = "UPDATE_CONTACTS_FAILED";

export const updateContacts = (userId, contact, token) => dispatch => {
  //const user = localStorage.getItem("data");
  dispatch({ type: UPDATE_CONTACTS_START });
  return axios
    .put(`${URL}/contact/${contact.contactId}`, contact, {
      headers: { Authorization: token }
    })
    .then(res => {
      dispatch({ type: UPDATE_CONTACTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: UPDATE_CONTACTS_FAILED, payload: err.response });
      alert("Something is wrong, please try again");
    });
};

/* CRUD FOR ACTS */
export const GET_ACTS_START = "GET_ACTS_START";
export const GET_ACTS_SUCCESS = "GET_ACTS_SUCCESS";
export const GET_ACTS_FAILED = "GET_ACTS_FAILED";

export const getActs = (id, token) => dispatch => {
  dispatch({ type: GET_ACTS_START });
  return axios
    .get(`${URL}/kindAct/user/${id}`, {
      headers: { Authorization: token }
    })
    .then(res => {
      console.log(
        `:: GET ACTS SUCCESS RESPONSE IS :: ${JSON.stringify(res.data)}`
      );
      dispatch({ type: GET_ACTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_ACTS_FAILED, payload: err.response });
      alert("Something is wrong, please try again");
    });
};

export const ADD_ACTS_START = "ADD_ACTS_START";
export const ADD_ACTS_SUCCESS = "ADD_ACTS_SUCCESS";
export const ADD_ACTS_FAILED = "ADD_ACTS_FAILED";

export const addActs = (newAct, token) => dispatch => {
  dispatch({ type: ADD_ACTS_START });
  return axios
    .post(`${URL}/kindAct/`, newAct, {
      headers: { Authorization: token }
    })
    .then(res => {
      dispatch({ type: ADD_ACTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ADD_ACTS_FAILED, payload: err.response });
      alert("Something is wrong, please try again");
    });
};

export const DELETE_ACTS_START = "DELETE_ACTS_START";
export const DELETE_ACTS_SUCCESS = "DELETE_ACTS_SUCCESS";
export const DELETE_ACTS_FAILED = "DELETE_ACTS_FAILED";

export const deleteActs = (actId, token) => dispatch => {
  dispatch({ type: DELETE_ACTS_START });
  return axios
    .delete(`${URL}/kindAct/${actId}`, {
      headers: { Authorization: token }
    })
    .then(res => {
      dispatch({ type: DELETE_ACTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: DELETE_ACTS_FAILED, payload: err.response });
      alert("Failed to delete project, please try again");
    });
};

export const UPDATE_ACTS_START = "UPDATE_ACTS_START";
export const UPDATE_ACTS_SUCCESS = "UPDATE_ACTS_SUCCESS";
export const UPDATE_ACTS_FAILED = "UPDATE_ACTS_FAILED";

export const updateActs = (userId, act, token) => dispatch => {
  //const user = localStorage.getItem("data");
  dispatch({ type: UPDATE_ACTS_START });
  return axios
    .put(`${URL}/kindAct/${act.actId}`, act, {
      headers: { Authorization: token }
    })
    .then(res => {
      dispatch({ type: UPDATE_ACTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: UPDATE_ACTS_FAILED, payload: err.response });
      alert("Something is wrong, please try again");
    });
};
