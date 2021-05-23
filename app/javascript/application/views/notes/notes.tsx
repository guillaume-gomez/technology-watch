import React, {
  ReactElement, useState, useEffect, useContext,
} from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Box, Heading, Spinner, Button, Tabs, Tab, Grid, ResponsiveContext, Tip,
} from "grommet";
import {
  Ascend, Descend, Refresh, Bookmark,
} from "grommet-icons";

import TagSelectRemote from "../../components/tagSelectRemote";
import { getTagsNameContains_getTags_edges_node } from "../../graphql/types/getTagsNameContains";

import { GetNotes as GetNotesQuery } from "../../graphql/noteQueries";
import { getNotes, getNotesVariables } from "../../graphql/types/getNotes";
import { NoteOrder, NoteDirection } from "../../graphql/types/graphql-global-types";

import NoteCard from "../../components/NoteCard";
import NoteTotalCount from "../../components/NoteTotalCount";

import {
  addNotePath,
} from "../../routesPath";

import { nbItems } from "./noteConstants";

export default function Notes() : ReactElement {
  const { t } = useTranslation();
  const size = useContext(ResponsiveContext);
  const [order, setOrder] = useState<NoteOrder>(NoteOrder.RECENT);
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [direction, setDirection] = useState<NoteDirection>(NoteDirection.DESC);
  const [pendingTags, setPendingTags] = useState<getTagsNameContains_getTags_edges_node[]>([]);
  const [tagIds, setTagsIds] = useState<string[]>([]);
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<getNotes, getNotesVariables>(GetNotesQuery, {
    variables: {
      first: nbItems, order, direction, read: bookmark, tagIds
    },
  });

  // update order according to selected tab
  useEffect(() => {
    switch (activeTabIndex) {
    case 0:
      setOrder(NoteOrder.RECENT);
      break;
    case 1:
      setOrder(NoteOrder.RATING);
      break;
    case 2:
      setOrder(NoteOrder.TIMES_TO_READ);
      break;
    default:
      setOrder(NoteOrder.RECENT);
      break;
    }
  }, [activeTabIndex]);

  useEffect(() => {
    refetch();
  }, [order, direction, bookmark, tagIds, refetch]);

  function computeGridColumns() {
    switch (size) {
    case "large":
      return ["auto", "auto", "auto", "auto", "auto"];
    case "medium":
      return ["auto", "auto", "auto"];
    case "small":
    default:
      return ["auto"];
    }
  }

  function onRemoveTag(index: number) {
    const newTags = [...pendingTags];
    newTags.splice(index, 1);
    setPendingTags(newTags);
    // remove dont call onBlur on TagSelect
    setTagsIds(newTags.map(tag => tag.id))
  }

  function onSelectTag(newTag : getTagsNameContains_getTags_edges_node) {
    setPendingTags([...pendingTags, newTag]);
  }

  function onBlur() {
    setTagsIds(pendingTags.map(tag => tag.id));
  }

  function displayNotes() {
    if (loading) {
      return <Box align="center" pad="medium"><Spinner size="medium"/></Box>;
    }
    if (data && data.getNotes && data.getNotes.edges) {
      if (data.getNotes.edges.length === 0) {
        return <Box align="center" pad="medium"><Heading level="4" >{t("notes.no-notes")}</Heading></Box>;
      }
      return (
        <Box id="scrollableDiv" height="99%" overflow="auto" animation="fadeIn">
          <InfiniteScroll
            dataLength={data.getNotes.edges.length}
            next={getMore}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%",
            }}
            hasMore={data.getNotes.pageInfo.hasNextPage}
            loader={<Refresh />}
            scrollableTarget="scrollableDiv"
          >
            <Grid
              columns={computeGridColumns()}
              gap="small"
              pad="small"
              fill
            >
              {data.getNotes.edges.map(({ node }) => (
                <NoteCard key={node!.id} note={node!} />
              ))}
            </Grid>
          </InfiniteScroll>
        </Box>
      );
    }

    return <></>;
  }

  function getMore() {
    if (!data || !data.getNotes.pageInfo.hasNextPage) {
      return;
    }
    fetchMore({
      variables: {
        first: nbItems,
        after: data.getNotes.pageInfo.endCursor,
      },
    });
  }

  return (
    <Box fill gap="small">
      <Heading level="3" margin="none">{t("notes.title")}</Heading>
      <Box direction="row" justify="end">
        <Link to={addNotePath}>
          <Button primary label={t("notes.create-note")} />
        </Link>
      </Box>
      <Box direction={size === "small" ? "column" : "row"} align="center">
        <Box fill="horizontal" pad="small">
          <TagSelectRemote
            values={pendingTags}
            onSelect={onSelectTag}
            onRemove={onRemoveTag}
            onBlur={onBlur}
          />
        </Box>
        <Box justify="end" direction="row" height="xsmall">
          <Tip content={t("notes.hint.bookmark")}>
            <Button
              icon={<Bookmark color={bookmark ? "mark-as-read" : ""} />}
              hoverIndicator
              onClick={() => setBookmark(!bookmark)}
            />
          </Tip>
          {
            direction === NoteDirection.DESC
              ? <Button icon={<Ascend />} size="medium" onClick={() => setDirection(NoteDirection.ASC)} />
              : <Button icon={<Descend />} size="medium" onClick={() => setDirection(NoteDirection.DESC)} />
          }
        </Box>
      </Box>
      <NoteTotalCount markAsRead={bookmark} />
      <Box height={{max: "60%"}} >
        <Tabs activeIndex={activeTabIndex} onActive={setActiveTabIndex}>
          <Tab title={t("notes.recent")}>
            {displayNotes()}
          </Tab>
          <Tab title={t("notes.rating")}>
            {displayNotes()}
          </Tab>
          <Tab title={t("notes.times-to-read")}>
            {displayNotes()}
          </Tab>
        </Tabs>
       </Box>
    </Box>
  );
}
