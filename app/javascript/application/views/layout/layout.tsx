import React, { ReactElement, ReactChild } from "react";
import { Box, Grid } from "grommet";
import PublicHeader from "../../components/publicHeader";
import PrivateHeader from "../../components/privateHeader";

export interface LayoutProps {
  children: ReactChild;
  loggedIn?: boolean
}

export default function Layout({ children, loggedIn = false } : LayoutProps) : ReactElement {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid
        rows={["auto", "auto"]}
        fill
      >
        <Box fill>
          {loggedIn
            ? <PrivateHeader />
            : <PublicHeader />}
        </Box>
        <Box fill pad="small">
          <Box elevation="medium" pad="small" margin="auto" width="xxlarge" height="xxlarge">
            {children}
          </Box>
        </Box>
      </Grid>
    </div>
  );
}
