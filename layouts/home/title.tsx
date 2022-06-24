import { Heading } from "@chakra-ui/react";
import React from "react";

const HomeTitle: React.FC = () => {
  return (
    <Heading as="h1" size={{ lg: "xl", base: "lg" }} color="black">
      Ömercan Balandı
    </Heading>
  );
};

export default HomeTitle;
