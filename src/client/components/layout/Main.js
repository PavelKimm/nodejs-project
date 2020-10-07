import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactsPage from "../pages/ContactsPage";
import LinksPage from "../pages/LinksPage";
import LoginPage from "../auth/LoginPage";
import RegisterPage from "../auth/RegisterPage";

export default function Main() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />

      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/contacts" component={ContactsPage} />
      <Route exact path="/links" component={LinksPage} />
    </Switch>
  );
}
