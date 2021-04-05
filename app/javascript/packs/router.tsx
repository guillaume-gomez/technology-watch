import React, { ReactElement, Suspense } from "react";
import {
  BrowserRouter,
  Switch,
} from "react-router-dom";
import { Grommet, ResponsiveContext, Spinner } from "grommet";
import { theme } from "./theme";

import {
  signUpPath,
  signUpMessagePath,
  loginPath,
  publicRootPath,
  privateRootPath,
  addNotePath
} from "./routesPath";

import PublicRoute from "./components/router/publicRoute";
import PrivateRoute from "./components/router/privateRoute";

import SignUp from "./views/users/signUp";
import ConfirmSignUp from "./views/users/confirmSignUp";
import Login from "./views/users/login";
import Notes from "./views/notes/notes";
import NewNotes from "./views/notes/newNote";

export default function Router() : ReactElement {
  return (
    <Grommet theme={theme} full themeMode="light">
      <ResponsiveContext.Consumer>
        {(size) => (
          <BrowserRouter>
            <Suspense fallback={<Spinner />}>
              <Switch>
                <PrivateRoute exact path={privateRootPath} component={Notes} />
                <PrivateRoute path={addNotePath} component={NewNotes} />
                <PublicRoute path={signUpMessagePath} component={ConfirmSignUp} />
                <PublicRoute path={[loginPath, publicRootPath, "/"]} component={Login} />
                <PublicRoute exact path={signUpPath} component={SignUp} />
              </Switch>
            </Suspense>
          </BrowserRouter>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}
