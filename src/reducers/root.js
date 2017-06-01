import { combineReducers } from 'redux';

import postsReducer from './posts';
import activePostReducer from './activePost';

export default combineReducers({
  posts: postsReducer,
  activePost: activePostReducer,
});
