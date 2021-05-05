import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "grommet";

import { Edit, View } from "grommet-icons";

import Tag from "./tag";

import { getNotes_getNotes_edges_node } from "../graphql/types/getNotes";

import { notePath } from "../routesPath";

import DestroyNote from "./DestroyNote";
import MarkAsReadNote from "./MarkAsReadNote";

interface NoteCardProps {
  note: getNotes_getNotes_edges_node
}

export default function NoteCard({ note } : NoteCardProps) : ReactElement {
  const history = useHistory();
  return (
    <Card height="big" width="big" background="light-1" flex={false}>
      <CardHeader pad="medium">{note.name}</CardHeader>
      <CardBody pad="medium">
        {note.description}
        <Box align="center" direction="row" wrap pad={{ right: "xsmall" }}>
          {note.tags.edges.map(({node: tag}) =>
            <Tag key={tag!.id} color={tag!.color}>
              {tag!.name}
            </Tag>
          )}
        </Box>
        {note.rating}
      </CardBody>
      <CardFooter pad={{ horizontal: "small" }} background="light-2">
        <Button
          icon={<View color="plain" />}
          hoverIndicator
          href={note.link}
          target="_blank"
        />
        <Button
          icon={<Edit color="plain" />}
          hoverIndicator
          onClick={() => history.push(`${notePath}/${note.id}`)}
        />
        <MarkAsReadNote id={note.id} markAsRead={note.markAsRead} />
        <DestroyNote id={note.id} />
      </CardFooter>
    </Card>
  );
}
