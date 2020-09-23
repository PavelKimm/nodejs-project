import React, { useState, useEffect } from "react";

import {
  login,
  logout,
  register,
  getCurrentUser,
} from "./services/auth.service";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

export default function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const toggleDrawerOpened = () => {
    setIsDrawerOpened(!isDrawerOpened);
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  let isAuth = Boolean(currentUser);

  return (
    <div>
      <Header
        isAuth={isAuth}
        toggleDrawerOpened={toggleDrawerOpened}
        isDrawerOpened={isDrawerOpened}
      />
      <Main />
      <Footer />
    </div>
  );
}
