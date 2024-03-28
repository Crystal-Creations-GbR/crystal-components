import type { Meta, StoryObj } from "@storybook/vue3";
import {
  createStorybookParameters,
  createComponentStorybookParameters,
  createStorybookRender,
} from "../src/storybook-helper";
import { CMultiOptionButton } from "../src";

const meta: Meta<typeof CMultiOptionButton> = {
  title: "Components/MultiOptionButton",
  component: CMultiOptionButton,
  argTypes: {
    primaryButton: {
      control: "text",
    },
    color: {
      control: "text",
    },
    variant: {
      control: "text",
    },
    density: {
      control: "text",
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    buttons: [
      { key: "save-new", label: "Save + New" },
      { key: "save", label: "Save" },
    ],
  },
  render: createStorybookRender({
    components: { CMultiOptionButton },
    template: `
  <div>
    <c-multi-option-button v-bind="args" class="ma-5"></c-multi-option-button>
  </div>
    `,
  }),
  parameters: {
    ...createComponentStorybookParameters({
      componentDescription:
        "This component builds a button group with a default button and an arrow to reveal more options as alternatives to the default button.",
    }),
    ...createStorybookParameters({
      slotTemplate: "",
    }),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const ButtonsSwitched: Story = {
  args: {
    primaryButton: "save",
  },
};

export const SizeComfortable: Story = {
  args: {
    density: "comfortable",
  },
};

export const SizeCompact: Story = {
  args: {
    density: "compact",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const VariantFlat: Story = {
  args: {
    variant: "flat",
  },
};
