import {
  addComponent,
  createResolver,
  defineNuxtModule,
  installModule,
} from "@nuxt/kit";

export default defineNuxtModule({
  async setup(_options, nuxt) {
    await installModule("@crystal-creations/animated-checkmark/nuxt");
    await installModule("@crystal-creations/pulsating-circle/nuxt");

    const resolver = createResolver(import.meta.url);

    nuxt.hook("i18n:registerModule", (register) => {
      register({
        langDir: resolver.resolve("./locales"),
        locales: [
          {
            code: "en",
            file: "en.json",
          },
          {
            code: "de",
            file: "de.json",
          },
        ],
      });
    });

    await addComponent({
      name: "CLicenseCard",
      filePath: resolver.resolve("components/CLicenseCard.vue"),
    });
    await addComponent({
      name: "CItemListGroup",
      filePath: resolver.resolve("components/CItemListGroup.vue"),
    });
    await addComponent({
      name: "CSnackbar",
      filePath: resolver.resolve("components/CSnackbar.vue"),
    });
    await addComponent({
      name: "CSnackbarManager",
      filePath: resolver.resolve("components/CSnackbarManager.vue"),
    });
    await addComponent({
      name: "CNavigationDrawer",
      filePath: resolver.resolve("components/CNavigationDrawer.vue"),
    });
    await addComponent({
      name: "CCard",
      filePath: resolver.resolve("components/CCard.vue"),
    });
    await addComponent({
      name: "CCardDialog",
      filePath: resolver.resolve("components/CCardDialog.vue"),
    });
    await addComponent({
      name: "CSettingsItem",
      filePath: resolver.resolve("components/CSettingsItem.vue"),
    });
    await addComponent({
      name: "CNavigationSubtitle",
      filePath: resolver.resolve("components/CNavigationSubtitle.vue"),
    });
    await addComponent({
      name: "CPrimaryTabs",
      filePath: resolver.resolve("components/CPrimaryTabs.vue"),
    });
    await addComponent({
      name: "CSecondaryNavigation",
      filePath: resolver.resolve("components/CSecondaryNavigation.vue"),
    });
  },
});
