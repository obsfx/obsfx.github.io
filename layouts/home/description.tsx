import { Box } from "@chakra-ui/react";
import React from "react";

import {
  MainDescription,
  MainDescriptionInline,
  MainDescriptionInlineLink,
} from "../../components/MainDescription";

const HomeDescription: React.FC = () => {
  return (
    <Box>
      <MainDescription>
        A passionate{" "}
        <MainDescriptionInline>software developer</MainDescriptionInline> based
        in <MainDescriptionInline>Izmir, Turkey</MainDescriptionInline>.
      </MainDescription>

      <MainDescription>
        Working on{" "}
        <MainDescriptionInline>web applications</MainDescriptionInline>.
        Creating{" "}
        <MainDescriptionInlineLink
          href="https://github.com/obsfx/zero-ld46"
          isExternal
        >
          games
        </MainDescriptionInlineLink>
        and{" "}
        <MainDescriptionInlineLink href="https://codepen.io/obsfx" isExternal>
          codepen demos
        </MainDescriptionInlineLink>{" "}
        in spare time. Crafting{" "}
        <MainDescriptionInlineLink
          href="https://github.com/obsfx/libgen-downloader"
          isExternal
        >
          command-line tools
        </MainDescriptionInlineLink>
        ,{" "}
        <MainDescriptionInlineLink
          href="https://github.com/obsfx/lurkdown"
          isExternal
        >
          small compilers
        </MainDescriptionInlineLink>{" "}
        and{" "}
        <MainDescriptionInlineLink href="https://omercan.io/m3k" isExternal>
          toy programming languages
        </MainDescriptionInlineLink>{" "}
        just for fun.
      </MainDescription>

      <MainDescription>
        Loves using <MainDescriptionInline>Neovim</MainDescriptionInline>. Here
        is the{" "}
        <MainDescriptionInlineLink
          href="https://github.com/obsfx/dotfiles"
          isExternal
        >
          dotfiles
        </MainDescriptionInlineLink>
        .
      </MainDescription>

      <MainDescription>
        Check out the projects at{" "}
        <MainDescriptionInlineLink href="https://github.com/obsfx" isExternal>
          github
        </MainDescriptionInlineLink>
        ,{" "}
        <MainDescriptionInlineLink
          href="https://www.npmjs.com/~obsfx"
          isExternal
        >
          npm
        </MainDescriptionInlineLink>
        ,{" "}
        <MainDescriptionInlineLink href="https://codepen.io/obsfx" isExternal>
          codepen
        </MainDescriptionInlineLink>{" "}
        and{" "}
        <MainDescriptionInlineLink href="https://obsfx.itch.io/" isExternal>
          itch.io
        </MainDescriptionInlineLink>
        .
      </MainDescription>

      <MainDescription>
        See the some notable things that I made;{" "}
        <MainDescriptionInlineLink
          href="https://github.com/obsfx/libgen-downloader"
          isExternal
        >
          libgen-downloader
        </MainDescriptionInlineLink>
        ,{" "}
        <MainDescriptionInlineLink
          href="https://github.com/obsfx/console8"
          isExternal
        >
          console8
        </MainDescriptionInlineLink>
        ,{" "}
        <MainDescriptionInlineLink
          href="https://github.com/obsfx/pocket-uniswap"
          isExternal
        >
          pocket-uniswap
        </MainDescriptionInlineLink>
        ,{" "}
        <MainDescriptionInlineLink
          href="https://github.com/obsfx/m3k"
          isExternal
        >
          m3k
        </MainDescriptionInlineLink>
        ,{" "}
        <MainDescriptionInlineLink
          href="https://github.com/obsfx/lurkdown"
          isExternal
        >
          lurkdown
        </MainDescriptionInlineLink>
        .
      </MainDescription>

      <MainDescription>
        Download the{" "}
        <MainDescriptionInlineLink
          href="https://omercan.io/resume/Omercan-Balandi-Resume.pdf"
          isExternal
        >
          resume
        </MainDescriptionInlineLink>
        .
      </MainDescription>

      <MainDescription>
        Best way to contact would be{" "}
        <MainDescriptionInlineLink
          href="mailto:balandiomer@gmail.com"
          isExternal
        >
          email
        </MainDescriptionInlineLink>
        ,{" "}
        <MainDescriptionInlineLink
          href="https://www.linkedin.com/in/omercanbalandi/"
          isExternal
        >
          linkedin
        </MainDescriptionInlineLink>{" "}
        or{" "}
        <MainDescriptionInlineLink href="https://twitter.com/obsfx" isExternal>
          twitter
        </MainDescriptionInlineLink>
        .
      </MainDescription>
    </Box>
  );
};

export default HomeDescription;
