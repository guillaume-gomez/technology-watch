import React, { ReactElement } from "react";
import {
  Header, Heading,
} from "grommet";

export default function PublicHeader() : ReactElement {
  return (
    <Header background="brand">
      <Heading margin="medium" level="3">Technology Watch</Heading>
    </Header>
  );
}
