import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import {
  Box, Heading, Spinner, Text, InfiniteScroll,
} from "grommet";

import { GetNotes as GetNotesQuery } from "../../graphql/noteQueries";
import { getNotes, getNotesVariables, getNotes_getNotes_edges } from "../../graphql/types/getNotes";

interface FetchMoreResultQuery {
  fetchMoreResult: getNotes;
  variables: Object
}

const NB_ITEMS = 3;

export default function Notes() : ReactElement {
  const { t } = useTranslation();
  const {
    loading, error, data, fetchMore,
  } = useQuery<getNotes, getNotesVariables>(GetNotesQuery, { variables: { first: NB_ITEMS } });

  function displayNotes() {
    if (loading) {
      return <Spinner />;
    }
    if (data && data.getNotes && data.getNotes.edges) {
      if (data.getNotes.edges.length === 0) {
        return <Text>{t("notes.no-notes")}</Text>;
      }
      return (
        <InfiniteScroll step={NB_ITEMS} items={data.getNotes.edges} onMore={getMore}>
          {
            (item: getNotes_getNotes_edges) => (
              <Box
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
      <Box overflow="auto">
        {displayNotes()}
      </Box>
    </Box>
  );
}
