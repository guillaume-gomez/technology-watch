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
  currentNotes: number;
}

export default function NoteTotalCount({ markAsRead, currentNotes } : NoteTotalCount) : ReactElement {
  const { t } = useTranslation();
  const [getTotalNotes, { data }] = useLazyQuery<getTotalNotes, getTotalNotesVariables>(GetTotalNotesQuery);


  useEffect(() => {
    getTotalNotes({ variables: { markAsRead } });
  }, [markAsRead]);


  return (
    <Box pad="xsmall">
      {
        data ? 
        <Text>{currentNotes}{" / "}{data.getTotalNotes}{" "}{t("note-total-count.notes")}</Text> :
        <Spinner size="small" />
      }
    </Box>
  );
}
