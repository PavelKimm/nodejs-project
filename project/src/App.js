import React, { useState } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

export default function App() {
  let isAuth = false;
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const toggleDrawerOpened = () => {
    setIsDrawerOpened(!isDrawerOpened);
  };

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
