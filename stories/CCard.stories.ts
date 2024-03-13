import type { Meta, StoryObj } from "@storybook/vue3";
import { CCard } from "../src";
import {
  createComponentStorybookParameters,
  createStorybookParameters,
  createStorybookRender,
} from "../src/storybook-helper";

const meta: Meta<typeof CCard> = {
  title: "Components/Card",
  component: CCard,
  argTypes: {
    title: {
      control: "text",
    },
    titlePosition: {
      control: "radio",
      options: ["center", "left", "right"],
    },
    subtitle: {
      control: "text",
    },
    width: {
      control: "text",
    },
    maxWidth: {
      control: "text",
    },
    minWidth: {
      control: "text",
    },
    loading: {
      control: "boolean",
    },
  },
  parameters: createComponentStorybookParameters({
    componentDescription:
      "This component is a wrapper for vuetify card following the material design 3 specifications.",
  }),
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    title: "Card title",
    titlePosition: "left",
    subtitle: "Card subtitle",
    loading: false,
  },
  render: createStorybookRender({
    components: { CCard },
    template: `
<c-card v-bind='args' class="ma-5">
    Cards main content.
</c-card>
    `,
  }),
  parameters: createStorybookParameters({
    slotTemplate: "Cards main content.",
  }),
};

export const Actions: Story = {
  args: {
    title: "Card with actions",
  },
  render: createStorybookRender({
    components: { CCard },
    template: `
<c-card v-bind='args' class="ma-5">
  <template #prepend-actions>
    <v-btn>Learn More</v-btn>
  </template>

  <template #actions>
    <v-btn>Abbrechen</v-btn>
    <v-btn>Okay</v-btn>
  </template>
</c-card>
    `,
  }),
  parameters: createStorybookParameters({
    slotTemplate: `
      <template #prepend-actions>
        <v-btn>Learn More</v-btn>
      </template>
    
      <template #actions>
        <v-btn>Abbrechen</v-btn>
        <v-btn>Okay</v-btn>
      </template>
    `,
  }),
};

export const ContentFullWidth: Story = {
  args: {
    title: "Card content with full list",
    subtitle: "Can be used for list-items.",
  },
  render: createStorybookRender({
    components: { CCard },
    template: `
<c-card v-bind='args' class="ma-5">
  <template #content-full-width="{ padding }">
      <v-list>
          <v-list-item :class="padding" @click="() => {}">This content has the full width</v-list-item>
          <v-divider></v-divider>
          <v-list-item :class="padding" @click="() => {}">Use 'padding' prop to set matching padding.</v-list-item>
      </v-list>
  </template>
</c-card>
    `,
  }),
  parameters: createStorybookParameters({
    slotTemplate: `
      <template #content-full-width="{ padding }">
          <v-list>
              <v-list-item :class="padding">This content has the full width</v-list-item>
              <v-divider></v-divider>
              <v-list-item :class="padding">Use 'padding' prop to set matching padding.</v-list-item>
          </v-list>
      </template>
    `,
  }),
};
