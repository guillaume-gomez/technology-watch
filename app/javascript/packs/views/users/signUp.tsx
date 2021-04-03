import React, { ReactElement, ReactChild } from 'react';
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";

import { Box, Form, FormField, TextInput, Button } from 'grommet';

import { userSignUp, userSignUpVariables } from "../../graphql/types/userSignUp";
import { SignUp as SignUpQuery } from "../../graphql/userQueries";

export interface SignUpProps {
}

export default function SignUp({  } : SignUpProps) : ReactElement {
  const { t } = useTranslation();
  const [signUp, { data }] = useMutation<userSignUp, userSignUpVariables>(SignUpQuery, {
    onCompleted: (data) => {
      console.log(data)
    },
    onError: (errors) => {
      console.log(errors)
    }
  });
  const [values, setValues] = React.useState<userSignUpVariables>();
  return (
    <Form
      value={values}
      onChange={nextValues => setValues(nextValues) }
      onSubmit={({ value }) => signUp({variables: value})}
    >
     <FormField name="email" htmlFor="text-input-id" label={t("sign-up.email")}>
        <TextInput id="text-input-id" name="email" />
      </FormField>
      <FormField name="name" htmlFor="text-input-id" label={t("sign-up.name")}>
        <TextInput id="text-input-id" name="name" />
      </FormField>
      <FormField name="nickname" htmlFor="text-input-id" label={t("sign-up.nickname")}>
        <TextInput id="text-input-id" name="nickname" />
      </FormField>
      <FormField name="password" htmlFor="text-input-id" label={t("sign-up.password")}>
        <TextInput id="text-input-id" name="password" />
      </FormField>
     <FormField name="passwordConfirmation" htmlFor="text-input-id" label={t("sign-up.password-confirmation")}>
        <TextInput id="text-input-id" name="passwordConfirmation" />
      </FormField>
      <Box direction="row" justify="end" gap="medium">
        <Button type="submit" primary label={t("sign-up.submit")} />
      </Box>
    </Form>);
};

