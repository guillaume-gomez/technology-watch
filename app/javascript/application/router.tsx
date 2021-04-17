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
  addNotePath,
  editNotePath,
  editUserPath,
  tagsPath,
} from "./routesPath";

import PublicRoute from "./components/router/publicRoute";
import PrivateRoute from "./components/router/privateRoute";

import SignUp from "./views/users/signUp";
import ConfirmSignUp from "./views/users/confirmSignUp";
import Login from "./views/users/login";
import EditProfile from "./views/users/editProfile";
import Notes from "./views/notes/notes";
import Tags from "./views/tags/tags";
import NewNote from "./views/notes/newNote";
import EditNote from "./views/notes/editNote";

export default function Router() : ReactElement {
  return (
    <Grommet theme={theme} full themeMode="light">
      <ResponsiveContext.Consumer>
        {(size) => (
          <BrowserRouter>
            <Suspense fallback={<Spinner />}>
              <Switch>
                <PrivateRoute exact path={privateRootPath} component={Notes} />
                <PrivateRoute path={addNotePath} component={NewNote} />
                <PrivateRoute path={editNotePath} component={EditNote} />
                <PrivateRoute path={editUserPath} component={EditProfile} />
                <PrivateRoute path={tagsPath} component={Tags} />
                <PublicRoute path={signUpMessagePath} component={ConfirmSignUp} />
                <PublicRoute path={signUpPath} component={SignUp} />
                <PublicRoute path={[loginPath, publicRootPath, "/"]} component={Login} />
              </Switch>
            </Suspense>
          </BrowserRouter>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}
