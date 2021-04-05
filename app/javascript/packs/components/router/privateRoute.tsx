import React, { ReactElement, createElement } from "react";
import { Route, RouteComponentProps, Redirect } from "react-router-dom";

import { publicRootPath } from "../../routesPath";
import Layout from "../../views/layout/layout";

import { getToken } from "../../authentication";

export default function PrivateRoute({ component, path, exact }: any) : ReactElement {
  if (!getToken()) {
    return <Redirect to={{ pathname: publicRootPath }} />;
  }
  return (
    <Route
      path={path}
      exact={exact}
      render={(props: RouteComponentProps<any>) => (
        <Layout loggedIn>
          {createElement(component, props)}
        </Layout>
      )}
    />
  );
}
