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
    wrapTitle: {
      control: "boolean",
    },
    subtitle: {
      control: "text",
    },
    scrollingContentVerticalPadding: {
      control: "boolean",
    },
    height: {
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
    forceScroll: {
      control: "boolean",
    },
    color: {
      control: "text",
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

export const CenteredTitle: Story = {
  args: {
    title: "Centered card title",
    titlePosition: "center",
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

export const LargeTitle: Story = {
  args: {
    title: "Large card title",
    titleSize: "large",
  },
  render: createStorybookRender({
    components: { CCard },
    template: `
<c-card v-bind='args' class="ma-5">
    This title is larger and optimal to use in a card dialog. The title gets smaller on mobile.
</c-card>
    `,
  }),
  parameters: createStorybookParameters({
    slotTemplate:
      "This title is larger and optimal to use in a card dialog. The title gets smaller on mobile.",
  }),
};

export const NowrapTitle: Story = {
  args: {
    title: "Long non-wrapping title",
    width: "200px",
  },
};

export const WrapTitle: Story = {
  args: {
    title: "Long wrapping title",
    wrapTitle: true,
    width: "200px",
  },
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

export const Color: Story = {
  args: {
    title: "Card title",
    color: "red",
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

export const ScrollableContent: Story = {
  args: {
    title: "Scrollable Card content",
    subtitle:
      "Scrolling will be automatically enabled if the content is larger than the available space. This only works on a CCard with fixed or a maximum height. Keep in mind, that the surrounding divs also have to have a fixed or maximum height and also have the height set to 100%.",
    height: "100%",
    scrollingContentVerticalPadding: false,
  },
  render: createStorybookRender({
    components: { CCard },
    template: `
<div style="height: 100%; max-height: 300px;" class="pa-5">
  <c-card v-bind='args'>
    <template #content-full-width="{ padding }">
        <v-list>
            <v-list-item @click="() => {}">This content has the full width</v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="() => {}">This content has the full width</v-list-item>
            <v-divider></v-divider>
            <v-list-item :class="padding" @click="() => {}">Use 'padding' prop to set matching padding.</v-list-item>
        </v-list>
    </template>
  </c-card>
</div>
    `,
  }),
  parameters: createStorybookParameters({
    slotTemplate: `
      <template #content-full-width="{ padding }">
          <v-list>
              <v-list-item @click="() => {}">This content has the full width</v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="() => {}">This content has the full width</v-list-item>
              <v-divider></v-divider>
              <v-list-item :class="padding" @click="() => {}">Use 'padding' prop to set matching padding.</v-list-item>
          </v-list>
      </template>
    `,
  }),
};

export const AlwaysScrollable: Story = {
  args: {
    title: "Always Scrollable Card",
    forceScroll: true,
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
