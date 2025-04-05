<template>
  <!-- This wrapping div is required to prevent an endless loop when reloading the page. See #125 -->
  <div class="w-100">
    <v-tabs
      v-bind="$attrs"
      class="c-primary-tabs full-width"
      :align-tabs="alignTabs"
      :center-active="centerActive"
      :show-arrows="showArrows"
      :style="{ '--tabHeight': tabHeight }"
    >
      <slot></slot>
    </v-tabs>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Don't apply the attributes to the root-element (div).
defineOptions({ inheritAttrs: false });

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

  // Set height of tab-bar and tabs
  &,
  .v-tab.v-tab.v-btn {
    height: var(--tabHeight);
  }
}
</style>
