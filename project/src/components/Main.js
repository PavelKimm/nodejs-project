import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./HomePage";
import AboutPage from "./AboutPage";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      {/* <Route path="/schedule" component={Schedule} /> */}
    </Switch>
  </main>
);

export default Main;
