import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "CrystalComponents",
      fileName: "index",
    },
    rollupOptions: {
      external: [
        "vue",
        "vue-i18n",
        "vuetify",
        "@mdi/js",
        "@crystal-creations/animated-checkmark",
        "@crystal-creations/pulsating-circle",
      ],
      output: {
        globals: {
          vue: "Vue",
          vuetify: "Vuetify",
          "@crystal-creations/animated-checkmark": "AnimatedCheckmark",
          "@crystal-creations/pulsating-circle": "PulsatingCircle",
          "vue-i18n": "Vue-i18n",
          "@mdi/js": "@mdi/js",
        },
      },
    },
  },
});
