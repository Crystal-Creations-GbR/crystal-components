import type { Meta, StoryObj } from "@storybook/vue3";
import { CPrimaryTabs } from "../src";
import {
  createComponentStorybookParameters,
  createStorybookParameters,
  createStorybookRender,
} from "../src/storybook-helper";

const meta: Meta<typeof CPrimaryTabs> = {
  title: "Components/PrimaryTabs",
  component: CPrimaryTabs,
  argTypes: {
    alignTabs: {
      control: "radio",
      options: ["start", "title", "center", "end"],
    },
    centerActive: {
      control: "boolean",
    },
    showArrows: {
      control: "boolean",
    },
  },
  parameters: createComponentStorybookParameters({
    componentDescription:
      "This component is a wrapper for the vuetify tabs following the material design 3 specifications for primary tabs.\n\nUse `v-tab` components in the default slot.",
  }),
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
  render: createStorybookRender({
    components: { CPrimaryTabs },
    template: `
<c-primary-tabs v-bind='args'>
    <v-tab>Tab 1</v-tab>
    <v-tab>Tab 2</v-tab>
    <v-tab>Tab 3</v-tab>
</c-primary-tabs>
    `,
  }),
  parameters: createStorybookParameters({
    slotTemplate: `
        <v-tab>Tab 1</v-tab>
        <v-tab>Tab 2</v-tab>
        <v-tab>Tab 3</v-tab>
      `,
  }),
};
