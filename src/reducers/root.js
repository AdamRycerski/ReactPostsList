import { combineReducers } from 'redux';

import postsReducer from './posts';
import activePostReducer from './activePost';
import activeUserReducer from './activeUser';
import authReducer from './auth';
import authorsReducer from './authors';

export default combineReducers({
  posts: postsReducer,
  activePost: activePostReducer,
  activeUser: activeUserReducer,
  auth: authReducer,
  authors: authorsReducer,
});
