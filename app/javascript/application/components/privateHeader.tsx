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
  UpdateThemeMode as UpdateThemeModeQuery
} from "../graphql/userQueries";

import CurrentUser from "./customHooks/currentUser";

import { userLogout } from "../graphql/types/userLogout";
import { updateThemeMode, updateThemeModeVariables } from "../graphql/types/updateThemeMode";
import { publicRootPath, editUserPath, tagsPath, privateRootPath, aboutPath } from "../routesPath";

import { clear } from "../authentication";

import ThemeMode from "../reducers/useThemeColor";

export default function PrivateHeader() : ReactElement {
  const history = useHistory();
  const { toggleColor, setThemeColor, themeMode, invertedColor } = ThemeMode.useContainer();
  const { t } = useTranslation();
  const client = useApolloClient();
  const { loading, data } = CurrentUser({onCompletedCallback: ({
      currentUser: {
        themeMode: themeModeSaved,
      },
    }) => {
      setThemeColor(themeModeSaved as "light" | "dark");
    },});
  const [saveThemeMode] = useMutation<updateThemeMode, updateThemeModeVariables>(UpdateThemeModeQuery)
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
            { label: t("header.about"), onClick: () => history.push(aboutPath) },
            { label: t("header.logout"), onClick: () => logout() },
          ]}
        />
      );
    }
    return <></>;
  }

  function onChangeTheme() {
    if(data && data.currentUser) {
      saveThemeMode({variables: {id: data.currentUser.id, themeMode: invertedColor(themeMode) }})
    }
    toggleColor();
  }

  return (
    <Header background="brand">
      <Heading margin="medium" level="3" style={{cursor: "pointer"}} onClick={() => history.push(privateRootPath)}>Technology Watch</Heading>
      <Box direction="row">
        <Button icon={themeMode == "light" ? <Moon /> : <Sun />} hoverIndicator onClick={onChangeTheme} />
        <Button icon={<Performance />} hoverIndicator onClick={() => history.push(tagsPath)} />
        {avatar()}
      </Box>
    </Header>
  );
}
