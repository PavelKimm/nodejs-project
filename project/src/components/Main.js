import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ContactsPage from "./ContactsPage";
import LinksPage from "./LinksPage";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contacts" component={ContactsPage} />
      <Route path="/links" component={LinksPage} />
    </Switch>
  </main>
);

export default Main;
