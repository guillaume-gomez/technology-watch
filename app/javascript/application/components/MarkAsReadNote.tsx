import React, { ReactElement } from "react";
import { useMutation } from "@apollo/client";
import {
  Button,
} from "grommet";

import { Bookmark } from "grommet-icons";

import { markAsRead, markAsReadVariables } from "../graphql/types/markAsRead";
import {
  MarkAsRead as MarkAsReadQuery,
  GetNotes as GetNotesQuery,
} from "../graphql/noteQueries";

import { getNotes } from "../graphql/types/getNotes";

interface MarkAsReadNoteProps {
  id: string;
  markAsRead: boolean;
}

export default function MarkAsReadNote({ id, markAsRead } : MarkAsReadNoteProps) : ReactElement {
  const [markAsReadFunction] = useMutation<markAsRead, markAsReadVariables>(MarkAsReadQuery, {
    variables: {
      id,
      markAsRead: !markAsRead,
    },
    onError: (errors) => {
      console.error(errors);
    },
    update: (cache, { data }) => {
      const { id: noteId } = data!.editNote;
      const getNotesCache: getNotes | null = cache.readQuery({ query: GetNotesQuery });
      if (!getNotesCache) {
        return;
      }
      // remove note, it will be fetch if we change the param read in the query
      const newCacheEdges = getNotesCache.getNotes.edges.filter(({ node }) => node!.id !== noteId);
      const newCache = {
        getNotes: {
          ...getNotesCache.getNotes,
          edges: [...newCacheEdges],
        },
      };
      cache.writeQuery({ query: GetNotesQuery, data: newCache });
    },
  });
  return (
    <Button
      icon={<Bookmark color={markAsRead ? "mark-as-read" : ""} />}
      hoverIndicator
      onClick={() => markAsReadFunction()}
    />
  );
}
