import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";

import {
  Box, Text
} from "grommet";

export default function Notes() : ReactElement {
  const { t } = useTranslation();
  return (
    <Box>
      <Text>Et voila je suis connecté mon gars</Text>
    </Box>
  );
}
