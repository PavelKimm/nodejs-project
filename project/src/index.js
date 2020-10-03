import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "@babel/polyfill";

import store from "./redux/store";
import App from "./App";
// import "./style.css";

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#react-root"));
