import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import {
  Box, Form, FormField, TextInput, Button, Text, TextArea, RangeInput,
} from "grommet";

import { createNoteVariables } from "../../graphql/types/createNote";
import { editNoteVariables } from "../../graphql/types/editNote";

import {
  notePath,
} from "../../routesPath";

interface NoteFormProps {
 initialValues: createNoteVariables | editNoteVariables;
 mutation: Function;
}


export default function NoteForm({ initialValues, mutation }: NoteFormProps) : ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const [values, setValues] = React.useState<createNoteVariables|editNoteVariables>(initialValues);

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
        <RangeInput id="rating" name="rating" min={1} max={10} step={1} value={values.rating || 1} onChange={(e) => setValues({ ...values, rating: parseInt(e.target.value, 10) })} />
        <Text>{values.rating}</Text>
      </FormField>
      <Box direction="row" justify="end" gap="medium">
        <Button primary label={t("new-note.back")} onClick={() => history.push(notePath)} />
        <Button type="submit" primary label={t("new-note.submit")} />
      </Box>
    </Form>
  );
}