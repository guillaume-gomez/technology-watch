/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { render } from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import { getToken } from "./authentication";
import "./i18n";

import Router from "./router";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: getToken(),
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  render(
    <App />,
    document.body.appendChild(document.createElement("div")),
  );
});
