import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import aboutImg from "../pics/about.jpg";

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

function AboutPage() {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="md">
      <img src={aboutImg} width="100%" />
      <div>This is about page</div>
    </Container>
  );
}

export default AboutPage;
