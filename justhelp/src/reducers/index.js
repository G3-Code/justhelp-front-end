import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT,
  LOGOUT_SUCCESS,
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  GET_ACTS_FAILED,
  GET_ACTS_SUCCESS,
  GET_ACTS_START,
  GET_CONTACTS_FAILED,
  GET_CONTACTS_START,
  GET_CONTACTS_SUCCESS,
  DELETE_ACTS_FAILED,
  DELETE_ACTS_START,
  DELETE_ACTS_SUCCESS,
  DELETE_CONTACTS_FAILED,
  DELETE_CONTACTS_START,
  DELETE_CONTACTS_SUCCESS,
  UPDATE_ACTS_FAILED,
  UPDATE_ACTS_START,
  UPDATE_ACTS_SUCCESS,
  UPDATE_CONTACTS_FAILED,
  UPDATE_CONTACTS_START,
  UPDATE_CONTACTS_SUCCESS,
  ADD_ACTS_FAILED,
  ADD_ACTS_START,
  ADD_ACTS_SUCCESS,
  ADD_CONTACTS_FAILED,
  ADD_CONTACTS_START,
  ADD_CONTACTS_SUCCESS,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  GET_USER_START
} from "../actions";

const initialState = {
  user: {},
  error: null,
  loggingIn: false,
  registering: false,
  isLoggedIn: false,
  contacts: [],
  acts: [],
  isGettingContacts: false,
  isUpdatingContacts: false,
  isDeletingContacts: false,
  isAddingContacts: false,
  isGettingActs: false,
  isUpdatingActs: false,
  isDeletingActs: false,
  isAddingActs: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_START:
      return {
        ...state,
        error: "",
        registering: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        error: "",
        registering: false
      };
    case REGISTER_FAILED:
      return {
        ...state,
        error: action.payload,
        registering: false
      };
    case LOGIN_START:
      console.log("-----------IN LOGIN START----------");
      return {
        ...state,
        error: "",
        loggingIn: true,
        isLoggedIn: false
      };
    case LOGIN_SUCCESS:
      console.log(
        "-------------ACTION PAY LOAD FOR LOGIN SUCCESS IS " +
          JSON.stringify(action.payload)
      );
      return {
        ...state,
        error: "",
        loggingIn: false,
        user: action.payload.user,
        contacts: action.payload.contacts,
        acts: action.payload.acts,
        isLoggedIn: true
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.payload,
        loggingIn: false,
        isLoggedIn: false
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true,
        error: ""
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        error: "",
        user: {},
        isLoggedIn: false
      };
    case FETCHING_DATA:
      return {
        ...state,
        user: action.payload.user,
        //contacts: action.payload.contacts,
        //acts: action.payload.acts,
        error: "",
        isLoggedIn: true
      };
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        error: "",
        isLoggedIn: true
      };
    case UPDATE_USER_START:
      console.log(":: UPDATE USER START ::");
      return {
        ...state,
        updatingUser: true,
        error: ""
      };
    case UPDATE_USER_SUCCESS:
      console.log(":: UPDATE USER SUCCESS ::" + JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload.user,
        updatingUser: false,
        error: ""
      };
    case UPDATE_USER_FAILED:
      console.log(":: UPDATE USER FAILED ::");
      return {
        ...state,
        updatingUser: false,
        error: action.payload
      };
    case GET_ACTS_FAILED:
      console.log(":: GET ACTS FAILED ::");
      return {
        ...state,
        isGettingActs: false,
        error: action.payload
      };
    case GET_ACTS_SUCCESS:
      console.log(":: GET ACTS SUCCESS ::");
      return {
        ...state,
        acts: action.payload.acts,
        isGettingActs: false,
        error: ""
      };
    case GET_ACTS_START:
      console.log(":: GET ACTS START ::");
      return {
        ...state,
        isGettingActs: true,
        error: ""
      };
    case GET_CONTACTS_FAILED:
      console.log(":: GET CONTACTS FAILED ::");
      return {
        ...state,
        isGettingContacts: false,
        error: action.payload
      };
    case GET_CONTACTS_SUCCESS:
      console.log(":: GET CONTACTS SUCCESS ::");
      return {
        ...state,
        contacts: action.payload.contacts,
        isGettingContacts: false,
        error: ""
      };
    case GET_CONTACTS_START:
      console.log(":: GET CONTACTS START ::");
      return {
        ...state,
        isGettingContacts: true,
        error: ""
      };
    case ADD_ACTS_FAILED:
      console.log(":: ADD ACTS FAILED ::");
      return {
        ...state,
        error: action.payload,
        isAddingActs: false
      };
    case ADD_ACTS_START:
      console.log(":: ADD ACTS START ::");
      return {
        ...state,
        error: "",
        isAddingActs: true
      };
    case ADD_ACTS_SUCCESS:
      console.log(":: ADD ACTS START ::");
      return {
        ...state,
        acts: action.payload.acts,
        error: "",
        isAddingActs: false
      };
    case ADD_CONTACTS_FAILED:
      console.log(":: ADD CONTACTS FAILED ::");
      return {
        ...state,
        error: action.payload,
        isAddingContacts: false
      };
    case ADD_CONTACTS_START:
      console.log(":: ADD CONTACTS START ::");
      return {
        ...state,
        error: "",
        isAddingContacts: true
      };
    case ADD_CONTACTS_SUCCESS:
      console.log(
        ":: ADD CONTACTS SUCCESS ::" + JSON.stringify(action.payload)
      );
      console.log(
        ":: ADD CONTACTS START - STATE CONTACTS::" +
          JSON.stringify(state.contacts)
      );
      return {
        ...state,
        //contacts: [...state.contacts, action.payload],
        contacts: action.payload.contacts,
        error: "",
        isAddingContacts: false
      };
    case DELETE_ACTS_START:
      return {
        ...state,
        error: "",
        isDeletingActs: true
      };
    case DELETE_ACTS_SUCCESS:
      return {
        ...state,
        error: "",
        isDeletingActs: false
      };
    case DELETE_ACTS_FAILED:
      return {
        ...state,
        error: action.payload,
        isDeletingActs: false
      };
    case DELETE_CONTACTS_START:
      return {
        ...state,
        error: "",
        isDeletingContacts: true
      };
    case DELETE_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload.contacts,
        error: "",
        isDeletingContacts: false
      };
    case DELETE_CONTACTS_FAILED:
      return {
        ...state,
        error: action.payload,
        isDeletingContacts: false
      };
    case UPDATE_ACTS_START:
      return {
        ...state,
        error: "",
        isUpdatingActs: true
      };
    case UPDATE_ACTS_SUCCESS:
      return {
        ...state,
        error: "",
        acts: action.payload.acts,
        isUpdatingActs: false
      };
    case UPDATE_ACTS_FAILED:
      return {
        ...state,
        error: action.payload,
        isUpdatingActs: false
      };
    case UPDATE_CONTACTS_START:
      return {
        ...state,
        error: "",
        isUpdatingContacts: true
      };
    case UPDATE_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload.contacts,
        error: "",
        isUpdatingContacts: false
      };
    case UPDATE_CONTACTS_FAILED:
      return {
        ...state,
        error: action.payload,
        isUpdatingContacts: false
      };
    case GET_USER_FAILED:
      console.log(":: GET USER FAILED ::");
      return {
        ...state,
        isGettingUsers: false,
        error: action.payload
      };
    case GET_USER_SUCCESS:
      console.log(":: GET USER SUCCESS ::");
      return {
        ...state,
        user: action.payload.user,
        isGettingUser: false,
        error: ""
      };
    case GET_USER_START:
      console.log(":: GET USER START ::");
      return {
        ...state,
        isGettingUser: true,
        error: ""
      };
    default:
      return state;
  }
};

export default reducer;
