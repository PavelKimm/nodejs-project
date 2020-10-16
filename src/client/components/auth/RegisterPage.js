import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Form from "react-validation/build/form";

import {
  register,
  login,
  getUserData,
  redirectAuthenticatedUser,
} from "../../api/authApi";
import {
  setUserDataStartAC,
  setUserDataSuccessAC,
  setUserDataErrorAC,
} from "../../redux/actions/userData/userDataActions";
import { setIsAuthedTrueAC } from "../../redux/actions/isAuthed/isAuthedActions";
import { setSnackbarMessageAC } from "../../redux/actions/snackbars/snackbarActions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright © {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1, 0, 1),
  },
  link: {
    marginLeft: "0.3em",
    marginRight: "0.5em",
    color: "#3f51b5",
    "&:hover": { textDecoration: "underline" },
  },
}));

function RegisterPage(props) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.isAuthed) history.push("/");
  });

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }
  function onChangeFirstName(e) {
    setFirstName(e.target.value);
  }
  function onChangeLastName(e) {
    setLastName(e.target.value);
  }
  function onChangePassword(e) {
    setPassword(e.target.value);
  }
  function onChangePassword2(e) {
    setPassword2(e.target.value);
  }

  function handleRegister(e) {
    e.preventDefault();
    dispatch(setUserDataStartAC());

    register(email, firstName, lastName, password, password2)
      .then(() => {
        login(email, password)
          .then(() => {
            getUserData()
              .then((res) => {
                const userData = res.data;
                if (userData) {
                  dispatch(setIsAuthedTrueAC());
                  dispatch(setUserDataSuccessAC(userData));
                }
              })
              .catch((error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();

                dispatch(setUserDataErrorAC());
                dispatch(
                  setSnackbarMessageAC({
                    msg: resMessage,
                    severity: "error",
                  })
                );
              });
          })
          .catch((error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            dispatch(setUserDataErrorAC());
            dispatch(
              setSnackbarMessageAC({
                msg: resMessage,
                severity: "error",
              })
            );
          });
      })
      .catch((error) => {
        const resMessage = error.response.data.msg;
        dispatch(setUserDataErrorAC());
        dispatch(
          setSnackbarMessageAC({
            msg: resMessage,
            severity: "error",
          })
        );
      });
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Form className={classes.form} onSubmit={handleRegister}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={onChangeEmail}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  // required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={onChangeFirstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  // required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={lastName}
                  onChange={onChangeLastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={onChangePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password2"
                  label="Confirm password"
                  type="password"
                  id="password2"
                  autoComplete="current-password"
                  value={password2}
                  onChange={onChangePassword2}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                Already have an account?
                <Link to="/login" variant="body2" className={classes.link}>
                  Sign in
                </Link>
              </Grid>
            </Grid>
          </Form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    isAuthed: state.isAuthedReducer.isAuthed,
    userData: {
      id: state.userDataReducer.id,
      displayName: state.userDataReducer.displayName,
    },
  };
}

export default connect(mapStateToProps)(RegisterPage);
