import React, { ReactElement, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Box, Heading, Spinner, Text, InfiniteScroll, Button, Select
} from "grommet";

import { GetNotes as GetNotesQuery } from "../../graphql/noteQueries";
import { getNotes, getNotesVariables, getNotes_getNotes_edges } from "../../graphql/types/getNotes";
import { NoteOrder } from "../../graphql/types/graphql-global-types";

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
  const {
    loading, data, fetchMore, refetch
  } = useQuery<getNotes, getNotesVariables>(GetNotesQuery, { variables: { first: nbItems} });

  useEffect(() => {
    refetch();
  }, [order]);

  function displayNotes() {
    if (loading) {
      return <Spinner />;
    }
    if (data && data.getNotes && data.getNotes.edges) {
      if (data.getNotes.edges.length === 0) {
        return <Text>{t("notes.no-notes")}</Text>;
      }
      return (
        <InfiniteScroll step={nbItems} items={data.getNotes.edges} onMore={getMore}>
          {
            (item: getNotes_getNotes_edges) => (
            <NoteCard key={item.node!.id} note={item.node!} />
            )
          }
        </InfiniteScroll>
      );
    }
    return <></>;
  }

  function getMore() {
    // console.log("getMore")
    if (!data || !data.getNotes.pageInfo.hasNextPage) {
      return;
    }
    fetchMore({
      variables: {
        first: nbItems,
        after: data.getNotes.pageInfo.endCursor
      },
      updateQuery: (previousResult : getNotes, { fetchMoreResult }: FetchMoreResultQuery) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const { pageInfo, __typename, edges: newEdges } = fetchMoreResult.getNotes;
        return {
          getNotes: {
            pageInfo,
            __typename,
            edges: [...previousResult.getNotes.edges, ...newEdges],
          },
        };
      },
    });
  }

  return (
    <Box gap="small">
      <Heading level="3">{t("notes.title")}</Heading>
      <Link to={addNotePath}>
        <Button label={t("notes.create-note")} />
      </Link>
   {/*  {<Select
      options={[NoteOrder.RECENT, NoteOrder.RATING]}
      value={order}
      onChange={({ option }) => setOrder(option)}
    />}*/}
    
      <Box overflow="auto">
        {displayNotes()}
      </Box>
    </Box>
  );
}
