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
       light: "#1b15c0",
       dark: "#15bac0"
     },
     "status-critical": {
       light: "#c01565",
       dark: "#7015c0"
     },
     brand: "#1565c0",
     "accent-1": "#ffa726"
   },
 },
};

// export const theme = deepMerge(grommet, customTheme);

export const theme = deepMerge(grommet, customTheme);