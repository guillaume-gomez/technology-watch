import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  ThemeContext
} from "grommet";

import { Edit, View, Clock } from "grommet-icons";

import Tag from "./tag";

import { getNotes_getNotes_edges_node } from "../graphql/types/getNotes";

import { notePath } from "../routesPath";

import DestroyNote from "./DestroyNote";
import MarkAsReadNote from "./MarkAsReadNote";

interface NoteCardProps {
  note: getNotes_getNotes_edges_node
}

export default function NoteCard({ note } : NoteCardProps) : ReactElement {
  const { dark } : any = React.useContext(ThemeContext); // ThemeContext is bad typed by grommet
  const history = useHistory();


  return (
    <Card background={dark ? "dark-1" : "light-1"} animation="fadeIn">
      <CardHeader pad="small" background={dark ? "dark-3" : "light-3"}>
        <Box direction="row" flex={true} justify="between">
          <div>{note.name}</div>
          <div>{note.rating} /10</div>
        </Box>
      </CardHeader>
      <CardBody pad="small" gap="small">
        {note.description}
        <Box align="center" direction="row" wrap>
          {note.tags.edges.map(({node: tag}) =>
            <Tag key={tag!.id} color={tag!.color}>
              {tag!.name}
            </Tag>
          )}
        </Box>
        {note.timeToReadInMinutes ? 
          <Box flex direction="row" alignContent="center" gap="xxsmall">
            {note.timeToReadInMinutes} min <Clock />
          </Box>
          :
          null
        }
      </CardBody>
      <CardFooter background={dark ? "dark-3" : "light-3"}>
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
