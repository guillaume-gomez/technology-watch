import React, { ReactElement, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import useQuery from "../../components/customHooks/useQuery";
import {
  Box, Form, FormField, TextInput, Button,
} from "grommet";
import { urlValidation, required } from "../../components/helpers/validationsHelpers";

import { setToken, setUID, setClient } from "../../authentication";

import ServerError from "../../components/serverError";

import { resetPasswordWithToken, resetPasswordWithTokenVariables } from "../../graphql/types/resetPasswordWithToken";
import { ResetPasswordWithToken as ResetPasswordWithTokenQuery } from "../../graphql/userQueries";

import {
  privateRootPath,
  loginPath,
} from "../../routesPath";

export default function ResetPasswordWithToken() : ReactElement {
  const query = useQuery();
  const { t } = useTranslation();
  const history = useHistory();
  const [networkError, setNetworkError] = useState<string>("");
  const [resetPasswordTokenFunction] = useMutation<resetPasswordWithToken, resetPasswordWithTokenVariables>(ResetPasswordWithTokenQuery, {
    onCompleted: ({userUpdatePasswordWithToken}) => {
      if(userUpdatePasswordWithToken && userUpdatePasswordWithToken.credentials) {
        const {
            accessToken, expiry, client, uid,
          } = userUpdatePasswordWithToken.credentials;
          setToken(accessToken, expiry);
          setClient(client, expiry);
          setUID(uid, expiry);
        history.push(privateRootPath);
      }
    },
    onError: (errors) => {
      console.error(errors);
      setNetworkError(errors.toString());
    },
  });
  const [values, setValues] = React.useState<resetPasswordWithTokenVariables>(
    {
      password: "",
      passwordConfirmation: "",
      resetPasswordToken: ""
    },
  );

  useEffect(() => {
    const token = query.get("variables[token]");
    if(token) {
      setValues({...values, resetPasswordToken: token })
    }
  }, []);

  function passwordValidation(comparant: keyof resetPasswordWithTokenVariables) {
    return (value : string, otherValues : resetPasswordWithTokenVariables) => {
      if (value.length <= 8) {
        return { status: "error", message: t("forgot-password-token.errors.password-size") };
      }
      if (value !== otherValues[comparant]) {
        return { status: "error", message: t("forgot-password-token.errors.password-confirmation") };
      }
      return true;
    };
  }
  return (
    <Box>
      {networkError !== "" && <ServerError messages={networkError} />}
      <Form
        value={values}
        onChange={(nextValues) => setValues(nextValues)}
        onSubmit={({ value }) => resetPasswordTokenFunction({ variables: value })}
      >
        <FormField name="password" htmlFor="password" label={t("forgot-password-token.password") + t("required")} validate={[passwordValidation("passwordConfirmation"), required(t)]}>
          <TextInput type="password" id="password" name="password" />
        </FormField>
        <FormField name="passwordConfirmation" htmlFor="password-confirmation" label={t("forgot-password-token.password-confirmation") + t("required")} validate={[passwordValidation("password"), required(t)]}>
          <TextInput type="password" id="password-confirmation" name="passwordConfirmation" />
        </FormField>
        <Box direction="row" justify="end" gap="medium">
          <Button type="submit" primary label={t("forgot-password-token.submit")} />
        </Box>
      </Form>
    </Box>
  );
}