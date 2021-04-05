import React, { ReactElement, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import {
  Box, Form, FormField, TextInput, Button, Text, TextArea, RangeInput
} from "grommet";

import ServerError from "../../components/serverError";

import CurrentUser from "../../components/customHooks/currentUser";

import { createNote, createNoteVariables } from "../../graphql/types/createNote";
import { CreateNote as CreateNoteQuery } from "../../graphql/noteQueries";

import {
  notePath,
} from "../../routesPath";

export default function SignUp() : ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const [networkError, setNetworkError] = useState<string>("");
  const { data: dataCurrentUser } = CurrentUser();
  const [createNoteFunction, { data }] = useMutation<createNote, createNoteVariables>(CreateNoteQuery, {
    onCompleted: (data) => {
      history.push(notePath);
    },
    onError: (errors) => {
      console.error(errors);
      setNetworkError(errors.toString());
    },
  });

  useEffect(() => {
    if(dataCurrentUser && dataCurrentUser.currentUser) {
     setValues({...values, userId: dataCurrentUser.currentUser.id})
    }
  }, [dataCurrentUser]);

  const [values, setValues] = React.useState<createNoteVariables>(
    {
      userId: "_",
      name: "",
      link: "",
      description: "",
      rating: 1,
      timeToRead: new Date(),
    },
  );
  console.log(values)
  return (
    <Box>
      {networkError !== "" && <ServerError messages={networkError} />}
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
          <RangeInput id="rating" name="rating" min={1} max={10} step={1} value={values.rating || 1} onChange={(e) => setValues({...values, rating: parseInt(e.target.value, 10)})} />
          <Text>{values.rating}</Text>
        </FormField>
        <Box direction="row" justify="end" gap="medium">
          <Button type="submit" primary label={t("sign-up.submit")} />
        </Box>
      </Form>
    </Box>
  );
}
