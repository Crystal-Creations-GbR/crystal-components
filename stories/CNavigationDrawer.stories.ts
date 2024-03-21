import type { Meta, StoryObj } from "@storybook/vue3";
import {
  createComponentStorybookParameters,
  createStorybookParameters,
  createStorybookRender,
} from "../src/storybook-helper";
import { allModes } from "../.storybook/modes";
import { CNavigationDrawer } from "../src";

const meta: Meta<typeof CNavigationDrawer> = {
  title: "Components/NavigationDrawer",
  component: CNavigationDrawer,
  argTypes: {},
  parameters: {
    ...createComponentStorybookParameters({
      componentDescription:
        "This component builds a navigation drawer that supports rail mode on large devices.\n\nThe navigation drawer will automatically be hidden on smaller devices.\n\n*Due to storybook restrictions, the navigation drawer cannot be collapsed manually.*",
    }),
    chromatic: { modes: allModes },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: createStorybookRender({
    components: { CNavigationDrawer },
    template: `
<c-navigation-drawer v-bind='args'>
  <template #branding>
    Branding
  </template>
  
  <v-list color="primary" variant="text" nav>
    <v-list-item @click="() => {}" value="1">List 1</v-list-item>
    <v-list-item @click="() => {}" value="2">List 2</v-list-item>
    <v-list-item @click="() => {}" value="3">List 3</v-list-item>
    <v-list-item @click="() => {}" value="4">List 4</v-list-item>
    <v-list-item @click="() => {}" value="5">List 5</v-list-item>
  </v-list>
  
  <template #footer>
    Footer information
  </template>
</c-navigation-drawer>

<v-app-bar color="background">
  <template #prepend>
    <!-- Drawer Toggle -->
    <v-app-bar-nav-icon
      variant="text"
    ></v-app-bar-nav-icon>
  </template>
</v-app-bar>

<v-main>
  <v-sheet height="500px" class="pa-10" color="background">
    Navigation Drawer will automatically be hidden on smaller devices.
  </v-sheet>
</v-main>
    `,
  }),
  parameters: createStorybookParameters({
    slotTemplate: `
      <template #branding>
        Branding
      </template>
      
      <v-list color="primary" variant="text" nav>
        <v-list-item @click="() => {}" value="1">List 1</v-list-item>
        <v-list-item @click="() => {}" value="2">List 2</v-list-item>
        <v-list-item @click="() => {}" value="3">List 3</v-list-item>
        <v-list-item @click="() => {}" value="4">List 4</v-list-item>
        <v-list-item @click="() => {}" value="5">List 5</v-list-item>
      </v-list>
      
      <template #footer>
        Footer information
      </template>
      `,
  }),
};
