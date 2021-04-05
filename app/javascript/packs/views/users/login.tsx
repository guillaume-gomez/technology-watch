import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import {
  Box, Form, FormField, TextInput, Button, Text,
} from "grommet";

import { setToken, setUID, setClient } from "../../authentication";

import { userLogin, userLoginVariables } from "../../graphql/types/userLogin";
import { Login as LoginQuery } from "../../graphql/userQueries";

import {
  privateRootPath,
} from "../../routesPath";

export default function Login() : ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const [networkError, setNetworkError] = useState<string>("");
  const [signUp, { data }] = useMutation<userLogin, userLoginVariables>(LoginQuery, {
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
        // console.error(errors);
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
    <Box>
      {networkError !== "" && <Text>{networkError}</Text>}
      <Form
        value={values}
        onChange={(nextValues) => setValues(nextValues)}
        onSubmit={({ value }) => signUp({ variables: value })}
      >
        <FormField name="email" htmlFor="email" label={t("sign-in.email")} required>
          <TextInput id="email" name="email" />
        </FormField>
        <FormField name="password" htmlFor="password" label={t("sign-in.password")} required>
          <TextInput type="password" id="password" name="password" />
        </FormField>
        <Box direction="row" justify="between" gap="medium">
          <Button primary label={t("sign-in.sign-up")} />
          <Button type="submit" primary label={t("sign-in.submit")} />
        </Box>

      </Form>
    </Box>
  );
}
