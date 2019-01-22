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

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
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
