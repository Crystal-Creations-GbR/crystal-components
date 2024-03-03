import { type VuetifyOptions } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

const options: VuetifyOptions = {
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
