import React, { ReactElement, ReactChild } from "react";
import { Box, Grid } from "grommet";
import PublicHeader from "../../components/publicHeader";
import PrivateHeader from "../../components/privateHeader";

import ThemeColor from "../../reducers/useThemeColor";

export interface LayoutProps {
  children: ReactChild;
  loggedIn?: boolean
}

export default function Layout({ children, loggedIn = false } : LayoutProps) : ReactElement {
  const { themeMode } = ThemeColor.useContainer();
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
          <Box round="xsmall" background={themeMode === "light" ? "light-1" : "dark-1"} pad="small" margin="auto" width="xxlarge" height="xxlarge">
            {children}
          </Box>
        </Box>
      </Grid>
    </div>
  );
}
