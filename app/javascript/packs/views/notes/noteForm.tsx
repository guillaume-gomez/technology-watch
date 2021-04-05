import React, { ReactElement, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import {
  Box, Form, FormField, TextInput, Button, Text, TextArea, RangeInput, Heading, Spinner
} from "grommet";

import ServerError from "../../components/serverError";

import CurrentUser from "../../components/customHooks/currentUser";

import { createNote, createNoteVariables } from "../../graphql/types/createNote";
import { getNotes } from "../../graphql/types/getNotes";
import {
  CreateNote as CreateNoteQuery,
  GetNotes as GetNotesQuery
 } from "../../graphql/noteQueries";

import {
  notePath,
} from "../../routesPath";

import { nbItems } from "./noteConstants";

interface NoteFormProps {
 initialValues?: createNoteVariables;
 mutation: Function;
}

const defaultInitialValues = {
  userId: "_",
  name: "",
  link: "",
  description: "",
  rating: 1,
  timeToRead: new Date(),
};


export default function NoteForm({ initialValues = defaultInitialValues, mutation }: NoteFormProps) : ReactElement {
  const { data: dataCurrentUser, loading } = CurrentUser();
  const { t } = useTranslation();
  const history = useHistory();
  const [values, setValues] = React.useState<createNoteVariables>(initialValues);

  useEffect(() => {
    if(dataCurrentUser && dataCurrentUser.currentUser) {
     setValues(
       { 
         ...values,
         userId: dataCurrentUser.currentUser.id
       }
     )
    }
  }, [dataCurrentUser]);

  if(loading) {
    return <Spinner />;
  }

  return (
    <Form
      value={values}
      onChange={(nextValues) => setValues(nextValues)}
      onSubmit={({ value }) => mutation({ variables: value })}
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
        <Button primary label={t("new-note.back")} onClick={() => history.push(notePath)} />
        <Button type="submit" primary label={t("new-note.submit")} />
      </Box>
    </Form>
  );
}
