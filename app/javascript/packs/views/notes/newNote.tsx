import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import {
  Box, Form, FormField, TextInput, Button, Text, TextArea, RangeInput
} from "grommet";

import { createNote, createNoteVariables } from "../../graphql/types/createNote";
import { CreateNote as CreateNoteQuery } from "../../graphql/noteQueries";

import {
  notePath,
} from "../../routesPath";

export default function SignUp() : ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const [networkError, setNetworkError] = useState<string>("");
  const [createNoteFunction, { data }] = useMutation<createNote, createNoteVariables>(CreateNoteQuery, {
    onCompleted: (data) => {
      history.push(notePath);
    },
    onError: (errors) => {
      console.error(errors);
      setNetworkError(errors.toString());
    },
  });
  const [values, setValues] = React.useState<createNoteVariables>(
    {
      userId: "1231",
      name: "",
      link: "",
      description: "",
      rating: 1,
      timeToRead: "",
    },
  );
  return (
    <Box>
      {networkError !== "" && <Text>{networkError}</Text>}
      <Form
        value={values}
        onChange={(nextValues) => setValues(nextValues)}
        onSubmit={({ value }) => createNoteFunction({ variables: value })}
      >
        <FormField name="name" htmlFor="name" label={t("new-note.name")} required>
          <TextInput id="name" name="name" />
        </FormField>
        <FormField name="link" htmlFor="link" label={t("new-note.link")} required>
          <TextInput id="link" name="link" />
        </FormField>
        <FormField name="description" htmlFor="description" label={t("new-note.description")}>
          <TextArea id="description" name="description" />
        </FormField>
        <FormField name="rating" htmlFor="rating" label={t("new-note.rating")}>
          <RangeInput id="rating" name="rating" min={1} max={10} step={1} />
          <Text>{values.rating}</Text>
        </FormField>
        <Box direction="row" justify="end" gap="medium">
          <Button type="submit" primary label={t("sign-up.submit")} />
        </Box>
      </Form>
    </Box>
  );
}
