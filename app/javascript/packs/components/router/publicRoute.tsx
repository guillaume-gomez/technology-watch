import React, { ReactElement, createElement } from "react";
import  { Route, RouteComponentProps } from "react-router-dom";

import Layout from "../../views/layout/layout";

export default function PublicRoute({ component, path, exact }: any) : ReactElement {
  console.log("mach")
  return (
    <Route
      path={path}
      exact={exact}
      render={(props: RouteComponentProps<any>) => (
        <Layout>
          {createElement(component, props)}
        </Layout>
      )}
    />
  );
};
