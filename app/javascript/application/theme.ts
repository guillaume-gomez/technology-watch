import { deepMerge } from "grommet/utils";
import { grommet } from "grommet";


const customTheme = {
  global: {
   colors: {
     "background-web": {
       light: "#FEFEFE",
       dark: "#222222"
     },
     "mark-as-read": {
       light: "#006978",
       dark: "#56c8d8"
     },
     "status-critical": {
       light: "#c01565",
       dark: "#7015c0"
     },
     brand: "#1565c0",
     "accent-1": "#ffa726"
   },
   focus: {
     border: {
       color: "#ffa726"
     }
   }
  }
};

// export const theme = deepMerge(grommet, customTheme);

export const theme = deepMerge(grommet, customTheme);