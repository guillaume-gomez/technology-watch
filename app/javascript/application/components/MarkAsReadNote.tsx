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

import { nbItems } from "../views/notes/noteConstants";

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
    }
  });
  return (
    <Button
      icon={<Bookmark color={markAsRead ? "brand" : "plain"} />}
      hoverIndicator
      onClick={() => markAsReadFunction()}
    />
  );
}
