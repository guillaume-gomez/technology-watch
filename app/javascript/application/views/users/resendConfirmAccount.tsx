import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import {
  Box, Form, FormField, TextInput, Button, Heading
} from "grommet";

import ServerError from "../../components/serverError";
import { setToken, setUID, setClient } from "../../authentication";

import { userResendConfirmation, userResendConfirmationVariables } from "../../graphql/types/userResendConfirmation";
import { UserResendConfirmation as UserResendConfirmationQuery } from "../../graphql/userQueries";

import { required } from "../../components/helpers/validationsHelpers";

import {
  privateRootPath,
  signUpPath,
} from "../../routesPath";

export default function ResendConfirmAccount() : ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const [networkError, setNetworkError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [resetPassword] = useMutation<userResendConfirmation, userResendConfirmationVariables>(UserResendConfirmationQuery, {
    onCompleted: ({userResendConfirmation}) => {
      if (userResendConfirmation) {
         setMessage(userResendConfirmation.message);
         setNetworkError("");
      } else {
        // set error
      }
    },
    onError: (errors) => {
      setNetworkError(errors.toString());
    },
  });
  const [values, setValues] = React.useState<userResendConfirmationVariables>(
    {
      email: "",
      redirectUrl: "/reset-confirm-account"
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
        <Heading level={3} fill>{t("resend-confirm-account.text")}</Heading>
        <FormField name="email" htmlFor="email" label={t("resend-confirm-account.email") + t("required")} validate={[required(t)]}>
          <TextInput id="email" name="email" />
        </FormField>
        <Box direction="row" justify="end">
          <Button type="submit" primary label={t("resend-confirm-account.send")} />
        </Box>

      </Form>
    </Box>
  );
}
