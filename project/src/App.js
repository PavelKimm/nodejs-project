import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import {
  setUserDataStartAC,
  setUserDataSuccessAC,
  setUserDataErrorAC,
  getUserDataThunkAC,
} from "./redux/actions/userData/userDataActions";
import {
  login,
  logout,
  register,
  getUserData,
} from "./api/services/auth.service";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";

function App(props) {
  // const [currentUser, setCurrentUser] = useState(undefined);

  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  // const [authData, setAuthData] = useState(undefined);
  const toggleDrawerOpened = () => {
    setIsDrawerOpened(!isDrawerOpened);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    async function setUserData() {
      const userData = await getUserData();
      if (userData) {
        if (!props.auth.userData) {
          dispatch(setUserDataSuccessAC(userData.data));
        }
      } else {
        dispatch(setUserDataErrorAC());
      }
    }

    dispatch(setUserDataStartAC());
    setUserData();
  }, []);

  return (
    <BrowserRouter>
      <Header
        toggleDrawerOpened={toggleDrawerOpened}
        isDrawerOpened={isDrawerOpened}
      />
      <Main />
      <Footer />
    </BrowserRouter>
  );
}

function mapStateToProps(state) {
  return {
    auth: { userData: state.userDataReducer.userData },
  };
}

export default connect(mapStateToProps)(App);
