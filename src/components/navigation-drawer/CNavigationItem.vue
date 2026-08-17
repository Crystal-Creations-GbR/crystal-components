<template>
  <div class="c-navigation-item d-flex justify-center flex-column">
    <v-list-item
      :prepend-icon="currentIcon"
      :title="label"
      :to="to"
      class="mb-0 full-width py-2 my-1"
      min-height="unset"
      rounded="lg"
      base-color="grey-darken-3"
    >
    </v-list-item>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { RouteLocationRaw } from "vue-router";

const route = useRoute();
const router = useRouter();

/**
 * This component is a navigation item to use inside the `CNavigationDrawer`.
 *
 * It supports the rail and the extended mode of the drawer.
 */
const props = defineProps<{
  /**
   * The label of this item.
   */
  label: string;

  /**
   * The icon of this item.
   */
  icon: string;

  /**
   * The icon to show when this item is active. Falls back to `icon` if not provided.
   */
  activeIcon?: string;

  /**
   * Denotes the target route of the link. You can find more information about the `to` prop on the vue-router documentation.
   */
  to?: RouteLocationRaw;
}>();

/**
 * Whether this route / item is currently active.
 */
const isActive = computed(() => {
  if (!props.to) return false;
  try {
    const resolved = router.resolve(props.to);
    return route.path.startsWith(resolved.path);
  } catch {
    return false;
  }
});

/**
 * The current icon to display.
 */
const currentIcon = computed(() => {
  return isActive.value && props.activeIcon ? props.activeIcon : props.icon;
});
</script>

<style lang="scss">
.c-navigation-item {
  .v-list-item {
    .v-list-item-title {
      font-weight: 700;
    }
  }
}
</style>
