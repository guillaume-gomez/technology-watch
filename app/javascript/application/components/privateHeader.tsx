import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import {
  Header, Heading, Spinner, Menu, Button, Box, ThemeContext
} from "grommet";
import { Performance, Sun, Moon } from "grommet-icons";
import { useApolloClient, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import {
  Logout as LogoutQuery,
} from "../graphql/userQueries";

import CurrentUser from "./customHooks/currentUser";

import { userLogout } from "../graphql/types/userLogout";
import { publicRootPath, editUserPath, tagsPath, privateRootPath } from "../routesPath";

import { clear } from "../authentication";

import ThemeMode from "../reducers/useThemeColor";

export default function PrivateHeader() : ReactElement {
  const history = useHistory();
  const { toggleColor, themeMode } = ThemeMode.useContainer();
  const { t } = useTranslation();
  const client = useApolloClient();
  const { loading, data } = CurrentUser({});
  const [logout] = useMutation<userLogout>(LogoutQuery, {
    onCompleted: () => {
      client.clearStore().then(() => {
        clear();
        history.push(publicRootPath);
      });
    },
    onError: (errors) => {
      console.error(errors);
    },
  });

  function avatar() {
    if (loading) return <Spinner />;
    if (data && data.currentUser && data.currentUser.nickname) {
      return (
        <Menu
          label={data.currentUser.nickname}
          items={[
            { label: t("header.edit"), onClick: () => history.push(editUserPath) },
            { label: t("header.logout"), onClick: () => logout() },
          ]}
        />
      );
    }
    return <></>;
  }

  return (
    <Header background="brand">
      <Heading margin="medium" level="3" style={{cursor: "pointer"}} onClick={() => history.push(privateRootPath)}>Technology Watch</Heading>
      <Box direction="row">
        <Button icon={themeMode == "light" ? <Moon /> : <Sun />} hoverIndicator onClick={toggleColor} />
        <Button icon={<Performance />} hoverIndicator onClick={() => history.push(tagsPath)} />
        {avatar()}
      </Box>
    </Header>
  );
}
