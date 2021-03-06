import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import {
  Box, Heading, Grid,
} from "grommet";

import ServerError from "../../components/serverError";

import NoteForm, { initialValuesTypes } from "./noteForm";

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
  const [createNoteFunction, { loading }] = useMutation<createNote, createNoteVariables>(CreateNoteQuery, {
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

  const [values] = React.useState<initialValuesTypes>(
    {
      name: "",
      link: "",
      description: "",
      timeToReadInMinutes: 1,
      rating: 1,
      tags: [],
    },
  );

  console.log(loading)

  return (
    <Grid
      rows={["xxsmall", "auto"]}
      gap="small"
      fill
    >
      <Box>
        <Heading margin="small" level="3">{t("new-note.title")}</Heading>
      </Box>
      <Box>
        {networkError !== "" && <ServerError messages={networkError} />}
        <NoteForm initialValues={values} mutation={createNoteFunction} loadingMutation={loading} />
      </Box>
    </Grid>
  );
}
