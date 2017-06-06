import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./containers/App/App";
import PostsIndex from "./containers/PostsIndex/PostsIndex";
import PostDetail from "./containers/PostDetail/PostDetail";
import Login from './containers/Login/Login';

const routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ PostsIndex } />
    <Route path="posts/:id" component={ PostDetail } />
    <Route path="posts/add" component={ PostDetail } />
    <Route path='login' component={ Login } />
  </Route>
);

export default routes;
