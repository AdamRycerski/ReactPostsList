import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./containers/App/App";
import PostsIndex from "./containers/PostsIndex/PostsIndex";
import PostShow from "./containers/PostShow/PostShow";

const routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ PostsIndex } />
    <Route path="posts/:id" component={ PostShow } />
    <Route path="posts/add" omponent={ PostShow } />
  </Route>
);

export default routes;
