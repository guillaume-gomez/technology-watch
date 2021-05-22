import React, { ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import {
  Box, Text, Button, Spinner,
} from "grommet";
import { userConfirmAccount, userConfirmAccountVariables } from "../../graphql/types/userConfirmAccount";
import { ConfirmAccount as ConfirmAccountQuery } from "../../graphql/userQueries";
import useQuery from "../../components/customHooks/useQuery";

import ServerError from "../../components/serverError";

import {
  loginPath,
} from "../../routesPath";

export default function ConfirmAccount() : ReactElement {
  const { t } = useTranslation();
  const query = useQuery();
  const [networkError, setNetworkError] = useState<string>("");
  const [confirmAccount, { loading }] = useLazyQuery<userConfirmAccount, userConfirmAccountVariables>(ConfirmAccountQuery);

  useEffect(() => {
    const token = query.get("token");
    if (token) {
      confirmAccount({ variables: { token, redirectUrl: "/login" } });
    } else {
      setNetworkError(t("confirm-account.errors.token"));
    }
  }, [confirmAccount, t]);

  if (loading) {
    return <Spinner />;
  }

  if (networkError) {
    return <ServerError messages={networkError} />;
  }

  return (
    <Box>
      <Text>{t("confirm-account.text")}</Text>
      <Link to={loginPath}>
        <Button primary label={t("confirm-account.go-to-login")} />
      </Link>

    </Box>
  );
}
