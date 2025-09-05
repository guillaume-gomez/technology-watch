import React, { ReactElement } from "react";
import {
  Footer, Text, Anchor,
} from "grommet";

export default function footer() : ReactElement {
  return (
    <Footer background="brand" pad="xsmall">
      <Text>Copyright</Text>
      <Anchor label="About" href="https://github.com/guillaume-gomez/technology-watch" />
    </Footer>
  );
}
