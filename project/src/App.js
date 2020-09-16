import React from "react";

import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  let isAuth = false;
  const [isDrawerOpened, setIsDrawerOpened] = React.useState(false);
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
      {/* <Footer /> */}
    </div>
  );
}

export default App;
