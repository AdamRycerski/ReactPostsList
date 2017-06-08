import {
  SUBMIT_FORM,
} from '../actions/validation';

const defaultState = {
  errors: {},
};

export default function(state = defaultState, action) {
  console.log(action);
  switch (action.type) {
    case SUBMIT_FORM:
      return {
        errors: action.payload.erors,
      };
    default:
      return state;
  }
}