import React, { ReactElement } from 'react';
import { Header, Heading } from "grommet";
interface headerProps {

}

export default function header( {}: headerProps) : ReactElement {
  return (
   <Header background="brand">
     <Heading margin="medium" level="3">Technology Watch</Heading>
   </Header>
  );
}