import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import homeImg from "./pics/home.jpg";
import PostList from "./PostList";

const useStyles = makeStyles({
  container: {
    // fontWeight: "bold",
    paddingTop: 10,
    fontSize: 18,
    // backgroundColor: "green",
  },
});

export default function HomePage() {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="md">
      <PostList />
      <img src={homeImg} width="100%" />
    </Container>
  );
}
