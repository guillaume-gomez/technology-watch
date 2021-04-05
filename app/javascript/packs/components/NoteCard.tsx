import React, { ReactElement } from "react";
import {
  Card, CardHeader, CardBody, CardFooter, Button,
} from "grommet";

import { Bookmark, View, Trash } from 'grommet-icons';

import { getNotes_getNotes_edges_node } from "../graphql/types/getNotes";

interface NoteCardProps {
  note: getNotes_getNotes_edges_node
}

export default function NoteCard({note} : NoteCardProps) : ReactElement {
  return (
    <Card  height="big" width="big" background="light-1">
      <CardHeader pad="medium">{note.name}</CardHeader>
      <CardBody pad="medium">{note.description}</CardBody>
      <CardFooter pad={{horizontal: "small"}} background="light-2">
      <Button 
        icon={<View color="plain" />}
        hoverIndicator
     />
      <Button
        icon={<Bookmark color="plain" />}
        hoverIndicator
      />
      <Button
        icon={<Trash color="red" />}
        hoverIndicator
      />
    </CardFooter>
</Card>
  );
}
