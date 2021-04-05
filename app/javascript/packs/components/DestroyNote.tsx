import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import {
  DropButton,
  Button,
  Box,
  Text
} from "grommet";

import {  Trash } from 'grommet-icons';

import ServerError from "./serverError";

import { destroyNote, destroyNoteVariables } from "../graphql/types/destroyNote";
import { 
  DestroyNote as DestroyNoteQuery,
  GetNotes as GetNotesQuery
} from "../graphql/noteQueries";

import { getNotes } from "../graphql/types/getNotes";

import { nbItems } from "../views/notes/noteConstants";

interface DestroyNoteProps {
  id: string;
}

export default function DestroyNote({id} : DestroyNoteProps) : ReactElement {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [networkError, setNetworkError] = useState<string>("");
  const [destroyNoteFunction] = useMutation<destroyNote, destroyNoteVariables>(DestroyNoteQuery, {
    variables: {
      id
    },
    onCompleted: () => {
      setOpen(false);
    },
    onError: (errors) => {
      console.error(errors);
      setNetworkError(errors.toString());
    },
    update: (cache, { data }) => {
      const elemToDestroy = data!.destroyNote;
      const dataInCache: getNotes | null = cache.readQuery({ query: GetNotesQuery, variables: {first: nbItems} });
      if (!dataInCache) {
        return;
      }
      const newEdges = dataInCache.getNotes.edges.filter( ({node}) => node!.id !== id);
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
      <DropButton
        icon={<Trash color="red" />}
        open={open}
        onClick={() => setOpen(true)}
        hoverIndicator
        dropContent={
          <Box 
            animation="fadeIn"
            elevation="medium"
            direction="row"
            flex={true}
            justify="between"
            pad="large"
            background="light-2">
            {networkError !== "" && <ServerError messages={networkError} />}
            <Text>{t("destroy-note.text")} </Text>
            <Button label={t("destroy-note.confirm")} onClick={() => destroyNoteFunction()} />
            <Button label={t("destroy-note.cancel")} onClick={() => setOpen(false)} />
          </Box>
        }
      />
  );
}
