import React, { ReactElement } from "react";
import {
  Text,
} from "grommet";

interface ServerErrorProps {
  messages: string | string[]
}

export default function ServerError({ messages } : ServerErrorProps) : ReactElement {
  return (
    <Text>{messages}</Text>
  );
}
