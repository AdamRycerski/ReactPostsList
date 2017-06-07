import {
  FETCH_AUTHORS,
  RECEIVE_AUTHORS,
  INVALIDATE_AUTHORS,
} from '../actions/authors';

const defaultState = {
  authors: {},
  fetch: {
    pending: false,
    success: false,
    failure: false,
  },
};

export default function authorsReducer(state = defaultState, action) {
  switch(action.type) {
    case FETCH_AUTHORS:
      return {
        authors: {},
        fetch: {
          pending: true,
          success: false,
          failure: false,
        },
      };
    case RECEIVE_AUTHORS:
      return {
        authors: action.payload.authors,
        fetch: {
          pending: false,
          success: true,
          failure: false,
        },
      };
    case INVALIDATE_AUTHORS:
      return {
        authors: {},
        fetch: {
          pending: false,
          success: false,
          failure: true,
        },
      };
    default:
      return state;
  }
}