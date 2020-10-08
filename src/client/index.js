import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import "@babel/polyfill";

import store from "./redux/store";
import App from "./App";
import theme from "../theme";
import "../style.css";

const Root = () => {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

// ReactDOM.render(<Root />, document.querySelector("#react-root"));
ReactDOM.hydrate(<Root />, document.querySelector("#react-root"));
