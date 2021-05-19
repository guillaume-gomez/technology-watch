import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import {
  Box, Form, FormField, TextInput, Button, Heading
} from "grommet";

import ServerError from "../../components/serverError";
import { setToken, setUID, setClient } from "../../authentication";

import { resetPassword, resetPasswordVariables } from "../../graphql/types/resetPassword";
import { ResetPassword as ResetPasswordQuery } from "../../graphql/userQueries";

import { required } from "../../components/helpers/validationsHelpers";

import {
  privateRootPath,
  signUpPath,
} from "../../routesPath";

export default function ForgotPassword() : ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const [networkError, setNetworkError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [resetPassword] = useMutation<resetPassword, resetPasswordVariables>(ResetPasswordQuery, {
    onCompleted: ({userSendPasswordReset}) => {
      if (userSendPasswordReset) {
         setMessage(userSendPasswordReset.message);
         setNetworkError("");
      } else {
        // set error
      }
    },
    onError: (errors) => {
      setNetworkError(errors.toString());
    },
  });
  const [values, setValues] = React.useState<resetPasswordVariables>(
    {
      email: "",
      redirectUrl: "/reset-password-url"
    },
  );
  return (
    <Box>
      {networkError !== "" && <ServerError messages={networkError} />}
      {message !== "" && <Heading level="4" fill>{message}</Heading>}
      <Form
        value={values}
        onChange={(nextValues) => setValues(nextValues)}
        onSubmit={({ value }) => resetPassword({ variables: value })}
      >
        <Heading level={3} fill>{t("forgot-password.text")}</Heading>
        <FormField name="email" htmlFor="email" label={t("forgot-password.email") + t("required")} validate={[required(t)]}>
          <TextInput id="email" name="email" />
        </FormField>
        <Box direction="row" justify="between" gap="medium">
          <Button type="submit" primary label={t("forgot-password.send")} />
        </Box>

      </Form>
    </Box>
  );
}
