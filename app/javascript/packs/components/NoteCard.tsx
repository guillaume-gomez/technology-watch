import React, { ReactElement } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  DropButton
} from "grommet";

import { Bookmark, View, Trash } from 'grommet-icons';

import { getNotes_getNotes_edges_node } from "../graphql/types/getNotes";

import DestroyNote from "./DestroyNote";

interface NoteCardProps {
  note: getNotes_getNotes_edges_node
}

export default function NoteCard({note} : NoteCardProps) : ReactElement {
  return (
    <Card height="big" width="big" background="light-1">
      <CardHeader pad="medium">{note.name}</CardHeader>
      <CardBody pad="medium">{note.description}</CardBody>
      <CardFooter pad={{horizontal: "small"}} background="light-2">
      <Button 
        icon={<View color="plain" />}
        hoverIndicator
        href={note.link}
        target="_blank"
     />
      <Button
        icon={<Bookmark color="plain" />}
        hoverIndicator
      />
      <DestroyNote id={note.id} />
    </CardFooter>
</Card>
  );
}
