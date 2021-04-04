import React, { ReactElement, ReactChild } from "react";
import { Box, Main } from "grommet";
import Header from "../../components/header";
import Footer from "../../components/footer";

export interface LayoutProps {
  children: ReactChild;
}

export default function Layout({ children } : LayoutProps) : ReactElement {
  return (
    <Box fill>
      <Header />
      <Main pad="small">
        {children}
      </Main>
      <Footer />
    </Box>
  );
}
