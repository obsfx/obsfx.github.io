import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  styles: {
    global: () => ({
      body: {
        bg: "#e5e5e0",
      },
    }),
  },
});

export default theme;
