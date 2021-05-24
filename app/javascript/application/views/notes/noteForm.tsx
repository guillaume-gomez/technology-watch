import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import {
  Box, Form, FormField, TextInput, Button, Text, TextArea, RangeInput,
} from "grommet";

import TagSelectRemote from "../../components/tagSelectRemote";

import { createNoteVariables } from "../../graphql/types/createNote";
import { editNoteVariables } from "../../graphql/types/editNote";
import { getNote_getNote_tags_edges_node } from "../../graphql/types/getNote";
import { getTagsNameContains_getTags_edges_node } from "../../graphql/types/getTagsNameContains";

import { required, urlValidation } from "../../components/helpers/validationsHelpers";

import {
  notePath,
} from "../../routesPath";

export type initialValuesTypes = Omit<createNoteVariables | editNoteVariables, "tags">
& { tags: getNote_getNote_tags_edges_node[] };

interface NoteFormProps {
 initialValues: initialValuesTypes;
 mutation: Function;
}

export default function NoteForm({ initialValues, mutation }: NoteFormProps) : ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const [values, setValues] = React.useState<initialValuesTypes>(initialValues);

  function onRemoveTag(index: number) {
    const newTags = values.tags ? [...values.tags] : [];
    newTags.splice(index, 1);
    setValues({ ...values, tags: newTags });
  }

  function onSelectTag(newTag : getTagsNameContains_getTags_edges_node) {
    const oldTags = values.tags ? values.tags : [];
    setValues({ ...values, tags: [...oldTags, newTag] });
  }

  function callMutation(value: initialValuesTypes) {
    const sanitizedTags = values.tags.map((tag) => tag.id);
    mutation({ variables: { ...value, tags: sanitizedTags } });
  }

  return (
    <Box overflow="auto">
      <Form
        value={values}
        onChange={(nextValues) => setValues(nextValues)}
        onSubmit={({ value }) => callMutation(value)}
      >
        <FormField name="link" htmlFor="link" label={t("new-note.link") + t("required")} validate={[urlValidation(t), required(t)]}>
          <TextInput id="link" name="link" />
        </FormField>
        <FormField name="name" htmlFor="name" label={t("new-note.name") + t("required")} validate={[required(t)]}>
          <TextInput id="name" name="name" />
        </FormField>
        <FormField name="description" htmlFor="description" label={t("new-note.description")}>
          <TextArea id="description" name="description" resize />
        </FormField>
        <FormField name="rating" htmlFor="rating" label={t("new-note.rating")}>
          <RangeInput id="rating" name="rating" min={1} max={10} step={1} value={values.rating || 1} onChange={(e) => setValues({ ...values, rating: parseInt(e.target.value, 10) })} />
          <Text>{values.rating}</Text>
        </FormField>
        <FormField name="timeToReadInMinutes" htmlFor="timeToReadInMinutes" label={t("new-note.time-to-read-in-minutes")}>
          <TextInput type="number" id="timeToReadInMinutes" name="timeToReadInMinutes" value={values.timeToReadInMinutes as number} onChange={(e) => setValues({ ...values, timeToReadInMinutes: parseInt(e.target.value, 10) })} />
        </FormField>
        <FormField name="tags" htmlFor="tags" label={t("new-note.tags")}>
          <TagSelectRemote
            values={values.tags}
            onSelect={onSelectTag}
            onRemove={onRemoveTag}
          />
        </FormField>
        <Box direction="row" justify="end" gap="medium">
          <Button label={t("new-note.back")} onClick={() => history.push(notePath)} />
          <Button type="submit" primary label={t("new-note.submit")} />
        </Box>
      </Form>
    </Box>
  );
}
