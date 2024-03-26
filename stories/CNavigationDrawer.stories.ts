import type { Meta, StoryObj } from "@storybook/vue3";
import {
  createComponentStorybookParameters,
  createStorybookParameters,
  createStorybookRender,
} from "../src/storybook-helper";
import { allModes } from "../.storybook/modes";
import {
  CNavigationDrawer,
  CNavigationItem,
  CNavigationSubtitle,
  CNavigationDivider,
} from "../src";

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
    components: {
      CNavigationDrawer,
      CNavigationItem,
      CNavigationSubtitle,
      CNavigationDivider,
    },
    template: `
<c-navigation-drawer v-bind='args'>
  <template #branding>
    Branding
  </template>
  
  <v-list color="primary" variant="text" nav>
     <c-navigation-subtitle
        size="normal"
        title="Subtitle 1"
      ></c-navigation-subtitle>

      <c-navigation-item
        label="Item 1"
      ></c-navigation-item>

      <c-navigation-item
        label="Item 2"
      ></c-navigation-item>

      <c-navigation-divider></c-navigation-divider>

      <c-navigation-subtitle
        size="normal"
        title="Subtitle 2"
      ></c-navigation-subtitle>

      <c-navigation-item
        label="Item 3"
      ></c-navigation-item>
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
        <c-navigation-subtitle
          size="normal"
          title="Subtitle 1"
        ></c-navigation-subtitle>
        
        <c-navigation-item
          label="Item 1"
        ></c-navigation-item>
        
        <c-navigation-item
          label="Item 2"
        ></c-navigation-item>
        
        <c-navigation-divider></c-navigation-divider>
        
        <c-navigation-subtitle
          size="normal"
          title="Subtitle 2"
        ></c-navigation-subtitle>
        
        <c-navigation-item
          label="Item 3"
        ></c-navigation-item>
      </v-list>
      
      <template #footer>
        Footer information
      </template>
      `,
  }),
};
