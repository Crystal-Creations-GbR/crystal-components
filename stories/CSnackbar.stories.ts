import type { Meta, StoryContext, StoryObj } from "@storybook/vue3";
import { useArgs } from "@storybook/preview-api";

import { userEvent, within } from "@storybook/testing-library";
import isChromatic from "chromatic/isChromatic";
import { CSnackbar } from "../src";

const meta: Meta<typeof CSnackbar> = {
  title: "Components/Snackbar",
  component: CSnackbar,
  argTypes: {
    modelValue: {
      control: "boolean",
    },
    location: {
      control: "radio",
      options: ["bottom", "top"],
    },
    type: {
      control: "text",
    },
    timeout: {
      control: "number",
    },
  },
  args: {
    modelValue: false,
  },
  render: () => {
    const [args, updateArgs] = useArgs();

    return {
      components: { CSnackbar },
      setup() {
        const updateModel = (show = true) => {
          updateArgs({ modelValue: show });
        };

        const chromatic = isChromatic();

        return { args, updateModel, chromatic };
      },
      template: templateSource(),
    };
  },
  play: async ({ canvasElement }) => {
    if (!isChromatic()) return;

    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { hidden: true });
    await userEvent.click(button);
  },
  parameters: {
    docs: {
      description: {
        component:
          "This component is a wrapper for the vuetify snackbar. \n\n *Due to storybook restrictions all non-default stories do not work on this docs page, but they do on their respective story pages.*",
      },
      source: {
        transform: (_code: string, storyContext: StoryContext): string => {
          return docsSource(storyContext);
        },
      },
    },
  },
};

/**
 * Returns the source code used as a rendering template.
 */
function templateSource() {
  return `
<div class="d-flex justify-center align-center">
  <v-btn class="ma-4" @click='updateModel()' v-show="!chromatic">Show Snackbar</v-btn>
  <c-snackbar v-bind='args' @update:modelValue='updateModel'>
    This is a snackbar.
  </c-snackbar>
</div>
`;
}

/**
 * Returns the code displayed in the docs view.
 *
 * @param storyContext the context of the specific story
 */
function docsSource(storyContext: StoryContext) {
  return `
<template>
  <${storyContext.component?.__name}${toPropString(storyContext.args)}>
    This is a snackbar.
  </${storyContext.component?.__name}>
</template>
`;
}

/**
 * Returns a correctly formatted properties-string for use in the docs code.
 *
 * @param args the provided arguments.
 */
function toPropString(args: Record<string, any>): string {
  let propString = "\n    ";
  for (let key in args) {
    let value = args[key];

    // Replace model value with v-model in the documentation.
    if (key === "modelValue") {
      key = "v-model";
      value = "model";
    }

    const colon = typeof value !== "string";

    propString += (colon ? ":" : "") + key + '="' + value + '"\n    ';
  }
  return propString.slice(0, propString.length - 2);
}

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const Success: Story = {
  args: {
    type: "success",
  },
};

export const Primary: Story = {
  args: {
    type: "primary",
  },
};

export const CustomColor: Story = {
  args: {
    type: "purple",
  },
};

export const LocationTop: Story = {
  args: {
    location: "top",
  },
};

export const NoTimeout: Story = {
  args: {
    timeout: -1,
  },
};
