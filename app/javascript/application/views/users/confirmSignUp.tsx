import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  Box, Paragraph, Button,
} from "grommet";
import {
  loginPath,
} from "../../routesPath";

export default function ConfirmSignUp() : ReactElement {
  const { t } = useTranslation();
  return (
    <Box justify="center" align="center">
      <Box width="xlarge">
        <Paragraph fill>{t("confirm-sign-up.text")}</Paragraph>
        <Box fill direction="row" justify="end">
          <Link to={loginPath}>
            <Button primary label={t("confirm-sign-up.go-to-login")} />
          </Link>
        </Box>
      </Box>
   </Box>
  );
}
