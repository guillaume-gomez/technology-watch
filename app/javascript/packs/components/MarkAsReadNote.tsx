import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import {
  DropButton,
  Button,
  Box,
  Text
} from "grommet";

import { Bookmark } from 'grommet-icons';

import ServerError from "./serverError";

import { markAsRead, markAsReadVariables } from "../graphql/types/markAsRead";
import { 
  MarkAsRead as MarkAsReadQuery,
  GetNotes as GetNotesQuery
} from "../graphql/noteQueries";

import { getNotes } from "../graphql/types/getNotes";

import { nbItems } from "../views/notes/noteConstants";

interface MarkAsReadNoteProps {
  id: string;
  markAsRead: boolean;
}

export default function MarkAsReadNote({id, markAsRead} : MarkAsReadNoteProps) : ReactElement {
  const { t } = useTranslation();
  const [networkError, setNetworkError] = useState<string>("");
  const [markAsReadFunction] = useMutation<markAsRead, markAsReadVariables>(MarkAsReadQuery, {
    variables: {
      id,
      markAsRead: !markAsRead
    },
    onError: (errors) => {
      console.error(errors);
      setNetworkError(errors.toString());
    },
    update: (cache, { data }) => {
      const elemToUpdate = data!.editNote;
      const dataInCache: getNotes | null = cache.readQuery({ query: GetNotesQuery, variables: {first: nbItems} });
      if (!dataInCache) {
        return;
      }
      const newEdges = dataInCache.getNotes.edges.map( (edge) => {
        if(edge.node!.id !== id) {
          return edge;
        }
        // update the notes
        return { __typename: "NoteEdge", node: elemToUpdate };
      });
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
    <Button
      icon={<Bookmark color={markAsRead? "brand" : "plain"} />}
      hoverIndicator
      onClick={() => markAsReadFunction()} />
  );
}
