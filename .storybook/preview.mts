import type { Preview } from "@storybook/vue3";
import "vuetify/lib/styles/main.css";

import { setup } from "@storybook/vue3";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import {
  createI18n,
  DefaultLocaleMessageSchema,
  LocaleMessages,
} from "vue-i18n";
import options from "../vuetify-options";
import { withVuetifyTheme, DEFAULT_THEME } from "./withVuetifyTheme.decorator";

function loadLocaleMessages(): LocaleMessages<DefaultLocaleMessageSchema> {
  const locales = import.meta.glob("../src/locales/*.json", {
    as: "raw",
    eager: true,
  });

  const messages: LocaleMessages<DefaultLocaleMessageSchema> = {};

  for (const path in locales) {
    const matched = path.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = JSON.parse(locales[path]);
    }
  }
  return messages;
}

setup((app) => {
  app.use(createVuetify({ ...options, components }));
  app.use(
    createI18n({
      legacy: false,
      locale: "de",
      messages: loadLocaleMessages(),
    }),
  );
});

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: DEFAULT_THEME,
    toolbar: {
      icon: "circlehollow",
      // Array of plain string values or MenuItem shape (see below)
      items: [
        { value: "light", title: "Light", icon: "circlehollow" },
        { value: "dark", title: "Dark", icon: "circle" },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

export const decorators = [withVuetifyTheme];
