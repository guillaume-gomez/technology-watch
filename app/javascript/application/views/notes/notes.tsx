import React, { ReactElement, useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Box, Heading, Spinner, Text, Button, Select, Tabs, Tab, Grid, ResponsiveContext
} from "grommet";
import { Ascend, Descend, Refresh } from "grommet-icons";

import { GetNotes as GetNotesQuery } from "../../graphql/noteQueries";
import { getNotes, getNotesVariables, getNotes_getNotes_edges } from "../../graphql/types/getNotes";
import { NoteOrder, NoteDirection } from "../../graphql/types/graphql-global-types";

import NoteCard from "../../components/NoteCard";

import {
  addNotePath,
} from "../../routesPath";

import { nbItems } from "./noteConstants";

interface FetchMoreResultQuery {
  fetchMoreResult: getNotes;
  variables: Object
}

export default function Notes() : ReactElement {
  const { t } = useTranslation();
  const size = useContext(ResponsiveContext);
  const [order, setOrder] = useState<NoteOrder>(NoteOrder.RECENT);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [direction, setDirection] = useState<NoteDirection>(NoteDirection.DESC);
  const {
    loading, data, error, fetchMore, refetch
  } = useQuery<getNotes, getNotesVariables>(GetNotesQuery, { variables: { first: nbItems, order, direction } });

  //update order according to selected tab
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
  }, [activeTabIndex])


  useEffect(() => {
    refetch();
  }, [order, direction]);

  function computeGridColumns() {
    switch (size) {
      case "large":
        return ["auto", "auto", "auto", "auto", "auto"]
        break;
      case "medium":
        return ["auto", "auto", "auto"]
      case "small":
      default:
        return ["auto"]
        break;
    }
  }


  function displayNotes() {
    if (loading) {
      return <Spinner />;
    }
    if (data && data.getNotes && data.getNotes.edges) {

      if (data.getNotes.edges.length === 0) {
        return <Text>{t("notes.no-notes")}</Text>;
      }

      return (
        <Box id="scrollableDiv" height="99%" overflow="auto" animation="fadeIn">
          <InfiniteScroll
            dataLength={data.getNotes.edges.length}
            next={getMore}
            style={{display: "flex", flexDirection: "column", alignItems: "center", width: '100%', height: '100%'}}
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
            {data.getNotes.edges.map(({node}) => (
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
        after: data.getNotes.pageInfo.endCursor
      },
    });
  }

  return (
    <Box fill>
      <Heading level="3">{t("notes.title")}</Heading>
      <Link to={addNotePath}>
        <Button label={t("notes.create-note")} />
      </Link>
      <Box justify="end" direction="row" height="xsmall">
         {
        direction === NoteDirection.DESC ?
        <Button icon={<Ascend />} size={"medium"}  onClick={() => setDirection(NoteDirection.ASC)} /> :
        <Button icon={<Descend />} size={"medium"}   onClick={() => setDirection(NoteDirection.DESC)} />
      }
     </Box>
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
  );
}
