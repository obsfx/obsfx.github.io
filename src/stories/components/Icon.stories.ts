import Icon from "@/src/components/Icon.astro";

export default {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    name: { control: "inline-radio", options: ["arrow-up-right", "mail"] },
  },
};

export const ArrowUpRight = { args: { name: "arrow-up-right" } };

export const Mail = { args: { name: "mail" } };
