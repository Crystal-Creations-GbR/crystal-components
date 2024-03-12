<template>
  <div class="c-secondary-navigation">
    <v-navigation-drawer
      v-if="slots['list-items']"
      :color="sideNavigationColor"
      :order="navigationDrawerOrder"
      :class="navigationDrawerClass"
      elevation="0"
      class="border-none"
    >
      <v-list color="primary" bg-color="transparent" variant="text">
        <slot name="list-items"></slot>
      </v-list>
    </v-navigation-drawer>

    <v-scale-transition v-if="slots['tab-items']">
      <v-app-bar
        v-if="mdAndDown"
        :color="tabNavigationColor"
        :order="appBarOrder"
        height="48"
      >
        <c-primary-tabs>
          <slot name="tab-items"></slot>
        </c-primary-tabs>
      </v-app-bar>
    </v-scale-transition>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";
import { useSlots } from "vue";
import CPrimaryTabs from "./CPrimaryTabs.vue";

/**
 * This component builds a secondary navigation that can be used to navigate inside a page.
 *
 * The navigation consists out of two different types of navigation:
 * A side navigation inside a `v-navigation-drawer` and a primary tab-navigation inside a `v-app-bar`.
 *
 *
 * Side Navigation (v-list in v-navigation-drawer)
 * Shown above vuetify md-breakpoint.
 * Requires `v-list-item`s in the `list-items` slot.
 * Also supports `c-navigation-subtitle`s.
 *
 * Tab Navigation (c-primary-tabs in v-app-bar)
 * Shown below vuetify md-breakpoint.
 * Requires `v-tab`s in the `tab-items` slot.
 */
withDefaults(
  defineProps<{
    /**
     * Adjust the order of the navigation-drawer in which the side navigation is placed
     * in relation to its registration order.
     */
    navigationDrawerOrder?: string | number;

    /**
     * The color of the side navigation.
     */
    sideNavigationColor?: string;

    /**
     * Optional CSS-classes to set for the navigation-drawer.
     */
    navigationDrawerClass?: string;

    /**
     * Adjust the order of the app-bar in which the tab navigation is placed
     * in relation to its registration order.
     */
    appBarOrder?: string | number;

    /**
     * The color of the tab navigation.
     */
    tabNavigationColor?: string;
  }>(),
  {
    navigationDrawerOrder: 1,
    sideNavigationColor: "background",
    navigationDrawerClass: undefined,
    appBarOrder: 1,
    tabNavigationColor: "background",
  },
);

const slots = useSlots();
const { mdAndDown } = useDisplay();
</script>

<style lang="scss">
.c-secondary-navigation {
  .v-list-item {
    border-top-right-radius: 24px !important;
    border-bottom-right-radius: 24px !important;

    .v-list-item__prepend .v-list-item__spacer {
      width: 16px !important;
    }
  }
}
</style>
