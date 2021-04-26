import React, { ReactElement, useState } from "react";
import { uniqBy } from "lodash";
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
  InfiniteScroll
} from "grommet";
import { Edit, Trash } from "grommet-icons";

import {
  addTagsPath,
  privateRootPath
} from "../../routesPath";

import { getTags, getTagsVariables, getTags_getTags_edges } from "../../graphql/types/getTags";
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

interface FetchMoreResultQuery {
  fetchMoreResult: getTags;
  variables: Object
}

export default function Tags() : ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const [tags, setTags] = useState<TagBulkType[]>([]);
  const [networkError, setNetworkError] = useState<string>("");
  const { data, loading, fetchMore } = useQuery<getTags, getTagsVariables>(GetTagsQuery, { 
    variables: { first: nbItems },
    onCompleted: ({getTags}) => {
      if(getTags.edges) {
        updateTagsFromQuery(getTags.edges);
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
  });

  function updateTagsFromQuery(tagEdges: getTags_getTags_edges[]) {
    const tagsFromQuery = tagEdges.map(({node}) => (
      { id: node!.id,
        name: node!.name,
        color: node!.color,
        destroy: false
      })
    );
    setTags(uniqBy([...tags, ...tagsFromQuery], "id"));
  }


  function addTag() {
    setTags([...tags, {name: "", color: getRandomColor()}]);
  }

  function removeTag(index: number) {
    const newTags = tags.map((tag, i) => {
      if(index !== i) {
        return tag;
      } else {
        return {...tag, destroy: true };
      }
      
    });
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

  function updateColorTag(newTagColor: string, index: number) {
    const newTags = tags.map((tag, i) => {
      if (i === index) {
        return {...tag, color: newTagColor };
      }
      return tag;
    });
    setTags(newTags);
  }

   function getMore() {
    if (!data || !data.getTags.pageInfo.hasNextPage) {
      return;
    }
    fetchMore({
      variables: {
        cursor: data.getTags.pageInfo.endCursor,
      },
      updateQuery: (previousResult : getTags, { fetchMoreResult }: FetchMoreResultQuery) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const { pageInfo, __typename, edges: newEdges } = fetchMoreResult.getTags;
        updateTagsFromQuery(newEdges);
        return {
          getTags: {
            pageInfo,
            __typename,
            edges: [...previousResult.getTags.edges, ...newEdges],
          },
        };
      },
    });
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
        <InfiniteScroll step={nbItems} items={tags} onMore={getMore}>
          {(tag: TagBulkType, index: number) => {
            if(tag.destroy) {
              return null;
            }
            return (
              <Box key={index} direction="row" align="center" gap="small">
                <TextInput placeholder={t("tags.placeholder")} defaultValue={tag.name || ""} onBlur={(e) => updateTag(e.target.value, index)} />
                <input type="color" id="head" name="head" value={tag.color || "#000"} onChange={(e) => updateColorTag(e.target.value, index)}/>
                <Button hoverIndicator icon={<Trash />} disabled={tag.destroy || tags.length <= 1} onClick={() => removeTag(index)} />
              </Box>
            );
          }}
        </InfiniteScroll>
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
      <Box overflow="auto">
        {renderTags()}
      </Box>
      <Box direction="row" justify="end" gap="medium">
        <Button primary label={t("new-note.back")} onClick={() => history.push(privateRootPath)} />
        <Button type="submit" primary label={t("tags.submit")} onClick={() => editTags({variables: {tags }})} />
      </Box>
    </Box>
  );
}
