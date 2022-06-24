import { Box } from "@chakra-ui/react";
import React from "react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      maxWidth="684px;"
      margin="auto"
      paddingY={{ lg: "48px", base: "24px" }}
      paddingX={{ base: "16px" }}
    >
      {children}
    </Box>
  );
};

export default MainLayout;
