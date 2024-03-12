import type { Meta, StoryObj } from "@storybook/vue3";
import { CSecondaryNavigation, CNavigationSubtitle } from "../src";
import {
  createComponentStorybookParameters,
  createStorybookParameters,
  createStorybookRender,
} from "../src/storybook-helper";
import { allModes } from "../.storybook/modes";

const meta: Meta<typeof CSecondaryNavigation> = {
  title: "Components/SecondaryNavigation",
  component: CSecondaryNavigation,
  argTypes: {
    navigationDrawerOrder: {
      control: "text",
    },
    sideNavigationColor: {
      control: "text",
    },
    navigationDrawerClass: {
      control: "text",
    },
    appBarOrder: {
      control: "text",
    },
    tabNavigationColor: {
      control: "text",
    },
  },
  parameters: {
    ...createComponentStorybookParameters({
      componentDescription:
        "This component builds a secondary navigation that can be used to navigate inside a page.\n\nThe navigation consists out of two different types of navigation:\nA side navigation inside a `v-navigation-drawer` and a primary tab-navigation inside a `v-app-bar`.",
    }),
    chromatic: { modes: allModes },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: createStorybookRender({
    components: { CSecondaryNavigation, CNavigationSubtitle },
    template: `
<c-secondary-navigation v-bind='args'>
  <template #list-items>
    <c-navigation-subtitle title="Side Navigation"></c-navigation-subtitle>
    <v-list-item @click="() => {}" value="1">List 1</v-list-item>
    <v-list-item @click="() => {}" value="2">List 2</v-list-item>
    <v-list-item @click="() => {}" value="3">List 3</v-list-item>
    
    <c-navigation-subtitle title="Group 2"></c-navigation-subtitle>
    <v-list-item @click="() => {}" value="4">List 4</v-list-item>
    <v-list-item @click="() => {}" value="5">List 5</v-list-item>
  </template>
  <template #tab-items>
    <v-tab>Tab 1</v-tab>
    <v-tab>Tab 2</v-tab>
    <v-tab>Tab 3</v-tab>
  </template>
</c-secondary-navigation>

<v-main>
  <v-sheet height="500px"></v-sheet>
</v-main>
    `,
  }),
  parameters: createStorybookParameters({
    slotTemplate: `
    <template #list-items>
      <c-navigation-subtitle title="Side Navigation"></c-navigation-subtitle>
      <v-list-item>List 1</v-list-item>
      <v-list-item>List 2</v-list-item>
      <v-list-item>List 3</v-list-item>
      
      <c-navigation-subtitle title="Group 2"></c-navigation-subtitle>
      <v-list-item">List 4</v-list-item>
      <v-list-item">List 5</v-list-item>
    </template>
    <template #tab-items>
      <v-tab>Tab 1</v-tab>
      <v-tab>Tab 2</v-tab>
      <v-tab>Tab 3</v-tab>
    </template>
      `,
  }),
};
