import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import LinksPage from "./pages/LinksPage";
import LoginPage from "./pages/LoginPage";

export default function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contacts" component={ContactsPage} />
        <Route path="/links" component={LinksPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </main>
  );
}
