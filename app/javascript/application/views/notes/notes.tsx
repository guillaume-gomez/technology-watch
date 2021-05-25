import React, {
  ReactElement, useState, useEffect, useContext, useCallback,
} from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Box, Heading, Spinner, Button, Tabs, Tab, Grid, ResponsiveContext, Tip,
} from "grommet";
import {
  Ascend, Descend, Archive,
} from "grommet-icons";

import TagSelectRemote from "../../components/tagSelectRemote";
import { getTagsNameContains_getTags_edges_node } from "../../graphql/types/getTagsNameContains";

import { GetNotes as GetNotesQuery } from "../../graphql/noteQueries";
import { getNotes, getNotesVariables } from "../../graphql/types/getNotes";
import { NoteOrder, NoteDirection } from "../../graphql/types/graphql-global-types";

import NoteCard from "../../components/NoteCard";
import NoteTotalCount from "../../components/NoteTotalCount";
import useDeviceDetect from "../../components/customHooks/useDeviceDetect";

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
  const [displayFilters, setDisplayFilters] = useState<boolean>(size !== "small");
  const memoizedOnBlur = useCallback(
    () => {
      setTagsIds(pendingTags.map((tag) => tag.id));
    },
    [pendingTags],
  );
  const {
    loading, data, fetchMore, refetch,
  } = useQuery<getNotes, getNotesVariables>(GetNotesQuery, {
    variables: {
      first: nbItems, order, direction, read: bookmark, tagIds,
    },
  });
  const { isMobile } = useDeviceDetect();

  // update order according to selected tab
  useEffect(() => {
    switch (activeTabIndex) {
    case 0:
      setOrder(NoteOrder.RECENT);
      break;
    case 1:
      setOrder(NoteOrder.TIMES_TO_READ);
      break;
    case 2:
      setOrder(NoteOrder.RATING);
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
    setTagsIds(newTags.map((tag) => tag.id));
  }

  function onSelectTag(newTag : getTagsNameContains_getTags_edges_node) {
    setPendingTags([...pendingTags, newTag]);
  }

  function renderFilters() {
    if (!displayFilters) {
      return (
        <Box justify="between" align="center" direction="row">
          <NoteTotalCount markAsRead={bookmark} />
          <Button size="small" label={t("notes.show")} onClick={() => setDisplayFilters(true)} />
        </Box>
      );
    }

    return (
      <Box direction={size === "small" ? "column" : "row"} align="center">
        <Box fill="horizontal" pad="small">
          <TagSelectRemote
            values={pendingTags}
            onSelect={onSelectTag}
            onRemove={onRemoveTag}
            onBlur={memoizedOnBlur}
          />
        </Box>
        <Box justify="end" align="center" direction="row">
          {
             isMobile ? 
             (<Button
              size="small"
              icon={<Archive color={bookmark ? "mark-as-read" : ""} />}
              hoverIndicator
              onClick={() => setBookmark(!bookmark)}
            />) : 
             (<Tip content={t("notes.hint.bookmark")}>
            <Button
              size="small"
              icon={<Archive color={bookmark ? "mark-as-read" : ""} />}
              hoverIndicator
              onClick={() => setBookmark(!bookmark)}
            />
          </Tip>)
          }
          
          {
            direction === NoteDirection.DESC
              ? <Ascend size="medium" onClick={() => setDirection(NoteDirection.ASC)} />
              : <Descend size="medium" onClick={() => setDirection(NoteDirection.DESC)} />
          }
          <Button size="small" label={t("notes.hide")} onClick={() => setDisplayFilters(false)} />
        </Box>
      </Box>
    );
  }

  function displayNotes() {
    if (loading) {
      return <Box align="center" pad="medium"><Spinner size="medium" /></Box>;
    }
    if (data && data.getNotes && data.getNotes.edges) {
      if (data.getNotes.edges.length === 0) {
        return <Box align="center" pad="medium"><Heading level="4">{t("notes.no-notes")}</Heading></Box>;
      }
      return (
        <Box fill="vertical" id="scrollableDiv" overflow="auto" animation="fadeIn">
          <InfiniteScroll
            dataLength={data.getNotes.edges.length}
            next={getMore}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%",
            }}
            hasMore={data.getNotes.pageInfo.hasNextPage}
            loader={<Button margin="small" label={t("notes.load-more")} onClick={() => getMore()} />}
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
    <Grid
      fill
      rows={["auto", "auto", "flex"]}
      gap="xsmall"
    >
      <Box direction="row" justify="between" align="center">
        <Heading level="3" margin="small">{t("notes.title")}</Heading>
        <Link to={addNotePath}>
          <Button primary label={t("notes.create-note")} />
        </Link>
      </Box>
      {renderFilters()}
      <Box fill="vertical">
        <Grid fill rows={["min-content", "auto"]} gap="xsmall">
          <Box>
            <Tabs activeIndex={activeTabIndex} onActive={setActiveTabIndex} style={{fontSize: "14px"}}>
              <Tab title={t("notes.recent")} />
              <Tab title={t("notes.times-to-read")} />
              <Tab title={t("notes.rating")} />
            </Tabs>
          </Box>
          <Box>{displayNotes()}</Box>
        </Grid>
      </Box>
    </Grid>
  );
}
