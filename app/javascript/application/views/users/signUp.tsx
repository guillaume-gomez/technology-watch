import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import {
  Box, Form, FormField, TextInput, Button, Heading,
} from "grommet";
import { emailValidation, required } from "../../components/helpers/validationsHelpers";

import ServerError from "../../components/serverError";

import { userSignUp, userSignUpVariables } from "../../graphql/types/userSignUp";
import { SignUp as SignUpQuery } from "../../graphql/userQueries";

import {
  signUpMessagePath,
  loginPath,
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

  function passwordValidation(comparant: keyof userSignUpVariables) {
    return (value : string, otherValues : userSignUpVariables) => {
      if (value.length < 8) {
        return { status: "error", message: t("sign-up.errors.password-size") };
      }
      if (value !== otherValues[comparant]) {
        return { status: "error", message: t("sign-up.errors.password-confirmation") };
      }
      return true;
    };
  }

  return (
    <Box overflow="auto">
      <Heading level="3">{t("sign-up.title")}</Heading>
      {networkError !== "" && <ServerError messages={networkError} />}
      <Form
        value={values}
        onChange={(nextValues) => setValues(nextValues)}
        onSubmit={({ value }) => signUp({ variables: value })}
      >
        <FormField name="email" htmlFor="email" label={t("sign-up.email") + t("required")} validate={[emailValidation(t), required(t)]}>
          <TextInput id="email" name="email" />
        </FormField>
        <FormField name="name" htmlFor="name" label={t("sign-up.name") + t("required")} validate={[required(t)]}>
          <TextInput id="name" name="name" />
        </FormField>
        <FormField name="nickname" htmlFor="nickname" label={t("sign-up.nickname") + t("required")} validate={[required(t)]}>
          <TextInput id="nickname" name="nickname" />
        </FormField>
        <FormField name="password" htmlFor="password" label={t("sign-up.password") + t("required")} validate={[passwordValidation("passwordConfirmation"), required(t)]}>
          <TextInput type="password" id="password" name="password" />
        </FormField>
        <FormField name="passwordConfirmation" htmlFor="password-confirmation" label={t("sign-up.password-confirmation") + t("required")} validate={[passwordValidation("password"), required(t)]}>
          <TextInput type="password" id="password-confirmation" name="passwordConfirmation" />
        </FormField>
        <Box direction="row" justify="between" gap="medium">
          <Button label={t("sign-up.login")} onClick={() => history.push(loginPath)} />
          <Button primary type="submit" label={t("sign-up.submit")} />
        </Box>
      </Form>
    </Box>
  );
}
