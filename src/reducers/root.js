import { combineReducers } from 'redux';

import postsReducer from './posts';
import activePostReducer from './activePost';
import activeUserReducer from './activeUser';
import authReducer from './auth';

export default combineReducers({
  posts: postsReducer,
  activePost: activePostReducer,
  activeUser: activeUserReducer,
  auth: authReducer,
});
