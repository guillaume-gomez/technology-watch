import React, { ReactElement, Suspense } from "react";
import { useTranslation } from "react-i18next";
import {
  BrowserRouter,
  Switch,
} from "react-router-dom";
import { Grommet, ResponsiveContext, Spinner } from "grommet";
import { FormClose } from "grommet-icons";
import { theme } from "./theme";

import {
  signUpPath,
  signUpMessagePath,
  loginPath
} from "./routesPath";

import PublicRoute from "./components/router/publicRoute";

import SignUp from "./views/users/signUp";
import ConfirmSignUp from "./views/users/confirmSignUp";
import Login from "./views/users/login";

export default function Router() : ReactElement {
  return (
    <Grommet theme={theme} full themeMode="light">
      <ResponsiveContext.Consumer>
        {(size) => (
          <BrowserRouter>
            <Suspense fallback={<Spinner />}>
              <Switch>
                <PublicRoute path={signUpMessagePath} component={ConfirmSignUp} />
                <PublicRoute path={loginPath} component={Login} />
                <PublicRoute exact path={signUpPath} component={SignUp} />
              </Switch>
            </Suspense>
          </BrowserRouter>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}
