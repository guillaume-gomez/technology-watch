/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { render } from "react-dom";
import { InMemoryCache } from "apollo-cache-inmemory";
import { relayStylePagination } from "@apollo/client/utilities";
import { ApolloProvider, ApolloClient } from "@apollo/client";

import { getToken, getUID, getClient } from "./authentication";
import "./i18n";

import Router from "./router";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "/graphql",
  cache,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    "access-token": getToken(),
    uid: getUID(),
    client: getClient(),
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
