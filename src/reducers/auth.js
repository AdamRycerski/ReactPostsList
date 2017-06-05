import {
  REQUEST_USER_LOGIN,
  REJECT_USER_LOGIN,
  ACCEPT_USER_LOGIN,
  LOGOUT_USER,
} from '../actions/auth';

const defaultState = {
  loggedIn: false,
  token: '',
  login: {
    pending: false,
    success: false,
    failure: false,
  },
};

export default function authReducer(state = defaultState, action) {
  switch(action.type) {
    case REQUEST_USER_LOGIN:
      return {
        loggedIn: false,
        token: '',
        login: {
          pending: true,
          success: false,
          failure: false,
        },
      };
    case REJECT_USER_LOGIN:
      return {
        loggedIn: false,
        token: '',
        login: {
          pending: false,
          success: false,
          failure: true,
        },
      };
    case ACCEPT_USER_LOGIN:
      return {
        loggedIn: true,
        token: action.payload.token,
        login: {
          pending: false,
          success: true,
          failure: false,
        },
      };
    case LOGOUT_USER:
      return {
        loggedIn: false,
        token: '',
        login: {
          pending: false,
          success: false,
          failure: false,
        },
      };
    default:
      return state;
  }
}