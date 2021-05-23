import React, { ReactElement, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLazyQuery } from "@apollo/client";

import { getTotalNotes, getTotalNotesVariables } from "../graphql/types/getTotalNotes";
import { GetTotalNotes as GetTotalNotesQuery } from "../graphql/noteQueries";
import {
  Box, Text, Spinner
} from "grommet";

interface NoteTotalCount {
  markAsRead: boolean;
}

export default function NoteTotalCount({ markAsRead } : NoteTotalCount) : ReactElement {
  const { t } = useTranslation();
  const [getTotalNotes, { data }] = useLazyQuery<getTotalNotes, getTotalNotesVariables>(GetTotalNotesQuery);


  useEffect(() => {
    getTotalNotes({ variables: { markAsRead } });
  }, [markAsRead]);


  return (
    <Box pad="xsmall">
      {
        data ? 
        <Text>{data.getTotalNotes}{" "}{t("note-total-count.notes")}</Text> :
        <Spinner size="small" />
      }
    </Box>
  );
}
