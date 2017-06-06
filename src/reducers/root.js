import { combineReducers } from 'redux';

import postsReducer from './posts';
import activePostReducer from './activePost';
import displayedErrorReducer from './displayedError';

export default combineReducers({
  posts: postsReducer,
  activePost: activePostReducer,
  displayedError: displayedErrorReducer,
});
