import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Box,
  Spinner,
  Button,
  Heading,
  TextInput,
} from "grommet";
import { Edit, Trash } from "grommet-icons";

import {
  addTagsPath,
} from "../../routesPath";

import { getTags, getTagsVariables } from "../../graphql/types/getTags";

import {
  GetTags as GetTagsQuery,
} from "../../graphql/tagQueries";

import ServerError from "../../components/serverError";

import { nbItems } from "./tagConstants";


export default function Tags() : ReactElement {
  const { t } = useTranslation();
  const [tags, setTags] = useState<string[]>([]);
  const [networkError, setNetworkError] = useState<string>("");
  const { loading, fetchMore } = useQuery<getTags, getTagsVariables>(GetTagsQuery, { 
    variables: { first: nbItems },
    onCompleted: ({getTags}) => {
      if(getTags.edges) {
          const tagsFromQuery = getTags.edges.map(({node}) => node!.name);
          setTags([...tags, ...tagsFromQuery]);
      }
      
    },
    onError: (errors) => {
      setNetworkError(errors.toString());
    }
  });

  function addTag() {
    setTags([...tags, ""]);
  }

  function removeTag(index: number) {
    const newTags = tags.filter((_tag, i) => index !== i);
    setTags(newTags);
  }

  function updateTag(newTagValue: string, index: number) {
    const newTags = tags.map((tag, i) => {
      if (i === index) {
        return newTagValue;
      }
      return tag;
    });
    setTags(newTags);
  }

  function renderTags() {
    if(loading) {
      return <Spinner/>;
    }

    if(tags.length === 0) {
      return <Heading margin="none" level="4">{t("tags.no-tag")}</Heading>
    }

    return (
      <Box>
        <Heading level={4}>{t("tags.name")}</Heading>
        <Box>
          {tags.map((tag, index) => (
            <Box key={index} direction="row">
              <TextInput placeholder={t("tags.placeholder")} defaultValue={tag} onBlur={(e) => updateTag(e.target.value, index)} />
              <Button hoverIndicator icon={<Trash />} disabled={tags.length <= 1} onClick={() => removeTag(index)} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Heading level="3">{t("tags.title")}</Heading>
      {networkError !== "" && <ServerError messages={networkError} />}
      <Link to={addTagsPath}>
        <Button label={t("tags.create-tag")} onClick={addTag} />
      </Link>
      <Box>
        {renderTags()}
      </Box>
      <Box direction="row" justify="end" gap="medium">
        <Button primary label={t("new-note.back")} />
        <Button type="submit" primary label={t("tags.submit")} />
      </Box>
    </Box>
  );
}
