<template>
  <div class="c-navigation-item d-flex justify-center flex-column">
    <v-list-item
      :prepend-icon="icon"
      :title="label"
      :to="to"
      class="mb-0 full-width py-2 my-1"
      min-height="unset"
      rounded="lg"
    >
    </v-list-item>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

/**
 * This component is a navigation item to use inside the `CNavigationDrawer`.
 *
 * It supports the rail and the extended mode of the drawer.
 */
defineProps<{
  /**
   * The label of this item.
   */
  label: string;

  /**
   * The icon of this item.
   */
  icon: string;

  /**
   * Denotes the target route of the link. You can find more information about the `to` prop on the vue-router documentation.
   */
  to?: RouteLocationRaw;
}>();
</script>

<style lang="scss"></style>
