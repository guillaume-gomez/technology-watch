import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import {
  Header, Heading, Spinner, Menu,
} from "grommet";
import { useApolloClient, useQuery, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import {
  UserHeader as UserQuery,
  Logout as LogoutQuery,
} from "../graphql/userQueries";
import { userLogout } from "../graphql/types/userLogout";
import { publicRootPath } from "../routesPath";

import { clear } from "../authentication";

export default function PrivateHeader() : ReactElement {
  const history = useHistory();
  const { t } = useTranslation();
  const client = useApolloClient();
  const { loading, error, data } = useQuery(UserQuery);
  const [logout] = useMutation<userLogout>(LogoutQuery, {
    onCompleted: () => {
      client.resetStore().then(() => {
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
    if (data) {
      return (
        <Menu
          label={data.currentUser.nickname}
          items={[
            { label: t("header.logout"), onClick: () => logout() },
            { label: t("header.edit"), onClick: () => {} },
          ]}
        />
      );
    }
    return <></>;
  }

  return (
    <Header background="brand">
      <Heading margin="medium" level="3">Technology Watch</Heading>
      {avatar()}
    </Header>
  );
}
