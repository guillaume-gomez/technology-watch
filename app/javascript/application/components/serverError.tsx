import React, { ReactElement } from "react";
import {
  Text, Box,
} from "grommet";

interface ServerErrorProps {
  messages: string | string[]
}

export default function ServerError({ messages } : ServerErrorProps) : ReactElement {
  return (
    <Box background="status-error" pad="small" round="xsmall" animation="fadeIn">
      <Text>{messages}</Text>
    </Box>
  );
}
