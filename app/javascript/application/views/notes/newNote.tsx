import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import {
  Box, Heading, Spinner,
} from "grommet";

import ServerError from "../../components/serverError";

import CurrentUser from "../../components/customHooks/currentUser";

import NoteForm, {initialValuesTypes } from "./noteForm";

import { createNote, createNoteVariables } from "../../graphql/types/createNote";
import { getNotes } from "../../graphql/types/getNotes";
import {
  CreateNote as CreateNoteQuery,
  GetNotes as GetNotesQuery,
} from "../../graphql/noteQueries";

import {
  notePath,
} from "../../routesPath";

import { nbItems } from "./noteConstants";

export default function NewNote() : ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const [networkError, setNetworkError] = useState<string>("");
  const [createNoteFunction] = useMutation<createNote, createNoteVariables>(CreateNoteQuery, {
    onCompleted: () => {
      history.push(notePath);
    },
    onError: (errors) => {
      console.error(errors);
      setNetworkError(errors.toString());
    },
    update: (cache, { data }) => {
      const elemToAdd = data!.createNote;
      const dataInCache: getNotes | null = cache.readQuery({ query: GetNotesQuery, variables: { first: nbItems } });
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
      cache.writeQuery({ query: GetNotesQuery, variables: { first: nbItems }, data: newCache });
    },
  });

  const [values, setValues] = React.useState<initialValuesTypes>(
    {
      name: "",
      link: "",
      description: "",
      rating: 1,
      tags: []
    },
  );

  return (
    <Box>
      <Heading level="3">{t("new-note.title")}</Heading>
      {networkError !== "" && <ServerError messages={networkError} />}
      <NoteForm initialValues={values} mutation={createNoteFunction} />
    </Box>
  );
}
