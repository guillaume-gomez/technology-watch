import React, { ReactElement, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Box, Heading, Spinner, Text, Button, Select, Tabs, Tab
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

  function displayNotes() {
    if (loading) {
      return <Spinner />;
    }
    if (data && data.getNotes && data.getNotes.edges) {

      if (data.getNotes.edges.length === 0) {
        return <Text>{t("notes.no-notes")}</Text>;
      }
      return (
        <Box id="scrollableDiv" height={"500px"} overflow={"auto"} flex={true} direction={"column"} >
          <InfiniteScroll
            dataLength={data.getNotes.edges.length}
            next={getMore}
            style={{ display: 'flex', flexDirection: 'column' }} //To put endMessage and loader to the top.
            hasMore={data.getNotes.pageInfo.hasNextPage}
            loader={<Refresh />}
            scrollableTarget="scrollableDiv"
          >
            {data.getNotes.edges.map(({node}) => (
              <NoteCard key={node!.id} note={node!} />
            ))}
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
  console.log(data)
  console.log(loading)
  console.log(error)

  return (
    <Box gap="small">
      <Heading level="3">{t("notes.title")}</Heading>
      <Link to={addNotePath}>
        <Button label={t("notes.create-note")} />
      </Link>
      <Box justify="end" direction="row">
         {
        direction === NoteDirection.DESC ?
        <Button icon={<Ascend />} onClick={() => setDirection(NoteDirection.ASC)} /> :
        <Button icon={<Descend />} onClick={() => setDirection(NoteDirection.DESC)} />
      }
     </Box>
    <Box overflow="auto">
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
