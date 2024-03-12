<template>
  <v-tabs
    class="c-primary-tabs full-width"
    :align-tabs="alignTabs"
    :center-active="centerActive"
    :show-arrows="showArrows"
  >
    <slot></slot>
  </v-tabs>
</template>

<script setup lang="ts">
/**
 * This component is a wrapper for the vuetify tabs following the material design 3 specifications for primary tabs
 *
 * Use `v-tab` components in the default slot.
 */
withDefaults(
  defineProps<{
    /**
     * Where the tabs should be aligned.
     *
     * `title` aligns the tabs with the `v-toolbar-title` component.
     */
    alignTabs?: "start" | "title" | "center" | "end";

    /**
     * Forces the selected tab to be centered.
     */
    centerActive?: boolean;

    /**
     * Shows pagination arrows if the tab items overflow their container.
     */
    showArrows?: boolean;
  }>(),
  {
    alignTabs: "center",
    centerActive: true,
    showArrows: true,
  },
);
</script>

<style lang="scss">
.c-primary-tabs {
  .v-tab {
    border-radius: 0 !important;

    .v-tab__slider {
      width: 30px;
      height: 3px;
      border-top-right-radius: 24px;
      border-top-left-radius: 24px;
      left: calc(50% - 15px);
    }
  }
}
</style>
