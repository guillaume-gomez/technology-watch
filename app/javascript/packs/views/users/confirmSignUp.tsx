import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  signUpPath
} from "../../routesPath";

import {
  Box, Text, Button
} from "grommet";

export default function ConfirmSignUp() : ReactElement {
  const { t } = useTranslation();
  return (
    <Box>
      <Text>{t("confirm-sign-up.text")}</Text>
      <Link to={signUpPath}>
        <Button primary label={t("confirm-sign-up.go-to-login")}/>
      </Link>
      
    </Box>
  );
}
