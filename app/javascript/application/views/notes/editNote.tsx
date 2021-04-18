import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";

import {
  Box,
  Heading,
  Spinner,
} from "grommet";

import ServerError from "../../components/serverError";

import { editNote, editNoteVariables } from "../../graphql/types/editNote";
import { getNotes } from "../../graphql/types/getNotes";

import { getNote, getNoteVariables } from "../../graphql/types/getNote";

import {
  EditNote as EditNoteQuery,
  GetNotes as GetNotesQuery,
  GetNote as GetNoteQuery,
} from "../../graphql/noteQueries";

import {
  notePath,
} from "../../routesPath";

import NoteForm from "./noteForm";

import { nbItems } from "./noteConstants";

export default function EditNote() : ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const { id } = useParams<{id:string}>();
  const [networkError, setNetworkError] = useState<string>("");
  const [loadingNote, setLoadingNote] = useState<boolean>(true);
  const [values, setValues] = React.useState<editNoteVariables>(
    {
      id,
      name: "",
      link: "",
      description: "",
      rating: 1,
    },
  );

  useQuery<getNote, getNoteVariables>(GetNoteQuery, {
    variables: { id },
    onCompleted: ({ getNote }) => {
      setValues({ ...getNote });
      setLoadingNote(false);
    },
  });
  const [editNoteFunction] = useMutation<editNote, editNoteVariables>(EditNoteQuery, {
    onCompleted: () => {
      history.push(notePath);
    },
    onError: (errors) => {
      console.error(errors);
      setNetworkError(errors.toString());
    },
    update: (cache, { data }) => {
      const elemToUpdate = data!.editNote;
      const dataInCache: getNotes | null = cache.readQuery({ query: GetNotesQuery, variables: { first: nbItems } });
      if (!dataInCache) {
        return;
      }
      const newEdges = dataInCache.getNotes.edges.map((edge) => {
        if (edge.node!.id !== id) {
          return edge;
        }
        // update the notes
        return { __typename: "NoteEdge", node: { ...edge.node, ...elemToUpdate } };
      });
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

  return (
    <Box>
      <Heading level="3">{t("new-note.title")}</Heading>
      {networkError !== "" && <ServerError messages={networkError} />}
      {
        loadingNote
          ? <Spinner />
          : <NoteForm initialValues={values} mutation={editNoteFunction} />
      }
    </Box>
  );
}
