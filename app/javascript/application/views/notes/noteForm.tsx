import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import {
  Box, Form, FormField, TextInput, Button, Text, TextArea, RangeInput,
} from "grommet";

import { createNoteVariables } from "../../graphql/types/createNote";
import { editNoteVariables } from "../../graphql/types/editNote";
import CurrentUser from "../../components/customHooks/currentUser";
import { currentUserHeader } from "../../graphql/types/currentUserHeader";

import TagSelect from "../../components/tagSelect";

import { required } from "../../components/helpers/validationsHelpers";

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
  const [allTags, setAllTags] = useState<string[]>([]);
  function onCompletedCallback(data : currentUserHeader) {
    //if(data && data.currentUser && data.currentUser && data.currentUser.tags) {
      //setAllTags(data.currentUser.tags);
    //}
    setAllTags(["Box", "Box2", "Box3", "Box4", "Box5"])
  }
  const { loading } = CurrentUser({ onCompletedCallback });

  function onRemoveTag(index: number) {
    // const newTags = values.tags ? [...values.tags] : [];
    // newTags.splice(index, 1);
    // setValues({...values, tags: newTags});
  };

  function onSelectTag(tag : string)  {
    // const oldTags = values.tags ? values.tags : [];
    // setValues({...values, tags: [...oldTags, tag] });
  };

  return (
    <Form
      value={values}
      onChange={(nextValues) => setValues(nextValues)}
      onSubmit={({ value }) => mutation({ variables: value })}
    >
      <FormField name="name" htmlFor="name" label={t("new-note.name") + t("required")} validate={[required(t)]}>
        <TextInput id="name" name="name" />
      </FormField>
      <FormField name="link" htmlFor="link" label={t("new-note.link") + t("required")} validate={[required(t)]}>
        <TextInput id="link" name="link" />
      </FormField>
      <FormField name="description" htmlFor="description" label={t("new-note.description")}>
        <TextArea id="description" name="description" resize />
      </FormField>
      <FormField name="rating" htmlFor="rating" label={t("new-note.rating")}>
        <RangeInput id="rating" name="rating" min={1} max={10} step={1} value={values.rating || 1} onChange={(e) => setValues({ ...values, rating: parseInt(e.target.value, 10) })} />
        <Text>{values.rating}</Text>
      </FormField>
      <FormField>
        {/*<TagSelect
            value={values.tags || []}
            suggestions={allTags
              .sort()
              .filter(suggestion => !(values.tags || []).includes(suggestion))}
            onSelect={onSelectTag}
            onRemove={onRemoveTag}
          />*/}
      </FormField>
      <Box direction="row" justify="end" gap="medium">
        <Button primary label={t("new-note.back")} onClick={() => history.push(notePath)} />
        <Button type="submit" primary label={t("new-note.submit")} />
      </Box>
    </Form>
  );
}
