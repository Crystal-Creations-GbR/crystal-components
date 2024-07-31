import type { Meta, StoryObj } from "@storybook/vue3";
import { CTimeInput } from "../../src";
import {
  createComponentStorybookParameters,
  createStorybookParameters,
  createStorybookRender,
} from "../../src/storybook-helper";

const meta: Meta<typeof CTimeInput> = {
  title: "Components/Inputs/TimeInput",
  component: CTimeInput,
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
    label: "Time",
    disabled: false,
    rules: [
      (value: number) => {
        if (!value || value <= 0) return "Enter time.";
        return true;
      },
    ],
  },

  parameters: {
    ...createComponentStorybookParameters({
      componentDescription:
        "This component builds an input field for time with simplified typing experience and without a time picker popup. The format of the time will always be `xx:xx`. Caution: Does only support 24-hour format at the moment.",
    }),
    ...createStorybookParameters({}),
  },
  render: createStorybookRender({
    components: { CTimeInput },
    template: `
      <div class="pa-5">
        <c-time-input v-bind='args'>
        </c-time-input>
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
