import React, { ReactElement } from "react";
import {
  Header, Heading,
} from "grommet";
import { useHistory } from "react-router-dom";
import {
  publicRootPath,
} from "../routesPath";

export default function PublicHeader() : ReactElement {
  const history = useHistory();
  return (
    <Header background="brand">
      <Heading margin="medium" level="3" style={{ cursor: "pointer" }} onClick={() => history.push(publicRootPath)}>Tech&apos; Watch</Heading>
    </Header>
  );
}
