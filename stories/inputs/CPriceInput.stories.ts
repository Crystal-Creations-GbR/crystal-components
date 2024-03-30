import type { Meta, StoryObj } from "@storybook/vue3";
import { CPriceInput } from "../../src";
import {
  createComponentStorybookParameters,
  createStorybookParameters,
  createStorybookRender,
} from "../../src/storybook-helper";

const meta: Meta<typeof CPriceInput> = {
  title: "Components/Inputs/PriceInput",
  component: CPriceInput,
  argTypes: {
    label: {
      control: "text",
    },
    variant: {
      control: "radio",
      options: [
        "underlined",
        "outlined",
        "filled",
        "solo",
        "solo-inverted",
        "solo-filled",
        "plain",
      ],
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    label: "Price",
    disabled: false,
    rules: [
      (value: number) => {
        if (!value || value <= 0) return "Enter price.";
        return true;
      },
    ],
  },

  parameters: {
    ...createComponentStorybookParameters({
      componentDescription:
        "This component builds an input field for a price with simplified typing experience. The format of the price will always be `x,xx`.",
    }),
    ...createStorybookParameters({}),
  },
  render: createStorybookRender({
    components: { CPriceInput },
    template: `
      <div class="pa-5">
        <c-price-input v-bind='args'>
        </c-price-input>
      </div>
        `,
  }),
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
