import type { Meta, StoryObj } from "@storybook/vue3";
import { CPasswordInput } from "../src";
import { createComponentStorybookParameters } from "../src/storybook-helper";

const meta: Meta<typeof CPasswordInput> = {
  title: "Components/PasswordInput",
  component: CPasswordInput,
  argTypes: {
    disabled: {
      control: "boolean",
    },
    type: {
      control: "radio",
      options: ["current-password", "new-password"],
    },
  },
  args: {
    disabled: false,
    type: "current-password",
    rules: (password: string) => {
      if (!password) return "Enter password.";
      else if (password.length < 8) return "Password too short.";
      return true;
    },
  },

  parameters: {
    ...createComponentStorybookParameters({
      componentDescription: "This component displays a password input field.",
    }),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const NewPassword: Story = {
  args: {
    type: "new-password",
  },
};
