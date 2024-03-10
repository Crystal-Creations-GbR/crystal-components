import { type VuetifyOptions } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import { md3 } from "vuetify/blueprints";

const options: VuetifyOptions = {
  blueprint: md3,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#de735f",
          secondary: "#3d4059",
          accent: "#eeb06e",
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
