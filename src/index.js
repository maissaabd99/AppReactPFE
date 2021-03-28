import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import "assets/scss/material-kit-react.scss?v=1.9.0";
// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import Login from "views/LoginPage/Login.js";
import ConfirmMail from "views/LoginPage/ConfirmMail.js";
import MsgConfirmation from "views/LoginPage/MsgConfimation.js";
var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/Inscription/Message-confirmation" component={MsgConfirmation}/>
      <Route path="/Inscription/Confirmation-compte" component={ConfirmMail}/>
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/login" component={Login} />
      <Route path="/moncompte" component={ProfilePage} />
      <Route path="/Inscription" component={LoginPage} />
      <Route path="/" component={Components} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
