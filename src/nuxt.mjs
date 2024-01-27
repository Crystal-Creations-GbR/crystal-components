import { defineNuxtModule, installModule } from "@nuxt/kit";

export default defineNuxtModule({
  async setup() {
    await installModule("@crystal-creations/animated-checkmark/nuxt");
    await installModule("@crystal-creations/pulsating-circle/nuxt");
  },
});
