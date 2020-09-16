import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import homeImg from "../pics/home.jpg";

const useStyles = makeStyles({
  container: {
    alignItems: "center",
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 10,
    fontSize: 18,
    // backgroundColor: "green",
  },
});

function HomePage() {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="md">
      <img src={homeImg} width="100%" />
      <div>Hello world!</div>
    </Container>
  );
}

export default HomePage;
