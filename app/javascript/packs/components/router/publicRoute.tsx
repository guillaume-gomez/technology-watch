import React, { ReactElement, createElement } from "react";
import { Route, RouteComponentProps, Redirect } from "react-router-dom";

import { privateRootPath } from "../../routesPath";
import Layout from "../../views/layout/layout";

import { getToken } from "../../authentication";

export default function PublicRoute({ component, path, exact }: any) : ReactElement {
  console.log(getToken())
  if(getToken()) {
    return <Redirect to={{ pathname: privateRootPath }} />;
  }
  return (
    <Route
      path={path}
      exact={exact}
      render={(props: RouteComponentProps<any>) => (
        <Layout loggedIn={false}>
          {createElement(component, props)}
        </Layout>
      )}
    />
  );
}
