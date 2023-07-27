import { statAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(statAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the parts you're going to style
  label: {
    color: "gray.400",
  },
  helpText: {},
  container: {},
  icon: {},
  number: {},
});

export const statTheme = defineMultiStyleConfig({ baseStyle });
