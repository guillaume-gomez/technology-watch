import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import {
  Box, Form, FormField, TextInput, Button,
} from "grommet";

import ServerError from "../../components/serverError";

import { userSignUp, userSignUpVariables } from "../../graphql/types/userSignUp";
import { SignUp as SignUpQuery } from "../../graphql/userQueries";

import {
  signUpMessagePath,
  loginPath
} from "../../routesPath";

export default function SignUp() : ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const [networkError, setNetworkError] = useState<string>("");
  const [signUp] = useMutation<userSignUp, userSignUpVariables>(SignUpQuery, {
    onCompleted: () => {
      history.push(signUpMessagePath);
    },
    onError: (errors) => {
      console.error(errors);
      setNetworkError(errors.toString());
    },
  });
  const [values, setValues] = React.useState<userSignUpVariables>(
    {
      email: "",
      name: "",
      nickname: "",
      password: "",
      passwordConfirmation: "",
    },
  );
  const [errors, setErrors] = useState<object>();
  console.log(errors)
  return (
    <Box>
      {networkError !== "" && <ServerError messages={networkError} />}
      <Form
        value={values}
        errors={errors}
        onChange={(nextValues) => setValues(nextValues)}
        onSubmit={({ value }) => signUp({ variables: value })}
      >
        <FormField name="email" htmlFor="email" label={t("sign-up.email")} required>
          <TextInput id="email" name="email" />
        </FormField>
        <FormField name="name" htmlFor="name" label={t("sign-up.name")} required>
          <TextInput id="name" name="name" />
        </FormField>
        <FormField name="nickname" htmlFor="nickname" label={t("sign-up.nickname")} required>
          <TextInput id="nickname" name="nickname" />
        </FormField>
        <FormField name="password" htmlFor="password" label={t("sign-up.password")} required>
          <TextInput type="password" id="password" name="password" />
        </FormField>
        <FormField name="passwordConfirmation" htmlFor="password-confirmation" label={t("sign-up.password-confirmation")} required>
          <TextInput type="password" id="password-confirmation" name="passwordConfirmation" />
        </FormField>
        <Box direction="row" justify="between" gap="medium">
          <Button primary label={t("sign-up.login")} onClick={() => history.push(loginPath)}/>
          <Button type="submit" primary label={t("sign-up.submit")} />
        </Box>
      </Form>
    </Box>
  );
}
