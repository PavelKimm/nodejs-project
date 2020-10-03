import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import {
  login,
  logout,
  register,
  getCurrentUser,
} from "../../api/services/auth.service";

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

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function RegisterPage() {
  const classes = useStyles();
  let form, checkBtn;

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }
  function onChangeDisplayName(e) {
    setDisplayName(e.target.value);
  }
  function onChangePassword(e) {
    setPassword(e.target.value);
  }
  function onChangePassword2(e) {
    setPassword2(e.target.value);
  }

  function handleRegister(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    form.validateAll();

    console.log(form);
    console.log(checkBtn);

    if (checkBtn.context._errors.length === 0) {
      register(email, password, password2, displayName).then(
        () => {
          //   this.props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  }

  return (
    <Container className={classes.container} maxWidth="md">
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={handleRegister}
            ref={(c) => {
              form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="displayName">Display name</label>
              <Input
                type="text"
                className="form-control"
                name="displayName"
                value={displayName}
                onChange={onChangeDisplayName}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Retype password</label>
              <Input
                type="password"
                className="form-control"
                name="password2"
                value={password2}
                onChange={onChangePassword2}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Register</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    </Container>
  );
}
