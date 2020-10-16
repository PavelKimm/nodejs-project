import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";

import {
  setUserDataStartAC,
  setUserDataSuccessAC,
  setUserDataErrorAC,
  getUserDataThunkAC,
} from "./redux/actions/userData/userDataActions";
import {
  setIsAuthedTrueAC,
  setIsAuthedFalseAC,
} from "./redux/actions/isAuthed/isAuthedActions";
import { setSnackbarMessageAC } from "./redux/actions/snackbars/snackbarActions";
import {
  login,
  logout,
  register,
  getUserData,
  getTokenFromLocalStorage,
} from "./api/authApi";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";

import CustomSnackbar from "./components/snackbars/CustomSnackbar";

function App(props) {
  const dispatch = useDispatch();

  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  useEffect(() => {
    if (getTokenFromLocalStorage()) dispatch(setIsAuthedTrueAC());
    async function setUserData() {
      if (!props.userData.id) {
        dispatch(setUserDataStartAC());
        const userData = await getUserData();
        if (userData) dispatch(setUserDataSuccessAC(userData.data));
        else {
          dispatch(setIsAuthedFalseAC());
          if (getTokenFromLocalStorage()) {
            dispatch(
              setSnackbarMessageAC({
                msg: "Invalid auth token! Please, log in again.",
                severity: "error",
              })
            );
            logout();
          }
          dispatch(setUserDataErrorAC());
        }
      }
    }
    setUserData();
  }, []);

  const toggleDrawerOpened = () => {
    setIsDrawerOpened(!isDrawerOpened);
  };

  return (
    <div>
      <Header
        toggleDrawerOpened={toggleDrawerOpened}
        isDrawerOpened={isDrawerOpened}
      />
      <Main />
      <Footer />

      <CustomSnackbar />
    </div>
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

export default connect(mapStateToProps)(App);
