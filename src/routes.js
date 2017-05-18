import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./containers/App/App";
import PostsIndex from "./containers/PostsIndex/PostsIndex";

const routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ PostsIndex } />
  </Route>
);

export default routes;
