import React, { ReactElement, useState } from 'react';
import { useTranslation } from "react-i18next";
import { theme } from "./theme";
import { Grommet, Box, Main, ResponsiveContext, Heading } from 'grommet';
import { FormClose } from "grommet-icons";

import Header from "./components/header";
import Footer from "./components/footer";

export default function Router() : ReactElement {
  const { t } = useTranslation();
  return (
  <Grommet theme={theme} full themeMode="light">
    <ResponsiveContext.Consumer>
      {size => (
         <Box fill>
           <Header />
           <Main pad="small">
             <Heading>{t("wave-hand")}</Heading>
           </Main>
           <Footer/>
        </Box>
     )}
   </ResponsiveContext.Consumer>
  </Grommet>);
};