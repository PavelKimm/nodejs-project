import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  footer: {
    alignItems: "center",
    textAlign: "center",
    color: "grey",
    fontWeight: "bold",
    marginTop: 40,
    paddingTop: 40,
    paddingBottom: 40,
    fontSize: 18,
    backgroundColor: "lightGrey",
  },
});

export default function Footer() {
  const classes = useStyles();

  return <footer className={classes.footer}>This is footer</footer>;
}
