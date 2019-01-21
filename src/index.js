import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./index.less"

import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect 
} from "react-router-dom";

import {
   Login,
   NotFound
} from "./pages"

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/admin" component={App}/>
      <Route path="/login" component={Login} />
      <Route path="/404" component={NotFound} />
      <Redirect to="/admin" from="/" exact />
      <Redirect to="/404" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
