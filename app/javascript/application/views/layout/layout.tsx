import React, { ReactElement, ReactChild } from "react";
import { Box, Main } from "grommet";
import PublicHeader from "../../components/publicHeader";
import PrivateHeader from "../../components/privateHeader";
import Footer from "../../components/footer";

export interface LayoutProps {
  children: ReactChild;
  loggedIn?: boolean
}

export default function Layout({ children, loggedIn = false } : LayoutProps) : ReactElement {
  return (
    <Box fill>
      { loggedIn
        ? <PrivateHeader />
        : <PublicHeader />}
      <Main pad="large" align="center" >
        <Box elevation="small" pad="medium" width="large">
          {children}
        </Box>
      </Main>
      <Footer />
    </Box>
  );
}
