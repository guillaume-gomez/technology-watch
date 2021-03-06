/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { render } from "react-dom";
import {
  ApolloClient, InMemoryCache, ApolloProvider, createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";
import { getToken, getUID, getClient } from "../application/authentication";
import Router from "../application/router";
import ThemeMode from "../application/reducers/useThemeColor";

const httpLink = createHttpLink({
  uri: "/graphql",
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getToken();
  const uid = getUID();
  const client = getClient();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      accept: "application/json",
      "Content-Type": "application/json",
      "access-token": token,
      uid,
      client,
    },
  };
});

const cache = new InMemoryCache({
  queryType: true,
  typePolicies: {
    Query: {
      fields: {
        getNotes: relayStylePagination(),
        getTags: relayStylePagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeMode.Provider>
        <Router />
      </ThemeMode.Provider>
    </ApolloProvider>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  render(
    <App />,
    document.body.appendChild(document.createElement("div")),
  );
});
