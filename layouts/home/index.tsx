import React from "react";
import { Box } from "@chakra-ui/react";

import {
  MainDescription,
  MainDescriptionInline,
  MainDescriptionInlineLink,
} from "../../components/MainDescription";
import HomeDescription from "./description";
import HomeTitle from "./title";

const HomeLayout: React.FC = () => {
  return (
    <Box>
      <HomeTitle />
      <HomeDescription />
    </Box>
  );
};

export default HomeLayout;
