import React from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";

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
      <HomePage />
    </div>
  );
}

export default App;
