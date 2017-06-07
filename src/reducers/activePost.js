import {
  FETCH_ACTIVE_POST,
  RECEIVE_ACTIVE_POST,
  INVALIDATE_ACTIVE_POST,
} from '../actions/activePost';

const defaultState = {
  item: {},
  fetch: {
    pending: false,
    success: false,
    failure: false,
  },
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case FETCH_ACTIVE_POST:
      return {
        ...state,
        fetch: {
          pending: true,
          success: false,
          failure: false,
        }
      };
    case RECEIVE_ACTIVE_POST:
      return {
        ...state,
        item: { ...action.payload },
        fetch: {
          pending: false,
          success: true,
          failure: false,
        }
      };
    case INVALIDATE_ACTIVE_POST:
      return {
        ...state,
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