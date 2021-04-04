import React, { ReactElement, ReactChild } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import {
  Box, Form, FormField, TextInput, Button,
} from "grommet";

import { setToken } from "../../authentication";

import { userLogin, userLoginVariables } from "../../graphql/types/userLogin";
import { Login as LoginQuery } from "../../graphql/userQueries";

import {
  signUpMessagePath
} from "../../routesPath";

export default function Login() : ReactElement {
  const { t } = useTranslation();
  let history = useHistory();
  const [signUp, { data }] = useMutation<userLogin, userLoginVariables>(LoginQuery, {
    onCompleted: ({userLogin}) => {
      if(userLogin) {
        const { accessToken, expiry } = userLogin.credentials;
        const expiresInDays = expiry / (24*60*60);
        setToken(accessToken, expiry);
        //history.push(signUpMessagePath);
      }else {
        //set error
       console.error("error");
      }
    },
    onError: (errors) => {
      console.error(errors);
    },
  });
  const [values, setValues] = React.useState<userLoginVariables>(
    {
      email: "",
      password: "",
    },
  );
  return (
    <Form
      value={values}
      onChange={(nextValues) => setValues(nextValues)}
      onSubmit={({ value }) => signUp({ variables: value })}
    >
      <FormField name="email" htmlFor="text-input-id" label={t("sign-up.email")}>
        <TextInput id="text-input-id" name="email" />
      </FormField>
      <FormField name="password" htmlFor="text-input-id" label={t("sign-up.password")}>
        <TextInput id="text-input-id" name="password" />
      </FormField>
      <Box direction="row" justify="end" gap="medium">
        <Button type="submit" primary label={t("sign-up.submit")} />
      </Box>
    </Form>
  );
}
