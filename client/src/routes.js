import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AnimalsPage } from "./pages/AnimalsPage/AnimalsPage";
import { CreatePage } from "./pages/CreatePage/CreatePage";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/" exact>
          <AnimalsPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/signin" exact>
        <SignInPage />
      </Route>
      <Route path="/signup" exact>
        <SignUpPage />
      </Route>
      <Redirect to="/signin" />
    </Switch>
  );
};
