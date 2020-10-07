import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import homeImg from "./pics/home.jpg";
import PostList from "./PostList";

const useStyles = makeStyles({
  container: {
    paddingTop: 10,
    fontSize: 18,
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
