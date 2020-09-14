import React, { Component } from "react";
import ReactDOM from "react-dom";
import Container from "@material-ui/core/Container";

import GuestTopNavBar from "./components/GuestTopNavBar";
import UserTopNavBar from "./components/UserTopNavBar";
import SideBar from "./components/SideBar";
import blogImg from "./blog.jpg";

const Root = () => {
  let isAuth = false;
  const [isDrawerOpened, setIsDrawerOpened] = React.useState(false);

  const toggleDrawerOpened = () => {
    setIsDrawerOpened(!isDrawerOpened);
  };
  return (
    <div>
      {isAuth ? (
        <UserTopNavBar />
      ) : (
        <GuestTopNavBar toggleDrawerOpened={toggleDrawerOpened} />
      )}
      <Container maxWidth="sm">Hello world!</Container>
      <SideBar
        toggleDrawerOpened={toggleDrawerOpened}
        isDrawerOpened={isDrawerOpened}
      />
      <img src={blogImg} />
    </div>
  );
};

ReactDOM.render(<Root />, document.querySelector("#react-root"));
