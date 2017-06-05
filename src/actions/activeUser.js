import { loginApi } from '../LoginAPI';

export const FETCH_ACTIVE_USER_DATA = 'FETCH_ACTIVE_USER_DATA';
export function fetchActiveUserData(token, dispatch) {
  loginApi.fetchUserData(token)
    .then(data => dispatch(receiveActiveUserData(data)))
    .catch(() => dispatch(invalidateActiveUserData()));

  return {
    type: FETCH_ACTIVE_USER_DATA,
    payload: {},
  };
}

export const RECEIVE_ACTIVE_USER_DATA = 'RECEIVE_ACTIVE_USER_DATA';
export function receiveActiveUserData(data) {
  return {
    type: RECEIVE_ACTIVE_USER_DATA,
    payload: {
      firstName: data.firstName,
      lastName: data.lastName,
      id: data.id,
    }
  };
}

export const INVALIDATE_ACTIVE_USER_DATA = 'INVALIDATE_ACTIVE_USER_DATA';
export function invalidateActiveUserData() {
  return {
    type: INVALIDATE_ACTIVE_USER_DATA,
    payload: {},
  };
}