import { combineReducers } from 'redux';

import postsReducer from './posts';
import activePostReducer from './activePost';
import activeUserReducer from './activeUser';
import authReducer from './auth';
import authorsReducer from './authors';
import displayedErrorReducer from './displayedError';
import validationReducer from './validation';

export default combineReducers({
  posts: postsReducer,
  activePost: activePostReducer,
  activeUser: activeUserReducer,
  auth: authReducer,
  authors: authorsReducer,
  displayedError: displayedErrorReducer,
  validation: validationReducer,
});
