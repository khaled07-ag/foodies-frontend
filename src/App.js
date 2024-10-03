import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import UserContext from "./context/UserContext";
import { useEffect, useState } from "react";
import { checkToken } from "./api/storage";

function App() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    setUser(checkToken());
  }, []);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="App font-mono ">
        <Navbar />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
}

export default App;
