import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import blogImg from "../blog.jpg";

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
    <div>
      <Container className={classes.container} maxWidth="md">
        <img src={blogImg} width="100%" />
        <div>Hello world!</div>
      </Container>
    </div>
  );
}

export default HomePage;
