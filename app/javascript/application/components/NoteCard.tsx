import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  ThemeContext,
  Text
} from "grommet";

import { Edit, View, Clock, Validate } from "grommet-icons";

import Tag from "./tag";

import { getNotes_getNotes_edges_node } from "../graphql/types/getNotes";

import { notePath } from "../routesPath";

import DestroyNote from "./DestroyNote";
import MarkAsReadNote from "./MarkAsReadNote";

interface NoteCardProps {
  note: getNotes_getNotes_edges_node
}

export default function NoteCard({ note } : NoteCardProps) : ReactElement {
  const { t } = useTranslation();
  const { dark } : any = React.useContext(ThemeContext); // ThemeContext is bad typed by grommet
  const history = useHistory();

  console.log(note.description)
  return (
    <Card elevation="none" background={dark ? "dark-2" : "light-4"} round="xsmall" animation="fadeIn" height={{ min: "200px" }}>
      <CardHeader pad="small" background={dark ? "accent-1" : "brand"}>
        <Text truncate>{note.name}</Text>
      </CardHeader>
      <CardBody pad="small" gap="small" justify="end">
       {note.description !== null ? note.description : t("note-card.no-description")}
        <Box align="center" direction="row" wrap>
          {note.tags.edges.map(({ node: tag }) => (
            <Tag key={tag!.id} color={tag!.color}>
              {tag!.name}
            </Tag>
          ))}
        </Box>
        <Box direction="row" justify="between">
        {note.timeToReadInMinutes
          ? (
            <Box flex direction="row" gap="xxsmall">
              {note.timeToReadInMinutes}
              {" "}
              min
              <Clock />
            </Box>
          )
          : null}
          <Box flex direction="row" align="end" justify="end" gap="xxsmall">
            {note.rating}
            {" "}
            /10
            <Validate />
          </Box>
         </Box>
      </CardBody>
      <CardFooter background={dark ? "accent-1" : "brand"}>
        <Button
          icon={<View />}
          hoverIndicator
          href={note.link}
          target="_blank"
        />
        <Button
          icon={<Edit />}
          hoverIndicator
          onClick={() => history.push(`${notePath}/${note.id}`)}
        />
        <MarkAsReadNote id={note.id} markAsRead={note.markAsRead} />
        <DestroyNote id={note.id} />
      </CardFooter>
    </Card>
  );
}
