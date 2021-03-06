import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import {
  Header, Heading, Spinner, Menu, Button, Box,
} from "grommet";
import { Performance, Sun, Moon } from "grommet-icons";
import { useApolloClient, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import {
  Logout as LogoutQuery,
  UpdateThemeMode as UpdateThemeModeQuery,
} from "../graphql/userQueries";

import CurrentUser from "./customHooks/currentUser";

import { userLogout } from "../graphql/types/userLogout";
import { updateThemeMode, updateThemeModeVariables } from "../graphql/types/updateThemeMode";
import {
  publicRootPath, editUserPath, tagsPath, privateRootPath, aboutPath,
} from "../routesPath";

import { clear } from "../authentication";

import ThemeMode from "../reducers/useThemeColor";

export default function PrivateHeader() : ReactElement {
  const history = useHistory();
  const {
    toggleColor, setThemeColor, themeMode, invertedColor,
  } = ThemeMode.useContainer();
  const { t } = useTranslation();
  const client = useApolloClient();
  const { loading, data } = CurrentUser({
    onCompletedCallback: ({
      currentUser: {
        themeMode: themeModeSaved,
      },
    }) => {
      setThemeColor(themeModeSaved as "light" | "dark");
    },
  });
  const [saveThemeMode] = useMutation<updateThemeMode, updateThemeModeVariables>(UpdateThemeModeQuery);
  const [logout] = useMutation<userLogout>(LogoutQuery, {
    onCompleted: () => {
      client.clearStore().then(() => {
        clearAndRedirect();
      });
    },
    onError: (errors) => {
      console.error(errors);
    },
  });

  function clearAndRedirect() {
    clear();
    history.push(publicRootPath);
  }

  function avatar() {
    if (loading) return <Spinner />;
    if (data && data.currentUser) {
      return (
        <Menu
          dropBackground={themeMode === "light" ? "light-1" : "dark-1"}
          label={data.currentUser.nickname}
          items={[
            { label: t("header.edit"), onClick: () => history.push(editUserPath) },
            { label: t("header.about"), onClick: () => history.push(aboutPath) },
            { label: t("header.logout"), onClick: () => logout() },
          ]}
        />
      );
    }
    // in case of expired cookie issue
    return (
     <Button label={t("header.logout")} hoverIndicator onClick={clearAndRedirect} />);
  }

  function onChangeTheme() {
    if (data && data.currentUser) {
      saveThemeMode({ variables: { id: data.currentUser.id, themeMode: invertedColor(themeMode) } });
    }
    toggleColor();
  }

  return (
    <Header background="brand">
      <Heading margin="medium" level="3" style={{ cursor: "pointer" }} onClick={() => history.push(privateRootPath)}>Tech&apos; Watch</Heading>
      <Box direction="row">
        <Button icon={themeMode === "light" ? <Moon /> : <Sun />} hoverIndicator onClick={onChangeTheme} />
        <Button icon={<Performance />} hoverIndicator onClick={() => history.push(tagsPath)} />
        {avatar()}
      </Box>
    </Header>
  );
}
