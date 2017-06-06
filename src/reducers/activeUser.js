import {
  FETCH_ACTIVE_USER_DATA,
  RECEIVE_ACTIVE_USER_DATA,
  INVALIDATE_ACTIVE_USER_DATA,
} from '../actions/activeUser';

const defaultState = {
  firstName: '',
  lastName: '',
  id: 0,
  fetch: {
    pending: false,
    success: false,
    failure: false,
  },
};

export default function activeUserReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_ACTIVE_USER_DATA:
      return {
        firstName: '',
        lastName: '',
        id: 0,
        fetch: {
          pending: true,
          success: false,
          failure: false,
        }
      };
    case RECEIVE_ACTIVE_USER_DATA:
      return {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        id: action.payload.id,
        fetch: {
          pending: false,
          success: true,
          failure: false,
        }
      };
    case INVALIDATE_ACTIVE_USER_DATA:
      return {
        firstName: '',
        lastName: '',
        id: 0,
        fetch: {
          pending: false,
          success: false,
          failure: true,
        }
      };
    default:
      return state;
  }
}