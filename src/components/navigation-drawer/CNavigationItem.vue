<template>
  <div class="c-navigation-item d-flex justify-center flex-column">
    <v-list-item
      :prepend-icon="icon"
      :title="label"
      :to="to"
      class="mb-0 full-width"
      min-height="unset"
    >
    </v-list-item>
    <div class="rail-label d-flex align-center justify-center">
      <p>{{ label }}</p>
    </div>
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

<style lang="scss">
.c-navigation-item {
  height: 56px;

  .rail-label {
    font-size: 10px;
    opacity: 0;
    height: 0;
    // The default rail width - the padding of the nav-drawer
    width: calc(80px - 16px);
  }

  .v-list-item {
    height: 48px;
  }
}

// When used in navigation drawer, show it on rail mode
.c-navigation-drawer.rail {
  .c-navigation-subtitle {
    opacity: 0;
    height: 0;
  }

  .v-list-item .v-list-item__content {
    opacity: 0;
  }

  .c-navigation-item {
    margin-bottom: 12px;

    .v-list-item {
      height: 32px;
    }

    .rail-label {
      opacity: 100%;
      height: 20px;
    }
  }
}
</style>
