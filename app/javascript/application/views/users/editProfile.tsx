import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import {
  Box,
  Heading,
  Button,
  Form,
  FormField,
  TextInput,
  Select,
} from "grommet";
// @ts-ignore
import i18n from "../../i18n";

import { editUser, editUserVariables } from "../../graphql/types/editUser";
import {
  EditUser as EditUserQuery,
} from "../../graphql/userQueries";

import {
  privateRootPath,
} from "../../routesPath";

import CurrentUser from "../../components/customHooks/currentUser";

import ServerError from "../../components/serverError";

export default function EditProfile() : ReactElement {
  const [networkError, setNetworkError] = useState<string>("");
  const [editUserFunction] = useMutation<editUser, editUserVariables>(EditUserQuery, {
    onCompleted: () => {
      history.push(privateRootPath);
    },
    onError: (errors) => {
      console.error(errors);
      setNetworkError(errors.toString());
    },
  });

  CurrentUser({
    onCompletedCallback: ({
      currentUser: {
        id, nickname, name, languageCode,
      },
    }) => {
      setValues({
        ...values, id, nickname, name, languageCode,
      });
    },
  });
  const { t } = useTranslation();
  const history = useHistory();
  const [values, setValues] = React.useState(
    {
      id: "",
      languageCode: "en",
      name: "",
      nickname: "",
    },
  );

  function onChangeLanguage(language: string) {
    i18n.changeLanguage(language);
  }

  return (
    <Box>
      <Heading level={3}>{t("edit-profile.title")}</Heading>
      {networkError !== "" && <ServerError messages={networkError} />}
      <Form
        value={values}
        onChange={(nextValues) => setValues(nextValues)}
        onSubmit={({ value }) => { editUserFunction({ variables: value }); }}
      >
        <FormField name="name" htmlFor="name" label={t("edit-profile.name")} required>
          <TextInput id="name" name="name" />
        </FormField>
        <FormField name="nickname" htmlFor="nickname" label={t("edit-profile.nickname")} required>
          <TextInput id="nickname" name="nickname" />
        </FormField>
        <FormField name="language" htmlFor="language" label={t("edit-profile.language")}>
          <Select
            id="languageCode"
            name="languageCode"
            options={["fr", "en"]}
            onChange={({ option }) => onChangeLanguage(option)}
          />
        </FormField>
        <Box direction="row" justify="end" gap="medium">
          <Button label={t("edit-profile.back")} onClick={() => history.push(privateRootPath)} />
          <Button type="submit" primary label={t("edit-profile.submit")} />
        </Box>
      </Form>
    </Box>
  );
}
