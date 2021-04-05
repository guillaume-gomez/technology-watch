import React, { ReactElement, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import {
  Box, Form, FormField, TextInput, Button, Text, TextArea, RangeInput, Heading
} from "grommet";

import ServerError from "../../components/serverError";

import NoteForm from "./noteForm";

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

export default function NewNote() : ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const [networkError, setNetworkError] = useState<string>("");
  const [createNoteFunction, { data }] = useMutation<createNote, createNoteVariables>(CreateNoteQuery, {
    onCompleted: () => {
      history.push(notePath);
    },
    onError: (errors) => {
      console.error(errors);
      setNetworkError(errors.toString());
    },
    update: (cache, { data }) => {
      const elemToAdd = data!.createNote;
      const dataInCache: getNotes | null = cache.readQuery({ query: GetNotesQuery, variables: {first: nbItems} });
      if (!dataInCache) {
        return;
      }
      const newEdges = [...dataInCache.getNotes.edges, { node: elemToAdd, __typename: "Note" }];
      const newCache = {
        getNotes: {
          pageInfo: dataInCache.getNotes.pageInfo,
          edges: newEdges,
          __typename: dataInCache.getNotes.__typename,
        },
      };
      cache.writeQuery({ query: GetNotesQuery, variables: {first: nbItems}, data: newCache });
    },
  });



  return (
    <Box>
      <Heading level="3">{t("new-note.title")}</Heading>
      {networkError !== "" && <ServerError messages={networkError} />}
      <NoteForm mutation={createNoteFunction} />
    </Box>
  );
}
