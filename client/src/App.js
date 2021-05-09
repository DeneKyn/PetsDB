import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes";
import { AuthContext } from "./context/authContext";
import { useAuth } from "./hooks/authHook";
import "./App.css";

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuth,
      }}
    >
      <BrowserRouter>
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
