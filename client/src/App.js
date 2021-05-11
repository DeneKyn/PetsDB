import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useRoutes } from "./routes";
import { AuthContext } from "./context/authContext";
import { useAuth } from "./hooks/authHook";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer />
      <BrowserRouter>
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
