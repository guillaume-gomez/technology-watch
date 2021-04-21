import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
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
  privateRootPath
} from "../../routesPath";

import { getTags, getTagsVariables } from "../../graphql/types/getTags";
import { bulkUpdateTags, bulkUpdateTagsVariables } from "../../graphql/types/bulkUpdateTags";

import {
  GetTags as GetTagsQuery,
  BulkUpdateTags as BulkUpdateTagsQuery,
} from "../../graphql/tagQueries";

import { TagBulkType } from "../../graphql/types/graphql-global-types";

import ServerError from "../../components/serverError";

import { nbItems } from "./tagConstants";

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function Tags() : ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const [tags, setTags] = useState<TagBulkType[]>([]);
  const [networkError, setNetworkError] = useState<string>("");
  const { loading, fetchMore } = useQuery<getTags, getTagsVariables>(GetTagsQuery, { 
    variables: { first: nbItems },
    onCompleted: ({getTags}) => {
      if(getTags.edges) {
          const tagsFromQuery = getTags.edges.map(({node}) => (
            { id: node!.id,
              name: node!.name,
              color: node!.color,
              destroy: false
            })
          );
          setTags([...tags, ...tagsFromQuery]);
      }
      
    },
    onError: (errors) => {
      setNetworkError(errors.toString());
    }
  });
  const [editTags] = useMutation<bulkUpdateTags, bulkUpdateTagsVariables>(BulkUpdateTagsQuery, {
    onCompleted: () => {
      history.push(privateRootPath);
    },
    onError: (errors) => {
      console.error(errors);
      setNetworkError(errors.toString());
    },
    update: (cache, { data }) => {
      const newCacheData = data!.bulkUpdateTags;
      const newCache = {
        getTags: {
          edges: newCacheData.edges,
          __typename: newCacheData.__typename,
        },
      };
      cache.writeQuery({ query: GetTagsQuery, variables: { first: nbItems }, data: newCache });
    },
  });

  function addTag() {
    setTags([...tags, {name: "", color: getRandomColor()}]);
  }

  function removeTag(index: number) {
    const newTags = tags.filter((_tag, i) => index !== i);
    setTags(newTags);
  }

  function updateTag(newTagValue: string, index: number) {
    const newTags = tags.map((tag, i) => {
      if (i === index) {
        return {...tag, name: newTagValue };
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
              <TextInput placeholder={t("tags.placeholder")} defaultValue={tag.name || ""} onBlur={(e) => updateTag(e.target.value, index)} />
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
        <Button primary label={t("new-note.back")} onClick={() => history.push(privateRootPath)} />
        <Button type="submit" primary label={t("tags.submit")} onClick={() => editTags({variables: {tags }})} />
      </Box>
    </Box>
  );
}
