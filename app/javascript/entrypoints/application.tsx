import React from "react";
import ReactDOM from "react-dom/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { relayStylePagination } from "@apollo/client/utilities";
import { getToken, getUID, getClient, csrfToken } from "../front-end-app/authentication";

import Router from "../front-end-app/router";
import ThemeMode from "../front-end-app/reducers/useThemeColor";

const httpLink = new HttpLink({
  uri: "/graphql", credentials: "same-origin", 
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getToken();
  const uid = getUID();
  const client = getClient();
  const csrf = csrfToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": token,
      'X-CSRF-Token': csrf
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    queryType: true,
    typePolicies: {
      Query: {
        fields: {
          getNotes: relayStylePagination(),
          getTags: relayStylePagination(),
        },
      },
    }
  }),
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

//const App = () => <h1>Hello jsdlkfjd</h1>;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);


// original file 
/* eslint-disable react/jsx-filename-extension */

// import { setContext } from "@apollo/client/link/context";
// import { relayStylePagination } from "@apollo/client/utilities";
// import { getToken, getUID, getClient } from "../application/authentication";
// import Router from "../application/router";
// import ThemeMode from "../application/reducers/useThemeColor";


// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = getToken();
//   const uid = getUID();
//   const client = getClient();
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       accept: "application/json",
//       "Content-Type": "application/json",
//       "access-token": token,
//       'X-CSRF-Token': csrfToken(),
//     },
//   };
// });

// const cache = new InMemoryCache({
//   queryType: true,
//   typePolicies: {
//     Query: {
//       fields: {
//         getNotes: relayStylePagination(),
//         getTags: relayStylePagination(),
//       },
//     },
//   },
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache,
// });

// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <ThemeMode.Provider>
//         <Router />
//       </ThemeMode.Provider>
//     </ApolloProvider>
//   );
// }

// document.addEventListener("DOMContentLoaded", () => {
//   render(
//     <App />,
//     document.body.appendChild(document.createElement("div")),
//   );
// });