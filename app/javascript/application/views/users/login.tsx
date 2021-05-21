import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import {
  Box, Form, FormField, TextInput, Button, Heading, Anchor,
} from "grommet";

import ServerError from "../../components/serverError";
import { setToken, setUID, setClient } from "../../authentication";

import { userLogin, userLoginVariables } from "../../graphql/types/userLogin";
import { Login as LoginQuery } from "../../graphql/userQueries";

import { required } from "../../components/helpers/validationsHelpers";

import {
  privateRootPath,
  signUpPath,
  forgotPasswordPath,
} from "../../routesPath";

export default function Login() : ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const [networkError, setNetworkError] = useState<string>("");
  const [signUp] = useMutation<userLogin, userLoginVariables>(LoginQuery, {
    onCompleted: ({ userLogin }) => {
      if (userLogin) {
        const {
          accessToken, expiry, client, uid,
        } = userLogin.credentials;
        setToken(accessToken, expiry);
        setClient(client, expiry);
        setUID(uid, expiry);
        history.push(privateRootPath);
      } else {
        // set error
      }
    },
    onError: (errors) => {
      setNetworkError(errors.toString());
    },
  });
  const [values, setValues] = React.useState<userLoginVariables>(
    {
      email: "",
      password: "",
    },
  );
  return (
    <Box overflow="auto">
      <Heading level="3">{t("sign-in.title")}</Heading>
      {networkError !== "" && <ServerError messages={networkError} />}
      <Form
        value={values}
        onChange={(nextValues) => setValues(nextValues)}
        onSubmit={({ value }) => signUp({ variables: value })}
      >
        <FormField name="email" htmlFor="email" label={t("sign-in.email") + t("required")} validate={[required(t)]}>
          <TextInput id="email" name="email" />
        </FormField>
        <FormField name="password" htmlFor="password" label={t("sign-in.password") + t("required")} validate={[required(t)]}>
          <TextInput type="password" id="password" name="password" />
        </FormField>
        <Box pad="xsmall" flex align="center">
          <Box width="small">
            <Button type="submit" primary label={t("sign-in.submit")} />
          </Box>
        </Box>
        <Box direction="row" align="center" justify="between" gap="medium">
          <Button label={t("sign-in.sign-up")} onClick={() => history.push(signUpPath)} />
          <Anchor label={t("sign-in.forgot-password")} onClick={() => history.push(forgotPasswordPath)} />
        </Box>

      </Form>
    </Box>
  );
}
