import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    alignItems: "center",
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 10,
    fontSize: 18,
  },
});

function ContactsPage() {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="md">
      <div>This is contacts page</div>
    </Container>
  );
}

export default ContactsPage;
