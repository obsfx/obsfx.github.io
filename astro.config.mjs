// @ts-check
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://omercan.io",
  output: "static",
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Google Sans Flex",
      cssVariable: "--font-sans",
      weights: ["300 700"],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["system-ui", "sans-serif"],
      options: {
        experimental: {
          variableAxis: {
            opsz: [["6", "144"]],
          },
        },
      },
    },
  ],
});
