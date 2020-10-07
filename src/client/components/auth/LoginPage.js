import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import { login, getUserData } from "../../api/authApi";
import {
  setUserDataStartAC,
  setUserDataSuccessAC,
  setUserDataErrorAC,
} from "../../redux/actions/userData/userDataActions";
import { setIsAuthedTrueAC } from "../../redux/actions/isAuthed/isAuthedActions";
import { setSnackbarMessageAC } from "../../redux/actions/snackbars/snackbarActions";
import { SEVERITY } from "../../redux/actions/snackbars/snackbarTypes";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    marginLeft: "0.3em",
    marginRight: "0.5em",
    color: "#3f51b5",
    "&:hover": { textDecoration: "underline" },
  },
}));

function LoginPage(props) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.userData.id) history.push("/");
  });

  let checkBtn;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleLogin(e) {
    e.preventDefault();
    dispatch(setUserDataStartAC());

    if (checkBtn.context._errors.length === 0) {
      login(email, password)
        .then(() => {
          getUserData()
            .then((res) => {
              const userData = (res && res.data) || false;

              if (userData) {
                dispatch(setIsAuthedTrueAC());
                dispatch(setUserDataSuccessAC(userData));
              } else {
                dispatch(
                  setSnackbarMessageAC({
                    msg: "Invalid credentials!",
                    severity: "error",
                  })
                );
                dispatch(setUserDataErrorAC());
              }
            })
            .catch((error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();

              dispatch(
                setSnackbarMessageAC({
                  msg: resMessage,
                  severity: "error",
                })
              );
              dispatch(setUserDataErrorAC());
            });
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          dispatch(
            setSnackbarMessageAC({
              msg: resMessage,
              severity: "error",
            })
          );
          dispatch(setUserDataErrorAC());
        });
    } else {
      dispatch(
        setSnackbarMessageAC({
          msg: "Some error occurred!",
          severity: "error",
        })
      );
      dispatch(setUserDataErrorAC());
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Form className={classes.form} onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
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
            <TextField
              variant="outlined"
              margin="normal"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/reset-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                Don't have an account?
                <Link to="/register" variant="body2" className={classes.link}>
                  Sign Up
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                checkBtn = c;
              }}
            />
          </Form>
        </div>
      </Grid>
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

export default connect(mapStateToProps)(LoginPage);
