import type { Meta, StoryObj } from "@storybook/vue3";
import { CSettingsItem } from "../src";
import { createComponentStorybookParameters } from "../src/storybook-helper";

const meta: Meta<typeof CSettingsItem> = {
  title: "Components/SettingsItems",
  component: CSettingsItem,
  argTypes: {
    label: {
      control: "text",
    },
    labelColumns: {
      control: "number",
    },
    value: {
      control: "text",
    },
    clickable: {
      control: "boolean",
    },
  },
  parameters: {
    ...createComponentStorybookParameters({
      componentDescription:
        "This component displays a list-item to display and manage settings.",
    }),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    label: "Settings label",
    value: "Settings value",
    clickable: true,
  },
};

export const Email: Story = {
  args: {
    label: "Email",
    value: "users@e-mail.com",
    clickable: true,
  },
};

export const NonClickable: Story = {
  args: {
    label: "Settings label",
    value: "Settings value",
  },
};

export const LabelColumn: Story = {
  args: {
    label: "Settings label",
    labelColumns: 5,
    value: "Settings value",
  },
};

export const ValueOnly: Story = {
  args: {
    value: "Settings value",
  },
};
