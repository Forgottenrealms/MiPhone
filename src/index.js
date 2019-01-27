import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';

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
  <LocaleProvider locale={zhCN}>
    <Router>
    <Switch>
      <Route path="/admin" component={App}/>
      <Route path="/login" component={Login} />
      <Route path="/404" component={NotFound} />
      <Redirect to="/admin" from="/" exact />
      <Redirect to="/404" />
    </Switch>
  </Router>
  </LocaleProvider>,
  document.getElementById("root")
);
