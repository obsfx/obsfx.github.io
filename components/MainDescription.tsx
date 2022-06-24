import React from "react";
import { Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const MainDescription: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Text
      fontWeight="500"
      fontSize={{ lg: "3xl", sm: "xl" }}
      color="blackAlpha.600"
      as="h2"
      my={{ lg: 6, base: 4 }}
    >
      {children}
    </Text>
  );
};

export const MainDescriptionInline: React.FC<
  {
    children: React.ReactNode;
  } & React.ComponentProps<typeof Text>
> = ({ children, ...rest }) => {
  return (
    <Text as="span" fontWeight="700" color="black" {...rest}>
      {children}
    </Text>
  );
};

export const MainDescriptionInlineLink: React.FC<
  {
    children: React.ReactNode;
  } & React.ComponentProps<typeof Link>
> = ({ children, ...rest }) => {
  return (
    <Link fontWeight="700" color="gray.900" {...rest}>
      {children}
      <ExternalLinkIcon mx="2px" />
    </Link>
  );
};
