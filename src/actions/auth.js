import { loginApi } from '../LoginAPI';
import { AUTH_TOKEN } from '../config';

 export const REQUEST_USER_LOGIN = 'REQUEST_USER_LOGIN';
 export function requestUserLogin(credentials, dispatch) {
  loginApi.login(credentials.login, credentials.password)
    .then(res => dispatch(acceptUserLogin(res.token)))
    .catch(status => dispatch(rejectUserLogin(status)));

  return {
    type: REQUEST_USER_LOGIN,
    payload: {},
  };
}

 export const REJECT_USER_LOGIN = 'REJECT_USER_LOGIN';
 export function rejectUserLogin(status) {
  return {
    type: REJECT_USER_LOGIN,
    payload: {
      status,
    },
  };
}

 export const ACCEPT_USER_LOGIN = 'ACCEPT_USER_LOGIN';
 export function acceptUserLogin(token) {
   localStorage.setItem(AUTH_TOKEN, token);

   return {
     type: ACCEPT_USER_LOGIN,
     payload: {
       token,
     }
   };
}

export const LOGOUT_USER = 'LOGOUT_USER'
export function logoutUser() {
  localStorage.removeItem(AUTH_TOKEN);

  return {
    type: LOGOUT_USER,
    payload: {},
  };
}
