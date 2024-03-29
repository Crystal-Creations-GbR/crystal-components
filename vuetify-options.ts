import { type VuetifyOptions } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import { md3 } from "vuetify/blueprints";

const options: VuetifyOptions = {
  blueprint: md3,
  defaults: {
    VBtn: {
      class: "text-none",
    },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#de735f",
          secondary: "#3d4059",
          accent: "#eeb06e",
          background: "#f3f0f0",
        },
        variables: {},
      },
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  ssr: true,
};

export default options;
