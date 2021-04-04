import React, { ReactElement, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header, Heading, Spinner, Text, Menu } from "grommet";
import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import {
  UserHeader as UserQuery,
  Logout as LogoutQuery
} from "../graphql/userQueries";
import { currentUserHeader } from "../graphql/types/currentUserHeader";
import { userLogout } from "../graphql/types/userLogout";
import { publicRootPath } from "../routesPath";

import { clear } from "../authentication";


export default function PublicHeader() : ReactElement {
  return (
    <Header background="brand">
      <Heading margin="medium" level="3">Technology Watch</Heading>
    </Header>
  );
}
