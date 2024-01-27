import type { Meta, StoryObj } from "@storybook/vue3";
import CLicenseCard from "../src/components/CLicenseCard.vue";

const meta: Meta<typeof CLicenseCard> = {
  title: "Components/LicenseCard",
  component: CLicenseCard,
  argTypes: {},
  args: {
    softwareInfo: {
      name: "@crystal-creations/crystal-components",
      version: "v1.0.0",
      author: "Crystal Creations GbR and Johannes Huther",
      repositoryLink:
        "https://github.com/Crystal-Creations-GbR/crystal-components",
      notice: "MIT",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const NoAuthor: Story = {
  args: {
    softwareInfo: {
      name: "@crystal-creations/crystal-components",
      version: "v1.0.0",
      repositoryLink:
        "https://github.com/Crystal-Creations-GbR/crystal-components",
      notice: "MIT",
    },
  },
};

export const NoLink: Story = {
  args: {
    softwareInfo: {
      name: "@crystal-creations/crystal-components",
      version: "v1.0.0",
      author: "Crystal Creations GbR and Johannes Huther",
      notice: "MIT",
    },
  },
};

export const LongLicense: Story = {
  args: {
    softwareInfo: {
      name: "@crystal-creations/crystal-components",
      version: "v1.0.0",
      author: "Crystal Creations GbR and Johannes Huther",
      repositoryLink:
        "https://github.com/Crystal-Creations-GbR/crystal-components",
      notice:
        "Copyright (c) 2024 by Crystal Creations GbR and Johannes Huther\n" +
        "\n" +
        "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and\n" +
        'associated documentation files (the "Software"), to deal in the Software without restriction,\n' +
        "including without limitation the rights to use, copy, modify, merge, publish, distribute,\n" +
        "sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,\n" +
        "subject to the following conditions:\n" +
        "\n" +
        "The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n" +
        "\n" +
        'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,\n' +
        "INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.\n" +
        "IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,\n" +
        "WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR\n" +
        "THE USE OR OTHER DEALINGS IN THE SOFTWARE.",
    },
  },
};
