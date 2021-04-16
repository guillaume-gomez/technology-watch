import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Box, 
  Spinner,
  Text,
  InfiniteScroll,
  Button,
  Heading,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  FormField,
  TextInput
} from "grommet";
import { Edit, Trash } from "grommet-icons";


import CurrentUser from "../../components/customHooks/currentUser";
import { currentUserHeader } from "../../graphql/types/currentUserHeader";

import {
  addTagsPath,
} from "../../routesPath";


export default function Tags() : ReactElement {
  const { t } = useTranslation();
  const [tags, setTags] = useState<string[]>([]);
  function onCompletedCallback(data : currentUserHeader) {
    // if(data && data.currentUser && data.currentUser && data.currentUser.tags) {
    //   setTags(data.currentUser.tags);
    // }
    setTags(["Box", "Box1", "Box2", "Box3"])
  }
  const { loading } = CurrentUser({ onCompletedCallback });

  function addTag() {
    setTags([...tags, ""]);
  }

  function removeTag(index: number) {
    const newTags = tags.filter((_tag, i) => index !== i);
    setTags(newTags);
  }

  function updateTag(newTagValue: string, index: number) {
    const newTags = tags.map((tag, i) => {
      if(i === index) {
        return newTagValue;
      }
      return tag;
    });

    setTags(newTags);
  }

  function renderTags() {
    if(tags.length === 0) {
      return <Heading margin="none" level="4">{t("tags.no-tag")}</Heading>
    }

    return (
    <Box>
      <Heading level={4} >{t("tags.name")}</Heading>
      <Box>
      {tags.map((tag, index) => (
          <Box key={index} direction="row">
            <TextInput placeholder={t("tags.placeholder")} defaultValue={tag} onBlur={(e) => updateTag(e.target.value, index)} />
            <Button hoverIndicator icon={<Trash />} disabled={tags.length <= 1} onClick={() => removeTag(index) }/>
          </Box>
      ))}
    </Box>
   </Box>
    )
  }

  if(loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Heading level="3">{t("tags.title")}</Heading>
      <Link to={addTagsPath}>
        <Button label={t("tags.create-tag")} onClick={addTag} />
      </Link>
      <Box>
        {renderTags()}
      </Box>
      <Box direction="row" justify="end" gap="medium">
        <Button primary label={t("new-note.back")}/>
        <Button type="submit" primary label={t("tags.submit")} />
      </Box>
    </Box>
  );
}
