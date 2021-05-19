import React, { ReactElement, ReactChild } from "react";
import { Box, Main, Grid } from "grommet";
import PublicHeader from "../../components/publicHeader";
import PrivateHeader from "../../components/privateHeader";
import Footer from "../../components/footer";

export interface LayoutProps {
  children: ReactChild;
  loggedIn?: boolean
}

export default function Layout({ children, loggedIn = false } : LayoutProps) : ReactElement {
  return (
    <div style={{width: "100vw", height: "100vh"}}>
  <Grid
    rows={['auto', 'auto']}
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
</div>)
  // return (
  //   <Grid
  //     rows={["small", "large","small"]}
  //   >
  //     { loggedIn
  //       ? <PrivateHeader />
  //       : <PublicHeader />}
  //     <Main gridArea="main" pad="large" align="center" >
  //       <Box elevation="medium" pad="medium" width="xxlarge">
  //         {children}
  //       </Box>
  //     </Main>
  //     <Footer />
  //   </Grid>
  // );
}
