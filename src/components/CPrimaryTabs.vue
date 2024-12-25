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
import { computed } from "vue";

/**
 * This component is a wrapper for the vuetify tabs following the material design 3 specifications for primary tabs
 *
 * Use `v-tab` components in the default slot.
 */
const props = withDefaults(
  defineProps<{
    /**
     * Where the tabs should be aligned.
     *
     * `title` aligns the tabs with the `v-toolbar-title` component.
     */
    alignTabs?: "start" | "title" | "center" | "end";

    /**
     * The height of the tab.
     *
     * Defaults to `--v-tabs-height`.
     */
    height?: string;

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
    height: undefined,
    centerActive: true,
    showArrows: true,
  },
);

/**
 * The computed height for the tabs including the default value, if not set.
 */
const tabHeight = computed(() => {
  return props.height ?? "var(--v-tabs-height)";
});
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

  // Custom height
  height: v-bind(tabHeight);
  .v-tab.v-tab.v-btn {
    height: v-bind(tabHeight);
  }
}
</style>
