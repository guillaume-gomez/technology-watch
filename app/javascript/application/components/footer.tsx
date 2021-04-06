import React, { ReactElement } from "react";
import {
  Footer, Text, Anchor,
} from "grommet";

export default function footer() : ReactElement {
  return (
    <Footer background="brand" pad="medium">
      <Text>Copyright</Text>
      <Anchor label="About"  href="http://guillaume-gomez.github.io"/>
    </Footer>
  );
}
