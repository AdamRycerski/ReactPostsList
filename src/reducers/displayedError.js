import {
  DISPLAY_ERROR,
  HIDE_ERROR,
} from '../actions/displayedError';

const defaultState = {
  isDisplayed: false,
  message: '',
  title: '',
}

export default function(state = defaultState, action) {
  console.log(action);
  switch(action.type) {
    case DISPLAY_ERROR:
      return {
        isDisplayed: true,
        message: action.payload.message,
        title: action.payload.title,
      };
    case HIDE_ERROR:
      return {
        isDisplayed: false,
        message: '',
        title: '',
      };
    default:
      return state;
  }
}