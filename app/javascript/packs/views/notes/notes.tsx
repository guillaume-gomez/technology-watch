import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Box, Heading, Spinner, Text, InfiniteScroll, Button
} from "grommet";

import { GetNotes as GetNotesQuery } from "../../graphql/noteQueries";
import { getNotes, getNotesVariables, getNotes_getNotes_edges } from "../../graphql/types/getNotes";

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
  const {
    loading, error, data, fetchMore,
  } = useQuery<getNotes, getNotesVariables>(GetNotesQuery, { variables: { first: nbItems } });

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
              <Box
                key={item.node!.id}
                flex={false}
              >
                <Text>{item.node!.name}</Text>
              </Box>
            )
          }
        </InfiniteScroll>
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
        cursor: data.getNotes.pageInfo.endCursor,
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
    <Box>
      <Heading level="2">{t("notes.title")}</Heading>
      <Link to={addNotePath} >
        <Button label={t("notes.create-note")}/>
      </Link>

      <Box overflow="auto">
        {displayNotes()}
      </Box>
    </Box>
  );
}
