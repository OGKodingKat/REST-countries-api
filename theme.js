import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "input, textarea": {
        backgroundColor: "white !important",
        color: "black !important",
        border: "1px solid gray",
      },
    },
  },
});

export default theme;
