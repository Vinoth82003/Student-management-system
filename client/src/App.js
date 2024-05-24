import { createContext, useState } from "react";
import Auth from "./Components/Auth";
import Dashboard from "./Components/Dashboard";

export const AppContext = createContext();

function App() {
  const [userData, setUserData] = useState(null);
  const [isAuth, setAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  const value = { userData, setUserData, setAuth, setUserId };
  return (
    <>
      <AppContext.Provider value={value}>
        {isAuth ? <Dashboard userId={userId} /> : <Auth />}
      </AppContext.Provider>
    </>
  );
}

export default App;
