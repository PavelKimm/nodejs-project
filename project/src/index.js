import React, { Component } from "react";
import ReactDOM from "react-dom";

class Root extends Component {
  render() {
    return (
      <div>Hello world</div>
    );
  }
}

ReactDOM.render(<Root />, document.querySelector("#react-root"))
