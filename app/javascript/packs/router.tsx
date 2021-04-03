import React, { ReactElement, useState, Suspense } from 'react';
import { useTranslation } from "react-i18next";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { theme } from "./theme";
import { Grommet, ResponsiveContext } from 'grommet';
import { FormClose } from "grommet-icons";

import PublicRoute from "./components/router/publicRoute";

import SignUp from "./views/users/signUp";


export default function Router() : ReactElement {
  const { t } = useTranslation();
  return (
    <Grommet theme={theme} full themeMode="light">
      <ResponsiveContext.Consumer>
        {size => (
          <BrowserRouter>
            <Suspense fallback={<FormClose size="medium" />}>
              <Switch>
                 <PublicRoute component={SignUp}/>
               </Switch>
             </Suspense>
          </BrowserRouter>
       )}
     </ResponsiveContext.Consumer>
    </Grommet>
    );
};

