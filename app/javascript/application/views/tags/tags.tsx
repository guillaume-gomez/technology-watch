import React, { ReactElement, useState, useEffect } from "react";
import { uniqBy } from "lodash";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useHistory } from "react-router-dom";

import {
  Box,
  Spinner,
  Button,
  Heading,
  TextInput,
  Text,
  Grid
} from "grommet";
import { Trash, Refresh } from "grommet-icons";

import {
  addTagsPath,
  privateRootPath,
} from "../../routesPath";

import { getTags, getTagsVariables, getTags_getTags_edges } from "../../graphql/types/getTags";
import { bulkUpdateTags, bulkUpdateTagsVariables } from "../../graphql/types/bulkUpdateTags";

import {
  GetTags as GetTagsQuery,
  BulkUpdateTags as BulkUpdateTagsQuery,
} from "../../graphql/tagQueries";

import { TagBulkType } from "../../graphql/types/graphql-global-types";

import ServerError from "../../components/serverError";
import ThemeColor from "../../reducers/useThemeColor";

import { nbItems } from "./tagConstants";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function Tags() : ReactElement {
  const { t } = useTranslation();
  const { themeMode } = ThemeColor.useContainer();
  const history = useHistory();
  const [tags, setTags] = useState<TagBulkType[]>([]);
  const [networkError, setNetworkError] = useState<string>("");
  const { data, loading, fetchMore } = useQuery<getTags, getTagsVariables>(GetTagsQuery, {
    variables: { first: nbItems },
    onError: (errors) => {
      setNetworkError(errors.toString());
    },
  });

  useEffect(() => {
    if(data && data.getTags.edges.length > tags.length) {
       updateTagsFromQuery(data.getTags.edges);
    }
  }, [data]);
  const [editTags] = useMutation<bulkUpdateTags, bulkUpdateTagsVariables>(BulkUpdateTagsQuery, {
    onCompleted: () => {
      history.push(privateRootPath);
    },
    onError: (errors) => {
      console.error(errors);
      setNetworkError(errors.toString());
    },
    update: (cache, { data }) => {
      const elementsUpdated = data!.bulkUpdateTags;
      const dataInCache: getTags | null = cache.readQuery({ query: GetTagsQuery, variables: { first: nbItems } });
      if (!dataInCache) {
        return;
      }
      const newCache = {
        getTags: {
          pageInfo: dataInCache.getTags.pageInfo,
          ...elementsUpdated,
        },
      };
      cache.writeQuery({ query: GetTagsQuery, variables: { first: nbItems }, data: newCache });
    },
  });

  function updateTagsFromQuery(tagEdges: getTags_getTags_edges[]) {
    const tagsFromQuery = tagEdges.map(({ node }) => (
      {
        id: node!.id,
        name: node!.name,
        color: node!.color,
        destroy: false,
      }));
    setTags(tagsFromQuery);
  }

  function addTag() {
    setTags([...tags, { name: "", color: getRandomColor() }]);
  }

  function removeTag(index: number) {
    const newTags = tags.map((tag, i) => {
      if (index !== i) {
        return tag;
      }
      return { ...tag, destroy: true };
    });
    setTags(newTags);
  }

  function updateTag(newTagValue: string, index: number) {
    const newTags = tags.map((tag, i) => {
      if (i === index) {
        return { ...tag, name: newTagValue };
      }
      return tag;
    });
    setTags(newTags);
  }

  function updateColorTag(newTagColor: string, index: number) {
    const newTags = tags.map((tag, i) => {
      if (i === index) {
        return { ...tag, color: newTagColor };
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
    });
  }

  function renderTags() {
    if (loading) {
      return <Box align="center" pad="medium"><Spinner size="medium" /></Box>;
    }

    if (tags.length === 0 || !data) {
      return <Box align="center" pad="medium"><Heading fill margin="none" level="4">{t("tags.no-tag")}</Heading></Box>;
    }

    return (
    <Grid
       fill
        rows={["xxsmall", "auto"]}
         gap="xxsmall">
         <Box justify="end" pad="xsmall">
          <Heading level={4} margin="none">{t("tags.name")}</Heading>
        </Box>
        <Box fill={"vertical"} id="scrollableDiv" overflow="auto" animation="fadeIn" background={themeMode === "dark" ? "dark-2" : "light-2"} round="xxsmall">
            <InfiniteScroll
              dataLength={data.getTags.edges.length}
              next={getMore}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%",
              }}
              hasMore={data.getTags.pageInfo.hasNextPage}
              loader={<Button margin="small" label={t("notes.load-more")} onClick={() => getMore()} />}
              scrollableTarget="scrollableDiv"
            >
              <Box
                gap="xsmall"
                pad="small"
                fill
              >
            {
              tags.map((tag: TagBulkType, index: number) => {
                
                 if (tag.destroy) {
                   return null;
                 }
                 return (
                   <Box key={tag.id} direction="row" align="center" gap="small">
                     <TextInput placeholder={t("tags.placeholder")} defaultValue={tag.name || ""} onBlur={(e) => updateTag(e.target.value, index)} />
                     <input type="color" id="head" name="head" value={tag.color || "#000"} onChange={(e) => updateColorTag(e.target.value, index)} />
                     <Button hoverIndicator icon={<Trash />} disabled={tag.destroy || tags.length <= 1} onClick={() => removeTag(index)} />
                   </Box>
                 );
              }
             )
            }
            </Box>
            </InfiniteScroll>
          </Box>
          </Grid>)
  }

  return (
    <Grid
       fill
        rows={["xxsmall", "flex", "xxsmall"]}
         gap="small">
      <Box direction="row" justify="between" align="center">

        <Heading level="3" margin="small">{t("tags.title")}</Heading>
        <Link to={addTagsPath}>
          <Button primary label={t("tags.create-tag")} onClick={addTag} />
        </Link>
      </Box>
      {networkError !== "" && <ServerError messages={networkError} />}
      <Box fill={"vertical"}>
        {renderTags()}
      </Box>
      <Box fill="horizontal" direction="row" justify="end" gap="medium">
        <Button label={t("new-note.back")} onClick={() => history.push(privateRootPath)} />
        <Button type="submit" primary label={t("tags.submit")} onClick={() => editTags({ variables: { tags } })} />
      </Box>
    </Grid>
  );
}
