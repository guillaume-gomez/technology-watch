import React, { ReactElement, Suspense } from "react";
import {
  BrowserRouter,
  Switch,
} from "react-router-dom";
import {
  Grommet, Spinner,
} from "grommet";
import { theme } from "./theme";

import {
  aboutPath,
  signUpPath,
  signUpMessagePath,
  confirmAccountPath,
  loginPath,
  publicRootPath,
  privateRootPath,
  addNotePath,
  editNotePath,
  editUserPath,
  tagsPath,
  forgotPasswordPath,
  forgotPasswordWithToken,
} from "./routesPath";

import PublicRoute from "./components/router/publicRoute";
import PrivateRoute from "./components/router/privateRoute";

import SignUp from "./views/users/signUp";
import ConfirmSignUp from "./views/users/confirmSignUp";
import ConfirmAccount from "./views/users/confirmAccount";
import Login from "./views/users/login";
import ForgotPassword from "./views/users/forgotPassword";
import ForgotPasswordWithToken from "./views/users/forgotPasswordToken";
import EditProfile from "./views/users/editProfile";
import Notes from "./views/notes/notes";
import Tags from "./views/tags/tags";
import About from "./views/about/about";
import NewNote from "./views/notes/newNote";
import EditNote from "./views/notes/editNote";

import ThemeColor from "./reducers/useThemeColor";

export default function Router() : ReactElement {
  const { themeMode } = ThemeColor.useContainer();
  return (
    <Grommet theme={theme} full themeMode={themeMode}>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <PrivateRoute exact path={privateRootPath} component={Notes} />
            <PrivateRoute path={addNotePath} component={NewNote} />
            <PrivateRoute path={editNotePath} component={EditNote} />
            <PrivateRoute path={editUserPath} component={EditProfile} />
            <PrivateRoute path={tagsPath} component={Tags} />
            <PrivateRoute path={aboutPath} component={About} />
            <PublicRoute path={signUpMessagePath} component={ConfirmSignUp} />
            <PublicRoute path={confirmAccountPath} component={ConfirmAccount} />
            <PublicRoute path={signUpPath} component={SignUp} />
            <PublicRoute path={forgotPasswordPath} component={ForgotPassword} />
            <PublicRoute path={forgotPasswordWithToken} component={ForgotPasswordWithToken} />
            <PublicRoute path={[loginPath, publicRootPath, "/"]} component={Login} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Grommet>
  );
}
