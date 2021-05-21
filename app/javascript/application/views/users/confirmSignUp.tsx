import React, { ReactElement, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  Box, Paragraph, Button, ResponsiveContext,
} from "grommet";
import {
  loginPath,
  resetConfirmAccountPath,
} from "../../routesPath";

export default function ConfirmSignUp() : ReactElement {
  const { t } = useTranslation();
  const size = useContext(ResponsiveContext);
  return (
    <Box justify="center" align="center">
      <Box width="xlarge">
        <Paragraph fill>{t("confirm-sign-up.text")}</Paragraph>
        <Box gap="small" fill direction={size === "small" ? "column" : "row"} align="center" justify={size === "small" ? "center" : "between"}>
          <Link to={resetConfirmAccountPath}>
            <Button label={t("confirm-sign-up.resend-confirmation-email")} />
          </Link>
          <Link to={loginPath}>
            <Button primary label={t("confirm-sign-up.go-to-login")} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
