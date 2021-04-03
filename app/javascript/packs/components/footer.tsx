import React, { ReactElement } from 'react';
import { Footer, Heading, Text, Anchor } from "grommet";
interface footerProps {

}

export default function footer( {}: footerProps) : ReactElement {
  return (
    <Footer background="brand" pad="medium">
      <Text>Copyright</Text>
      <Anchor label="About" />
    </Footer>
  );
}