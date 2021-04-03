import React, { ReactElement, ReactChild } from 'react';
import { useTranslation } from "react-i18next";
import { Box, Form, FormField, TextInput, Button } from 'grommet';


export interface SignUpProps {
}

export default function SignUp({  } : SignUpProps) : ReactElement {
  const { t } = useTranslation();
  const [value, setValue] = React.useState({});
  return (
    <Form
      value={value}
      onChange={nextValue => setValue(nextValue)}
      onReset={() => setValue({})}
      onSubmit={({ value }) => {}}
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
     <FormField name="password-confirmation" htmlFor="text-input-id" label={t("sign-up.password-confirmation")}>
        <TextInput id="text-input-id" name="password-confirmation" />
      </FormField>
      <Box direction="row" justify="end" gap="medium">
        <Button type="submit" primary label={t("sign-up.submit")} />
      </Box>
    </Form>);
};

