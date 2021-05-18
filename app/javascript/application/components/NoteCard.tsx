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
    <Card background="light-1">
      <CardHeader pad="small" background="light-3">
        <Box direction="row" flex={true} justify="between">
          <div>{note.name}</div>
          <div>{note.rating} /10</div>
        </Box>
      </CardHeader>
      <CardBody pad="small">
        {note.description}
        <hr/>
        <Box align="center" direction="row" wrap>
          {note.tags.edges.map(({node: tag}) =>
            <Tag key={tag!.id} color={tag!.color}>
              {tag!.name}
            </Tag>
          )}
        </Box>
      </CardBody>
      <CardFooter background="light-3">
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
